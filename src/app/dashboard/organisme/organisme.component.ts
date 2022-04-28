import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Organisme } from 'src/app/model/organisme';
import { OrganismeServiceService } from 'src/app/service/organisme-service.service';

@Component({
  selector: 'app-organisme',
  templateUrl: './organisme.component.html',
  styleUrls: ['./organisme.component.scss']
})
export class OrganismeComponent implements OnInit {
  organisme: Organisme = new Organisme();

  public listOrg: Organisme[];
  
  formValue = new FormGroup({
    nomOrganisme: new FormControl(''),
    email: new FormControl(''),
    adresse: new FormControl(''),
    numTel: new FormControl(''),
    matriculeFiscal: new FormControl(''),
    remise_org: new FormControl(''),

  })


  constructor(public dialog: MatDialog,
    private serviceOrg: OrganismeServiceService,
    public dialogRef: MatDialogRef<OrganismeComponent>
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  remplirListOrg(){
   return this.serviceOrg.getOrganisme();


 }

  openDialogOrg(): void {
    this.dialogRef = this.dialog.open(OrganismeComponent, {
      height: '60%',
      width: '40%',
      data: {
        nomOrganisme: this.organisme.nomOrganisme,
        email: this.organisme.email,
        adresse: this.organisme.adresse,
        numTel: this.organisme.numTel,
        matriculeFiscal: this.organisme.matriculeFiscal,
        remise_org: this.organisme.remise_org

      },
    });
    this.dialogRef.afterClosed().subscribe(_result => {
      this.serviceOrg.getOrganisme();
    });
  }

  postOrgDetails() {
    let organisme = {
      nomOrganisme: this.organisme.nomOrganisme,
      email: this.organisme.email,
      adresse: this.organisme.adresse,
      numTel: this.organisme.numTel,
      matriculeFiscal: this.organisme.matriculeFiscal,
      remise_org: this.organisme.remise_org
    }
    this.serviceOrg.postOrganisme(organisme)
      .subscribe(res => {
        console.log(res);
        alert("organisme ajouté avec succès")
        let ref = document.getElementById('cancel1')
        ref?.click();
        this.formValue.reset();
      },
        err => { alert("Quelque chose s'est mal passé") }
      )

  }

  deleteOrganisme(id: any) {
    if (confirm("êtes-vous sur de supprimer ce organisme ?")) {
      this.serviceOrg.DeleteOrganisme(id)
        .subscribe(_res => {
          alert("organisme supprimé ");
        })
    }
  }
}
