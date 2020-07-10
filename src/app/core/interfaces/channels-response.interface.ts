import { Channel } from '../classes/channel.class';

export interface IChannelsResponse {
  total: string;
  channelDetails: Channel[];
}
