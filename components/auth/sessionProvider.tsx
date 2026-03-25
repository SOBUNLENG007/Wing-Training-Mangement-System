// "use client";
// import { SessionProvider as Next } from "next-auth/react";

// export function SessionProvider({ children }: { children: React.ReactNode }) {
//   return <Next>{children}</Next>;
// }
"use client";

import { useEffect, useState } from "react";

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // By returning a fragment and just checking hydration, 
  // we ensure the server and client start with the same HTML structure.
  return <>{isHydrated ? children : <div className="opacity-0">{children}</div>}</>;
}