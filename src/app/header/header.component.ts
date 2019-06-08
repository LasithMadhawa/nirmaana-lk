import { Component, OnInit } from '@angular/core';
import {
  faSearch,
  faAt,
  faKey,
  faUser,
  faEnvelope,
  faCheckDouble
} from '@fortawesome/free-solid-svg-icons';

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
  constructor() {}

  ngOnInit() {}
}
