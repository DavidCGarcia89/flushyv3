import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ENV } from '@app/env';
import { HttpClientModule } from '@angular/common/http';

import { AboutPage } from '../pages/about/about';
import { ProfilePage } from '../pages/profile/profile';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';
import { FirebaseDbProvider } from '../providers/firebasedb/firebasedb';
import { BotonPageModule } from '../pages/boton/boton.module';
import { InicioPageModule } from '../pages/inicio/inicio.module';
import { LoginPageModule } from '../pages/login/login.module';
import { EditarBotonPageModule } from '../pages/editar-boton/editar-boton.module';
import { NuevoBotonPageModule } from '../pages/nuevo-boton/nuevo-boton.module';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { RaspberryProvider } from '../providers/raspberry/raspberry';
import { StatusBotonPageModule } from '../pages/status-boton/status-boton.module';
import { PulsarBotonPageModule } from '../pages/pulsar-boton/pulsar-boton.module';

const env = ENV;

export const firebaseConfig = {
  apiKey: env.API_KEY,
  authDomain: env.AUTH_DOMAIN,
  databaseURL: env.DATABASE_URL,
  projectId: env.PROJECT_ID,
  storageBucket: env.STORAGE_BUCKET,
  messagingSenderId: env.MESSAGING_SENDER_ID
};
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ProfilePage,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BotonPageModule,
    InicioPageModule,
    LoginPageModule,
    NuevoBotonPageModule,
    TabsPageModule,
    HttpClientModule,
    EditarBotonPageModule,
    StatusBotonPageModule,
    PulsarBotonPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ProfilePage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    FirebaseDbProvider,
    RaspberryProvider
  ]
})
export class AppModule {}
