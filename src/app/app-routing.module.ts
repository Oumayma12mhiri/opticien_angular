import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './authentication/auth.guard';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ClientComponent } from './dashboard/client.component';
import { HomeComponent } from './home/home.component';
import { VenteComponent } from './vente/vente.component';

const routes: Routes = [
  { path: '', redirectTo: 'authentification', pathMatch: 'full' },
  { path: 'authentification', component: AuthenticationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'vente', component: VenteComponent },
  { path: 'dashboard', component: ClientComponent, canActivate:[AuthGuard] },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
