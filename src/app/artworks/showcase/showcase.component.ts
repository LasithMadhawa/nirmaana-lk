import { Component, OnInit } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css']
})
export class ShowcaseComponent implements OnInit {
  faHeart = faHeart;

  artworks = [
    {
      title: 'Design with hand',
      image: 'assets/images/slides/Slide2.jpg',
      designer: 'Sonu'
    },
    {
      title: 'Colourful eye',
      image: 'assets/images/slides/Slide3.jpg',
      designer: 'Sonu'
    },
    {
      title: 'Artist black & white',
      image: '../../assets/images/slides/test1.jpg',
      designer: 'Sonu'
    },
    {
      title: 'Cocacola',
      image: '../../assets/images/slides/Slide1.jpg',
      designer: 'Sonu'
    },
    {
      title: 'Design with hand',
      image: '../../assets/images/slides/Slide2.jpg',
      designer: 'Sonu'
    },
    {
      title: 'Colourful eye',
      image: '../../assets/images/slides/Slide3.jpg',
      designer: 'Sonu'
    },
    {
      title: 'Artist black & white',
      image: '../../assets/images/slides/test1.jpg',
      designer: 'Sonu'
    },
    {
      title: 'Cocacola',
      image: '../../assets/images/slides/Slide1.jpg',
      designer: 'Sonu'
    },
    {
      title: 'Design with hand',
      image: '../../assets/images/slides/Slide2.jpg',
      designer: 'Sonu'
    },
    {
      title: 'Colourful eye',
      image: '../../assets/images/slides/Slide3.jpg',
      designer: 'Sonu'
    },
    {
      title: 'Artist black & white',
      image: '../../assets/images/slides/test1.jpg',
      designer: 'Sonu'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
