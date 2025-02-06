import { ISchedule } from './schedule';

export interface IStudent {
  id?: number;
  documentId?: string;
  name?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  parentName: string;
  birthday: string;
  city: string;
  avatar: string;
  address: string;
  payment: string;
  grade?: string;
  amount?: number;
  schedule?: ISchedule[];
  parent?: IParent;
}

export interface IStudents {
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
  next: number;
  prev: number;
  data: IStudent[];
}

export interface IParent {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}
