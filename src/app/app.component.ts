import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { timer } from 'rxjs/observable/timer';



import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CartPage } from '../pages/cart/cart';
import { FinishPage } from '../pages/finish/finish';
import { GuestPage } from '../pages/guest/guest';
import { LoginPage } from '../pages/login/login';
import { PickupPage } from '../pages/pickup/pickup';
import { RegPage } from '../pages/reg/reg';
import { SelMarketPage } from '../pages/sel-market/sel-market';
import { CategoryProductPage } from '../pages/category-product/category-product';
import { SuperMarketPage } from '../pages/super-market/super-market';
import { HistoryPage } from '../pages/history/history';
import { AboutusPage } from '../pages/aboutus/aboutus';
import { SubcategoryPage } from "../pages/subcategory/subcategory";
import { MarketCategoriesPage } from '../pages/market-categories/market-categories';




import { MapPage } from '../pages/map/map';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  icon: string;
  rootPage: any = LoginPage;
  // rootPage: any = HomePage;

  pages: Array<{title: string, component: any, icon:string }>;
  networkProvider: any;
 
  events: any;
  network: any;



  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, ) {
    this.initializeApp();
    

    // used for an example of ngFor and navigation
    this.pages = [
      // { title: 'Martet Selection', component: SelMarketPage },
      { title: 'Guest House', component: GuestPage, icon: 'home' },
      { title: 'Babcock Super Store', component: SuperMarketPage, icon: 'cart' },
      { title: 'Order History', component: HistoryPage, icon: 'list'  },
      { title: 'Shop position', component: MapPage, icon: 'map'  },
      { title: 'About OJA!!', component: AboutusPage, icon: 'bookmarks' },
      { title: 'Log out', component: LoginPage, icon: 'person' }

    ];

  }

  showSplash = true; 

  initializeApp() {
    this.platform.ready().then(() => {
     
  

        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        
      timer(3000).subscribe(() => this.showSplash = false)
        

      });

   
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

   console.log("page:"+page["title"] );
   if(page.title=="Guest House"){
    this.nav.setRoot(MarketCategoriesPage,{"page":"super"});
   }else if(page.title=="Babcock Super Store"){
    this.nav.setRoot(MarketCategoriesPage,{"page":"super"});
   } else{
    this.nav.setRoot(page.component);
   }


  }
}


