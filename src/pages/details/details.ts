import { ITEMS } from './../../Models/items';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  itemId : number
  Item : any
  items : any [] = ITEMS
  constructor(public navCtrl: NavController, 
    // private socialSharing : SocialSharing,
    public navParams: NavParams) {
    this.itemId = this.navParams.get('itemId')
    this.Item = this.items.filter(item => item.id == this.itemId)
    console.log("item : ",this.Item[0].name);
    
  }

  // share(){
  //   this.socialSharing.share("Check this item:  " + this.itemId, this.Item[0].name, this.Item[0].details,"demoapp://home/items/"+this.itemId)
  //   .then(() => {
  //     console.log("share success");
  //   })
  //   .catch(() => {
  //     console.log("share success");
  //   });
  // }

}
