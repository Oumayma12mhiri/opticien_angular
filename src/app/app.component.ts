import { Component } from '@angular/core';
import { AuthenticationComponent } from './authentication/authentication.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'admin-panel-layout';
  sideBarOpen !: boolean;
  constructor(public auth: AuthenticationComponent) { }

  sideBarToggler() {
    if (this.auth.getEtat() == 'false') {
      this.sideBarOpen = false;
    } else if (this.auth.getEtat() == 'true')
      this.sideBarOpen = true;
  }
}
