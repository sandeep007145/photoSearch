import {Component, OnInit, OnDestroy} from '@angular/core';
import { PhotosService } from 'src/app/phots/photos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  comingData: any = [];
  private collectionSub: Subscription;
  itemsPerPage: any = 40;
  pageNo: any = 1;
  length: any = 300;
  collections = this.photosSerice.collections;

  constructor(
    private photosSerice: PhotosService
  ) { }

  ngOnInit() {
  this.geUser();
  }

  geUser() {
    let i = 0;
    this.collections.forEach(collection => {
      this.collectionSub = this.photosSerice.getCollection(collection.id, this.pageNo, this.itemsPerPage)
        .subscribe(data => {
          this.collections[i]['previews'] = data;
          i++;
          console.log(data);
          this.comingData = data;
        });
    });
    console.log(this.collectionSub);
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
