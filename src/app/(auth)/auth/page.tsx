"use client";

import React from "react";
import AuthButtons from "./AuthButtons";



export default function ParallaxStarsPage() {
  const starStyles = {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "transparent",
    display: "block",
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        background: "#090A0F",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        fontFamily: "sans-serif",
      }}
    >
      <div id="stars" style={{ ...starStyles, animation: "animStar 50s linear infinite", width: "1px", height: "1px", boxShadow: `100px 1000px #FFF, 200px 1500px #FFF, 300px 1700px #FFF, 400px 1900px #FFF, 500px 1200px #FFF, 600px 1800px #FFF, 700px 1600px #FFF, 800px 1400px #FFF, 900px 1100px #FFF, 1000px 1300px #FFF, 1100px 1700px #FFF, 1200px 1800px #FFF` }}></div>

      <div id="stars2" style={{ ...starStyles, animation: "animStar 100s linear infinite", width: "2px", height: "2px", boxShadow: `50px 800px #FFF, 150px 1300px #FFF, 250px 1500px #FFF, 350px 1700px #FFF, 450px 900px #FFF, 550px 1250px #FFF, 650px 1600px #FFF` }}></div>

      <div id="stars3" style={{ ...starStyles, animation: "animStar 150s linear infinite", width: "3px", height: "3px", boxShadow: `20px 1000px #FFF, 120px 1400px #FFF, 220px 1600px #FFF, 320px 1800px #FFF` }}></div>

      <div
        style={{
          borderRadius: "9999px",
          background: "linear-gradient(120deg, #1D976C, #2c3e50)",
          padding: "2.5rem",
        }}
      >
        <h2 style={{ color: "#FEF3C7", fontSize: "3.75rem", marginBottom: "2rem", padding: "0 1.25rem", textAlign: "center" }}>
          Wild and Free
        </h2>

        <div
          style={{
            height: "260px",
            width: "420px",
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(35px)",
            border: "2px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 0 80px rgba(0,0,0,0.25)",
            padding: "30px",
            color: "white",
            overflow: "hidden",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1.75rem" }}>Welcome to Dashboard</h2>
          <AuthButtons />
        </div>
      </div>

      {/* Starfield Animation */}
      <style>{`
        @keyframes animStar {
          from {
            transform: translateY(0px);
          }
          to {
            transform: translateY(-2000px);
          }
        }
      `}</style>
    </div>
  );
}
