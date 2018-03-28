import { ITEMS } from './../../Models/items';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  Items : any [] = ITEMS
  constructor(public navCtrl: NavController, public navParams: NavParams) {
 
  }

  details(item){
    this.navCtrl.push('DetailsPage',{itemId : item.id})
  }

}
