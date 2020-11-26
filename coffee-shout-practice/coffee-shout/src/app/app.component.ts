import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

const apiUrl = 'http://localhost:5000';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username = '';
  password = '';
  token = null;
  date = '';
  time = '';
  venue = '';
  isShown: boolean = false;

  constructor(private http: HttpClient){ }
  
  login() {
    if (this.username === '') {
      return;
    }

    if (this.password === '') {
      return;
    }

    this.http.post<{token: string}>(apiUrl + '/login', {username: this.username, password: this.password, observe: 'response'})
      .subscribe((body)=> {
        this.token = body.token;
      })

    this.isShown = true;

    console.log("logged in");
  }

  register() {
    if (this.username === '') {
      return;
    }

    if (this.password === '') {
      return;
    }

    this.http.post<{token: string}>(apiUrl + '/register', {username: this.username, password: this.password, observe: 'response'});

    console.log("registered");
  }

  save() {
    if (this.date === '') {
      return;
    }

    if (this.time === '') {
      return;
    }

    if (this.venue == '') {
      return;
    }

    this.http.post<{token: string}>(apiUrl + '/save', {date: this.date, time: this.time, venue: this.venue});

    console.log("saved");
  }
}

