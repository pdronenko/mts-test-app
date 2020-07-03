import { IChannel } from './channel.interface';
import { IGenre } from './genre.interface';

export interface IChannelsResponse {
  total: string;
  channelDetails: IChannel[];
}
