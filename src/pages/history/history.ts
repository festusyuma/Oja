import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { CartPage } from '../cart/cart';
import { CurrencyPipe } from '@angular/common';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var justFinishPayment: any;


@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  justOrderRef;
  orderRef;
  order_arrs;
  card_arr;
  img_arr = [];
  cart_arr = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage, private currencyPipe: CurrencyPipe, public loadingCtrl: LoadingController,
    public http: Http, private alertCtrl: AlertController) {

    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

  init() {
    if (justFinishPayment) {
      this.storage.set('cart', []);
      justFinishPayment = false;
    }
    this.checkOrderStatus();

    this.storage.get('cart').then((val) => {

      if (val != null) {
        this.cart_arr = val;
        console.log('Cart!=null is', val);
        if (val == '') {
          var new_arr = Array();
          this.storage.set('cart', new_arr);
          console.log('Cart!=newarr is', val);
        }


      } else {
        this.storage.set('cart', this.cart_arr);
        console.log('Null Cart is', val);
      }



    });

  }

  checkOrderStatus() {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      spinner: 'dots'
    });
    loading.present();

    this.storage.get('user').then((val) => {

      var link: string = "https://hinzappz.com/OJA/checkOrder.php?cid=" + val.cid;

      console.log(link);
      this.http.get(link).map(res => res.json()).subscribe(data => {

        if (data["STATUS"] == 1) {

          this.order_arrs = data["ALL_RECORDS"];
          console.log(this.order_arrs); // data received by server        

          var rowNum = -1; //counter to iterate over the rows in the grid
          //initial empty array
          if (!this.card_arr) {
            this.card_arr = [];
            console.log("this.card_arr===" + this.card_arr);
          }


          var ref_no = -1;

          for (let i = 0; i < this.order_arrs.length; i++) { //iterate images



            var link: string = "https://hinzappz.com/OJA/check_img.php?pid=" + this.order_arrs[i].pid;

            // console.log(link);
            this.http.get(link).map(res => res.json()).subscribe(data => {
              console.log(data); // data received by server
              if (data["STATUS"] == 1) {
                // this.presentAlert(data["MESSAGE"]);
                // return data["ALL_RECORDS"][0].img;


                if (this.order_arrs[i]) { //check file URI exists
                  this.order_arrs[i].img = data["ALL_RECORDS"][0].img;


                  if (ref_no != this.order_arrs[i].reference) {
                    ref_no = this.order_arrs[i].reference;
                    rowNum++; //go on to the next row
                    console.log("go to new row");

                    if (!this.card_arr[rowNum]) {
                      this.card_arr[rowNum] = Array();

                    }
                    console.log("this.card_arr[rowNum]=" + this.card_arr[rowNum]);
                    console.log("this.card_arr===" + this.card_arr);
                    console.log("this.order_arrs[i]===" + this.order_arrs[i]);
                    this.card_arr[rowNum].push(this.order_arrs[i]);


                    // this.card_arr[rowNum][jj]=this.order_arrs[i];
                    console.log("this.card_arr===" + this.card_arr);

                  } else {
                    this.card_arr[rowNum].push(this.order_arrs[i]);
                  }

                }

              }
            });

            console.log("rowNum==========" + rowNum);
          }

          // console.log("final =========="+rowNum);



        }
      });

      console.log("CARD_ARR=====" + this.card_arr);

      // for(var i=0;i<this.card_arr.length;i++){
      //   console.log("CARD_ARR====="+this.card_arr[i]);
      // }


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


  getImg(pid) {

    var link: string = "https://hinzappz.com/OJA/check_img.php?pid=" + pid;

    // console.log(link);
    this.http.get(link).map(res => res.json()).subscribe(data => {
      console.log(data); // data received by server
      if (data["STATUS"] == 1) {
        // this.presentAlert(data["MESSAGE"]);
        return data["ALL_RECORDS"][0].img;

      }
    });



  }


  GoChart() {
    this.navCtrl.setRoot(CartPage);
  }

}
