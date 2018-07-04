import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  private mail: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth : AuthProvider, public afDB: AngularFireDatabase) {
    console.log("Constructor Profile")
    this.mail = afDB.database.app.auth().currentUser.email;
  }

  private cerrarSesion() {
    this.auth.logout();
  }
}
