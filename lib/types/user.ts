export type UserRole   = "Admin" | "Trainer" | "Employee";
export type UserStatus = "Active" | "Inactive";

export type User = {
  id:              number;
  first_name:      string;
  last_name:       string;
  email:           string;
  phone_number:    string;
  address:         string;
  status:          UserStatus;
  role:            UserRole;
  department_id:   number;
  department_name: string;
  sessions:        number;
  avatar_url?:     string;
};