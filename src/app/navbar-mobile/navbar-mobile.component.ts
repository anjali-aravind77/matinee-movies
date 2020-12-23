import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-navbar-mobile',
  templateUrl: './navbar-mobile.component.html',
  styleUrls: ['./navbar-mobile.component.css']
})
export class NavbarMobileComponent implements OnInit {
  public isMenuCollapsed = true;
  status=false;
  show=true;
  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
  }
  showSearchBar(){
    this.status =!this.status;
    }
    signOut(){
      this.authService.signOut()
    }
}
