import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Groupe } from 'src/app/model/groupe_fam';
import { GroupeFamServiceService } from 'src/app/service/groupe-fam-service.service';

@Component({
  selector: 'app-groupe-fam',
  templateUrl: './groupe-fam.component.html',
  styleUrls: ['./groupe-fam.component.scss']
})
export class GroupeFamComponent implements OnInit {

  groupe: Groupe = new Groupe();

  formValue = new FormGroup({
    nomFamille: new FormControl(''),
    emailResp: new FormControl(''),
    adresse: new FormControl(''),
    numTelResp: new FormControl(''),
    remise_grp: new FormControl('')

  })

  constructor(public dialog: MatDialog,
    private serviceGrp: GroupeFamServiceService,
    public dialogRef: MatDialogRef<GroupeFamComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openDialogGrp(): void {
    this.dialogRef = this.dialog.open(GroupeFamComponent, {
      height: '60%',
      width: '40%',
      data: {
        nomFamille: this.groupe.nomFamille,
        emailResp: this.groupe.emailResp,
        adresse: this.groupe.adresse,
        numTelResp: this.groupe.numTelResp,
        remise_grp: this.groupe.remise_grp,

      },
    });
    this.dialogRef.afterClosed().subscribe(_result => {
      this.serviceGrp.getGroupe();
    });
  }

}
