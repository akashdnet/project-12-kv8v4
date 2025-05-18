import React from "react";
import AuthButtons from "./AuthButtons";

export default function GlassForm() {
  return (
    <div className=" rounded-full bg-[linear-gradient(120deg,_#1D976C,_#2c3e50)]">
        <h2 className="text-amber-50 text-6xl m-8 px-5">Wild and Free</h2>

    <div className="h-[260px] w-[420px] rounded-[20px] bg-white/10 backdrop-blur-[35px] border-2 border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.25)] p-[30px] overflow-hidden ">
      <h2 className="text-2xl mb-7">Welcome to Dashboard</h2>
      <AuthButtons/>
    </div>
    </div>
  );
}
