import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'coffee-shout';

  constructor(private db: AngularFirestore) {
    const users = db.collection('users').get();
    users.subscribe((userCollection) => {
      userCollection.docs
      console.log(userCollection.docs);
    });
  }

}
