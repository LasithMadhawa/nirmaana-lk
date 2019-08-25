import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { User } from "./user.model";
import { Artwork } from "../artworks/artwork.model";
import { AuthService } from "../header/auth.service";
import { Subscription } from "rxjs";

@Injectable({ providedIn: "root" })
export class UserService {
  private user: User;
  private username: string;
  private userId: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  getUser(id: string) {
    // this.userId = this.authService.getUserId();
    return this.http.get<{
      _id: string;
      username: string;
      email: string;
      isDesigner: boolean;
      downloads: Artwork[];
      favourites: Artwork[];
      skills: string;
      description: string;
    }>("http://localhost:3000/api/user/" + id);
    // .subscribe(user => {
    //   this.user = user;
    //   this.username = user.username;
    // });
  }

  getFavourites(id: string) {
    return this.http.get<{
      favourites: Artwork[];
    }>("http://localhost:3000/api/user/" + id + "/favourites");
  }
}
