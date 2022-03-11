import { User } from './user.model';

export class Post {
  constructor(
    public _id: string,
    public title: string,
    public description: string,
    public image: string,
    public dateTime: string,
    public user: User,
  ) {}
}

export interface PostData {
  [key: string]: any;
  title: string;
  description: File | null;
  image: File | null;
  dateTime: string;
  user: User;
}
