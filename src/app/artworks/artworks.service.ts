import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import {Artwork} from './artwork.model';

@Injectable({providedIn: 'root'})
export class ArtworksService {
  private artworks: Artwork[] = [];
  private artworkUploaded = new Subject<Artwork[]>();

constructor(private http: HttpClient) {}

  getArtworks() {
    this.http.get<{message: string, artworks: Artwork[]}>('http://localhost:3000/api/artworks')
    .subscribe((artworkData) => {
      this.artworks = artworkData.artworks;
      this.artworkUploaded.next([...this.artworks]);
    });
  }

  getArtworkUpdateListener() {
    return this.artworkUploaded.asObservable();
  }

  addArtwork(title: string, preview: string) {
    const artwork: Artwork = {id: null, title, preview};
    this.http.post<{ message: string }>('http://localhost:3000/api/artworks', artwork)
    .subscribe(responseData => {
      console.log(responseData.message);
      this.artworks.push(artwork);
      this.artworkUploaded.next([...this.artworks]);
    });
  }
}
