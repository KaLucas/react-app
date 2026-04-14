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
