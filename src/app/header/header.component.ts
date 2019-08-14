import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  faSearch,
  faAt,
  faKey,
  faUser,
  faEnvelope,
  faCheckDouble
} from "@fortawesome/free-solid-svg-icons";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  faSearch = faSearch;
  faAt = faAt;
  faKey = faKey;
  faUser = faUser;
  faEnvelope = faEnvelope;
  faCheckDouble = faCheckDouble;

  userIsAuthenticated = false;
  private authListnerSubs: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListnerSubs = this.authService
      .getAuthStatusListner()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    this.authListnerSubs.unsubscribe();
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.login(form.value.email, form.value.password);
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.createUser(form.value.email, form.value.password);
  }

  onLogout() {
    this.authService.logout();
  }

  signInForm() {
    const element: HTMLElement = document.getElementById(
      "signInBtn"
    ) as HTMLElement;
    element.click();
    console.log(element);
  }
}
