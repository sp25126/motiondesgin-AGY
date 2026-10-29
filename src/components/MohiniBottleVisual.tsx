import React from 'react';
import { useCurrentFrame } from 'remotion';

export const MohiniBottleVisual: React.FC<{ progress?: number }> = () => {
	const frame = useCurrentFrame();

	// Subtle floating animation for bottle
	const floatOffset = Math.sin(frame / 20) * 6;
	const glowPulse = 0.85 + Math.sin(frame / 15) * 0.15;

	// Floating particles setup
	const particles = Array.from({ length: 14 }).map((_, i) => {
		const seed = i * 137.5;
		const startX = 60 + ((seed * 7) % 280);
		const speed = 0.8 + (i % 3) * 0.4;
		const yPos = 380 - ((frame * speed + seed) % 360);
		const opacity = Math.sin((yPos / 360) * Math.PI);
		const size = 2 + (i % 3) * 1.5;
		return { x: startX, y: yPos, opacity: Math.max(0, opacity), size };
	});

	return (
		<div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
			{/* Radial Backlight Glow */}
			<div
				style={{
					position: 'absolute',
					width: '320px',
					height: '320px',
					borderRadius: '50%',
					background: 'radial-gradient(circle, rgba(212, 175, 55, 0.25) 0%, rgba(10, 58, 42, 0.4) 45%, rgba(13, 13, 13, 0) 70%)',
					transform: `scale(${glowPulse})`,
					filter: 'blur(30px)',
					pointerEvents: 'none',
				}}
			/>

			{/* SVG Vector Render of Mohini Attar Bottle & Pedestal */}
			<svg width="400" height="420" viewBox="0 0 400 420" fill="none" xmlns="http://www.w3.org/2000/svg">
				<defs>
					{/* Gold Pedestal Gradients */}
					<linearGradient id="goldTop" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#F9F1D0" />
						<stop offset="40%" stopColor="#D4AF37" />
						<stop offset="70%" stopColor="#AA7C11" />
						<stop offset="100%" stopColor="#5E4306" />
					</linearGradient>

					<linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="#7A5A0B" />
						<stop offset="30%" stopColor="#F3E5AB" />
						<stop offset="60%" stopColor="#D4AF37" />
						<stop offset="100%" stopColor="#4A3403" />
					</linearGradient>

					<linearGradient id="pedestalBody" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" stopColor="#C59B27" />
						<stop offset="50%" stopColor="#8A630F" />
						<stop offset="100%" stopColor="#2A1E04" />
					</linearGradient>

					{/* Glass Bottle Gradients */}
					<linearGradient id="amberGlass" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="#1A0D05" />
						<stop offset="25%" stopColor="#4A260D" />
						<stop offset="50%" stopColor="#8C4A19" />
						<stop offset="75%" stopColor="#361A09" />
						<stop offset="100%" stopColor="#0F0703" />
					</linearGradient>

					<linearGradient id="bottleHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
						<stop offset="50%" stopColor="rgba(255, 255, 255, 0.05)" />
						<stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
					</linearGradient>

					<linearGradient id="goldLabel" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#231B0C" />
						<stop offset="50%" stopColor="#120E07" />
						<stop offset="100%" stopColor="#1A1409" />
					</linearGradient>

					<linearGradient id="labelBorder" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#F7E7A9" />
						<stop offset="50%" stopColor="#D4AF37" />
						<stop offset="100%" stopColor="#8A630F" />
					</linearGradient>

					{/* Soft Drop Shadow */}
					<filter id="shadowFilter" x="-20%" y="-20%" width="140%" height="140%">
						<feGaussianBlur in="SourceAlpha" stdDeviation="12" />
						<feOffset dx="0" dy="18" result="offsetblur" />
						<feComponentTransfer>
							<feFuncA type="linear" slope="0.65" />
						</feComponentTransfer>
						<feMerge>
							<feMergeNode />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				</defs>

				{/* Floating Particles in SVG */}
				{particles.map((p, idx) => (
					<circle key={idx} cx={p.x} cy={p.y} r={p.size} fill="#F7E7A9" opacity={p.opacity} />
				))}

				{/* Base Pedestal Shadow */}
				<ellipse cx="200" cy="365" rx="130" ry="25" fill="#050505" opacity="0.8" filter="url(#shadowFilter)" />

				{/* 3D Brushed Gold Pedestal */}
				<g id="GoldPedestal">
					{/* Pedestal Cylinder Side */}
					<path d="M 80 340 L 80 360 Q 200 385 320 360 L 320 340 Z" fill="url(#pedestalBody)" />

					{/* Outer Rim Ring */}
					<ellipse cx="200" cy="340" rx="120" ry="22" fill="url(#goldRim)" />

					{/* Top Ellipse Surface */}
					<ellipse cx="200" cy="338" rx="116" ry="19" fill="url(#goldTop)" />
					<ellipse cx="200" cy="338" rx="114" ry="17" fill="#14110A" opacity="0.25" />
				</g>

				{/* Floating Bottle Group */}
				<g transform={`translate(0, ${floatOffset})`}>
					{/* Bottle Contact Shadow on Pedestal */}
					<ellipse cx="200" cy="336" rx="42" ry="10" fill="#000000" opacity="0.75" />

					{/* Bottle Body */}
					<g id="AttarBottle">
						{/* Amber Glass Body */}
						<rect x="156" y="160" width="88" height="170" rx="20" fill="url(#amberGlass)" filter="url(#shadowFilter)" />
						<rect x="157" y="161" width="86" height="168" rx="19" stroke="url(#labelBorder)" strokeWidth="1" strokeOpacity="0.3" fill="none" />

						{/* Glass Highlight Rim Left */}
						<path d="M 160 175 C 160 165, 168 162, 175 162 L 175 325 C 166 325, 160 318, 160 305 Z" fill="url(#bottleHighlight)" />

						{/* Bottle Neck */}
						<rect x="182" y="130" width="36" height="32" rx="4" fill="url(#amberGlass)" />
						<rect x="180" y="125" width="40" height="10" rx="3" fill="url(#goldRim)" />

						{/* Black Dropper Cap */}
						<path d="M 184 125 L 216 125 L 212 75 C 212 68, 188 68, 188 75 Z" fill="#111" />
						<rect x="185" y="70" width="30" height="8" rx="4" fill="#222" />

						{/* Gold Ring on Dropper Cap */}
						<rect x="182" y="115" width="36" height="6" fill="url(#goldTop)" />

						{/* Luxury Label */}
						<rect x="165" y="195" width="70" height="105" rx="4" fill="url(#goldLabel)" stroke="url(#labelBorder)" strokeWidth="1.5" />
						<rect x="168" y="198" width="64" height="99" rx="2" stroke="url(#labelBorder)" strokeWidth="0.5" fill="none" strokeDasharray="3 2" />

						{/* Label Typography */}
						<text x="200" y="216" textAnchor="middle" fill="#D4AF37" fontSize="8" letterSpacing="2" fontFamily="serif">
							THE CLEAR FORTRESS
						</text>

						<text x="200" y="240" textAnchor="middle" fill="#FFF8E7" fontSize="16" fontWeight="bold" letterSpacing="1" fontFamily="Georgia, serif">
							MOHINI
						</text>

						<text x="200" y="254" textAnchor="middle" fill="#D4AF37" fontSize="7" letterSpacing="1.5" fontFamily="sans-serif">
							ANCIENT LOVE ATTAR
						</text>

						<line x1="178" y1="262" x2="222" y2="262" stroke="#D4AF37" strokeWidth="0.5" opacity="0.6" />

						<text x="200" y="272" textAnchor="middle" fill="#C5C5C5" fontSize="6.5" letterSpacing="0.5" fontFamily="sans-serif">
							PURE BOTANICAL
						</text>
						<text x="200" y="282" textAnchor="middle" fill="#D4AF37" fontSize="6" letterSpacing="0.8" fontFamily="sans-serif">
							KANNAUJ • INDIA
						</text>
					</g>

					{/* Saffron Filaments resting around bottle base */}
					<g id="SaffronThreads" opacity="0.95">
						<path d="M 145 338 C 130 330, 125 345, 115 340 C 110 338, 105 342, 100 339" stroke="#E0402B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
						<path d="M 148 340 C 140 348, 130 342, 120 350 C 115 352, 110 348, 104 353" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" fill="none" />
						<path d="M 252 338 C 265 330, 272 345, 285 339 C 290 337, 295 342, 302 338" stroke="#E0402B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
						<path d="M 248 341 C 258 348, 270 343, 280 350" stroke="#E06D53" strokeWidth="2" strokeLinecap="round" fill="none" />
					</g>

					{/* White Jasmine Petals */}
					<g id="JasminePetals" opacity="0.9">
						<path d="M 125 325 C 115 315, 100 325, 110 335 C 120 345, 135 335, 125 325 Z" fill="#FDFBF7" stroke="#EAE5D9" strokeWidth="0.5" />
						<circle cx="118" cy="328" r="2" fill="#E6C657" />

						<path d="M 275 322 C 285 312, 300 322, 290 332 C 280 342, 265 332, 275 322 Z" fill="#FDFBF7" stroke="#EAE5D9" strokeWidth="0.5" />
						<circle cx="282" cy="326" r="2" fill="#E6C657" />
					</g>
				</g>
			</svg>
		</div>
	);
};
