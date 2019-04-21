import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the StockGuestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-stock-guest',
  templateUrl: 'stock-guest.html',
})
export class StockGuestPage {

  stock_arr=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,private alertCtrl: AlertController) {
  this.init();
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockGuestPage');
  }

  init(){
    var link:string="https://hinzappz.com/OJA/checkStock.php?shop='guest'";
  
    // console.log(link);
    this.http.get(link).map(res => res.json()).subscribe(data => {
      console.log(data); // data received by server
      if(data["STATUS"]==1){
        // this.presentAlert(data["MESSAGE"]);
        console.log("========"+data["ALL_RECORDS"]);
        this.stock_arr=data["ALL_RECORDS"];
       for (var i=0;i<data["ALL_RECORDS"].length;i++){
           if(data["ALL_RECORDS"][i].stock_qty-data["ALL_RECORDS"][i].order_qty<10){
            this.stock_arr[i]["shorting"]=true; 
           }else{
            this.stock_arr[i]["shorting"]=false; 
           }
       }

       console.log(this.stock_arr);



      }
    });
  }




  changeQty(pid){
    this.presentPrompt(pid);   
  }



  presentPrompt(pid) {
    let alert = this.alertCtrl.create({
      title: 'Change Stock Qty!!',
      inputs: [
        {
          name: 'qty',
          placeholder: 'Input update qty!!'
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
          text: 'Change',
          handler: data => {
            console.log('============'+isNaN(data.qty) );
            if(isNaN(data.qty)||data.qty==''){
              this.presentAlert("Please input a number");
              
            }else{
              

              var link:string="https://hinzappz.com/OJA/stock_update.php?pid="+pid+"&stock_qty="+data.qty;
  
              // console.log(link);
              this.http.get(link).map(res => res.json()).subscribe(data => {
                  console.log(data); // data received by server
                  if(data["STATUS"]==1){
                    // this.presentAlert(data["MESSAGE"]);
                    console.log("========"+data["ALL_RECORDS"]);
                    this.navCtrl.setRoot(StockGuestPage);
               
          
                  }
              });


            }
            



            
          }
        }
      ]
    });
    alert.present();
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
