import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ArtworksService } from '../artworks.service';

@Component({
  selector: 'app-artwork-upload',
  templateUrl: './artwork-upload.component.html',
  styleUrls: ['./artwork-upload.component.css']
})
export class ArtworkUploadComponent {
  enteredTitle = '';
  enteredPreview = '';

  constructor(public artworksService: ArtworksService) {

  }

  onUploadArtwork(form: NgForm) {
    this.artworksService.addArtwork(form.value.title, form.value.preview);
    form.resetForm();
  }
}
