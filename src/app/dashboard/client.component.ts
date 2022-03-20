import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Client } from '../model/client';
import { ClientServiceService } from '../service/client-service.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AddAndEditClientComponent } from './add-and-edit-client/add-and-edit-client.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})

export class ClientComponent implements OnInit {

  nomPrenom!: String;

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
    organisme: new FormControl(''),
    MatriculeFiscal: new FormControl(''),
    observations: new FormControl(''),
    //vendeur: new FormControl(''),
  })


  dataSource!: MatTableDataSource<Client>;
  client: Client = new Client();
  clientData !: any;
  listClient: any;
  displayedColumns: string[] = ['reference', 'nomPrenom', 'chiffreAffaire', 'solde', 'nbreVisite', 'dateNaissance', 'observations', 'organisme', 'groupe', 'actions'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  dialogRef: any;
  


  constructor(
    public dialog: MatDialog,
    private serviceClient: ClientServiceService,
   
  ) { }


  ngOnInit(): void {
    this.serviceClient.getClient().subscribe(
      data => {

        this.listClient = data;
        this.dataSource = new MatTableDataSource(this.listClient)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }


  //open modal
  openDialog(): void {
    this.dialogRef = this.dialog.open(AddAndEditClientComponent, {
      height: '90%',
      width: '90%',
      data: {
        nomPrenom: this.client.nomPrenom,
        numTel1: this.client.numTel1,
        numTel2: this.client.numTel2,
        email: this.client.email,
        dateNaissance: this.client.dateNaissance,
        age: this.client.age,
        cin: this.client.cin,
        numAssureSocial: this.client.numAssureSocial,
        adresse: this.client.adresse,
        ville: this.client.ville,
        pays: this.client.pays,
        groupe: this.client.groupe,
        organisme: this.client.organisme,
        observations: this.client.observations,
        MatriculeFiscal: this.client.MatriculeFiscal
      },
    });
    this.dialogRef.afterClosed().subscribe(_result => {
      this.getAllClient()
    });
  }


  //fill in fields from client information
  onEdite(row: any) {
    this.dialogRef.componentInstance.onEdit(row);
  }

  addClient(){
    this.dialogRef.componentInstance.clickAddClient();
  }


  //find all client
  getAllClient() {
    this.serviceClient.getClient().subscribe(
      data => {

        this.listClient = data;
        this.dataSource = new MatTableDataSource(this.listClient)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }


  //remove client
  deleteClient(id: any) {
    if (confirm("êtes-vous sur de supprimer ce client ?")) {
      this.serviceClient.DeleteClient(id)
        .subscribe(_res => {
          alert("Client supprimé ");
          this.getAllClient();
        }

        )



    }
  }
  


  //search by first name
  Search() {
    if (this.nomPrenom != "") {
      this.dataSource = this.listClient.filter(res => {
        return res.nomPrenom.toLocaleLowerCase().match(this.nomPrenom.toLocaleLowerCase());
      });
    } else if (this.nomPrenom == "") {
      this.getAllClient();
    }
  }

  
  //paging
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      console.log(this.dataSource.paginator)
      this.dataSource.paginator.firstPage();
    }
  }
}





