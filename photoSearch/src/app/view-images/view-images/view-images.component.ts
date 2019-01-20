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
  length: any = 100;
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
    let i = 0;
    this.collections.forEach(collection => {
      this.collectionSub = this.photosSerice.getCollection(collection.id, this.pageNo, this.itemsPerPage, this.type, 'latest')
        .subscribe(data => {
          this.collections[i]['previews'] = data;
          this.comingData = data;
          i++;
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
