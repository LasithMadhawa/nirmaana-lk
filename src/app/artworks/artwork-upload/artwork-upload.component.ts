import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ArtworksService } from "../artworks.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Artwork } from "../artwork.model";

import { mimeType } from "./mime-type.validator";
import { zipMimeType } from "./zip-mime-type.validator";

@Component({
  selector: "app-artwork-upload",
  templateUrl: "./artwork-upload.component.html",
  styleUrls: ["./artwork-upload.component.css"]
})
export class ArtworkUploadComponent implements OnInit {
  artwork: Artwork;
  form: FormGroup;
  imagePreview: any;
  zipFileName: string;
  tags = [{ display: "bla", value: "bla" }];
  private mode = "create";
  private artworkId: string;

  constructor(
    public artworksService: ArtworksService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required] }),
      preview: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      zipFile: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [zipMimeType]
      }),
      tags: new FormControl(null, { validators: [Validators.required] })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("artworkId")) {
        console.log("entering to edit");
        this.mode = "edit";
        this.artworkId = paramMap.get("artworkId");
        this.artworksService
          .getArtwork(this.artworkId)
          .subscribe(artworkData => {
            this.artwork = {
              id: artworkData._id,
              title: artworkData.title,
              preview: artworkData.preview,
              imagePath: artworkData.imagePath,
              zipFilePath: artworkData.zipFilePath
            };
            this.form.setValue({
              title: this.artwork.title,
              preview: this.artwork.preview,
              image: this.artwork.imagePath,
              zipFile: this.artwork.zipFilePath,
              tags: this.tags
            });
            this.imagePreview = this.artwork.imagePath;
            this.zipFileName = this.artwork.zipFilePath;
          });
      } else {
        this.mode = "create";
        this.artworkId = null;
        this.form.setValue({
          title: null,
          preview: null,
          image: null,
          tags: null,
          zipFile: null
        });
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onFilePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ zipFile: file });
    this.form.get("zipFile").updateValueAndValidity();
    this.zipFileName = file.name;
  }

  onSaveArtwork() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form);

    if (this.mode === "create") {
      this.artworksService.addArtwork(
        this.form.value.title,
        this.form.value.preview,
        this.form.value.image,
        this.form.value.zipFile
      );
    } else {
      this.artworksService.updateArtwork(
        this.artworkId,
        this.form.value.title,
        this.form.value.preview,
        this.form.value.image,
        this.form.value.zipFile
      );
    }
    this.form.reset();
  }
}
