import { Component, OnInit } from '@angular/core';
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

  formValue = new FormGroup({
    refVisite: new FormControl(''),
    date: new FormControl(''),
    heure: new FormControl(''),
  })

  constructor(public dialog: MatDialog,
    private serviceVisite: VisiteServiceService,
    public dialogRef: MatDialogRef<NewVisitComponent>) { }

  ngOnInit(): void {
  }

  openDialogNewVisit(): void {
    this.dialogRef = this.dialog.open(NewVisitComponent, {
      height: '75%',
      width: '30%',
      data: {
        refVisite: this.visite.refVisite,
        date: this.visite.date,
        heure: this.visite.heure,
        solde: this.client.solde,
      },
    });
    this.dialogRef.afterClosed().subscribe(_result => {
      this.serviceVisite.getVisite();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  postVisitDetails() {
    let visit = {
      refVisite: this.formValue.value.refVisite,
      date: this.formValue.value.date,
      heure: this.formValue.value.heure
    }

    this.serviceVisite.postVisite(visit)
      .subscribe(res => {
        console.log(res);
        alert("Visite ajouté avec succès")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.serviceVisite.getVisitesByClient(this.client.id);
      },
        err => { alert("Quelque chose s'est mal passé") }
      )

  }

}
