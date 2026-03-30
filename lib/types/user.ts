export type UserRole   = "Admin" | "Trainer" | "Employee";
export type UserStatus = "Active" | "Inactive";

export type User = {
  id:              number;
  gender:          string;
  date_of_birth:    Date;
  firstName:      string;
  lastName:       string;
  email:           string;
  phoneNumber:    string;
  address:         string;
  status:          boolean;
  role:            UserRole;
  department_id:   number;
  departmentName: string;
  sessions:        number;
  avatar_url?:     string;
};