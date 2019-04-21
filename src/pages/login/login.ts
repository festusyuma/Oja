import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { RegPage } from '../reg/reg';
import { SelMarketPage } from '../sel-market/sel-market';

import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { HistoryPage } from '../history/history';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var justFinishPayment: any;


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public backgroundImage = 'assets/imgs/backgroundlogo.jpg';

  m_info={email:"",cid:"",name:""};
  m_pass="";
  isHistory=false;
  ismenu=false;
  justOrderRef=-1;
  issavepass=false;


  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController,
    public http:Http,public storage: Storage, 
    private toastCtrl: ToastController, public loadingCtrl: LoadingController) {
      
      // this.repeatDo(1000);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.init();
    this.chkExpireTime();
  }

  ionViewWillEnter(){
    
  }


  init(){


    console.log("justFinishPayment====="+justFinishPayment);
    this.storage.get('order_ref').then((val) => {
  
      if (val==null||val==-1){
        console.log('order_ref set====', val);   
        this.storage.set('order_ref',-1);


      }else{
        this.justOrderRef=val;
        console.log('order_ref is======', val);
        this.isOrderWithRef(val);



      } 
    });






    this.storage.get('user').then((val) => {
  
      if (val!=null){

        if(val.email!=''){
          this.m_info.email=val.email;  
          this.m_info.cid=val.cid;  
          this.m_info.name=val.name;  
          console.log('user!=null is', val);
        }
      }else{
        this.storage.set('user',this.m_info);
        console.log('Null user is', val);
      } 
    });



    this.storage.get('issavepass').then((val) => {
  
      if (val!=null&&val==true){

        this.issavepass=true;
        this.storage.get('m_pass').then((val) => {
          this.m_pass=val;
        });
        console.log('pass is', val);
      }else{
        this.storage.set('issavepass',false);
        console.log('issavepass is', val);
      } 
    });






  }


  savePass(){
    this.storage.set('issavepass',true);
    this.storage.set('m_pass',this.m_pass);
    console.log("=====savePass()");
  }



  login(){

   if(this.m_info.email==""||this.m_info.email==""){
    this.presentAlert("Please input email and password!!");
    
   }else{
    
    var link:string="https://hinzappz.com/OJA/login.php?email="+this.m_info.email+"&pass="
    +this.m_pass;

      // console.log(link);
      this.http.get(link).map(res => res.json()).subscribe(data => {
          console.log(data); // data received by server
          if(data["STATUS"]==1){
            // this.presentAlert(data["MESSAGE"]);
            this.m_info.cid=data["ALL_RECORDS"][0].cid;
            this.m_info.name=data["ALL_RECORDS"][0].name;
            this.storage.set('user',this.m_info);
            var currenttime=new Date().getTime();
            this.storage.set('login_time',currenttime);
            this.navCtrl.setRoot(SelMarketPage);
            console.log(this.m_info);
            this.storage.set('order_ref',-1);
          }else{
            this.presentAlert(data["MESSAGE"]);

          }
      });
     let loading = this.loadingCtrl.create({
       content: 'Please wait...',
       spinner: 'dots',
       duration: 3000
     });

     loading.present();


   }





  }

  reg(){
    this.navCtrl.setRoot(RegPage);
  }


  presentAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Note!!',
      subTitle: msg,
      buttons: ['Dismiss']
    });
    alert.present();
  }



  presentConfirm(msg1,msg2) {
    let alert = this.alertCtrl.create({
      title: msg1,
      message: msg2,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.navCtrl.setRoot(SelMarketPage);
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            console.log('logout clicked');
            this.storage.set('login_time',0);
            this.m_info.cid="";
            this.storage.set('user',this.m_info);
            this.presentToast("Logout sucessfully!!!");
            this.navCtrl.setRoot(LoginPage);

          }
        }
      ]
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




  isOrderWithRef(ref){
    
    
    var link:string="https://hinzappz.com/OJA/isOrderWithRef.php?ref="+ref;

    console.log(link);
    this.http.get(link).map(res => res.json()).subscribe(data => {
        console.log(data); // data received by server
        if(data["STATUS"]==1){
          
          this.storage.set('cart',[]);

          this.navCtrl.setRoot(HistoryPage); 
          this.presentAlert("Thanks for your order! The goods are shown in the order history!!");
          this.storage.set('order_ref',-1);
          
          
        }
    });



  }



chkExpireTime(){
  this.storage.get('login_time').then((val) => {
      
    var currenttime=new Date().getTime();
    var diff=currenttime-val;
    var diffSec=diff/1000;
    console.log('login_time', val);
    console.log('currenttime', currenttime);
    // console.log(diff);
    console.log('diffSec',diffSec);

    //600S =10min
    if (diffSec<=600){
      if(this.justOrderRef==-1){
        this.presentConfirm("Pay attention!!!","Log out? You are currently logging in, confirm to log out???");
      }
      this.justOrderRef=-1;
      
    }
  });
}






// ,LoadingController
// let loader = this.loader.create({
//   content: "Loading...",

// });
// loader.present(); 
// loader.dismiss();





// let TIME_IN_MS = 5000;
// let hideFooterTimeout = setTimeout( () => {
//      // somecode
// }, TIME_IN_MS);


repeatDo(time){
//   let TIME_IN_MS = time;
// let hideFooterTimeout = setTimeout( () => {
//      // somecode
//      console.log("repeatDo function");
// }, TIME_IN_MS);


setInterval(()=> {
  console.log("repeatDo function");
  },time); 
}





}
