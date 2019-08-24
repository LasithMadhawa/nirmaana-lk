import { Component, OnInit, OnDestroy, Injectable } from "@angular/core";
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

  userId: string;
  artworks: Artwork[] = [];
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
    this.artworkSub = this.artworksService
      .getArtworkUpdateListener()
      .subscribe((artworks: Artwork[]) => {
        this.artworks = artworks;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListner()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  OnDelete(artworkId: string) {
    this.artworksService.deleteArtwork(artworkId);
  }

  ngOnDestroy() {
    this.artworkSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
