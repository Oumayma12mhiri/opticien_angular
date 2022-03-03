import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Client } from '../entities/client';
import { ClientServiceService } from '../service/client-service.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  formValue = new FormGroup({
    reference: new FormControl(''),
    cin: new FormControl(''),
    nomPrenom: new FormControl(''),
    dateNaissance: new FormControl(''),
    age: new FormControl(''),
    email: new FormControl(''),
    adresse: new FormControl(''),
    ville: new FormControl(''),
    pays: new FormControl(''),
    numAssureSocial: new FormControl(''),
    numTel1: new FormControl(''),
    numTel2: new FormControl(''),
    groupe: new FormControl(''),
    organisme: new FormControl('')
   // MatriculeFiscal: new FormControl(''),
    //observations: new FormControl(''),
    //vendeur: new FormControl(''),
  })


   dataSource!: MatTableDataSource<Client>;
   client: Client = new Client();
   clientData !: any;
   listClient:any;
   displayedColumns: string[] = ['reference','nomPrenom','chiffreAffaire','solde', 'nbreVisite','dateNaissance','observation','organisme','groupe','actions'];

   @ViewChild(MatPaginator)
   paginator!: MatPaginator ;
   @ViewChild(MatSort)
   sort: MatSort = new MatSort;


  constructor(private formbuilber: FormBuilder,private serviceClient:ClientServiceService) { }

  ngOnInit(): void {
    this.serviceClient.getClient().subscribe(
      data=>{
       
        this.listClient=data;
        this.dataSource=new MatTableDataSource(this.listClient)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }

  postEmployeeDetails() {
    this.client.reference = this.formValue.value.reference;
    this.client.cin = this.formValue.value.cin;
    this.client.nomPrenom = this.formValue.value.nomPrenom;
    this.client.dateNaissance = this.formValue.value.dateNaissance;
    this.client.age = this.formValue.value.age;
    this.client.email = this.formValue.value.email;
    this.client.adresse = this.formValue.value.adresse;
    this.client.ville = this.formValue.value.ville;
    this.client.pays = this.formValue.value.pays;
    this.client.numAssureSocial = this.formValue.value.numAssureSocial;
    this.client.numTel1 = this.formValue.value.numTel1;
    this.client.numTel2 = this.formValue.value.numTel2;
    this.client.chiffreAffaire = this.formValue.value.chiffreAffaire;
    this.client.solde = this.formValue.value.solde;
    this.client.organisme = this.formValue.value.organisme;
    this.client.groupe = this.formValue.value.groupe;

    this.serviceClient.postClient(this.client)
      .subscribe(res => {
        console.log(res);
        alert("client added Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.serviceClient.getClient();
      },
        err => { alert("Something Went wrong") }
      )

  }

  getAllClient() {
    this.serviceClient.getClient()
      .subscribe(res => {
        this.clientData = res;
      })
  }

  deleteClient(reference: any) {
    this.serviceClient.DeleteClient(reference)
      .subscribe(res => {
        alert("Client Deleted");
        this.getAllClient();
      })
  }

  onEdit(row: any) {
    this.client.reference = row.reference;
    this.formValue.patchValue({
      reference: row.reference,
      cin: row.cin,
      nomPrenom: row.nomPrenom,
      dateNaissance: row.dateNaissance,
      age: row.age,
      email: row.email,
      adresse: row.adresse,
      ville: row.ville,
      pays: row.pays,
      numAssureSocial: row.numAssureSocial,
      numTel1: row.numTel1,
      numTel2: row.numTel2,
      chiffreAffaire: row.chiffreAffaire,
      solde: row.solde,
      organisme: row.organisme,
      groupe: row.groupe,
      
    })
  }

  UpdateEmployeeDetails() {
    this.client.reference = this.formValue.value.reference;
    this.client.cin = this.formValue.value.cin;
    this.client.nomPrenom = this.formValue.value.nomPrenom;
    this.client.dateNaissance = this.formValue.value.dateNaissance;
    this.client.age = this.formValue.value.age;
    this.client.email = this.formValue.value.email;
    this.client.adresse = this.formValue.value.adresse;
    this.client.ville = this.formValue.value.ville;
    this.client.pays = this.formValue.value.pays;
    this.client.numAssureSocial = this.formValue.value.numAssureSocial;
    this.client.numTel1 = this.formValue.value.numTel1;
    this.client.numTel2 = this.formValue.value.numTel2;
    this.client.chiffreAffaire = this.formValue.value.chiffreAffaire;
    this.client.solde = this.formValue.value.solde;
    this.client.organisme = this.formValue.value.organisme;
    this.client.groupe = this.formValue.value.groupe;

    this.serviceClient.UpdateClient(this.client, this.client.reference)
      .subscribe(res => {
        alert("Update Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.serviceClient.getClient();
      })
  }

  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      console.log(this.dataSource.paginator)
      this.dataSource.paginator.firstPage();
    }
  }

}





