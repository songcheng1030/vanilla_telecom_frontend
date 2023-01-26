import { BaseModel } from '../_metronic/shared/crud-table';

export interface User extends BaseModel {
  id: number;
  name: string;
  password: string;
  email: string;
  role: number;
  posts: number;
  status: number;
  loginedAt: Date;
  createdAt: Date;
}

