import React from "react";
import "./CloudBackground.css"

const CLOUD_COUNT = 30; 

function makeClouds(count) {
  const clouds = [];
  for (let i = 0; i < count; i++) {
    const band = i / count;
    const size = 34 + Math.random() * 76;                    // width in px
    const top = 3 + band * 90 + (Math.random() * 8 - 4);      // spread down the screen, evenly-ish
    const duration = 95 - size * 0.45 + Math.random() * 1;   // bigger clouds drift a touch faster
    const delay = -Math.random() * duration;                  // stagger so they don't start bunched up
    const opacity = 0.82 + Math.random() * 0.18;
    clouds.push({ top: `${top}%`, size, duration, delay, opacity });
  }
  return clouds;
}

const CLOUDS = makeClouds(CLOUD_COUNT);

// Shared cloud artwork, defined once and reused via <use> for every
// instance — a body path plus a soft shadow layer underneath it.
function CloudSymbolDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <g id="cloud-shape">
          <path
            d="M 0 35 C -25 35 -30 10 -5 5 C -5 -20 30 -30 45 -5 C 60 -30 100 -15 100 10 C 125 5 140 25 125 35 Z"
            fill="#E1F3FC"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          <path
            d="M -5 30 C 25 45 45 40 60 35 C 85 45 110 43 125 30 C 115 50 25 55 -5 30 Z"
            fill="#B9DDEC"
            opacity="0.9"
          />
        </g>
      </defs>
    </svg>
  );
}

function CloudShape({ style }) {
  return (
    <svg className="cloud" viewBox="0 0 170 85" style={style}>
      <use href="#cloud-shape" transform="translate(30 30)" />
    </svg>
  );
}

export default function CloudBackground({ children, className = "", id }) {
  return (
    <div id={id} className={`cloud-bg ${className}`}>
      <CloudSymbolDefs />

      {CLOUDS.map((c, i) => (
        <CloudShape
          key={i}
          style={{
            top: c.top,
            width: c.size,
            height: c.size * 0.5,
            opacity: c.opacity,
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
          }}
        />
      ))}

      <div className="cloud-bg__content">{children}</div>

      
    </div>
  );
}