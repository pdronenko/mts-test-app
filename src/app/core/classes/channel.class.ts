import { IGenre } from '../interfaces/genre.interface';

export class Channel {
  public name: string;
  public introduce: string;
  public picture: {
    hcsSlaveAddrs: [];
    extensionFields: [];
    backgrounds: string[];
    channelPics: string[];
    channelBlackWhites: string[];
    others: [];
  };
  public genres: IGenre[];

  constructor(channel: Channel) {
    Object.assign(this, channel);

    this.genres = this.genres || [];
  }
}
