import { Component, OnInit } from '@angular/core';
import { AuthenticationComponent } from '../authentication/authentication.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }
  getEtat()
  {
    let x =localStorage.getItem("logged");
    if(x!= null)
    {
      return true;
    }else
    {
      return false;
    }
    
  }
}
