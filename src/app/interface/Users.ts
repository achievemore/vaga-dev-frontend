export interface IUsers {
  page: string;
  per_page: string;
  total: string;
  total_pages: string;
  data: Array<IUser>;
}

interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
