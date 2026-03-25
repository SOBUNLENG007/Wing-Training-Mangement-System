export type ProfileForm = {
  firstName: string;
  lastName:  string;
  email:     string;
  phone:     string;
  birthDate: string;
  gender:    string;
  address:   string;
};

export type PasswordForm = {
  currentPassword: string;
  newPassword:     string;
};