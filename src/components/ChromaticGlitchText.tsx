import React from 'react';
import { useCurrentFrame } from 'remotion';

interface ChromaticGlitchTextProps {
	text: string;
	fontSize?: number;
	glitchIntensity?: number; // 0 to 1 (0.15 = 15%)
	color?: string;
}

export const ChromaticGlitchText: React.FC<ChromaticGlitchTextProps> = ({
	text,
	fontSize = 92,
	glitchIntensity = 0.15,
	color = '#FFFFFF',
}) => {
	const frame = useCurrentFrame();

	// 15% Chromatic Aberration channel displacement
	const isGlitching = (frame % 4 === 0 || frame % 7 === 0) && glitchIntensity > 0;
	const shiftPx = glitchIntensity * (isGlitching ? 24 : 10);
	const jitterX = isGlitching ? Math.sin(frame * 3.4) * 6 : 0;
	const jitterY = isGlitching ? Math.cos(frame * 2.8) * 3 : 0;

	// Random slice displacement
	const sliceTop = (frame * 17) % 80;
	const sliceHeight = 15;

	return (
		<div
			style={{
				position: 'relative',
				display: 'inline-block',
				fontFamily: '"Bricolage Grotesque", "Inter", -apple-system, sans-serif',
				fontWeight: 900,
				fontSize,
				letterSpacing: '-0.04em',
				lineHeight: 1,
				transform: `translate(${jitterX}px, ${jitterY}px)`,
				userSelect: 'none',
			}}
		>
			{/* ── RED / MAGENTA CHANNEL ABERRATION ── */}
			<span
				style={{
					position: 'absolute',
					left: 0,
					top: 0,
					color: '#FF0055',
					transform: `translate(${-shiftPx}px, 0)`,
					opacity: 0.85,
					mixBlendMode: 'screen',
					clipPath: isGlitching
						? `polygon(0 ${sliceTop}%, 100% ${sliceTop}%, 100% ${sliceTop + sliceHeight}%, 0 ${sliceTop + sliceHeight}%)`
						: 'none',
				}}
			>
				{text}
			</span>

			{/* ── CYAN / ELECTRIC BLUE CHANNEL ABERRATION ── */}
			<span
				style={{
					position: 'absolute',
					left: 0,
					top: 0,
					color: '#00F0FF',
					transform: `translate(${shiftPx}px, 0)`,
					opacity: 0.85,
					mixBlendMode: 'screen',
					clipPath: isGlitching
						? `polygon(0 ${sliceTop + 20}%, 100% ${sliceTop + 20}%, 100% ${sliceTop + sliceHeight + 20}%, 0 ${sliceTop + sliceHeight + 20}%)`
						: 'none',
				}}
			>
				{text}
			</span>

			{/* ── MAIN WHITE CORE TEXT ── */}
			<span
				style={{
					position: 'relative',
					color,
					textShadow: `
						0 0 20px rgba(0, 240, 255, 0.6),
						0 0 40px rgba(255, 0, 85, 0.4)
					`,
				}}
			>
				{text}
			</span>

			{/* ── DIGITAL SCANLINE OVERLAY ── */}
			{isGlitching && (
				<div
					style={{
						position: 'absolute',
						inset: -10,
						backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)',
						backgroundSize: '100% 4px',
						pointerEvents: 'none',
						opacity: 0.6,
					}}
				/>
			)}
		</div>
	);
};
