export type UserRole   = "Admin" | "Trainer" | "Employee";
export type UserStatus = "Active" | "Inactive";

export type User = {
  id:              number;
  firstName:      string;
  lastName:       string;
  email:           string;
  phoneNumber:    string;
  address:         string;
  status:          UserStatus;
  role:            UserRole;
  department_id:   number;
  departmentName: string;
  sessions:        number;
  avatar_url?:     string;
};