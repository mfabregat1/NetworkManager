import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pagines/login/login.component';
import { HeaderComponent } from './comu/header/header.component';

//Emmagatzematge de Sessió i local
import { NgxWebstorageModule } from 'ngx-webstorage';

// validador de formularis
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// imports ngx-translate i http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { MTranslateHttpLoader } from './util/translate-http-loader';
import { LoginService } from './serveis/login.service';
import { ComuService } from './serveis/comu.service';
import { CrudService } from './serveis/crud.service';
import { MrouterComponent } from './pagines/mrouter/mrouter.component';
import { MusuariComponent } from './pagines/musuari/musuari.component';
import { LlusuarisComponent } from './pagines/llusuaris/llusuaris.component';
import { CusuariComponent } from './pagines/cusuari/cusuari.component';
import { IrouterComponent } from './pagines/irouter/irouter.component';

export function createTranslateLoader(http: HttpClient) {
  return new MTranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    MrouterComponent,
    MusuariComponent,
    LlusuarisComponent,
    CusuariComponent,
    IrouterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
        }
    })
  ],
  providers: [LoginService, ComuService, CrudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
