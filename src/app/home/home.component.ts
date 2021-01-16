import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slide: string[] = []; 
  id="";
  state;
  constructor(public dataservice:DataService,private router:Router,private activatedRouter:ActivatedRoute ) { }

  ngOnInit(): void {
    this.getHomeVideos();
    this.getBanner();

  }
  allCategories;
  getBanner(){
    this.dataservice.getBanner()
    .subscribe((resp:any)=>{
      
      for(var i=0; i< resp.length; i++) {
        this.slide.push(resp[i].imageUrls['landscape'])
        console.log(this.slide)
      }
    })
  }
  getHomeVideos(){
    this.dataservice.getHomeVideos()
    .subscribe((resp)=>{
      // console.log(resp);  
this.allCategories=resp;
// console.log(this.allCategories);  
    })
  }

  videoPass;
  getId(videoId, catName){   
       this.id =videoId;
       videoId="";
       this.dataservice.toggle=!this.dataservice.toggle;
        for(var i = 0; i< this.allCategories.length; i++) {
          if(this.allCategories[i].category == catName) {
            this.videoPass = this.allCategories[i].items;        
              break;
      } 

    }
  }


}
