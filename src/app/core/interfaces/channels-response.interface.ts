import { IChannel } from './channel.interface';

export interface IChannelsResponse {
  total: string;
  channelDetails: IChannel[];
}
