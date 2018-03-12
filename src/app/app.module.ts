import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { ContactCardComponent } from '../components/contact-card/contact-card';
import { ImagePickerComponent } from '../components/image-picker/image-picker';
import { LoaderComponent } from '../components/loader/loader';
import { AutoFocusDirective } from '../directives/auto-focus/auto-focus';

import { firebaseConfig } from './app.constants';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Keyboard } from '@ionic-native/keyboard';

import { AuthProvider } from '../providers/auth/auth';
import { ChatsProvider } from '../providers/chats/chats';
import { ContactsProvider } from '../providers/contacts/contacts';
import { FbRtdbProvider } from '../providers/fb-rtdb/fb-rtdb';
import { FirestoreProvider } from '../providers/firestore/firestore';


@NgModule({
  declarations: [
    MyApp,
    ContactCardComponent,
    ImagePickerComponent,
    LoaderComponent,
    AutoFocusDirective,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    GooglePlus,
    Keyboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ChatsProvider,
    ContactsProvider,
    FbRtdbProvider,
    FirestoreProvider
  ]
})
export class AppModule {}
