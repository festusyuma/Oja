import { Component } from '@angular/core';
import {  NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { CategoryProductPage  } from '../category-product/category-product';
import { Storage } from '@ionic/storage';

import { DetailPage } from '../detail/detail';

import { CartPage } from '../cart/cart';
import { SubcategoryPage } from "../subcategory/subcategory";
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

 
@Component({
  selector: 'page-market-categories',
  templateUrl: 'market-categories.html',
})
export class MarketCategoriesPage {
  mpage="";
  cart_arr=Array();
  card_arr;
  row_arr;
  shop="";
  category="";
  sid=-1;
 

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage, 
    public http: Http, public loadingCtrl: LoadingController, public alertCtrl: AlertController ) {
  this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MarketCategoriesPage');
  }


init(){
  this.mpage=this.navParams.get('page');
  if(this.mpage=="super"){
    this.sid=6;
  }else if(this.mpage=="guest"){
    this.sid=5;
  }



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

  let loading = this.loadingCtrl.create({
    content: 'Please wait...',
    spinner: 'dots'
  });

  loading.present();


  var link: string = "http://www.hinzappz.com/OJA/testing/chkInfo.php?page=MarkCat&sid="+this.sid;

  console.log(link);
  this.http.get(link).map(res => res.json()).subscribe(data => {
    console.log(data); // data received by server
    if (data["STATUS"] == 1) {
      // this.presentAlert(data["MESSAGE"]);
      // this.navCtrl.setRoot(LoginPage);
      this.card_arr = data["ALL_RECORDS"];

      // let rowNum = 0; //counter to iterate over the rows in the grid
      // //initial empty array
      // if (!this.row_arr) {
      //   this.row_arr = [];
      // }
      // for (let i = 0; i < this.card_arr.length; i += 2) { //iterate images
      //   this.row_arr[rowNum] = Array(2); //declare two elements per row

      //   if (this.card_arr[i]) { //check file URI exists
      //     this.row_arr[rowNum][0] = this.card_arr[i] //insert image
      //   }

      //   if (this.card_arr[i + 1]) { //repeat for the second image
      //     this.row_arr[rowNum][1] = this.card_arr[i + 1]
      //   }

      //   rowNum++; //go on to the next row
      // }

      // console.log("this.row_arr====>" + this.row_arr);

    } else {
      this.presentAlert(data["MESSAGE"]);

    }
    loading.dismiss();
  });


}


  presentAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Note!!',
      subTitle: msg,
      buttons: ['Dismiss']
    });
    alert.present();
  }

goSubCat(cat){
this.navCtrl.push(SubcategoryPage,{"parent":cat,"sid":this.sid});
}



GoChart(){
  this.navCtrl.push(CartPage);
}




}
