import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { CartPage } from '../cart/cart';
import { MarketCategoriesPage } from '../market-categories/market-categories';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the SelMarketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-sel-market',
  templateUrl: 'sel-market.html',
})
export class SelMarketPage {

  cart_arr=Array();
  card_arr=Array();

  constructor(public http: Http,public navCtrl: NavController, public navParams: NavParams,public storage: Storage, public alertCtrl: AlertController ) {
     this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelMarketPage');
    this.init();
  }
  mySlideOptions = {
    initialSlide: 1,
    loop: true,
    autoplay: 5800,
    pager: true
  }

  goSuper(){
    this.navCtrl.push(MarketCategoriesPage,{"page":"super"});
  }

  goGuest(){
    this.navCtrl.push(MarketCategoriesPage,{"page":"guest"});

  }

  init(){
    this.storage.get('cart').then((val) => {
  
      if (val!=null){
        this.cart_arr=val;  
        console.log('Cart!=null is', val);
        if(val==''){
          var new_arr=Array();
          this.storage.set('cart',new_arr);
          console.log('Cart!=newarr is', val);
        }


      }else{
        this.storage.set('cart',this.cart_arr);
        console.log('Null Cart is', val);
      } 


    
    });




    var link: string = "https://hinzappz.com/OJA/checkShop.php";

    console.log(link);
    this.http.get(link).map(res => res.json()).subscribe(data => {
      console.log(data); // data received by server
      if (data["STATUS"] == 1) {
        // this.presentAlert(data["MESSAGE"]);
        // this.navCtrl.setRoot(LoginPage);
        this.card_arr = data["ALL_RECORDS"];

  
      } else {
        this.presentAlert(data["MESSAGE"]);
  
      }



     });
  }


  GoChart(){
    this.navCtrl.push(CartPage);
  }

  presentAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Note!!',
      subTitle: msg,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  goShop(sid){
    if(sid=="5"){
      this.goGuest();
    }else if(sid=="6"){
      this.goSuper();
    }
  }

}
