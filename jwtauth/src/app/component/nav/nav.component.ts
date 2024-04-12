import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitter';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  authenticated = false

  constructor(private http :HttpClient){}

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth :boolean)=>{
      this.authenticated = auth
    })
  }


  logout(){
    this.http.post('https://mean-auth-server.vercel.app/api/logout' ,{} ,{withCredentials:true})
    .subscribe(()=>{
      this.authenticated = false
    })
  }

}
