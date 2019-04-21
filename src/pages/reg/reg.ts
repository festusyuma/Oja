import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';


import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the RegPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-reg',
  templateUrl: 'reg.html',
})
export class RegPage {
  m_info={email:"",pass:"",phone:"",repass:"",name:""};
  withemail=1; 
  name;
  
  formgroup:FormGroup;
  m_email:AbstractControl;
  m_repass:AbstractControl;
  m_name:AbstractControl;
  m_phone:AbstractControl;
  m_pass:AbstractControl;
    nav: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController,
    public http:Http,public storage: Storage,public formbuilder:FormBuilder) {

      this.formgroup= formbuilder.group({
        m_email: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        m_name: ['',Validators.compose([Validators.maxLength(30),  Validators.required])],
        m_phone: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('^(0|[1-9][0-9]*)$'), Validators.required])],
        m_pass: ['',Validators.compose([Validators.maxLength(10), Validators.minLength(6),Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        m_repass: ['',Validators.compose([Validators.maxLength(10), Validators.minLength(6), Validators.pattern('[a-zA-Z ]*'), Validators.required])]

     });

     this.m_email=this.formgroup.controls['m_email'];
     this.m_name=this.formgroup.controls['m_name'];
     this.m_phone=this.formgroup.controls['m_phone'];
     this.m_pass=this.formgroup.controls['m_pass'];
     this.m_repass=this.formgroup.controls['m_repass'];






  // pattern="[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})"


      // console.log(this.name);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegPage');
  }

  register(){
    if(this.m_info.email!=""&&this.m_info.pass!=""&&this.m_info.repass!=""&&this.m_info.phone!=""&&this.m_info.name!=""){
        if(this.m_info.pass==this.m_info.repass){
             this.reg_server();
        }else{
          this.presentAlert("Password and Re-enter password does not match!! Please try again");
        }
    }else{
      this.presentAlert("Please input all!!");
    }
  }


  presentAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Note!!',
      subTitle: msg,
      buttons: ['Dismiss']
    });
    alert.present();
  }


  reg_server(){
    var link:string="https://hinzappz.com/OJA/reg.php?email="+this.m_info.email+"&phone="+this.m_info.phone+"&pass="
    +this.m_info.pass;

      console.log(link);
      this.http.get(link).map(res => res.json()).subscribe(data => {
          console.log(data); // data received by server
          if(data["STATUS"]==1){
            this.presentAlert(data["MESSAGE"]);
            this.storage.set('user', {email:"",cid:""});



            this.navCtrl.setRoot(LoginPage);

          }else{
            this.presentAlert(data["MESSAGE"]);
            // var link2:string="http://hinzappz.com/Isaliyana/reg.php?email="+this.m_info.email
            // +"&pass="+this.m_info.pass
            // +"&first_n="+this.m_info.first_n
            // +"&last_n="+this.m_info.last_n
            // +"&phone="+this.m_info.phone;

            // console.log(link2);
            // this.http.get(link2).map(res => res.json()).subscribe(data => {
            //       console.log(data); // data received by server
            //       if(data["STATUS"]==1){
            //         this.presentAlert('Sucess register!! ');
            //         this.navCtrl.setRoot(LoginPage);

            //       }else{
            //         this.presentAlert('Register not sucess please try later!! ');
            //       }
            // } );

          }
      });

    }



validate(){

}

login(){
  this.nav.setRoot(LoginPage)
}
goback(){
  this.navCtrl.pop();
}
}
