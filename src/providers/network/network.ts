import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network/ngx';



@Injectable()
export class NetworkProvider {



constructor(public toast:ToastController, private network: Network) {
  this.network.onConnect().subscribe(()=>{
    this.toast.create({
      message: 'Network Connected',
      duration: 3000
    }).present();
  });
  this.network.onDisconnect().subscribe(() => {
    this.toast.create({
      message: 'Network Disconnected',
      duration: 3000
    }).present();
  });
 }

}