import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from 'src/app/model/client';
import { Visite } from 'src/app/model/visite';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ClientServiceService } from 'src/app/service/client-service.service';
import { VisiteServiceService } from 'src/app/service/visite-service.service';
import { NewVisitComponent } from './new-visit/new-visit.component';

@Component({
  selector: 'app-client-file',
  templateUrl: './client-file.component.html',
  styleUrls: ['./client-file.component.scss']
})
export class ClientFileComponent implements OnInit {

  formValue = new FormGroup({
    nomPrenom: new FormControl(''),
    dateNaissance: new FormControl(''),
    matriculeFiscal: new FormControl(''),
    adresse: new FormControl(''),
    ville: new FormControl(''),
    pays: new FormControl(''),
    numTel1: new FormControl(''),
    numTel2: new FormControl(''),
    observations: new FormControl(''),
    solde: new FormControl(''),
  })

  dataSource!: MatTableDataSource<Visite>;
  visite: Visite = new Visite();
  visiteData !: any;
  listVisite: any;
  displayedColumns: string[] = ['numVisite', 'date', 'heure', 'solde', 'resteAPayer', 'vendeur', 'remise', 'actions'];


  client: Client = new Client();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;


  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ClientFileComponent>,
    private serviceClient: ClientServiceService,
    private serviceVisite: VisiteServiceService,
    public newVisit: NewVisitComponent,
  ) { }

  ngOnInit(): void {
    this.getAllVisites();
  }

  //afficher les visites non archives
  getVisiteNonArchive() {
    this.serviceVisite.getVisitNonArchive().subscribe(
      data => {
        
        this.listVisite = data;
        this.dataSource = new MatTableDataSource(this.listVisite)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        alert("Visite archivée");
      }
    )

  }

  editVisiteNonArchive(id) {
    console.log(id);
    let v = new Visite();
    v.isDeleted = true;
    this.serviceVisite.UpdateVisiteArchive(v, id).subscribe(val=>console.log(val));
    //this.serviceVisite.UpdateVisiteArchive(v, id).subscribe(res => {
      //alert("Visite archivée");
    //})


  }

  //afficher les visites pour chaque client
  getVisiteByClient(id) {
    console.log();
    this.serviceVisite.getVisitesByClient(id).subscribe(
      data => {
        localStorage.setItem('idClient',id);
        this.listVisite = data;
        this.dataSource = new MatTableDataSource(this.listVisite)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )

  }

  



  //button fermer de modal dossier client
  onNoClick(): void {
    this.dialogRef.close();
  }

  //button nouvelle visite (open modal)
  openDialogNewVisit(): void {
    this.newVisit.openDialogNewVisit();
  }

  openDialogFile(): void {
    this.dialogRef = this.dialog.open(ClientFileComponent, {
      height: '90%',
      width: '90%',
      data: {
        nomPrenom: this.client.nomPrenom,
        numTel1: this.client.numTel1,
        numTel2: this.client.numTel2,
        email: this.client.email,
        dateNaissance: this.client.dateNaissance,
        adresse: this.client.adresse,
        ville: this.client.ville,
        pays: this.client.pays,
        observations: this.client.observations,
        solde: this.client.solde,
        matriculeFiscal: this.client.matriculeFiscal
      },
    });
    this.dialogRef.afterClosed().subscribe(_result => {
      this.serviceClient.getClient();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      console.log(this.dataSource.paginator)
      this.dataSource.paginator.firstPage();
    }
  }

  //afficher tous les visites 
  getAllVisites() {

    this.serviceVisite.getVisite().subscribe(
      data => {

        this.listVisite = data;
        this.dataSource = new MatTableDataSource(this.listVisite)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }

  //remplir les informations de client dans les champs
  onEditFile(row: any) {
    console.log(row);
    this.visite.id = row.id;

    this.formValue.patchValue({
      nomPrenom: row.nomPrenom,
      dateNaissance: row.dateNaissance,
      adresse: row.adresse,
      ville: row.ville,
      pays: row.pays,
      numTel1: row.numTel1,
      numTel2: row.numTel2,
      solde: row.solde,
      matriculeFiscal: row.matriculeFiscal,
      observations: row.observations
    })
  }

  //button modifier client
  UpdateClientFileDetails() {

    this.client.nomPrenom = this.formValue.value.nomPrenom;
    this.client.dateNaissance = this.formValue.value.dateNaissance;
    this.client.adresse = this.formValue.value.adresse;
    this.client.ville = this.formValue.value.ville;
    this.client.pays = this.formValue.value.pays;
    this.client.numTel1 = this.formValue.value.numTel1;
    this.client.numTel2 = this.formValue.value.numTel2;
    this.client.solde = this.formValue.value.solde;
    this.client.matriculeFiscal = this.formValue.value.matriculeFiscal;
    this.client.observations = this.formValue.value.observations;


    this.serviceClient.UpdateClient(this.client, this.client.id)
      .subscribe(res => {
        alert("Update Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.serviceClient.getClient();
      })
  }

}



