import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ClientComponent } from './dashboard/client.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table' ;
import { HttpClientModule } from '@angular/common/http';
import { ClientServiceService } from './service/client-service.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAndEditClientComponent } from './dashboard/add-and-edit-client/add-and-edit-client.component';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ClientFileComponent } from './dashboard/client-file/client-file.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RegisterComponent } from './authentication/register/register.component';
import { VisiteServiceService } from './service/visite-service.service';
import { OrganismeComponent } from './dashboard/organisme/organisme.component';
import { OrganismeServiceService } from './service/organisme-service.service';
import { GroupeFamComponent } from './dashboard/groupe-fam/groupe-fam.component';
import { GroupeFamServiceService } from './service/groupe-fam-service.service';
import { NewVisitComponent } from './dashboard/client-file/new-visit/new-visit.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ClientComponent,
    SidenavComponent,
    AddAndEditClientComponent,
    AuthenticationComponent,
    ClientFileComponent,
    RegisterComponent,
    OrganismeComponent,
    GroupeFamComponent,
    NewVisitComponent,
    

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // * MATERIAL IMPORTS
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatTableModule,
    HttpClientModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatDialogModule,
   
    MatMenuModule,
    
   
    MatButtonModule,
   
    
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatTabsModule,
    
    
    
  ],
 
  providers: [ClientServiceService,AuthenticationComponent,VisiteServiceService,ClientFileComponent,OrganismeServiceService,OrganismeComponent,{provide:MatDialogRef,useValue:[]},GroupeFamComponent,GroupeFamServiceService,NewVisitComponent],
  
  bootstrap: [AppComponent],
})
export class AppModule {}
