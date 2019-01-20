import { Component, OnInit } from '@angular/core';
import { PhotosService } from 'src/app/phots/photos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private photosSerice: PhotosService
  ) { }

  ngOnInit() {
    this.getAuth();
  }

  getPhotos() {
    this.photosSerice.searchPhotos('sandwirtch').subscribe(res => {
      console.log(res);
    });
  }

  getAuth() {
    this.photosSerice.getAuth().subscribe(res => {
      console.log(res);
      this.photosSerice.postAuth().subscribe(ress => {
        console.log(res);
      });
    });
  }

}
