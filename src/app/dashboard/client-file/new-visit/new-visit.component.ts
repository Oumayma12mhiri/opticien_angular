import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Client } from 'src/app/model/client';
import { Visite } from 'src/app/model/visite';
import { VisiteServiceService } from 'src/app/service/visite-service.service';


@Component({
  selector: 'app-new-visit',
  templateUrl: './new-visit.component.html',
  styleUrls: ['./new-visit.component.scss']
})
export class NewVisitComponent implements OnInit {

  visite: Visite = new Visite();
  client: Client = new Client();
  newVisite: Visite = new Visite();

   dateVisNow !:Date;
   @Input() date ="";
   heureVisNow !:Date;
   hours ="";
   //dateVisNow =0;
   idClient="";

  formValue = new FormGroup({
    refVisite: new FormControl(''),
    date: new FormControl(''),
    heure: new FormControl(''),
    montantReçuParVisite: new FormControl(''),
  })

  constructor(public dialog: MatDialog,
    private serviceVisite: VisiteServiceService,
    public dialogRef: MatDialogRef<NewVisitComponent>) { }
  ngOnInit(): void {
    

    this.dateVisNow = new Date();
    this.date = this.dateVisNow.getFullYear()+'-'+(this.dateVisNow.getMonth()+1)+'-'+this.dateVisNow.getDate();
    console.log(this.date);

    this.heureVisNow = new Date();
    this.hours = this.heureVisNow.getHours() + ":" + this.heureVisNow.getMinutes() + ":" + this.heureVisNow.getSeconds();
    console.log(this.hours);

    this.idClient=localStorage.getItem('idClient');
  }

  //open modal de button nouvelle visite
  openDialogNewVisit(): void {
    this.dialogRef = this.dialog.open(NewVisitComponent, {
      height: '75%',
      width: '30%',
      data: {
        refVisite: this.visite.refVisite,
        date: this.visite.date,
        heure: this.visite.heure,
        montantReçuParVisite: this.visite.montantReçuParVisite
      },
    });
    this.dialogRef.afterClosed().subscribe(_result => {
      this.serviceVisite.getVisite();
    });
  }

  //button fermer (close modal)
  onNoClick(): void {
    this.dialogRef.close();
  }

  //quand je click sur un client (afficher tt les visites de ce client)
  postVisitDetails() {
    let visit = {
      refVisite: this.formValue.value.refVisite,
      date: this.formValue.value.date,
      heure: this.formValue.value.heure,
      montantReçuParVisite:this.formValue.value.montantReçuParVisite
    }

    this.serviceVisite.postVisite(visit)
      .subscribe(res => {
        console.log(res);
        alert("Nouvelle visite ajoutée avec succès")
        let ref = document.getElementById('cancel2')
        ref?.click();
        this.formValue.reset();
        this.serviceVisite.getVisite();
      },
        err => { alert("Quelque chose s'est mal passé") }
      )

  }

}
