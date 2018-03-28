import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Deeplinks } from '@ionic-native/deeplinks';
import { OneSignal } from '@ionic-native/onesignal';
import { ThrowStmt } from '@angular/compiler';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: string = 'HomePage';
  @ViewChild(Nav) nav: Nav;
  constructor(platform: Platform,
    statusBar: StatusBar,
    private onesignal : OneSignal,
    private alertCtrl : AlertController,
    public deeplinks: Deeplinks,
    splashScreen: SplashScreen) {
    platform.ready().then(() => {
      console.log("hello moo");
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //Deeplinks if from Ionic Native

      this.deeplinks.routeWithNavController(this.nav, {
        '/home': 'HomwPage',
        '/contact': 'AboutPage',
        '/items/:itemId': 'DetailsPage'
      }).subscribe((match) => {
        console.log('Successfully routed', match);
      }, (nomatch) => {
        console.log('Unmatched Route', nomatch);
      });
      this.checkPushNotification()
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }


  checkPushNotification() {
    this.onesignal.startInit('35d52799-ce34-4e2a-b95e-c33a78a62af4', '275067473370');
    this.onesignal.getIds().then(ids => {
      console.log("my device token is : ", ids.userId);
      // this.storage.set("device_token", ids.userId);
    });

    this.onesignal.inFocusDisplaying(this.onesignal.OSInFocusDisplayOption.Notification);
    this.onesignal.handleNotificationOpened()
      .subscribe(jsonData => {
        
        
        console.log('subtitle: ',jsonData.notification.payload['subtitle']);
        
        
        let alert = this.alertCtrl.create({
          title: jsonData.notification.payload.title,
          subTitle: jsonData.notification.payload.body,
          buttons: [{
            text: 'Save',
            handler: () => {
              this.test(jsonData.notification.payload.additionalData.itemId)
            }
          }]
        });
        alert.present()
        // console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      });
    this.onesignal.endInit();
  }

  test(itemId){
    console.log("kos");
    console.log("push data  :",itemId);
    this.nav.push('DetailsPage',{itemId : itemId})
    
  }

  ok(){
    this.nav.push('DetailsPage')
  }

}

