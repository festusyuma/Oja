import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController,LoadingController } from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { DetailPage } from '../detail/detail';
import { Storage } from '@ionic/storage';
import { CartPage } from '../cart/cart';




@Component({
  selector: 'page-guest',
  templateUrl: 'guest.html',
})
export class GuestPage {

  row_arr;
  card_arr;
  cart_arr=Array();

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private alertCtrl: AlertController,public loadingCtrl: LoadingController,
    public http:Http,public storage: Storage) {
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GuestPage');
  }


  init(){
    this.storage.get('cart').then((val) => {
      console.log('Cart is', val);
      this.cart_arr=val;

     
    });


    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      spinner: 'dots'
    });
  
    loading.present();

    var link:string="https://hinzappz.com/OJA/products_enq.php?enq=2";

      console.log(link);
      this.http.get(link).map(res => res.json()).subscribe(data => {
          console.log(data); // data received by server
          if(data["STATUS"]==1){
            // this.presentAlert(data["MESSAGE"]);
            // this.navCtrl.setRoot(LoginPage);
            this.card_arr=data["ALL_RECORDS"];
            let rowNum = 0; //counter to iterate over the rows in the grid
            //initial empty array
            if (!this.row_arr) {
              this.row_arr= [];
            }
            for (let i = 0; i < this.card_arr.length; i+=2) { //iterate images
              this.row_arr[rowNum] = Array(2); //declare two elements per row
  
              if (this.card_arr[i]) { //check file URI exists
                this.row_arr[rowNum][0] = this.card_arr[i] //insert image
              }
  
              if (this.card_arr[i+1]) { //repeat for the second image
                this.row_arr[rowNum][1] = this.card_arr[i+1]
              }
  
              rowNum++; //go on to the next row
            }

            console.log("this.row_arr====>"+this.row_arr);

          }else{
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

  goDetail(item){
    console.log(item);
    this.navCtrl.push(DetailPage,{item_arr:item});
  }

  GoChart(){
    this.navCtrl.push(CartPage);
  }

}
