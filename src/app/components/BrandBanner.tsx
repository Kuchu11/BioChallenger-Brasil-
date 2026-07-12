import React from "react";

export function BrandBanner() {
  return (
    <div className="w-full max-w-xl bg-gradient-to-br from-[#02331e] to-[#0b2413] p-8 rounded-xl shadow-lg relative overflow-hidden font-sans text-center border border-[#0f3d24]">
      <p className="text-[11px] uppercase tracking-widest text-slate-300/80 font-semibold mb-6">
        Desenvolvimento de Software · 2026
      </p>

      <div className="relative inline-block h-32 w-80 select-none">
        <span 
          className="absolute left-4 top-[-20px] text-[150px] text-white opacity-90 leading-none"
          style={{ fontFamily: "'Alex Brush', cursive" }}
        >
          S
        </span>

        <span 
          className="absolute left-[76px] top-[32px] text-4xl font-extrabold tracking-wider text-[#00ffaa] drop-shadow-sm uppercase"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          entinela
        </span>

        <span 
          className="absolute left-[92px] top-[72px] text-4xl font-medium tracking-widest text-white uppercase"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          aúde
        </span>
      </div>
    </div>
  );
}