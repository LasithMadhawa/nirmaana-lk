import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

import { Artwork } from "./artwork.model";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { TagModelClass } from "ngx-chips/core/accessor";

@Injectable({ providedIn: "root" })
export class ArtworksService {
  private artworks: Artwork[] = [];
  private artworkUploaded = new Subject<Artwork[]>();

  constructor(private http: HttpClient) {}

  getArtworks() {
    this.http
      .get<{ message: string; artworks: any }>(
        "http://localhost:3000/api/artworks"
      )
      .pipe(
        map(artworkData => {
          return artworkData.artworks.map(artwork => {
            return {
              title: artwork.title,
              preview: artwork.preview,
              id: artwork._id,
              imagePath: artwork.imagePath,
              zipFilePath: artwork.zipFilePath,
              tags: artwork.tags,
              designer: artwork.designer
            };
          });
        })
      )
      .subscribe(transformedArtworks => {
        this.artworks = transformedArtworks;
        this.artworkUploaded.next([...this.artworks]);
      });
  }

  getArtworksByTag(searchTag: string) {
    this.http
      .get<{ message: string; artworks: any }>(
        "http://localhost:3000/api/artworks/searchByTag?searchTag=" + searchTag
      )
      .pipe(
        map(artworkData => {
          return artworkData.artworks.map(artwork => {
            return {
              title: artwork.title,
              preview: artwork.preview,
              id: artwork._id,
              imagePath: artwork.imagePath,
              zipFilePath: artwork.zipFilePath,
              tags: artwork.tags,
              designer: artwork.designer
            };
          });
        })
      )
      .subscribe(transformedArtworks => {
        this.artworks = transformedArtworks;
        this.artworkUploaded.next([...this.artworks]);
      });
  }

  getArtworkUpdateListener() {
    return this.artworkUploaded.asObservable();
  }

  getArtwork(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      preview: string;
      imagePath: string;
      zipFilePath: string;
      tags: string;
      designer: string;
    }>("http://localhost:3000/api/artworks/" + id);
  }

  addArtwork(
    title: string,
    preview: string,
    image: File,
    zipFile: File,
    tags: string
  ) {
    const artworkData = new FormData();
    artworkData.append("title", title);
    artworkData.append("preview", preview);
    artworkData.append("image", image);
    artworkData.append("zipFile", zipFile);
    artworkData.append("tags", tags);
    this.http
      .post<{ message: string; artwork: Artwork }>(
        "http://localhost:3000/api/artworks",
        artworkData
      )
      .subscribe(responseData => {
        const artwork: Artwork = {
          id: responseData.artwork.id,
          title: title,
          preview: preview,
          imagePath: responseData.artwork.imagePath,
          zipFilePath: responseData.artwork.zipFilePath,
          tags: tags,
          designer: null
        };
        this.artworks.push(artwork);
        this.artworkUploaded.next([...this.artworks]);
      });
  }

  updateArtwork(
    id: string,
    title: string,
    preview: string,
    image: File | string,
    zipFile: File | string,
    tags: string
  ) {
    let artworkData: Artwork | FormData;
    if (typeof image === "object" || typeof zipFile === "object") {
      artworkData = new FormData();
      artworkData.append("id", id);
      artworkData.append("title", title);
      artworkData.append("preview", preview);
      artworkData.append("image", image, title);
      artworkData.append("zipFile", zipFile);
      artworkData.append("tags", tags);
    } else {
      artworkData = {
        id: id,
        title: title,
        preview: preview,
        imagePath: image,
        zipFilePath: zipFile,
        tags: tags,
        designer: null
      };
    }
    this.http
      .put("http://localhost:3000/api/artworks/" + id, artworkData)
      .subscribe(response => {
        const updatedArtworks = [...this.artworks];
        const oldArtworkIndex = updatedArtworks.findIndex(p => p.id === id);
        const artwork: Artwork = {
          id: id,
          title: title,
          preview: preview,
          imagePath: "",
          zipFilePath: "",
          tags: tags,
          designer: null
        };

        updatedArtworks[oldArtworkIndex] = artwork;
        this.artworks = updatedArtworks;
        this.artworkUploaded.next([...this.artworks]);
      });
  }

  deleteArtwork(artworkId: string) {
    this.http
      .delete("http://localhost:3000/api/artworks/" + artworkId)
      .subscribe(() => {
        const updatedArtworks = this.artworks.filter(
          artwork => artwork.id !== artworkId
        );
        this.artworks = updatedArtworks;
        this.artworkUploaded.next([...this.artworks]);
      });
  }
}
