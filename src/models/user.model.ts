export interface User {
  id: string;
  data: {
    email: string;
    last_name: string;
    first_name: string;
  };
  created_at: string;
  updated_at: string;
}

export interface DatagridUsersList {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
}
