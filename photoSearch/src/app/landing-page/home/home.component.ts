import { Component, OnInit, OnDestroy } from '@angular/core';
import { PhotosService } from 'src/app/phots/photos.service';
import { Subscription, forkJoin } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  comingData: any = [];
  private collectionSub: Subscription;
  itemsPerPage: any = 15;
  pageNo: any = 1;
  length: any = 100;
  collections = this.photosSerice.collections;
  selectStatus: Boolean = false;
  cancelBubble: Boolean = false;
  count: any = 0;
  selectedPhotos = [];
  queryParams: FormGroup;
  sub;
  type: String = '';
  a;


  constructor(
    private photosSerice: PhotosService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.queryParams = this.fb.group({
      search: [''],
    });
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
          i++;
          console.log(data);
          this.comingData = data;
          const mapElement = this.comingData.map(element => ({
            checked: false,
            id: element.id
          }));
        });
    });
    console.log(this.collectionSub);
  }

  assignPageNo(pageNo) {
    this.pageNo = pageNo;
    this.searchparamsInroutes();
    this.geUser();
  }

  assignRecordsPerPage(perPage) {
    this.itemsPerPage = perPage;
    this.searchparamsInroutes();
    this.geUser();
  }

  selectAll() {
    for (let i = 0; i < this.comingData.length; i++) {
      this.comingData[i].checked = this.selectStatus;
    }
    this.count = 0;
    this.cancelBubble = false;
    this.comingData.forEach(item => {
      if (item.checked) {
        this.count = this.count + 1;
        this.cancelBubble = true;
      }
    });
  }

  checkIfAllSelected(param) {
    this.comingData.every(function (item: any) {
      return item.checked === true;
    });
    this.cancelBubble = false;
    this.count = 0;
    this.comingData.forEach(item => {
      if (item.checked) {
        this.count = this.count + 1;
        this.cancelBubble = true;
      }
    });
  }

  deSelectAll() {
    this.cancelBubble = false;
    this.count = 0;
    this.selectStatus = false;
    for (let i = 0; i < this.comingData.length; i++) {
      this.comingData[i].checked = false;
    }
  }
  postSelectedPhotos() {
    if (!this.cancelBubble) {
      alert('Select atleast one Photos for send');
      return;
    }
    for (let index = 0; index < this.comingData.length; index++) {
      if (this.comingData[index].checked) {
        this.selectedPhotos.push(this.comingData[index]);
      }
    }
    if (this.cancelBubble) {
      const a = [];
      this.selectedPhotos.forEach(id => {
        const ids = id.id;
        a.push(this.photosSerice.sendCollection(ids));
      });
      forkJoin(a).subscribe(() => {
        this.deSelectAll();
        this.geUser();
        this.selectedPhotos.length = 0;
        alert('Photos sent successfully');
      }, () => {
        alert('Something went wrong!');
      });
    }
  }

  resultBasedOnParamsReset() {
    this.type = '';
    this.queryParams.get('search').setValue('');
    this.searchparamsInroutes();
    this.geUser();
  }

  resultBasedOnParamsSearch() {
    this.type = this.queryParams.get('search').value;
    this.searchparamsInroutes();
    this.geUser();
  }


  getTherouteParamsValue() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        if (params.page !== undefined) {
          this.pageNo = params.page;
        } if (params.pageSize !== undefined) {
          this.itemsPerPage = params.pageSize;
        } if (params.search !== undefined) {
          this.queryParams.get('search').setValue(params.search);
          this.type = params.search;
        }
      });
  }

  searchparamsInroutes() {
    this.sendParamInrouteIfDataIsPresent(this.a);
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: this.a });
}

  sendParamInrouteIfDataIsPresent(a) {
    a = new Object();
    if (this.pageNo) {
      a['page'] = this.pageNo;
    } if (this.itemsPerPage !== 15) {
      a['pageSize'] = this.itemsPerPage;
    } if (this.type !== '') {
      a['search'] = this.type;
    }
    this.a = a;
  }


}
