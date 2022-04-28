import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddAndEditClientComponent } from '../dashboard/add-and-edit-client/add-and-edit-client.component';
import { ClientFileComponent } from '../dashboard/client-file/client-file.component';
import { ClientComponent } from '../dashboard/client.component';
import { Vente } from '../model/vente';

@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.scss']
})
export class VenteComponent implements OnInit {

  dataSource!: MatTableDataSource<Vente>;
  vente: Vente = new Vente();
  venteData !: any;
  listVente: any;
  displayedColumns: string[] = ['id', 'ref', 'designation', 'PUVHT', 'qte', 'remise', 'TVA', 'MT TTC', 'oeil',
    'vision', 'promis', 'peniche', 'SPH', 'CYL', 'AXE', 'ADD', 'RAY', 'DIA',
    'colProvenance', 'DLC'];

  formValue = new FormGroup({

    numFicheManuelle: new FormControl(''),
    id: new FormControl(''),
    sph: new FormControl(''),
    cyl: new FormControl(''),
    axe: new FormControl(''),
    addition: new FormControl(''),
    prisme: new FormControl(''),
    base: new FormControl(''),
    totaleVente: new FormControl(''),
    remiseVente: new FormControl('')
  
  })

  constructor(
    public client:ClientComponent,
    public dialog: MatDialog,
    public add:AddAndEditClientComponent,
    public clientFile:ClientFileComponent
  ) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    this.client.openDialog();
  }

  addClient(){
    this.add.clickAddClient();
  }

  openDialogFile(): void {
    this.clientFile.openDialogFile();
  }

}
