import { ForumPageComponent } from './forum-page/forum-page.component';
import { ForumComponent } from './forum/forum.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { VideoComponent } from './video/video.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { ShopComponent } from './shop/shop.component';
import { RegisterComponent } from './register/register.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderOverviewComponent } from './order-overview/order-overview.component';
import { OrderCompleteComponent } from './order-complete/order-complete.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { BlogComponent } from './blog/blog.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { FooterComponent } from './footer/footer.component';
import { SujetComponent } from './sujet/sujet.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


const routes: Routes = [
  { path: 'accueil', component: AcceuilComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'order-complete', component: OrderCompleteComponent },
  { path: 'order-overview', component: OrderOverviewComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'product-page/:id', component: ProductPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'userAccount', component: UserAccountComponent },
  { path: 'video', component: VideoComponent },
  { path: 'recherche', component: SearchResultComponent },
  { path: 'forum', component: ForumPageComponent },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: '**', redirectTo: 'accueil', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  exports: [RouterModule]
})
export class AppRoutingModule { }
