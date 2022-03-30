import { Member } from './Member';

export type Project = {
  _id: string;
  startDate: Date;
  endDate: Date;
  number: number;
  name: string;
  customer: string;
  group: string;
  members: Member[];
  status: string;
};
