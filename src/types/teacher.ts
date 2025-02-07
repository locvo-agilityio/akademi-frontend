import { ISchedule } from './schedule';

export interface ITeacher {
  id?: number;
  documentId?: string;
  name?: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  phone: string;
  address: string;
  photo: string;
  birthday: string;
  city: string;
  university: string;
  degree: string;
  startEducation: string;
  endEducation: string;
  cityEducation: string;
  subject: string;
  description: string;
  expertise: string;
  schedule?: ISchedule[];
}

export interface ITeachers {
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
  data: ITeacher[];
}
