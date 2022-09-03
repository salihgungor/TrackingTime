import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../../../core/interfaces/client';
import { ClientService } from '../../../services/client/client.service';
import { Cra } from '../../../core/interfaces/cra';
import { CraService } from '../../../services/cra/cra.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../../../services/token/token-storage.service';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-cra-detail',
  templateUrl: './cra-detail.component.html',
  styleUrls: ['./cra-detail.component.css'],
})
export class CraDetailComponent implements OnInit {
  craForm!: FormGroup;
  clients: Client[] = [];
  errorMessage: any;
  cra: Cra = {};
  updatedCra: Cra = {};

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private craService: CraService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
  ) {}

  ngOnInit(): void {
    this.craService.getOne(this.route.snapshot.params['id']).subscribe({
      next: (data) => {
        this.cra = data;
        this.craForm = this.fb.group({
          date_start: [this.cra.start_date, [Validators.required]],
          date_end: [this.cra.end_date, [Validators.required]],
          nb_days: [this.cra.nbDays, [Validators.required]],
          nb_half_days: [this.cra.nbHalfDays, [Validators.required]],
          nb_hours: [this.cra.nbHours, [Validators.required]],
          company_comment: [
            this.cra.companyComment,
            [Validators.maxLength(50)],
          ],
          client_comment: [this.cra.clientComment, [Validators.maxLength(100)]],
          client: [this.cra.client?.id, [Validators.required]],
        });
      },
      error: (e) => {
        this.errorMessage = e.error?.message
          ? e.error?.message
          : 'Une erreur est survenue';
      },
    });
    this.clientService.getAll().subscribe({
      next: (data) => {
        this.clients = data;
      },
      error: (e) => {
        this.errorMessage = e.error?.errorMessage;
      },
    });
  }

  getDirtyValues(form: any) {
    let dirtyValues: any = {};

    Object.keys(form.controls).forEach((key) => {
      let currentControl = form.controls[key];

      if (currentControl.dirty) {
        if (currentControl.controls)
          dirtyValues[key] = this.getDirtyValues(currentControl);
        else dirtyValues[key] = currentControl.value;
      }
    });

    return dirtyValues;
  }

  updateCra() {
    let userInfo = this.tokenStorage.getUserInfoFromStorage();
    this.errorMessage = '';
    let val = this.craForm.value;
    let date_start = this.dateFormat(new Date(val.date_start).toLocaleString());
    let date_end = this.dateFormat(new Date(val.date_end).toLocaleString());
    if (date_start > date_end) {
      this.errorMessage =
        'La date de début est plus grande que la date de fin.';
    }
    if (+(val.nb_days + val.nb_half_days + val.nb_hours) === 0) {
      this.errorMessage = "Veuillez renseigner au moins le nombre d'heure";
    }
    if (!this.errorMessage) {
      val = this.getDirtyValues(this.craForm);
      console.log(val)
      if (val.date_start) {
        date_start = this.dateFormat(new Date(val.date_start).toLocaleString());
        this.updatedCra.start_date = date_start.toFormat('yyyy-MM-dd');
      }
      if (val.date_end) {
        date_end = this.dateFormat(new Date(val.date_end).toLocaleString());
        this.updatedCra.end_date = date_end.toFormat('yyyy-MM-dd');
      }

      if (val.nb_days) this.updatedCra.nbDays = val.nb_days.toString();
      if (val.nb_half_days) this.updatedCra.nbHalfDays = val.nb_half_days.toString();
      if (val.nb_hours) this.updatedCra.nbHours = val.nb_hours.toString();
      if (val.company_comment) {
        this.updatedCra.companyComment = val.company_comment;
      }
      if (val.client_comment) {
        this.updatedCra.clientComment = val.client_comment;
      }
      if(val.client){
        this.updatedCra.client = val.client;
      } 
      if (Object.keys(val).length > 0) {
        this.craService
          .updateOneTrackingtimes(
            userInfo.sub,
            this.route.snapshot.params['id'],
            this.updatedCra,
          )
          .subscribe({
            next: (data) => {
              this._snackBar.open('Modifié avec succès !', 'OK');
            },
            error: (e) => {
              this.errorMessage = e.error?.message;
            },
          });
      }else{
        this.errorMessage = "Aucune modification est rapportée."
      }
    }
  }

  dateFormat(date: string): DateTime {
    return DateTime.fromFormat(date.toLocaleString(), 'dd/MM/yyyy HH:mm:ss');
  }
}
