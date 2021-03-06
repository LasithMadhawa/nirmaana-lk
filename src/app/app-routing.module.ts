import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LandingComponent } from "./landing/landing.component";
import { ShowcaseComponent } from "./artworks/showcase/showcase.component";
import { ArtworkUploadComponent } from "./artworks/artwork-upload/artwork-upload.component";
import { AuthGuard } from "./header/auth.guard";
import { ArtworkViewComponent } from "./artworks/artwork-view/artwork-view/artwork-view.component";

const routes: Routes = [
  { path: "", component: LandingComponent },
  { path: "show", component: ShowcaseComponent },
  {
    path: "create",
    component: ArtworkUploadComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "edit/:artworkId",
    component: ArtworkUploadComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "view/:artworkId",
    component: ArtworkViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
