import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { AuthenticationServiceService } from '../service/authentication-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, public authService: AuthenticationServiceService,public auth:AuthenticationComponent) { }
  username = "";
  ngOnInit(): void {
    

  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('authentification');
  }


  toggleSidebar() {
    
    this.toggleSidebarForMe.emit();
  }


}
