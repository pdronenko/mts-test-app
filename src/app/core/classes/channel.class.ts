import { IGenre } from '../interfaces/genre.interface';

export class Channel {
  name: string;
  introduce: string;
  picture: {
    hcsSlaveAddrs: [];
    extensionFields: [];
    backgrounds: string[];
    channelPics: string[];
    channelBlackWhites: string[];
    others: [];
  };
  genres: IGenre[];

  constructor(channel: Channel) {
    Object.assign(this, channel);

    this.genres = this.genres || [];
  }
}
