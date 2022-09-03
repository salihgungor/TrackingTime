import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../../../core/interfaces/client';
import { ClientService } from '../../../services/client/client.service';
import { DateTime } from 'luxon';
import { Cra } from '../../../core/interfaces/cra';
import { CraService } from '../../../services/cra/cra.service';

@Component({
  selector: 'app-cra-add',
  templateUrl: './cra-add.component.html',
  styleUrls: ['./cra-add.component.css'],
})
export class CraAddComponent implements OnInit {
  craForm!: FormGroup;
  clients: Client[] = [];
  errorMessage: any;
  cra: Cra = {};
  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private craService: CraService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.clientService.getAll().subscribe({
      next: (data) => {
        this.clients = data;
      },
      error: (e) => {
        this.errorMessage = e.error?.errorMessage;
      },
    });
    this.craForm = this.fb.group({
      date_start: ['', [Validators.required]],
      date_end: ['', [Validators.required]],
      nb_days: ['0', [Validators.required]],
      nb_half_days: ['0', [Validators.required]],
      nb_hours: ['0', [Validators.required]],
      company_comment: ['', [Validators.maxLength(50)]],
      client_comment: ['', [Validators.maxLength(100)]],
      client: ['', [Validators.required]],
    });
  }

  addCra() {
    this.errorMessage = '';
    let val = this.craForm.value;
    let date_start = DateTime.fromFormat(
      val.date_start.toLocaleString(),
      'dd/MM/yyyy HH:mm:ss',
    );
    let date_end = DateTime.fromFormat(
      val.date_end.toLocaleString(),
      'dd/MM/yyyy HH:mm:ss',
    );
    if (date_start > date_end) {
      this.errorMessage =
        'La date de début est plus grande que la date de fin.';
    }
    if (+(val.nb_days + val.nb_half_days + val.nb_hours) === 0) {
      this.errorMessage = "Veuillez renseigné au moins le nombre d'heure";
    }
    if (!this.errorMessage) {
      this.cra.start_date = date_start.toFormat("yyyy-MM-dd");
      this.cra.end_date = date_end.toFormat("yyyy-MM-dd");
      this.cra.nbDays = val.nb_days;
      this.cra.nbHalfDays = val.nb_half_days;
      this.cra.nbHours = val.nb_hours;
      if (val.company_comment) this.cra.companyComment = val.company_comment;
      if (val.client_comment) this.cra.clientComment = val.client_comment;
      this.cra.clientId = val.client;
      this.craService.create(this.cra).subscribe({
        next: () => {
          this._snackBar.open("Ajouté avec succès !", 'OK');
        },
        error: (e) => {
          this.errorMessage = e.error?.message
        },
      });
    }
  }
}
