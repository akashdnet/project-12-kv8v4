import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";

// pages/404.js
export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      {/* "Eye" Effect */}
      <div className="relative w-48 h-48 animate-shiver">
        <div className="absolute top-8 left-8 w-5 h-5 bg-black rounded-full shadow-2xl animate-eye"></div>
      </div>

      {/* Meta */}
      <div className="relative inline-block bg-white w-20 h-20 rounded-full rotate-45">
        <div className="absolute bottom-[-10px] left-0 w-16 h-12 border-b-2 border-white rounded-full"></div>
        <div className="absolute top-[-100px] left-0 rotate-45"></div>
      </div>

      {/* Body with Animations */}
      <div className="mt-20 text-center">
        <h1 className="text-7xl font-extrabold">404</h1>
        <p className="mt-4 text-2xl">Contact with admin...</p>
        <LogoutLink>Log out</LogoutLink>
      </div>
    </div>
  );
}
