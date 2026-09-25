import "./ThunderLoading.css"

export default function ThunderLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0d14]">
      <svg
        viewBox="0 0 300 210"
        width="300"
        height="210"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Two thunderclouds colliding with lightning"
      >
        <defs>
          <radialGradient id="cloudGrad" cx="45%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#7a8292" />
            <stop offset="45%" stopColor="#4c5362" />
            <stop offset="100%" stopColor="#1e222c" />
          </radialGradient>

          <filter id="boltGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="sparkGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Ground reflection glow */}
          <radialGradient id="groundGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffe44d" stopOpacity="0.75" />
            <stop offset="55%" stopColor="#f5a800" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#f5a800" stopOpacity="0" />
          </radialGradient>

          {/* Ambient sky pulse */}
          <radialGradient id="skyGlow" cx="50%" cy="80%" r="55%">
            <stop offset="0%" stopColor="#ffe44d" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffe44d" stopOpacity="0" />
          </radialGradient>

          {/* Lightning Gradients */}
          <linearGradient id="boltGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#ffe44d" />
            <stop offset="100%" stopColor="#f5a800" stopOpacity="0.7" />
          </linearGradient>

          <linearGradient id="boltGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff8cf" />
            <stop offset="40%" stopColor="#ffd700" />
            <stop offset="100%" stopColor="#e08c00" stopOpacity="0.6" />
          </linearGradient>

          {/* Sun Core & Corona Gradients */}
          <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#fff3a8" />
            <stop offset="75%" stopColor="#f5a800" />
            <stop offset="100%" stopColor="#e08000" />
          </radialGradient>

          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffd700" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#f59e0b" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>

          {/* Reusable improved cloud model */}
          <g id="cloud-unit">
            {/* Main cloud body */}
            <path
              d="
                M 18,46
                C 6,46 1,37 1,28
                C 1,18 9,11 20,11
                C 23,4 32,1 42,1
                C 54,1 63,6 67,14
                C 71,12 76,11 81,11
                C 92,11 100,19 102,29
                C 107,32 111,38 111,44
                C 111,52 105,58 97,58
                L 18,58
                C 12,58 8,53 8,49
                C 8,46 13,46 18,46 Z
              "
              fill="url(#cloudGrad)"
            />
            {/* Top rim highlight */}
            <path
              d="
                M 20,12
                C 23,5 32,2 42,2
                C 54,2 62,7 66,15
                C 71,13 76,12 81,12
                C 90,12 97,18 100,26
                C 94,22 86,19 79,19
                C 72,19 66,22 62,25
                C 56,16 46,12 37,12
                C 29,12 24,15 20,19
                Z
              "
              fill="#9aa3b4"
              opacity="0.35"
            />
            {/* Bottom shadow */}
            <path
              d="
                M 12,52
                C 18,56 28,57 42,57
                C 60,57 76,55 92,54
                C 100,53 106,55 110,50
                C 110,56 104,58 97,58
                L 18,58
                C 12,58 8,55 8,52
                Z
              "
              fill="#10131a"
              opacity="0.65"
            />
          </g>
        </defs>

        {/* Ambient sky flash behind clouds */}
        <ellipse className="sky-pulse" cx="150" cy="175" rx="120" ry="35" fill="url(#skyGlow)" />

        {/* ── THE SUN (VISIBLE IN GAP, FADES OUT UPWARD ON COLLISION) ── */}
        <g className="sun-element">
          <circle cx="150" cy="46" r="26" fill="url(#sunGlow)" filter="url(#sparkGlow)" />
          <circle cx="150" cy="46" r="14" fill="url(#sunGrad)" />
        </g>

        {/* ── LIGHTNING BOLTS (BEHIND THE CLOUDS) ── */}

        {/* BOLT 1 — LEFT BRANCH */}
        <g className="bolt1" filter="url(#boltGlow)">
          <polygon
            points="148,60 138,60 144,85 132,85 143,128 150,128 141,104 154,104"
            fill="#f5a800"
            opacity="0.4"
            transform="scale(1.15) translate(-22,-14)"
          />
          <polygon
            points="148,60 138,60 144,85 132,85 143,128 150,128 141,104 154,104"
            fill="url(#boltGrad)"
          />
          <polygon
            points="145,60 140,60 145,83 137,83 145,118 149,118 142,102 150,102"
            fill="white"
            opacity="0.65"
          />
          <line x1="143" y1="124" x2="135" y2="148" stroke="#ffe44d" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="143" y1="124" x2="149" y2="144" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
          <line x1="135" y1="148" x2="128" y2="168" stroke="#ffd700" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
        </g>

        {/* BOLT 2 — CENTER MAIN STRIKE */}
        <g className="bolt2" filter="url(#boltGlow)">
          <polygon
            points="154,60 145,60 151,82 140,82 150,122 156,122 149,101 160,101"
            fill="url(#boltGrad2)"
          />
          <polygon
            points="152,60 147,60 152,80 143,80 151,114 154,114 149,98 157,98"
            fill="white"
            opacity="0.5"
          />
          <line x1="150" y1="118" x2="144" y2="142" stroke="#ffe44d" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="144" y1="142" x2="152" y2="165" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.85" />
          <line x1="150" y1="118" x2="157" y2="138" stroke="#fff5b0" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
        </g>

        {/* BOLT 3 — RIGHT BRANCH */}
        <g className="bolt3" filter="url(#boltGlow)">
          <polygon
            points="156,60 148,60 153,80 143,80 153,115 159,115 151,95 162,95"
            fill="url(#boltGrad2)"
            opacity="0.9"
          />
          <polygon
            points="154,60 149,60 154,78 146,78 154,108 157,108 151,92 158,92"
            fill="white"
            opacity="0.45"
          />
          <line x1="153" y1="110" x2="164" y2="138" stroke="#ffe44d" strokeWidth="1.3" strokeLinecap="round" />
          <line x1="164" y1="138" x2="172" y2="160" stroke="#ffd700" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        </g>

        {/* ── TWO CLOUDS IN FRONT OF LIGHTNING ── */}

        {/* Left Cloud */}
        <g transform="translate(25, 25)">
          <g className="cloud-left">
            <use href="#cloud-unit" />
          </g>
        </g>

        {/* Right Cloud */}
        <g transform="translate(275, 25)">
          <g className="cloud-right">
            <g transform="scale(-1, 1)">
              <use href="#cloud-unit" />
            </g>
          </g>
        </g>

        {/* Ground reflection glow below center strike */}
        <ellipse className="ground-pulse" cx="150" cy="182" rx="72" ry="12" fill="url(#groundGlow)" />
      </svg>

      <div className="loading">
        Loading...
      </div>
    </div>
  );
}
