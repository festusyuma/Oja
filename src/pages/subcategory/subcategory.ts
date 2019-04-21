import { Component } from '@angular/core';
import {  NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { CategoryProductPage } from "../category-product/category-product";
import { CartPage } from "../cart/cart";
import { DetailPage } from "../detail/detail";
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/**
 * Generated class for the SubcategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-subcategory',
  templateUrl: 'subcategory.html',
})
export class SubcategoryPage {
  [x: string]: any;
  cart_arr=Array();
  parent="";
  sid="";
  num="";
  card_arr=Array();
  row_arr;
  
  row_slide;
  shop = "";
  category = "";
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl:LoadingController,
    public storage: Storage, 
    public http: Http, 
    public alertCtrl: AlertController) {
      this.init();
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubCategoryPage');

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
  



    // console.log("=============>"+this.navParams.get("parent"));
    this.parent=this.navParams.get("parent");
    this.sid=this.navParams.get("sid");
    
    

    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      spinner: 'dots'
    });
  
    loading.present();

  var link: string = "http://www.hinzappz.com/OJA/testing/chkInfo.php?page=SubCat&sid="+this.sid+"&parent="+this.parent;

  console.log(link);
  this.http.get(link).map(res => res.json()).subscribe(data => {
    console.log(data); // data received by server
    if (data["STATUS"] == 1) {
      // this.presentAlert(data["MESSAGE"]);
      // this.navCtrl.setRoot(LoginPage);
      // this.card_arr = data["ALL_RECORDS"];
      if (!this.row_slide) {
        this.row_slide = [];
      }


      for(let i = 0;i<data["ALL_RECORDS"].length;i++){
         if(data["ALL_RECORDS"][i].slide_list=="slide"){
             console.log("slide=====");
             this.row_slide.push(data["ALL_RECORDS"][i]);
         }else{
          console.log("list=====");
            this.card_arr.push(data["ALL_RECORDS"][i]);

         }
      }


      

      let rowNum = 0; //counter to iterate over the rows in the grid
      //initial empty array
      if (!this.row_arr) {
        this.row_arr = [];
      }

      for (let i = 0; i < this.card_arr.length; i += 2) { //iterate images
        this.row_arr[rowNum] = Array(2); //declare two elements per row

        if (this.card_arr[i]) { //check file URI exists
          console.log("this.card_arr[i].slide_list========"+this.card_arr[i].slide_list);

            this.row_arr[rowNum][0] = this.card_arr[i] ;//insert image
          
          
        }

        if (this.card_arr[i + 1]) { //repeat for the second image
          console.log("this.card_arr[i+1].slide_list========"+this.card_arr[i+1].slide_list);

            this.row_arr[rowNum][1] = this.card_arr[i + 1];
          

          
        }

        rowNum++; //go on to the next row
      }

      console.log("this.row_arr====>" + this.row_arr);
      console.log("this.row_slide====>" + this.row_slide);
      // console.log("this.row_arr[0][0].img====>" + this.row_arr[0][0].img);
      // console.log("this.row_arr[0][1].img====>" + this.row_arr[0][1].img);

    } else {
      this.presentAlert(data["MESSAGE"]);

    }
    loading.dismiss();
  });






}


  goProduct(msid, mparent, mitem) {
    console.log(msid + mparent + mitem);
    this.navCtrl.push(CategoryProductPage, { "sid": msid, "parent": mparent, "item": mitem });

  }

  presentAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Note!!',
      subTitle: msg,
      buttons: ['Dismiss']
    });
    alert.present();
  }



}