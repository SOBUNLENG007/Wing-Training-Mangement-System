// // "use client";

// // import { useState, useEffect } from "react";
// // import { useRouter } from "next/navigation";
// // import { LoginForm } from "@/components/auth/login/login-form";
// // import { RegisterForm } from "@/components/auth/register/register-form";
// // import { restoreSession } from "@/lib/auth-store";
// // import { GraduationCap, Shield, BookOpen, Users } from "lucide-react";

// // export default function AuthPage() {
// //   const [mode, setMode] = useState<"login" | "register">("login");
// //   const router = useRouter();

// //   useEffect(() => {
// //     const user = restoreSession();
// //     if (user) {
// //       router.replace("/dashboard");
// //     }
// //   }, [router]);

// //   return (
// //     <div className="flex min-h-screen">
// //       <div className="hidden lg:flex lg:w-[480px] xl:w-[540px] flex-col justify-between bg-primary p-10 text-primary-foreground">
// //         <div className="flex items-center gap-3">
// //           <div className="flex size-12 items-center justify-center rounded-lg bg-primary-foreground/15">
// //             <GraduationCap className="size-6" />
// //           </div>
// //           <div>
// //             <p className="text-2xl font-semibold leading-tight">WTMS</p>
// //             <p className="text-sm text-primary-foreground/70">
// //               Wing Training Management System
// //             </p>
// //           </div>
// //         </div>

// //         <div className="space-y-6">
// //           <h1 className="text-3xl font-bold leading-tight text-balance">
// //             Empower Your Team with Structured Training
// //           </h1>
// //           <p className="text-sm leading-relaxed text-primary-foreground/80">
// //             Wing Bank&apos;s internal training platform for managing sessions,
// //             materials, assignments, and employee progress tracking across all
// //             departments.
// //           </p>
// //           <div className="flex flex-col gap-3 text-sm text-primary-foreground/70">
// //             <div className="flex items-center gap-2">
// //               <Shield className="size-4 shrink-0" />
// //               <span>Secure internal platform</span>
// //             </div>
// //             <div className="flex items-center gap-2">
// //               <BookOpen className="size-4 shrink-0" />
// //               <span>Manage training sessions & materials</span>
// //             </div>
// //             <div className="flex items-center gap-2">
// //               <Users className="size-4 shrink-0" />
// //               <span>Track employee progress & attendance</span>
// //             </div>
// //           </div>
// //         </div>

// //         <p className="text-xs text-primary-foreground/50">
// //           Wing (Cambodia) Limited Specialised Bank
// //         </p>
// //       </div>

// //       <div className="flex flex-1 flex-col items-center justify-center bg-background px-6 py-10">
// //         <div className="mb-8 flex items-center gap-2 lg:hidden">
// //           <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
// //             <GraduationCap className="size-5" />
// //           </div>
// //           <span className="text-lg font-semibold text-foreground">WTMS</span>
// //         </div>

// //         <div className="w-full max-w-lg space-y-6">
// //           {mode === "login" ? (
// //             <LoginForm onSwitchToRegister={() => setMode("register")} />
// //           ) : (
// //             <RegisterForm onSwitchToLogin={() => setMode("login")} />
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// // "use client";

// // import { useState, useEffect } from "react";
// // import { useRouter } from "next/navigation";
// // import { LoginForm } from "../app/(auth)/login/login-form";
// // import { RegisterForm } from "../app/(auth)/register/register-form";
// // // Make sure you import the ForgotPasswordForm! Adjust the path if needed.
// // // import { ForgotPasswordForm } from "@/components/auth/forgot-password/forgot-password-form"; 
// // import { ForgotPasswordForm } from "../app/(auth)/forgetPassword/page";
// // import { restoreSession } from "@/lib/auth-store";
// // import { GraduationCap, Shield, BookOpen, Users } from "lucide-react";

// // export default function AuthPage() {
// //   // 1. Add "forgot-password" to your mode state types
// //   const [mode, setMode] = useState<"login" | "register" | "forgot-password">("login");
// //   const router = useRouter();

// //   useEffect(() => {
// //     const user = restoreSession();
// //     if (user) {
// //       router.replace("/dashboard");
// //     }
// //   }, [router]);

// //   return (
// //     <div className="flex min-h-screen">
// //       {/* ... (Keep all your existing left-side branding panel exactly the same) ... */}
// //       <div className="hidden lg:flex lg:w-[480px] xl:w-[540px] flex-col justify-between bg-primary p-10 text-primary-foreground">
// //         <div className="flex items-center gap-3">
// //           <div className="flex size-12 items-center justify-center rounded-lg bg-primary-foreground/15">
// //             <GraduationCap className="size-6" />
// //           </div>
// //           <div>
// //             <p className="text-2xl font-semibold leading-tight">WTMS</p>
// //             <p className="text-sm text-primary-foreground/70">
// //               Wing Training Management System
// //             </p>
// //           </div>
// //         </div>

