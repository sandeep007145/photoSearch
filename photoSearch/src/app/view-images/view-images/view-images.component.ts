import { Component, OnInit } from '@angular/core';
import { PhotosService } from 'src/app/phots/photos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-images',
  templateUrl: './view-images.component.html',
  styleUrls: ['./view-images.component.scss']
})
export class ViewImagesComponent implements OnInit {

  comingData: any = [];
  private collectionSub: Subscription;
  itemsPerPage: any = 15;
  pageNo: any = 1;
  length: any;
  collections = this.photosSerice.collections;
  type: String = '';


  constructor(
    private photosSerice: PhotosService,
  ) {
  }

  ngOnInit() {
    this.geUser();
  }

  geUser() {
    this.collections.forEach(collection => {
      this.collectionSub = this.photosSerice.getCollection(collection.id, this.pageNo, this.itemsPerPage, this.type, 'latest')
        .subscribe(data => {
          this.comingData = data;
          this.length = 100;
        });
    });
  }

  assignPageNo(pageNo) {
    this.pageNo = pageNo;
    this.geUser();
  }

  assignRecordsPerPage(perPage) {
    this.itemsPerPage = perPage;
    this.geUser();
  }

}
