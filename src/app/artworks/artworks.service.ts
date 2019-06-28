import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import {Artwork} from './artwork.model';

@Injectable({providedIn: 'root'})
export class ArtworksService {
  private artworks: Artwork[] = [];
  private artworkUploaded = new Subject<Artwork[]>();

constructor(private http: HttpClient) {}

  getArtworks() {
    this.http.get<{message: string, artworks: any}>('http://localhost:3000/api/artworks')
    .pipe(map((artworkData) => {
      return artworkData.artworks.map(artwork => {
        return {
          title: artwork.title,
          preview: artwork.preview,
          id: artwork._id
        };
      });
    }))
    .subscribe((transformedArtworks) => {
      this.artworks = transformedArtworks;
      this.artworkUploaded.next([...this.artworks]);
    });
  }

  getArtworkUpdateListener() {
    return this.artworkUploaded.asObservable();
  }

  getArtwork(id: string) {
    return this.http.get<{_id: string, title: string, preview: string}>('http://localhost:3000/api/artworks/' + id);
  }

  addArtwork(title: string, preview: string, image: File) {
    const artworkData = new FormData();
    artworkData.append("title", title);
    artworkData.append("preview", preview);
    artworkData.append("image", image);
    this.http.post<{ message: string, artworkId: string }>('http://localhost:3000/api/artworks', artworkData)
    .subscribe(responseData => {
      const artwork: Artwork = {id: responseData.artworkId, title: title, preview: preview};
      this.artworks.push(artwork);
      this.artworkUploaded.next([...this.artworks]);
    });
  }

  updateArtwork(id: string, title: string, preview: string) {
    const artwork: Artwork = { id, title, preview};
    this.http.put('http://localhost:3000/api/artworks/' + id, artwork)
    .subscribe(response => {
      const updatedArtworks = [...this.artworks];
      const oldArtworkIndex = updatedArtworks.findIndex(p => p.id === artwork.id);
      updatedArtworks[oldArtworkIndex] = artwork;
      this.artworks = updatedArtworks;
      this.artworkUploaded.next([...this.artworks]);
    });
  }

  deleteArtwork(artworkId: string) {
    this.http.delete('http://localhost:3000/api/artworks/' + artworkId)
    .subscribe(() => {
      const updatedArtworks = this.artworks.filter(artwork => artwork.id !==  artworkId);
      this.artworks = updatedArtworks;
      this.artworkUploaded.next([...this.artworks]);
    });
  }
}
