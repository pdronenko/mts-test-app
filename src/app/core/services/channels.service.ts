import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IChannelsResponse } from '../interfaces/channels-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {
  constructor(private http: HttpClient) { }

  public getChannels(): Observable<IChannelsResponse> {
    return this.http.get<IChannelsResponse>('../../assets/channels.json');
  }
}
