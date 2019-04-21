import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController,LoadingController  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as external from '../../assets/data/external';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { LoginPage } from '../login/login';
import { CurrencyPipe } from '@angular/common';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



declare var payWithPaystack: any;
declare var order_arr: any;

declare var order_prefix: any;


@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  m_destination="Please choose!";
  cart_arr;
  billNoSurcharge=0;
  billtotal=0;
  new_arr=[];
  billPayPal='';
  paymoney;
  m_info={email:"",cid:"",add:"",name:""};
  mref;
  need_detail=false;
  des_chosen=false;
  surcharge=300;
  avai_qty=0;
  stock_ok=true;
  pids="";
  re_qtys=""; 



  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storage: Storage, private currencyPipe: CurrencyPipe,public loadingCtrl: LoadingController,
    public http:Http,private alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    this.init();
    this.getDate();
  }

  delItem(num){
    console.log(num);
    for(let i=0; i < this.cart_arr.length; i++){ // n is array.length
     console.log(this.cart_arr[i]);
     if(num!=i){
       this.new_arr.push(this.cart_arr[i]);
     }
     console.log(this.new_arr);

    }
    this.storage.set('cart', this.new_arr);   
    this.navCtrl.setRoot(this.navCtrl.getActive().component);


 }



init(){
  this.storage.get('user').then((val) => {
    console.log('user', val);
    this.m_info.email=val.email;
    this.m_info.cid=val.cid;
    this.m_info.name=val.name;

  });

  this.storage.get('cart').then((val) => {
    console.log('Cart is', val);
    this.cart_arr=val;
    
    for(let i=0; i < val.length; i++){ // n is array.length
      console.log("==========="+val[i]);
      this.chkQty(this.cart_arr[i]);
      
      if(i==val.length-1){
        this.pids=this.pids+val[i].pid;
        this.re_qtys=this.re_qtys+val[i].qty;
      }else{
        this.pids=this.pids+val[i].pid+",";
        this.re_qtys=this.re_qtys+val[i].qty+",";
      }





      this.billNoSurcharge=this.billNoSurcharge+val[i].total;
      // this.billtotal=this.billtotal+val[i].total;
      this.billtotal=this.billNoSurcharge;

   }     
   console.log("billNoSurcharge======"+this.billNoSurcharge);
   
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


  // presentToast() {
  //   let toast = this.toastCtrl.create({
  //     message: 'User was added successfully',
  //     duration: 3000,
  //     position: 'top'
  //   });
  
  //   toast.onDidDismiss(() => {
  //     console.log('Dismissed toast');
  //   });
  
  //   toast.present();
  // }


  goOrder(){


      if(this.stock_ok){


            if (this.cart_arr!=null){
            
              order_arr=this.cart_arr;

            if(!this.des_chosen){
              this.presentAlert("Please choose delivery location!!");
            }else{
                if(this.m_info.add==''){
                  this.presentAlert("Please input delivery address!!");
                }else{

                  this.chkFinalStock();


                }
              
            }

              
            }else{
              this.presentAlert("Nothing in the cart!!");
            }

          }else{
            this.presentAlert("Some products out of stock now!! Please delete it thank you!");
          }

  }


  chkFinalStock(){

    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      spinner: 'dots' 
    });
  
    loading.present();

    var link:string="https://hinzappz.com/OJA/checkFinalQty.php?pid="+this.pids+"&re_qty="+this.re_qtys;
    console.log(link);

    this.http.get(link).map(res => res.json()).subscribe(data => {
            console.log(data); // data received by server

            if(data["STATUS"]==1){
              this.getRefNum();


            }else if(data["STATUS"]==2){
              this.stock_ok=false;
              this.presentAlert(data["MESSAGE"]);
              this.navCtrl.setRoot(this.navCtrl.getActive().component);

            }else{
              this.presentAlert(data["MESSAGE"]);
            }


        loading.dismiss();

    });

             




  }








  getRefNum(){
      if(this.m_info.cid==null||this.m_info.cid==''){
        this.navCtrl.setRoot(LoginPage);
      }else{
        var link:string="https://hinzappz.com/OJA/getRefNo.php?cid="+this.m_info.cid;
        // console.log(link);
        this.http.get(link).map(res => res.json()).subscribe(data => {
            console.log(data); // data received by server
            if(data["STATUS"]==1){
              console.log(data["MESSAGE"]);
              this.mref=data["MESSAGE"];
              var ref=data["MESSAGE"]+"";
              order_prefix=this.getDate();
              console.log('getRefNum/order_ref=======',this.mref);
              this.storage.set('order_ref',this.mref);
              payWithPaystack(this.m_info,this.billtotal*100,ref);
              
            }else{
              this.presentAlert(data["MESSAGE"]);
            }
        });
      }
  }





getDate(){
  var mprefix="";
  var dateObj=new Date();
  var yr=dateObj.getFullYear()+"";
  var getmth=dateObj.getMonth()+1;
  var mth="";
  var day="";
  if(getmth<10){
    mth="0"+getmth;
  }else{
    mth=getmth.toString();
  }
  var getday=dateObj.getDate();
  if(getday<10){
     day="0"+getday;
  }else{
    day=getday.toString();
  }


 //  console.log("date------"+yr+mth+day);
 mprefix=yr+mth+day;

 return mprefix;

}


recordDes(quantity){
  this.des_chosen=true;
  if(quantity==1){
    this.m_destination="Babcock Super Store";
    this.need_detail=false;
    this.m_info.add="Babcock Super Store";
    this.billtotal=this.billNoSurcharge;
  }else if(quantity==2){
    this.m_destination="Guest House";
    this.need_detail=false;
    this.m_info.add="Guest House";
    this.billtotal=this.billNoSurcharge;
  }else if(quantity==3){
    this.m_destination="Please input the details";
    this.need_detail=true;
    this.m_info.add="";
    this.billtotal=this.billNoSurcharge+300;
  }
}


input_des(){
   if(this.need_detail){
this.presentPrompt(); 
   }
}

presentPrompt() {
  let alert = this.alertCtrl.create({
    title: 'Delivery address',
    inputs: [
      {
        name: 'add',
        placeholder: 'Input here!!'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Add',
        handler: data => {
          console.log('============'+data.add );
          this.m_info.add=data.add;
          



          
        }
      }
    ]
  });
  alert.present();
}



chkQty(obj){
  var avai_qty=0;
  let loading = this.loadingCtrl.create({
    content: 'Please wait...',
    spinner: 'dots'
  });

  loading.present();

  var link:string="https://hinzappz.com/OJA/checkProductQty.php?pid="+obj.pid;

    console.log(link);
    this.http.get(link).map(res => res.json()).subscribe(data => {
        console.log(data); // data received by server
        if(data["STATUS"]==1){

          obj["avai_qty"]=data["ALL_RECORDS"][0].avai_qty;
          console.log("chkQty()/obj.avai_qty====="+obj.avai_qty);     
          if(obj.avai_qty<obj.qty){
            if(this.stock_ok){
              this.stock_ok=false;
            }
            
          }


        }else{
          this.presentAlert(data["MESSAGE"]);


        }


        loading.dismiss();

    });

    console.log("this.avai_qty===="+this.avai_qty);
    return avai_qty;
} 




}
