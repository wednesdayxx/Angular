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

  constructor(private http: HttpClient){ }

  login() {
    if (this.username === '') {
      return;
    }

    if (this.password === '') {
      return;
    }

    this.http.post<{token: string}>(apiUrl + '/login', {username: this.username, password: this.password})
      .subscribe((body)=> {
        this.token = body.token;
      })
  }

  register() {
    if (this.username === '') {
      return;
    }

    if (this.password === '') {
      return;
    }

    this.http.post<{token: string}>(apiUrl + '/register', {username: this.username, password: this.password});

  }
}

