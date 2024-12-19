export interface IUsers {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Array<IUser>;
}

export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
