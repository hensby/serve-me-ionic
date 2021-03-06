import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BaseInterceptor} from './core/base-interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FingerprintAIO} from '@ionic-native/fingerprint-aio/ngx';
import {FirebaseX} from '@ionic-native/firebase-x/ngx';

import {SlideMenuModule} from './slide-menu/slide-menu.module';

import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireMessagingModule} from '@angular/fire/messaging';
import {Camera} from '@ionic-native/camera/ngx';
import {DatePipe} from '@angular/common';
import {BidPipe} from './pipes/bid.pipe';
import {FcmServiceProvider} from './services/fcm.service';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AppUpdate} from '@ionic-native/app-update/ngx';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        SlideMenuModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireMessagingModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        FingerprintAIO,
        FirebaseX,
        Camera,
        DatePipe,
        BidPipe,
        AppUpdate,
        FcmServiceProvider,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: HTTP_INTERCEPTORS, useClass: BaseInterceptor, multi: true},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
