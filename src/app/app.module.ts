// Import Angular plugin.
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, Location, PathLocationStrategy } from '@angular/common';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { HeaderComponent } from './header/header.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShopComponent } from './shop/shop.component';
import { CartComponent } from './cart/cart.component';
import { OrderCompleteComponent } from './order-complete/order-complete.component';
import { OrderOverviewComponent } from './order-overview/order-overview.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { BlogComponent } from './blog/blog.component';
import { HttpClientModule } from '@angular/common/http';
import { PopupDetailComponent } from './popup-detail/popup-detail.component';
import { CartPopupComponent } from './cart-popup/cart-popup.component';
import { ProductListComponent } from './product-list/product-list.component';
import { PromoProductRowComponent } from './promo-product-row/promo-product-row.component';
import { CardOnMenuBoxComponent } from './card-on-menu-box/card-on-menu-box.component';
import { ProductByCategorieComponent } from './product-by-categorie/product-by-categorie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserAccountComponent } from './user-account/user-account.component';
import { AlertBoxeComponent } from './alert-boxe/alert-boxe.component';
import { VideoComponent } from './video/video.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { WhatssapChatComponent } from './whatssap-chat/whatssap-chat.component';
import { ForumComponent } from './forum/forum.component';
import { ForumPageComponent } from './forum-page/forum-page.component';
import { SujetComponent } from './sujet/sujet.component';
import { DiscussionComponent } from './discussion/discussion.component';


@NgModule({
  declarations: [
    AppComponent,
    AcceuilComponent,
    HeaderComponent,
    SidemenuComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ShopComponent,
    CartComponent,
    OrderCompleteComponent,
    OrderOverviewComponent,
    PaymentComponent,
    ProductPageComponent,
    CheckoutComponent,
    ContactComponent,
    BlogComponent,
    PopupDetailComponent,
    CartPopupComponent,
    ProductListComponent,
    PromoProductRowComponent,
    CardOnMenuBoxComponent,
    ProductByCategorieComponent,
    UserAccountComponent,
    AlertBoxeComponent,
    VideoComponent,
    SearchResultComponent,
    WhatssapChatComponent,
    ForumComponent,
    ForumPageComponent,
    SujetComponent,
    DiscussionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    YouTubePlayerModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  providers: [
    SearchResultComponent,
    Location, { provide: LocationStrategy, useClass:PathLocationStrategy,  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
