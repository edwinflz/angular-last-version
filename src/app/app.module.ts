import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { register } from 'swiper/element/bundle';
import { LoadingComponent } from '@components/loading/loading.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { INTERCEPTOR_PROVIDERS } from '@core/interceptors';
import { AppBaseBrowserModule } from '@config/app-base-browser.module';
// Swiper
register();

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppBaseBrowserModule,
    NgxWebstorageModule.forRoot(),
    LoadingComponent
  ],
  providers: [INTERCEPTOR_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
