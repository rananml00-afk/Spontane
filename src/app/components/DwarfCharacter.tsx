import { motion } from 'motion/react';

interface DwarfCharacterProps {
  name: string;
  color: string;
  role: string;
  position: 'left' | 'right';
  delay?: number;
}

export function DwarfCharacter({ name, color, role, position, delay = 0 }: DwarfCharacterProps) {
  // Modern color palette with gradients
  const getGradientColors = (baseColor: string) => {
    const colors: { [key: string]: { base: string; light: string; dark: string } } = {
      '#FF6B6B': { base: '#FF6B6B', light: '#FF8E8E', dark: '#E85555' },
      '#4ECDC4': { base: '#4ECDC4', light: '#7EDDD6', dark: '#3AB7AE' },
      '#45B7D1': { base: '#45B7D1', light: '#6FC8DC', dark: '#3399B3' },
      '#96CEB4': { base: '#96CEB4', light: '#B0DCC8', dark: '#7BB89F' },
      '#FFEAA7': { base: '#FFEAA7', light: '#FFF2C7', dark: '#FFD966' },
      '#DDA15E': { base: '#DDA15E', light: '#E8B77D', dark: '#C8854A' },
      '#BC6C25': { base: '#BC6C25', light: '#D18847', dark: '#A05A1E' },
    };
    return colors[baseColor] || { base: baseColor, light: baseColor, dark: baseColor };
  };

  const gradients = getGradientColors(color);

  return (
    <motion.div
      initial={{ opacity: 0, x: position === 'left' ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center"
    >
      <motion.div
        animate={{ 
          y: [0, -12, 0],
        }}
        transition={{ 
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay
        }}
        className="relative"
      >
        <svg width="140" height="160" viewBox="0 0 140 160" className="drop-shadow-2xl">
          <defs>
            {/* Gradient definitions for modern look */}
            <linearGradient id={`bodyGrad-${name}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: gradients.light, stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: gradients.base, stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id={`darkGrad-${name}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: gradients.base, stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: gradients.dark, stopOpacity: 1 }} />
            </linearGradient>
            <radialGradient id={`faceGrad-${name}`}>
              <stop offset="0%" style={{ stopColor: '#FFE4D1', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#FFDCC1', stopOpacity: 1 }} />
            </radialGradient>
            
            {/* Shadow filter */}
            <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
              <feOffset dx="0" dy="3" result="offsetblur"/>
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.2"/>
              </feComponentTransfer>
              <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Ground shadow */}
          <ellipse cx="70" cy="150" rx="35" ry="8" fill="rgba(0,0,0,0.15)" />
          
          {/* Body - Modern rounded shape */}
          <path
            d="M 45 85 Q 40 95 42 110 L 42 130 Q 42 135 48 135 L 92 135 Q 98 135 98 130 L 98 110 Q 100 95 95 85 Z"
            fill={`url(#bodyGrad-${name})`}
            stroke="none"
            filter="url(#softShadow)"
          />
          
          {/* Body outline for definition */}
          <path
            d="M 45 85 Q 40 95 42 110 L 42 130 Q 42 135 48 135 L 92 135 Q 98 135 98 130 L 98 110 Q 100 95 95 85 Z"
            fill="none"
            stroke="rgba(0,0,0,0.1)"
            strokeWidth="1"
          />
          
          {/* Belt - Modern minimalist */}
          <rect x="40" y="110" width="60" height="6" rx="3" fill="#6B4423" opacity="0.9"/>
          <circle cx="70" cy="113" r="5" fill="#FFD700" stroke="#E6C200" strokeWidth="1.5"/>
          
          {/* Left Arm */}
          <motion.g
            animate={{ rotate: [-8, 8, -8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "45px 88px" }}
          >
            <path
              d="M 45 88 Q 30 92 22 102 Q 20 105 20 108"
              fill="none"
              stroke={`url(#bodyGrad-${name})`}
              strokeWidth="14"
              strokeLinecap="round"
              filter="url(#softShadow)"
            />
            {/* Hand */}
            <circle 
              cx="20" 
              cy="108" 
              r="7" 
              fill={`url(#faceGrad-${name})`}
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="1"
            />
          </motion.g>
          
          {/* Right Arm */}
          <motion.g
            animate={{ rotate: [8, -8, 8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            style={{ transformOrigin: "95px 88px" }}
          >
            <path
              d="M 95 88 Q 110 92 118 102 Q 120 105 120 108"
              fill="none"
              stroke={`url(#bodyGrad-${name})`}
              strokeWidth="14"
              strokeLinecap="round"
              filter="url(#softShadow)"
            />
            {/* Hand */}
            <circle 
              cx="120" 
              cy="108" 
              r="7" 
              fill={`url(#faceGrad-${name})`}
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="1"
            />
          </motion.g>
          
          {/* Legs - Modern style */}
          <rect x="50" y="130" width="12" height="18" rx="6" fill="#4A3422" filter="url(#softShadow)"/>
          <rect x="78" y="130" width="12" height="18" rx="6" fill="#4A3422" filter="url(#softShadow)"/>
          
          {/* Shoes - Stylized */}
          <ellipse cx="56" cy="148" rx="9" ry="5" fill="#2C1E15"/>
          <ellipse cx="84" cy="148" rx="9" ry="5" fill="#2C1E15"/>
          <ellipse cx="56" cy="147" rx="7" ry="3" fill="#3D2A1F"/>
          <ellipse cx="84" cy="147" rx="7" ry="3" fill="#3D2A1F"/>
          
          {/* Head - Perfect circle, modern proportions */}
          <circle 
            cx="70" 
            cy="58" 
            r="28" 
            fill={`url(#faceGrad-${name})`}
            filter="url(#softShadow)"
          />
          <circle 
            cx="70" 
            cy="58" 
            r="28" 
            fill="none"
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="1"
          />
          
          {/* Ears */}
          <circle cx="45" cy="58" r="6" fill="#FFDCC1"/>
          <circle cx="95" cy="58" r="6" fill="#FFDCC1"/>
          <circle cx="45" cy="58" r="3" fill="#FFD1B3"/>
          <circle cx="95" cy="58" r="3" fill="#FFD1B3"/>
          
          {/* Beard - Modern, stylized */}
          <path
            d="M 48 64 Q 45 72 48 78 L 52 76 Q 58 80 70 80 Q 82 80 88 76 L 92 78 Q 95 72 92 64 Q 88 60 82 62 Q 76 58 70 58 Q 64 58 58 62 Q 52 60 48 64"
            fill="#F5F5F5"
            stroke="rgba(0,0,0,0.1)"
            strokeWidth="1"
          />
          {/* Beard texture - subtle lines */}
          <path d="M 52 68 Q 58 72 64 70" fill="none" stroke="#E8E8E8" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M 76 70 Q 82 72 88 68" fill="none" stroke="#E8E8E8" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M 56 74 Q 64 76 70 76 Q 76 76 84 74" fill="none" stroke="#E8E8E8" strokeWidth="1.5" strokeLinecap="round"/>
          
          {/* Hair - Modern tufts */}
          <path
            d="M 50 35 Q 45 32 42 35 Q 42 38 45 40"
            fill="#E0E0E0"
            stroke="rgba(0,0,0,0.1)"
            strokeWidth="1"
          />
          <path
            d="M 90 35 Q 95 32 98 35 Q 98 38 95 40"
            fill="#E0E0E0"
            stroke="rgba(0,0,0,0.1)"
            strokeWidth="1"
          />
          
          {/* Hat - Modern, sophisticated */}
          <path
            d="M 42 50 L 38 32 Q 38 22 70 22 Q 102 22 102 32 L 98 50"
            fill={`url(#darkGrad-${name})`}
            filter="url(#softShadow)"
          />
          <ellipse 
            cx="70" 
            cy="50" 
            rx="30" 
            ry="7" 
            fill={`url(#bodyGrad-${name})`}
          />
          {/* Hat band detail */}
          <ellipse 
            cx="70" 
            cy="50" 
            rx="30" 
            ry="3" 
            fill={gradients.dark}
            opacity="0.3"
          />
          
          {/* Eyes - Large, expressive, Disney-style */}
          <motion.g
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
          >
            {/* Eye whites */}
            <ellipse cx="60" cy="55" rx="5" ry="6" fill="#FFF"/>
            <ellipse cx="80" cy="55" rx="5" ry="6" fill="#FFF"/>
            {/* Iris */}
            <circle cx="60" cy="56" r="4" fill="#4A3422"/>
            <circle cx="80" cy="56" r="4" fill="#4A3422"/>
            {/* Pupils */}
            <circle cx="61" cy="56" r="2.5" fill="#000"/>
            <circle cx="81" cy="56" r="2.5" fill="#000"/>
            {/* Shine/highlights */}
            <circle cx="62" cy="54" r="1.5" fill="#FFF"/>
            <circle cx="82" cy="54" r="1.5" fill="#FFF"/>
          </motion.g>
          
          {/* Eyebrows - Expressive */}
          <path
            d="M 53 48 Q 58 46 63 47"
            fill="none"
            stroke="#8B6F47"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 77 47 Q 82 46 87 48"
            fill="none"
            stroke="#8B6F47"
            strokeWidth="2"
            strokeLinecap="round"
          />
          
          {/* Nose - Cute, rounded */}
          <ellipse cx="70" cy="62" rx="4" ry="5" fill="#FFDCC1"/>
          <ellipse cx="70" cy="63" rx="3" ry="3.5" fill="#FFD1B3"/>
          
          {/* Smile - Warm and friendly */}
          <path
            d="M 58 68 Q 70 72 82 68"
            fill="none"
            stroke="#D4968A"
            strokeWidth="2"
            strokeLinecap="round"
          />
          
          {/* Rosy cheeks - Subtle */}
          <ellipse cx="52" cy="60" rx="6" ry="4" fill="#FFB6C1" opacity="0.4"/>
          <ellipse cx="88" cy="60" rx="6" ry="4" fill="#FFB6C1" opacity="0.4"/>
        </svg>
      </motion.div>
      
      <motion.div 
        className="text-center mt-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: delay + 0.3 }}
      >
        <p className="font-bold text-xl mb-1" style={{ color: gradients.dark }}>{name}</p>
        <p className="text-sm text-gray-600 font-medium">{role}</p>
      </motion.div>
    </motion.div>
  );
}
