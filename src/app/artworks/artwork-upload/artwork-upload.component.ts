import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-artwork-upload',
  templateUrl: './artwork-upload.component.html',
  styleUrls: ['./artwork-upload.component.css']
})
export class ArtworkUploadComponent implements OnInit {
  newArtwork = 'NO CONTENT!!!';
  title = 'Default';

  onUploadArtwork() {
    this.newArtwork = this.title;
  }

  constructor() {}

  ngOnInit() {}
}
