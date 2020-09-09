import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FilterComponent } from './main/filter/filter.component';
import { MainComponent } from './main/main.component';
import { MainContentComponent } from './main/main-content/main-content.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderComponent } from './shared/loader/loader.component';
import { LoadingInterceptorService } from './shared/services/loading.interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FilterComponent,
    MainComponent,
    MainContentComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    MatProgressSpinnerModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
