import React from 'react';

interface StageLogoRefProps {
	size?: number;
	showWordmark?: boolean;
	glowIntensity?: number;
	textColor?: string;
	style?: React.CSSProperties;
}

/**
 * Authentic STAGE Logo Mark matching the reference image:
 * - Faceted blue-cyan speech bubble / shield
 * - Top-left digital pixel blocks
 * - White dynamic checkmark flowing into an upward-right arrowhead (↗)
 * - Bottom energetic swoosh curve
 * - Bold geometric "STAGE" wordmark
 */
export const StageLogoRef: React.FC<StageLogoRefProps> = ({
	size = 280,
	showWordmark = true,
	glowIntensity = 1,
	textColor = '#FFFFFF',
	style,
}) => {
	const glowColor = 'rgba(0, 194, 255, 0.45)';
	const deepGlowColor = 'rgba(10, 79, 213, 0.55)';

	return (
		<div
			style={{
				display: 'inline-flex',
				alignItems: 'center',
				gap: size * 0.22,
				...style,
			}}
		>
			{/* STAGE Icon Graphic */}
			<div
				style={{
					position: 'relative',
					width: size,
					height: size,
					filter: glowIntensity > 0
						? `drop-shadow(0 0 ${25 * glowIntensity}px ${glowColor}) drop-shadow(0 0 ${60 * glowIntensity}px ${deepGlowColor})`
						: 'none',
				}}
			>
				<svg
					width={size}
					height={size}
					viewBox="0 0 200 200"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>
						{/* Facet Gradient 1 - Top Left Sky Blue */}
						<linearGradient id="facetTopLeft" x1="40" y1="50" x2="120" y2="110" gradientUnits="userSpaceOnUse">
							<stop offset="0%" stopColor="#00E5FF" />
							<stop offset="45%" stopColor="#0091FF" />
							<stop offset="100%" stopColor="#0055D4" />
						</linearGradient>

						{/* Facet Gradient 2 - Main Center Body */}
						<linearGradient id="facetCenter" x1="70" y1="60" x2="150" y2="150" gradientUnits="userSpaceOnUse">
							<stop offset="0%" stopColor="#0088FF" />
							<stop offset="60%" stopColor="#0050D8" />
							<stop offset="100%" stopColor="#052882" />
						</linearGradient>

						{/* Facet Gradient 3 - Deep Shadow Bottom Right */}
						<linearGradient id="facetBottom" x1="100" y1="110" x2="150" y2="160" gradientUnits="userSpaceOnUse">
							<stop offset="0%" stopColor="#0A46BF" />
							<stop offset="100%" stopColor="#041E66" />
						</linearGradient>

						{/* Arrow Shaft & Head Gradient */}
						<linearGradient id="arrowGrad" x1="70" y1="120" x2="160" y2="50" gradientUnits="userSpaceOnUse">
							<stop offset="0%" stopColor="#FFFFFF" />
							<stop offset="70%" stopColor="#F0F9FF" />
							<stop offset="100%" stopColor="#00C2FF" />
						</linearGradient>

						{/* Arrow Head Accent */}
						<linearGradient id="arrowHeadGrad" x1="130" y1="80" x2="168" y2="52" gradientUnits="userSpaceOnUse">
							<stop offset="0%" stopColor="#0080FF" />
							<stop offset="50%" stopColor="#00B4FF" />
							<stop offset="100%" stopColor="#00F0FF" />
						</linearGradient>

						{/* Swoosh Gradient */}
						<linearGradient id="swooshGrad" x1="30" y1="120" x2="120" y2="150" gradientUnits="userSpaceOnUse">
							<stop offset="0%" stopColor="#021B54" stopOpacity="0" />
							<stop offset="30%" stopColor="#0077FE" />
							<stop offset="70%" stopColor="#00C2FF" />
							<stop offset="100%" stopColor="#FFFFFF" />
						</linearGradient>

						{/* Pixel Block Gradients */}
						<linearGradient id="pixelCyan" x1="30" y1="50" x2="50" y2="70" gradientUnits="userSpaceOnUse">
							<stop offset="0%" stopColor="#00F5FF" />
							<stop offset="100%" stopColor="#00A3FF" />
						</linearGradient>
						<linearGradient id="pixelBlue" x1="50" y1="50" x2="70" y2="70" gradientUnits="userSpaceOnUse">
							<stop offset="0%" stopColor="#0088FF" />
							<stop offset="100%" stopColor="#004AD4" />
						</linearGradient>
					</defs>

					{/* ── Top-Left Digital Pixel Blocks ── */}
					<rect x="42" y="52" width="16" height="16" rx="2.5" fill="url(#pixelCyan)" />
					<rect x="58" y="52" width="16" height="16" rx="2.5" fill="url(#pixelBlue)" />
					<rect x="42" y="68" width="16" height="16" rx="2.5" fill="url(#pixelBlue)" />

					{/* ── Shield / Speech Bubble Faceted Body ── */}
					{/* Main Shield Silhouette */}
					<path
						d="M62 68 H138 C144 68 149 73 149 79 V126 C149 130 146 134 142 136 L124 145 H108 L86 160 V145 H74 C67 145 62 140 62 133 V79 C62 73 67 68 74 68 Z"
						fill="url(#facetCenter)"
					/>

					{/* 3D Facet Highlight Triangle (Top Left) */}
					<path
						d="M62 79 L100 115 L62 125 Z"
						fill="url(#facetTopLeft)"
						opacity="0.85"
					/>

					{/* 3D Facet Shading Polygon (Bottom Right) */}
					<path
						d="M108 145 L149 120 V136 L124 145 Z"
						fill="url(#facetBottom)"
						opacity="0.95"
					/>

					{/* Speech Bubble Downward Tail */}
					<path
						d="M86 145 L86 160 L108 145 Z"
						fill="#021E62"
					/>

					{/* ── Dynamic Checkmark & Rising Upward Arrow ── */}
					{/* White Checkmark stem slicing through */}
					<path
						d="M58 116 L88 140 L152 76 L138 68 L88 120 L70 106 Z"
						fill="url(#arrowGrad)"
					/>

					{/* Rising Arrow Head (Top Right) */}
					<path
						d="M136 66 L164 54 L152 82 L146 72 L136 66 Z"
						fill="url(#arrowHeadGrad)"
					/>

					{/* ── Dynamic Bottom Swoosh Arc ── */}
					<path
						d="M44 132 C42 148 54 165 74 172 C96 178 126 172 145 156"
						stroke="url(#swooshGrad)"
						strokeWidth="5.5"
						strokeLinecap="round"
					/>
				</svg>
			</div>

			{/* STAGE Wordmark */}
			{showWordmark && (
				<span
					style={{
						fontSize: size * 0.44,
						fontWeight: 900,
						fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
						letterSpacing: '0.06em',
						color: textColor,
						lineHeight: 1,
						textTransform: 'uppercase',
						textShadow: glowIntensity > 0
							? `0 0 ${20 * glowIntensity}px rgba(0, 194, 255, 0.6), 0 0 ${45 * glowIntensity}px rgba(0, 119, 254, 0.4)`
							: 'none',
					}}
				>
					STAGE
				</span>
			)}
		</div>
	);
};
