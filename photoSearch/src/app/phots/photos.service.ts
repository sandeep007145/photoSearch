import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(
    private http: HttpClient
  ) { }

  searchPhotos(query: any): Observable<any> {
    const searchPhotosUrl = `${environment.BASE_URL_search_photos + query}`;
    return this.http.get(searchPhotosUrl);
  }

  getAuth(): Observable<any> {
    const acess_token = '2add843171edd9a0fd6901bc1a6ff5c2e229aa78d5fe6378f0a75b8410b2c113';
    // tslint:disable-next-line:max-line-length
    const searchPhotosUrl = `${environment.Auth + '?client_id=' + acess_token + '&redirect_url=urn:ietf:wg:oauth:2.0:oob&response_type=code&scope=public'}`;
    return this.http.get(searchPhotosUrl);
  }

  postAuth(): Observable<any> {
    const acess_token = '2add843171edd9a0fd6901bc1a6ff5c2e229aa78d5fe6378f0a75b8410b2c113';
    const secret = '0cd971f502acf185b9c71e7ab7c350dcbc2ff15c8dac61270151358c01d597cd';
    // tslint:disable-next-line:max-line-length
    const searchPhotosUrl = `${environment.TokenPost + '?client_id=' + acess_token + '&client_secret=' + secret + '&redirect_url=urn:ietf:wg:oauth:2.0:oob&code=code&grant_type=authorization_code'}`;
    return this.http.post(searchPhotosUrl, null);
  }

}
