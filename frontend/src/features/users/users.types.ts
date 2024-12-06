import { IUserProfile } from '@features/profile/profile.types';

export interface IUser extends IUserProfile {
  id: string;
  role: string;
}

export interface IUpdateUser {
  firstName: string;
  lastName: string;
  phoneNumber: boolean;
  budget: string;
}

export interface IFetchUsersResponse {
  data: IUser[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export interface IUserFilters {
  page: number;
  name?: string;
}

export type FilterValues = Omit<IUserFilters, 'page'>;
