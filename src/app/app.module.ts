import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { CartPage } from '../pages/cart/cart';
import { FinishPage } from '../pages/finish/finish';
import { GuestPage } from '../pages/guest/guest';
import { LoginPage } from '../pages/login/login';
import { PickupPage } from '../pages/pickup/pickup';
import { RegPage } from '../pages/reg/reg';
import { SelMarketPage } from '../pages/sel-market/sel-market';
import { SuperMarketPage } from '../pages/super-market/super-market';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { DetailPage } from '../pages/detail/detail';
import { MarketCategoriesPage } from '../pages/market-categories/market-categories'
import { CategoryProductPage } from '../pages/category-product/category-product';

import { SubcategoryPage } from "../pages/subcategory/subcategory";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';
//for sqlite
import { IonicStorageModule } from '@ionic/storage';
import { HistoryPage } from '../pages/history/history';
import { MapPage } from '../pages/map/map';
import { AboutusPage } from '../pages/aboutus/aboutus';

import { CurrencyPipe } from '@angular/common';
import { SearchPipe } from '../pipes/search/search';
import { SortPipe } from '../pipes/sort/sort'
import { PipesModule } from "../pipes/pipes.module";
import { AccordionComponent } from "../components/accordion/accordion";
import { TimelineComponent } from "../components/timeline/timeline";
//import { TimelineTimeComponent } from '../components/timeline/timeline';
import { TimelineItemComponent } from '../components/timeline/timeline';
import { ComponentsModule } from "../components/components.module";

import { Broadcaster } from '@ionic-native/broadcaster';
import { Device } from '@ionic-native/device';

import { Network } from '@ionic-native/network/ngx';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CartPage,
    FinishPage,
    GuestPage,
    LoginPage,
    PickupPage,
    RegPage,
    SelMarketPage,
    SuperMarketPage,
    MarketCategoriesPage,
    CategoryProductPage,
    ListPage,
    DetailPage,
    MapPage,
    AboutusPage,
    SubcategoryPage,
    HistoryPage,
    SortPipe,
    SearchPipe,
    AccordionComponent,
    TimelineComponent,
      TimelineItemComponent,
      //TimelineTimeComponent
  ],
  imports: [
    // add HttpModule
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    //sqlite
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CartPage,
    FinishPage,
    GuestPage,
    LoginPage,
    PickupPage,
    RegPage,
    SelMarketPage,
    SuperMarketPage,
    MarketCategoriesPage,
      CategoryProductPage,

    SubcategoryPage,
    ListPage,
    DetailPage,
    MapPage,
    AboutusPage,
    HistoryPage
  ],
  providers: [
    Device,
    Broadcaster,
    CurrencyPipe,
    SearchPipe,
    SortPipe,
    PipesModule,
    ComponentsModule,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Network,
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {}
