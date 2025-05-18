// components/ParallaxStars.jsx

import GlassForm from './GlassForm'
import './ParallaxStars.css'

export default function ParallaxStars() {
  return (
    <div className="relative h-screen overflow-hidden bg-[#090A0F]  flex w-full justify-center items-center">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
        <GlassForm />

      
    </div>
  )
}
