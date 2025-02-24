import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { QualificationComponent } from './pages/qualification/qualification.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { ContentComponent } from './components/content/content.component';
import { HttpClientModule } from '@angular/common/http';
import { MobileMenuComponent } from './components/mobile-menu/mobile-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    BlogComponent,
    QualificationComponent,
    PortfolioComponent,
    ContactComponent,
    PageNotFoundComponent,
    HomeComponent,
    MenuComponent,
    ContentComponent,
    MobileMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
