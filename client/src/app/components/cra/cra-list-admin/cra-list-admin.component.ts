import { Component, OnInit } from '@angular/core';
import { Cra } from '../../../core/interfaces/cra';
import { CraService } from '../../../services/cra/cra.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { State } from '../../../core/enums/state.enum';
import { DialogConfirmationComponent } from '../../../shared/components/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-cra-list-admin',
  templateUrl: './cra-list-admin.component.html',
  styleUrls: ['./cra-list-admin.component.css'],
})
export class CraListAdminComponent implements OnInit {
  dataSource = new MatTableDataSource<Cra>();
  displayedColumns: string[] = [
    'start_date',
    'end_date',
    'nbDays',
    'nbHalfDays',
    'nbHours',
    'client',
    'user',
    'state',
    'actions',
  ];
  cra: Cra[] = [];
  errorMessage = '';
  constructor(private craService: CraService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.retrieveAllAdminCRA();
  }

  retrieveAllAdminCRA() {
    this.craService.getAllForAdmin().subscribe({
      next: (data) => {
        this.cra = data;
        this.dataSource.data = this.cra;
      },
      error: (e) => {
        this.errorMessage = e.error?.message;
      },
    });
  }

  accept(id: number) {
    this.dialog
      .open(DialogConfirmationComponent, {
        data: `Etes-vous sure de vouloir valider ?`,
      })
      .afterClosed()
      .subscribe((confirm: Boolean) => {
        if (confirm) {
          this.craService.setState(id, State.VALID).subscribe({
            next: () => {
              this.retrieveAllAdminCRA()
            },
            error: (e) => {
              this.errorMessage = e.error?.message;
            },
          });
        }
      });
  }

  refuse(id: number) {
    this.dialog
      .open(DialogConfirmationComponent, {
        data: `Etes-vous sure de vouloir refuser ?`,
      })
      .afterClosed()
      .subscribe((confirm: Boolean) => {
        if (confirm) {
          this.craService.setState(id, State.REJECT).subscribe({
            next: () => {
              this.retrieveAllAdminCRA()
            },
            error: (e) => {
              this.errorMessage = e.error?.message;
            },
          });
        }
      });
  }
}
