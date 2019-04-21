import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController, ToastController,LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CartPage } from '../cart/cart';
import { CurrencyPipe } from '@angular/common';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  
  stock_arr;
  item_arr;
  qty;
  mprice;
  cart_arr=Array();
  stock_qty;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController, private currencyPipe: CurrencyPipe,
    public loadingCtrl: LoadingController,public http:Http,
    private toastCtrl: ToastController,public storage: Storage) {
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  init(){
    this.item_arr=this.navParams.get('item_arr');
    this.stock_qty=this.item_arr.avai_qty;
    this.mprice=this.item_arr.price;
    this.storage.get('cart').then((val) => {
    console.log('Cart is', val);
    this.cart_arr=val;     
    });

    this.stock_qty=this.chkQty(this.item_arr.pid);
    


  }


  chkQty(pid){
    var link:string="https://hinzappz.com/OJA/checkProductQty.php?pid="+pid;

    console.log(link);
    this.http.get(link).map(res => res.json()).subscribe(data => {

        if(data["STATUS"]==1){

          console.log(data["ALL_RECORDS"]); // data received by server         
          this.stock_arr=data["ALL_RECORDS"];

          this.stock_qty=this.stock_arr[0].avai_qty;

        }else{
          this.presentAlert(data["MESSAGE"]);

        }
    });
  }






  recordQty(quantity){
    console.log(quantity);
    this.qty=quantity;
  }


    AddChart(item_arr){
        if(this.qty==""||this.qty==null){
            this.presentAlert('Please select quantity!');
            return;
      }

      var totalprice=this.qty*this.mprice;
     console.log("========"+this.getCurrency(this.qty*this.mprice));
      this.cart_arr.push({
        pid:item_arr.pid,
        title:item_arr.title,
        price:item_arr.price,
        qty:this.qty,
        img:item_arr.img,
        total:totalprice
      });
      
      this.storage.set('cart', this.cart_arr);

      this.presentToast('The items are added in the cart!'); 
    }

  presentAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Note!!',
      subTitle: msg,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle',
      cssClass: "toastClass"
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    
    toast.present();
  }


  GoChart(){
    this.navCtrl.push(CartPage);
  }

  getCurrency(amount: number) {
    return this.currencyPipe.transform(amount, 'EUR', true, '1.2-2');
  }

  toggleSection(i){
    this.item_arr[i].open = !this.item_arr[i].open;
  }

  toggleItem(i, j){
    this.item_arr[i].children[j].open = !this.item_arr[i].open;
  }
}
