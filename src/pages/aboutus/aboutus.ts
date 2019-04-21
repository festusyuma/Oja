import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the AboutusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-aboutus',
  templateUrl: 'aboutus.html',
})
export class AboutusPage {
  cart_arr=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage) {
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutusPage');
  }


  init(){

    this.storage.get('cart').then((val) => {
    console.log('Cart is', val);
    this.cart_arr=val;     
    });

  }


}
