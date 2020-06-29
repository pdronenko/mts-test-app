import { IGenre } from './genre.interface';

export interface IChannel {
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
}
