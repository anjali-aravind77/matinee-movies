import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  userData; token;
  toggle=false;
  constructor(private http:HttpClient,
        public router: Router) {
     
   }
 
   getToken(){
    this.token= JSON.parse(localStorage.getItem('token'));
    console.log(this.token);
   }
  getOptions(){
 
    let headers = new HttpHeaders();
    headers = headers.set('authorization', 'Bearer '+this.token);
    return {
      headers
    }
  }
  
  getBanner() {  
   this.getToken()
  return this.http.get('https://appapi.matinee-dev.mediasuite.in/banners',this.getOptions()); 
  }
  getHomeVideos(){
  
  this.getToken()
  return this.http.get("https://appapi.matinee-dev.mediasuite.in/homeitems?excludeSeries=",this.getOptions())
}

getDetails(id){
  this.getToken()
  return this.http.get("https://appapi.matinee-dev.mediasuite.in/singles?singleId="+id,this.getOptions())
}

  
    toggleWithId;
    toggleView(){
     if(this.toggleWithId)
      this.toggle=!this.toggle
   
    }
    
}