// //         <div className="space-y-6">
// //           <h1 className="text-3xl font-bold leading-tight text-balance">
// //             Empower Your Team with Structured Training
// //           </h1>
// //           <p className="text-sm leading-relaxed text-primary-foreground/80">
// //             Wing Bank&apos;s internal training platform for managing sessions,
// //             materials, assignments, and employee progress tracking across all
// //             departments.
// //           </p>
// //           <div className="flex flex-col gap-3 text-sm text-primary-foreground/70">
// //             <div className="flex items-center gap-2">
// //               <Shield className="size-4 shrink-0" />
// //               <span>Secure internal platform</span>
// //             </div>
// //             <div className="flex items-center gap-2">
// //               <BookOpen className="size-4 shrink-0" />
// //               <span>Manage training sessions & materials</span>
// //             </div>
// //             <div className="flex items-center gap-2">
// //               <Users className="size-4 shrink-0" />
// //               <span>Track employee progress & attendance</span>
// //             </div>
// //           </div>
// //         </div>

// //         <p className="text-xs text-primary-foreground/50">
// //           Wing (Cambodia) Limited Specialised Bank
// //         </p>
// //       </div>

// //       <div className="flex flex-1 flex-col items-center justify-center bg-background px-6 py-10">
// //         <div className="mb-8 flex items-center gap-2 lg:hidden">
// //           <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
// //             <GraduationCap className="size-5" />
// //           </div>
// //           <span className="text-lg font-semibold text-foreground">WTMS</span>
// //         </div>

// //         <div className="w-full max-w-lg space-y-6">
// //           {/* 2. Conditionally render the correct component based on the mode */}
// //           {mode === "login" && (
// //             <LoginForm 
// //               onSwitchToRegister={() => setMode("register")} 
// //               onSwitchToForgotPassword={() => setMode("forgot-password")} 
// //             />
// //           )}

// //           {mode === "register" && (
// //             <RegisterForm onSwitchToLogin={() => setMode("login")} />
// //           )}

// //           {mode === "forgot-password" && (
// //             <ForgotPasswordForm onSwitchToLogin={() => setMode("login")} />
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }











// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// // import { Login } from "../app/(auth)/login/page";
// import { LoginForm } from "../app/(auth)/login/page";
// import { RegisterForm } from "../app/(auth)/register/register-form";
// import { ForgotPasswordForm } from "../app/(auth)/forgetPassword/page";
// import { useAuthStore } from "@/lib/auth-store"; // ✅ fixed
// import { GraduationCap, Shield, BookOpen, Users } from "lucide-react";

// export default function AuthPage() {
//   const [mode, setMode] = useState<"login" | "register" | "forgot-password">("login");
//   const router = useRouter();

//   const user = useAuthStore((state) => state.user); // ✅ fixed

//   useEffect(() => {
//     if (user) {
//       router.replace("/dashboard/users"); // ✅ redirect to users page after login
//     }
//   }, [user, router]);

//   return (
//     <div className="flex min-h-screen">
//       {/* Left-side Branding Panel */}
//       <div className="hidden lg:flex lg:w-[480px] xl:w-[540px] flex-col justify-between bg-blue-600 p-10 text-white">
//         <div className="flex items-center gap-3">
//           <div className="flex size-12 items-center justify-center rounded-lg bg-white/15">
//             <GraduationCap className="size-6" />
//           </div>
//           <div>
//             <p className="text-2xl font-semibold leading-tight">WTMS</p>
//             <p className="text-sm text-blue-100">Wing Training Management System</p>
//           </div>
//         </div>

//         <div className="space-y-6">
//           <h1 className="text-3xl font-bold leading-tight">
//             Empower Your Team with Structured Training
//           </h1>
//           <p className="text-sm text-blue-50/80">
//             Wing Bank&apos;s internal training platform for managing sessions,
//             materials, and tracking employee progress across all departments.
//           </p>
//           <div className="flex flex-col gap-3 text-sm text-blue-100/70">
//             <div className="flex items-center gap-2">
//               <Shield className="size-4" /> <span>Secure internal platform</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <BookOpen className="size-4" /> <span>Manage materials</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <Users className="size-4" /> <span>Track progress</span>
//             </div>
//           </div>
//         </div>

//         <p className="text-xs text-blue-200/50">
//           Wing (Cambodia) Limited Specialised Bank
//         </p>
//       </div>

//       {/* Right-side Auth Forms */}
//       <div className="flex flex-1 flex-col items-center justify-center bg-white px-6 py-10">
//         <div className="mb-8 flex items-center gap-2 lg:hidden">
//           <div className="flex size-9 items-center justify-center rounded-lg bg-blue-600 text-white">
//             <GraduationCap className="size-5" />
//           </div>
//           <span className="text-lg font-semibold">WTMS</span>
//         </div>

//         <div className="w-full max-w-lg space-y-6">
//           {mode === "login" && (
//             <LoginForm
//               onSwitchToRegister={() => setMode("register")}
//               onSwitchToForgotPassword={() => setMode("forgot-password")}
//             />
//           )}

//           {mode === "register" && (
//             <RegisterForm onSwitchToLogin={() => setMode("login")} />
//           )}

//           {mode === "forgot-password" && (
//             <ForgotPasswordForm onSwitchToLogin={() => setMode("login")} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




import {redirect} from "next/navigation"


export default function Home() {
  redirect("/login");
}