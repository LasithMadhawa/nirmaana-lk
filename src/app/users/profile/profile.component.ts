import { Component, OnInit } from "@angular/core";
import { User } from "../user.model";
import { UserService } from "../user.service";
import { AuthService } from "src/app/header/auth.service";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { Artwork } from "src/app/artworks/artwork.model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  // user = {
  //   isDesigner: false,
  //   _id: "5d60e8a1cb0ab3285c2f2b29",
  //   username: "lasithm",
  //   email: "test2@g"
  // };

  user: User;
  userId: string;
  favourites: Artwork[];

  constructor(
    private userService: UserService,
    public route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // this.user = this.userService.getUserData();
    // console.log(JSON.stringify(this.user));
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      console.log("entering to profile");
      this.userId = paramMap.get("userId");
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
        console.log(this.user.username);

        this.userService.getFavourites(this.userId).subscribe(favourites => {
          this.favourites = favourites.favourites;
          console.log(this.favourites);
        });
      });
    });
  }
}
