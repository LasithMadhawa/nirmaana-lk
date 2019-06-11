import { Component, OnInit, OnDestroy } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import {Artwork} from '../artwork.model';
import { ArtworksService } from '../artworks.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css']
})
export class ShowcaseComponent implements OnInit, OnDestroy {
  faHeart = faHeart;

artworks: Artwork[] = [];
private artworkSub: Subscription;

constructor(public artworksService: ArtworksService) {}

ngOnInit() {
  this.artworksService.getArtworks();
  this.artworkSub = this.artworksService.getArtworkUpdateListener()
    .subscribe((artworks: Artwork[]) => {
      this.artworks = artworks;
    });
}

OnDelete(artworkId: string) {
  this.artworksService.deleteArtwork(artworkId);
}

ngOnDestroy() {
  this.artworkSub.unsubscribe();
}



  // artworks = [
  //   {
  //     title: 'Design with hand',
  //     image: 'assets/images/slides/Slide2.jpg',
  //     designer: 'Sonu'
  //   },
  //   {
  //     title: 'Colourful eye',
  //     image: 'assets/images/slides/Slide3.jpg',
  //     designer: 'Sonu'
  //   },
  //   {
  //     title: 'Artist black & white',
  //     image: '../../assets/images/slides/test1.jpg',
  //     designer: 'Sonu'
  //   },
  //   {
  //     title: 'Cocacola',
  //     image: '../../assets/images/slides/Slide1.jpg',
  //     designer: 'Sonu'
  //   },
  //   {
  //     title: 'Design with hand',
  //     image: '../../assets/images/slides/Slide2.jpg',
  //     designer: 'Sonu'
  //   },
  //   {
  //     title: 'Colourful eye',
  //     image: '../../assets/images/slides/Slide3.jpg',
  //     designer: 'Sonu'
  //   },
  //   {
  //     title: 'Artist black & white',
  //     image: '../../assets/images/slides/test1.jpg',
  //     designer: 'Sonu'
  //   },
  //   {
  //     title: 'Cocacola',
  //     image: '../../assets/images/slides/Slide1.jpg',
  //     designer: 'Sonu'
  //   },
  //   {
  //     title: 'Design with hand',
  //     image: '../../assets/images/slides/Slide2.jpg',
  //     designer: 'Sonu'
  //   },
  //   {
  //     title: 'Colourful eye',
  //     image: '../../assets/images/slides/Slide3.jpg',
  //     designer: 'Sonu'
  //   },
  //   {
  //     title: 'Artist black & white',
  //     image: '../../assets/images/slides/test1.jpg',
  //     designer: 'Sonu'
  //   }
  // ];
}
