// components/AuthButtons.tsx
"use client";

import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function AuthButtons() {
  return (
    <div style={{display:"flex", flexDirection:"column", gap:"10px"}}>
      <LoginLink
        style={{
          display: "block",
          width: "100%",
          paddingTop: "0.75rem",
          paddingBottom: "0.75rem",
          textAlign: "center",
          color: "white",
          backgroundColor: "#AA60C8", // Tailwind's bg-blue-600
          borderRadius: "0.375rem", // Tailwind's rounded
          transition: "background-color 0.2s ease-in-out",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#D69ADE")
        } // Tailwind's bg-blue-700
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#AA60C8")
        }
        postLoginRedirectURL="/"
      >
        Login
      </LoginLink>
      <RegisterLink
        style={{
          display: "block",
          width: "100%",
          paddingTop: "0.75rem",
          paddingBottom: "0.75rem",
          textAlign: "center",
          color: "white",
          backgroundColor: "#5409DA", // Tailwind: bg-blue-600
          borderRadius: "0.375rem", // Tailwind: rounded
          transition: "background-color 0.2s ease-in-out",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#4E71FF")
        } // Tailwind: bg-blue-700
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#5409DA")
        }
        postLoginRedirectURL="/"
      >
        Register
      </RegisterLink>
    </div>
  );
}
