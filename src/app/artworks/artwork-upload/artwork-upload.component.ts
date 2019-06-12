import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ArtworksService } from '../artworks.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Artwork } from '../artwork.model';

@Component({
  selector: 'app-artwork-upload',
  templateUrl: './artwork-upload.component.html',
  styleUrls: ['./artwork-upload.component.css']
})
export class ArtworkUploadComponent implements OnInit {
  enteredTitle = '';
  enteredPreview = '';
  artwork: Artwork;
  private mode = 'create';
  private artworkId: string;

  constructor(public artworksService: ArtworksService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('artworkId')) {
        this.mode = 'edit';
        this.artworkId = paramMap.get('artworkId');
        this.artworksService.getArtwork(this.artworkId).subscribe(artworkData => {
          this.artwork = {id: artworkData._id, title: artworkData.title, preview: artworkData.preview};
        });
      } else {
        this.mode = 'create';
        this.artworkId = null;
      }
    });
  }

  onSaveArtwork(form: NgForm) {
    if (this.mode === 'create') {
      this.artworksService.addArtwork(form.value.title, form.value.preview);
    } else {
      this.artworksService.updateArtwork(this.artworkId, form.value.title, form.value.preview);
    }
    form.resetForm();
  }
}
