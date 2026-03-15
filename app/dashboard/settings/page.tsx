"use client"

import { useState } from "react"
import { 
  User, 
  Mail, 
  MapPin, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  Pencil,
  ChevronDown,
  CalendarDays
} from "lucide-react"

export default function SettingsPage() {
  // Basic Info State
  const [firstName, setFirstName] = useState("Bros")
  const [lastName, setLastName] = useState("Punleu")
  const [email, setEmail] = useState("punleu@wingbank.com.kh")
  const [birthDate, setBirthDate] = useState("")
  const [gender, setGender] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("081743267")

  // Password State
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)

  return (
    <div className="w-full animate-in fade-in duration-500 pb-10 bg-amber-200">
      
      {/* BREADCRUMB */}
      <div className="text-sm text-slate-500 mb-8 flex items-center gap-2 font-medium">
        <span className="text-slate-400">Setting</span> {'>'} <span className="text-slate-700">User</span>
      </div>
      
      {/* PROFILE HEADER */}
      <div className="flex items-center gap-5 mb-10">
        <div className="relative">
          <div className="size-20 rounded-full bg-[#FFE4E6] border border-slate-100 flex items-center justify-center overflow-hidden">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka&backgroundColor=ffdfbf" 
              alt="Profile Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute bottom-0 right-0 bg-[#1f6fff] text-white p-1.5 rounded-full border-2 border-white hover:bg-blue-700 shadow-sm transition-colors">
            <Pencil className="size-3.5" />
          </button>
        </div>
        
        <div>
          <h1 className="text-[22px] font-bold text-[#1f6fff]">Profile</h1>
          <p className="text-[13px] text-slate-500 mt-0.5">Manage your Profile setting</p>
        </div>
      </div>

      <div className="space-y-10">
        {/* BASIC INFORMATION SECTION */}
        <section>
          <div className="mb-5">
            <h2 className="text-[18px] font-bold text-[#1f6fff]">Basic information</h2>
            <p className="text-[13px] text-slate-500 mt-0.5">Tell us your Basic info details</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            {/* First Name */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-slate-700">First Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 size-4.5" />
                <input 
                  type="text" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  className="w-full h-11.5 pl-10 pr-4 rounded-xl border border-slate-200 text-[14px] text-slate-700 focus:ring-2 focus:ring-[#1f6fff]/20 focus:border-[#1f6fff] outline-none transition-all placeholder:text-slate-400 bg-white"
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-slate-700">Last Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 size-4.5" />
                <input 
                  type="text" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  className="w-full h-11.5 pl-10 pr-4 rounded-xl border border-slate-200 text-[14px] text-slate-700 focus:ring-2 focus:ring-[#1f6fff]/20 focus:border-[#1f6fff] outline-none transition-all placeholder:text-slate-400 bg-white"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-slate-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 size-4.5" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full h-11.5 pl-10 pr-4 rounded-xl border border-slate-200 text-[14px] text-slate-700 focus:ring-2 focus:ring-[#1f6fff]/20 focus:border-[#1f6fff] outline-none transition-all placeholder:text-slate-400 bg-white"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-slate-700">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 size-4.5" />
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="081743267"
                  className="w-full h-11.5 pl-10 pr-4 rounded-xl border border-slate-200 text-[14px] text-slate-700 focus:ring-2 focus:ring-[#1f6fff]/20 focus:border-[#1f6fff] outline-none transition-all placeholder:text-slate-400 bg-white"
                />
              </div>
            </div>

            {/* Birth Date */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-slate-700">Birth</label>
              <div className="relative">
                <CalendarDays className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 size-4.5" />
                <input 
                  type="date" 
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full h-11.5 pl-10 pr-4 rounded-xl border border-slate-200 text-[14px] text-slate-700 focus:ring-2 focus:ring-[#1f6fff]/20 focus:border-[#1f6fff] outline-none transition-all bg-white"
                />
              </div>
            </div>

            {/* Gender Select */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-slate-700">Gender</label>
              <div className="relative">
                <select 
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full h-11.5 pl-4 pr-10 rounded-xl border border-slate-200 text-[14px] text-slate-700 appearance-none bg-white focus:ring-2 focus:ring-[#1f6fff]/20 focus:border-[#1f6fff] outline-none transition-all"
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 size-4.5 pointer-events-none" />
              </div>
            </div>

            {/* Address */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-[13px] font-medium text-slate-700">Address</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 size-4.5" />
                <input 
                  type="text" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Your address"
                  className="w-full h-11.5 pl-10 pr-4 rounded-xl border border-slate-200 text-[14px] text-slate-700 focus:ring-2 focus:ring-[#1f6fff]/20 focus:border-[#1f6fff] outline-none transition-all placeholder:text-slate-400 bg-white"
                />
              </div>
            </div>
          </div>
        </section>

        {/* PASSWORD SECTION */}
        <section>
          <div className="mb-5">
            <h2 className="text-[18px] font-bold text-[#1f6fff]">Password</h2>
            <p className="text-[13px] text-slate-500 mt-0.5">Modify your current password</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-5">
            {/* Current Password */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-slate-700">Current Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 size-4.5" />
                <input 
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Current password"
                  className="w-full h-11.5 pl-10 pr-10 rounded-xl border border-slate-200 text-[14px] text-slate-700 focus:ring-2 focus:ring-[#1f6fff]/20 focus:border-[#1f6fff] outline-none transition-all placeholder:text-slate-400 bg-white"
                />
                <button 
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showCurrent ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-slate-700">New password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 size-4.5" />
                <input 
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password"
                  className="w-full h-11.5 pl-10 pr-10 rounded-xl border border-slate-200 text-[14px] text-slate-700 focus:ring-2 focus:ring-[#1f6fff]/20 focus:border-[#1f6fff] outline-none transition-all placeholder:text-slate-400 bg-white"
                />
                <button 
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showNew ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
                </button>
              </div>
            </div>
          </div>
          
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm text-[13px]">
            Change Password
          </button>
        </section>

        {/* BOTTOM ACTION BUTTONS */}
        <div className="flex justify-end items-center gap-3 pt-6">
          <button className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-all text-[14px]">
            Cancel
          </button>
          <button className="px-8 py-2.5 bg-[#1f6fff] text-white font-medium rounded-xl hover:bg-blue-700 transition-all shadow-sm text-[14px]">
            Save
          </button>
        </div>
      </div>

    </div>
  )
}