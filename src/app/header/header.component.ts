import { Component, OnInit } from '@angular/core';
import {
  faSearch,
  faAt,
  faKey,
  faUser,
  faEnvelope,
  faCheckDouble
} from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faSearch = faSearch;
  faAt = faAt;
  faKey = faKey;
  faUser = faUser;
  faEnvelope = faEnvelope;
  faCheckDouble = faCheckDouble;

  constructor(public authService: AuthService) {}

  onLogin(form: NgForm){

  }

  onSignUp(form: NgForm){
    if (form.invalid) {
      return;
    }
    this.authService.createUser(form.value.singUpEmail, form.value.signUpPassword);

  }

  ngOnInit() {}
}
