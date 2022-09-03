import { Component, OnInit, ViewChild } from '@angular/core';
import { Cra } from '../../../core/interfaces/cra';
import { CraService } from '../../../services/cra/cra.service';
import { MatDialog } from "@angular/material/dialog";
import { DialogConfirmationComponent } from '../../../shared/components/dialog-confirmation/dialog-confirmation.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cra-list',
  templateUrl: './cra-list.component.html',
  styleUrls: ['./cra-list.component.css'],
})
export class CraListComponent implements OnInit {
  dataSource = new MatTableDataSource<Cra>();
  displayedColumns: string[] = ['start_date', 'end_date', 'nbDays', 'nbHalfDays','nbHours','companyComment','clientComment','client','state','actions'];
  cra: Cra[] = [];
  errorMessage = '';
  constructor(private craService: CraService,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.retrieveAllUserCRA();
  }

  retrieveAllUserCRA() {
    this.craService.getAllForUser().subscribe({
      next: (data) => {
        this.cra = data;
        this.dataSource.data = this.cra
      },
      error: (e) => {
        this.errorMessage = e.error?.message;
      },
    });
  }

  confirm(id:number): void {
    this.dialog
      .open(DialogConfirmationComponent, {
        data: `Etes-vous sure de vouloir supprimer ?`
      })
      .afterClosed()
      .subscribe((confirm: Boolean) => {
        if (confirm) {
          this.removeOne(id)
        }
      });
  }

  removeOne(id:number){
    this.craService.removeOne(id).subscribe({
      next: (data) => {
        this.retrieveAllUserCRA()
      },
      error: (e) => {
        this.errorMessage = e.error?.message;
      },
    });
  }
}
