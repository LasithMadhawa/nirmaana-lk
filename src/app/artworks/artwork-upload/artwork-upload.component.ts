import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArtworksService } from '../artworks.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Artwork } from '../artwork.model';

@Component({
  selector: 'app-artwork-upload',
  templateUrl: './artwork-upload.component.html',
  styleUrls: ['./artwork-upload.component.css']
})
export class ArtworkUploadComponent implements OnInit {
  artwork: Artwork;
  form: FormGroup;
  private mode = 'create';
  private artworkId: string;

  constructor(public artworksService: ArtworksService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required]}),
      preview: new FormControl(null, {validators: [Validators.required]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('artworkId')) {
        console.log('entering to edit');
        this.mode = 'edit';
        this.artworkId = paramMap.get('artworkId');
        this.artworksService.getArtwork(this.artworkId).subscribe(artworkData => {
          this.artwork = {id: artworkData._id, title: artworkData.title, preview: artworkData.preview};
          this.form.setValue({
            title: this.artwork.title,
            preview: this.artwork.preview}
            );
        });

      } else {
        this.mode = 'create';
        this.artworkId = null;
      }
    });
  }

  onSaveArtwork() {
    if (this.mode === 'create') {
      this.artworksService.addArtwork(this.form.value.title, this.form.value.preview);
    } else {
      this.artworksService.updateArtwork(this.artworkId, this.form.value.title, this.form.value.preview);
    }
    this.form.reset();
  }
}
