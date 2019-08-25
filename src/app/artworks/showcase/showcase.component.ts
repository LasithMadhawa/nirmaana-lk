import { Component, OnInit, OnDestroy, Injectable, Input } from "@angular/core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Artwork } from "../artwork.model";
import { ArtworksService } from "../artworks.service";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/header/auth.service";
import { UserService } from "src/app/users/user.service";
import { User } from "src/app/users/user.model";
import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";

@Component({
  selector: "app-showcase",
  templateUrl: "./showcase.component.html",
  styleUrls: ["./showcase.component.css"]
})
export class ShowcaseComponent implements OnInit, OnDestroy {
  faHeart = faHeart;

  @Input() artworks: Artwork[] = [];
  username: string;
  userId: string;
  user: User;
  userIsAuthenticated = false;
  private artworkSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public artworksService: ArtworksService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    // this.artworksService.getArtworks();
    if (this.artworks.length === 0) {
      this.artworkSub = this.artworksService
        .getArtworkUpdateListener()
        .subscribe((artworks: Artwork[]) => {
          this.artworks = artworks;
          // Testin block
          if (this.userId != null) {
            this.userService.getUser(this.userId).subscribe(userData => {
              this.user = {
                _id: userData._id,
                username: userData.username,
                email: userData.email,
                isDesigner: userData.isDesigner,
                downloads: userData.downloads,
                favourites: userData.favourites,
                skills: userData.skills,
                description: userData.description
              };
              console.log(this.user.favourites);
            });
          } else {
            this.user = {
              _id: null,
              username: null,
              email: null,
              isDesigner: null,
              downloads: [],
              favourites: [],
              skills: null,
              description: null
            };
          }
        });
    }
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
    this.user = null;
    this.userId = null;
    this.username = null;
  }
}
