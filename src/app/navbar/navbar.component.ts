import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  status=false;
  public isMenuCollapsed = true;
  
  constructor(private authService: AuthService, private router:Router,private dataService:DataService) { }

  ngOnInit(): void {
  }
  isScrolled = false;
  isNavbarCollapsed=true;
@HostListener("window:scroll")
scrollEvent() {
    window.pageYOffset >= 80 ? (this.isScrolled = true) : (this.isScrolled = false);
}



showSearchBar(){
this.status =!this.status;
}
toggleView(){
 this.dataService.toggleView();
 window.location.reload();
 
 }
signOut(){
  this.authService.signOut()
}
}