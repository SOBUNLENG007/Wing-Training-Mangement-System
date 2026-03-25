import { User } from "@/lib/types/user";

export const MOCK_USERS: User[] = [
  { id: 1, first_name: "Dara",   last_name: "Pich",  email: "dara.pich@wing.com",   phone_number: "+855 12 345 001", address: "Phnom Penh, Cambodia",  role: "Trainer",  department_id: 5, department_name: "Operations", status: "Active",   sessions: 3 },
  { id: 2, first_name: "Srey",   last_name: "Mao",   email: "srey.mao@wing.com",    phone_number: "+855 12 345 002", address: "Siem Reap, Cambodia",   role: "Trainer",  department_id: 5, department_name: "Compliance", status: "Active",   sessions: 2 },
  { id: 3, first_name: "Channy", last_name: "Kem",   email: "channy.kem@wing.com",  phone_number: "+855 12 345 003", address: "Phnom Penh, Cambodia",  role: "Employee", department_id: 4, department_name: "Operations", status: "Active",   sessions: 5 },
  { id: 4, first_name: "Bopha",  last_name: "Rith",  email: "bopha.rith@wing.com",  phone_number: "+855 12 345 004", address: "Kandal, Cambodia",      role: "Employee", department_id: 6, department_name: "Sales",      status: "Active",   sessions: 4 },
  { id: 5, first_name: "Kosal",  last_name: "Chea",  email: "kosal.chea@wing.com",  phone_number: "+855 12 345 005", address: "Phnom Penh, Cambodia",  role: "Trainer",  department_id: 2, department_name: "HR",         status: "Active",   sessions: 1 },
  { id: 6, first_name: "Sovann", last_name: "Ly",    email: "sovann.ly@wing.com",   phone_number: "+855 12 345 006", address: "Battambang, Cambodia",  role: "Employee", department_id: 5, department_name: "Compliance", status: "Inactive", sessions: 2 },
  { id: 7, first_name: "Sokha",  last_name: "Admin", email: "sokha.admin@wing.com", phone_number: "+855 12 345 007", address: "Phnom Penh, Cambodia",  role: "Admin",    department_id: 1, department_name: "IT",         status: "Active",   sessions: 0 },
  { id: 8, first_name: "Pisey",  last_name: "Chan",  email: "pisey.chan@wing.com",  phone_number: "+855 12 345 008", address: "Phnom Penh, Cambodia",  role: "Employee", department_id: 2, department_name: "HR",         status: "Active",   sessions: 3 },
];