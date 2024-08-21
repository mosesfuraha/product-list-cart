import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './pages/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdermodalComponent } from './components/ordermodal/ordermodal.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CartComponent,
    OrdermodalComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
