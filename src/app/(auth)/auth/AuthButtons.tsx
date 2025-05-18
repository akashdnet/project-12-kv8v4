// components/AuthButtons.tsx
"use client";

import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function AuthButtons() {
  return (
    <div className="space-y-4">
     
      
     <LoginLink className="block w-full py-3 text-center text-white bg-blue-600 rounded hover:bg-blue-700 transition" postLoginRedirectURL="/">Sign in</LoginLink>
     <RegisterLink className="block w-full py-3 text-center text-white bg-blue-600 rounded hover:bg-blue-700 transition" postLoginRedirectURL="/">Sign up</RegisterLink>


    </div>
  );
}