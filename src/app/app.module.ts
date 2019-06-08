import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LandingComponent } from './landing/landing.component';
import { ShowcaseComponent } from './artworks/showcase/showcase.component';
import { ArtworkUploadComponent } from './artworks/artwork-upload/artwork-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    ShowcaseComponent,
    ArtworkUploadComponent
  ],
  imports: [BrowserModule, FontAwesomeModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
