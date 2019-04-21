import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import { SubcategoryPage } from "../subcategory/subcategory";
import 'rxjs/add/operator/map';
import { CartPage } from '../cart/cart';
import { Storage } from '@ionic/storage';
import { DetailPage } from '../detail/detail';




@Component({
  selector: 'page-category-product',
  templateUrl: 'category-product.html',
})
export class CategoryProductPage {


  shop="";
  category="";
  num="";
  row_arr=Array();
  card_arr=Array();
  descending: any;
  order: number;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController,
    public http:Http,public storage: Storage, 
    private toastCtrl: ToastController) {


      this.init();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryProductPage');
  }


  init(){
    this.shop=this.navParams.get('sid');
    this.category=this.navParams.get('parent');
    this.num=this.navParams.get('item');


    this.storage.get('cart').then((val) => {
  
      if (val!=null){
        this.row_arr=val;  
        console.log('Cart!=null is', val);
        if(val==''){
          var new_arr=Array();
          this.storage.set('cart',new_arr);
          console.log('Cart!=newarr is', val);
        }
  
  
      }else{
        this.storage.set('cart',this.row_arr);
        console.log('Null Cart is', val);
      } 
  
  
    
    });






    var link:string="https://hinzappz.com/OJA/chkPd_ShopCat.php?shop="+this.shop+"&cat="+this.category+"&num="+this.num;

    console.log(link);
    this.http.get(link).map(res => res.json()).subscribe(data => {

        if(data["STATUS"]==1){

          console.log(data["ALL_RECORDS"]); // data received by server         
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
          console.log("this.row_arr[]0]====>"+this.row_arr[0]);
          console.log("this.row_arr====>[1]"+this.row_arr[1]);






        }else{
          this.presentAlert(data["MESSAGE"]);

        }
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

  GoChart(){
    this.navCtrl.push(CartPage);
  }


  goDetail(item){
    console.log(item);
    this.navCtrl.push(DetailPage,{item_arr:item});
  }

  sort() {
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }  


}

