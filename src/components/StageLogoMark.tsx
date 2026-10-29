import React from 'react';

interface StageLogoMarkProps {
	size?: number;
	showWordmark?: boolean;
	textColor?: string;
}

export const StageLogoMark: React.FC<StageLogoMarkProps> = ({
	size = 36,
	showWordmark = true,
	textColor = '#16141A',
}) => {
	return (
		<div style={{ display: 'inline-flex', alignItems: 'center', gap: `${size * 0.35}px` }}>
			{/* STAGE Shield-Arrow Logo Icon */}
			<svg
				width={size}
				height={size}
				viewBox="0 0 100 100"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				style={{ filter: 'drop-shadow(0 4px 12px rgba(2, 132, 199, 0.25))' }}
			>
				<defs>
					<linearGradient id="stageShieldGrad" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
						<stop offset="0%" stopColor="#0284C7" />
						<stop offset="50%" stopColor="#2563EB" />
						<stop offset="100%" stopColor="#1E3A8A" />
					</linearGradient>

					<linearGradient id="stageArrowGrad" x1="20" y1="80" x2="85" y2="15" gradientUnits="userSpaceOnUse">
						<stop offset="0%" stopColor="#38BDF8" />
						<stop offset="100%" stopColor="#2563EB" />
					</linearGradient>
				</defs>

				{/* Digital Pixel Blocks (Top-Left) */}
				<rect x="12" y="14" width="10" height="10" rx="2" fill="#38BDF8" />
				<rect x="25" y="14" width="10" height="10" rx="2" fill="#0284C7" />
				<rect x="12" y="27" width="10" height="10" rx="2" fill="#0284C7" />

				{/* Shield/Speech Bubble Base */}
				<path
					d="M25 38 C25 32 30 27 36 27 H75 C82 27 87 32 87 38 V65 C87 72 82 77 75 77 H45 L32 88 V77 H36 C30 77 25 72 25 65 V38 Z"
					fill="url(#stageShieldGrad)"
				/>

				{/* Dynamic Checkmark & Upward Arrow Arc */}
				<path
					d="M32 50 L46 64 L80 24 L72 18 L46 50 L38 42 L32 50 Z"
					fill="#FFFFFF"
				/>

				{/* Upward Arrow Head (Top Right) */}
				<path
					d="M74 15 L92 28 L78 38 L81 26 L74 15 Z"
					fill="url(#stageArrowGrad)"
				/>

				{/* Bottom Swoosh Arc */}
				<path
					d="M18 68 C30 84 62 86 82 72"
					stroke="#0284C7"
					strokeWidth="5"
					strokeLinecap="round"
				/>
			</svg>

			{/* STAGE Wordmark */}
			{showWordmark && (
				<span
					style={{
						fontSize: `${size * 0.7}px`,
						fontWeight: 900,
						fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
						letterSpacing: '0.08em',
						color: textColor,
						lineHeight: 1,
					}}
				>
					STAGE
				</span>
			)}
		</div>
	);
};
