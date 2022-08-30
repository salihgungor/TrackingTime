import { User } from 'src/user/entities/user.entity';
import { Client } from 'src/client/entities/client.entity';

export interface ITrackingtime {
  start_date: Date;
  end_date: Date;
  nbDays: string;
  nbHalfDays: string;
  nbHours: string;
  companyComment: string;
  clientComment: string;
  user: User;
  client: Client;
}
