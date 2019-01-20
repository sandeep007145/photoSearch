import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUploadImagesComponent } from './search-upload-images.component';

describe('SearchUploadImagesComponent', () => {
  let component: SearchUploadImagesComponent;
  let fixture: ComponentFixture<SearchUploadImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchUploadImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchUploadImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
