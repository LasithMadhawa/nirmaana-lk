import { Component, OnInit, OnDestroy, Injectable, Input } from "@angular/core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Artwork } from "../artwork.model";
import { ArtworksService } from "../artworks.service";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/header/auth.service";

@Component({
  selector: "app-showcase",
  templateUrl: "./showcase.component.html",
  styleUrls: ["./showcase.component.css"]
})
export class ShowcaseComponent implements OnInit, OnDestroy {
  faHeart = faHeart;

  @Input() artworks: Artwork[] = null;
  username: string;
  userId: string;
  userIsAuthenticated = false;
  private artworkSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public artworksService: ArtworksService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    // this.artworksService.getArtworks();
    if (this.artworks === null) {
      this.artworkSub = this.artworksService
        .getArtworkUpdateListener()
        .subscribe((artworks: Artwork[]) => {
          this.artworks = artworks;
        });
    }
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListner()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
    console.log(this.userId + this.userIsAuthenticated);
  }

  OnDelete(artworkId: string) {
    this.artworksService.deleteArtwork(artworkId);
  }

  ngOnDestroy() {
    this.artworkSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
