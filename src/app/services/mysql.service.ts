import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MysqlService {

  constructor(private http: HttpClient) { }

  getChannels(category) {
    return this.request('GET', environment.serverUrl + '/channels/category/' + category);
  }

  getMessages(channel) {
    return this.request('GET', environment.serverUrl + '/messages/channel/' + channel);
  }

  getCategories() {
    return this.request('GET', environment.serverUrl + '/categories');
  }

  private async request(method: string, url: string, data?: any) {
    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body',
      headers: {
      }
    });
    return new Promise((resolve, reject) => {
      result.subscribe(resolve, reject);
    });
  }
}
