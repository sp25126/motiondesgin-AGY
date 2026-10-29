import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { StageLogoMark } from './StageLogoMark';

// Words split for staggered reveal — each word springs in independently
const HEADLINE_WORDS = ['Get', 'client', 'feedback', 'on', 'the'];
const HEADLINE_ITALIC = 'live page';
const HEADLINE_SUFFIX = ', not in screenshots.';

export const StageHeaderLockup: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	if (frame < 308) return null;

	// === Logo spring entrance ===
	const logoSpring = spring({
		frame: frame - 312,
		fps,
		config: { stiffness: 180, damping: 16 },
	});

	const logoOpacity = interpolate(frame, [310, 322], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

	// === Staggered headline word reveals (each word = 4-frame stagger) ===
	const allWords = [...HEADLINE_WORDS, HEADLINE_ITALIC, HEADLINE_SUFFIX];
	const wordSprings = allWords.map((_, wi) => {
		const wordStart = 320 + wi * 6;
		return spring({
			frame: frame - wordStart,
			fps,
			config: { stiffness: 220, damping: 18 },
		});
	});

	const wordOpacities = allWords.map((_, wi) => {
		const wordStart = 320 + wi * 6;
		return interpolate(frame, [wordStart, wordStart + 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
	});

	// === Tagline reveal (after headline completes) ===
	const taglineOpacity = interpolate(frame, [358, 360], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

	// === Subtle float — slowest of all layers (background depth) ===
	const floatY = Math.sin(frame / 28) * 3;

	// === Fade entire lockup in ===
	const lockupOpacity = interpolate(frame, [308, 316], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

	return (
		<div
			style={{
				position: 'absolute',
				top: '32px',
				left: '50%',
				transform: `translateX(-50%) translateY(${floatY}px)`,
				opacity: lockupOpacity,
				zIndex: 40,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				textAlign: 'center',
				pointerEvents: 'none',
				gap: '14px',
			}}
		>
			{/* Logo spring-in */}
			<div style={{
				opacity: logoOpacity,
				transform: `scale(${logoSpring}) translateY(${interpolate(logoSpring, [0, 1], [12, 0])}px)`,
			}}>
				<StageLogoMark size={38} />
			</div>

			{/* Headline — word-by-word spring reveal */}
			<div style={{ overflow: 'hidden' }}>
				<h1 style={{
					margin: 0,
					fontSize: '42px',
					fontWeight: 800,
					fontFamily: 'Bricolage Grotesque, Inter, sans-serif',
					letterSpacing: '-0.04em',
					color: '#16141A',
					lineHeight: '1.1',
					maxWidth: '860px',
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'center',
					gap: '0.25em',
				}}>
					{HEADLINE_WORDS.map((word, wi) => (
						<span
							key={wi}
							style={{
								display: 'inline-block',
								opacity: wordOpacities[wi],
								transform: `translateY(${interpolate(wordSprings[wi], [0, 1], [18, 0])}px)`,
							}}
						>
							{word}
						</span>
					))}
					{/* Italic accent word */}
					<span style={{
						display: 'inline-block',
						opacity: wordOpacities[HEADLINE_WORDS.length],
						transform: `translateY(${interpolate(wordSprings[HEADLINE_WORDS.length], [0, 1], [18, 0])}px)`,
						fontFamily: 'Playfair Display, Georgia, serif',
						fontStyle: 'italic',
						fontWeight: 400,
						color: '#2B4CFF',
					}}>
						{HEADLINE_ITALIC}
					</span>
					<span style={{
						display: 'inline-block',
						opacity: wordOpacities[HEADLINE_WORDS.length + 1],
						transform: `translateY(${interpolate(wordSprings[HEADLINE_WORDS.length + 1], [0, 1], [18, 0])}px)`,
						color: '#16141A',
					}}>
						{HEADLINE_SUFFIX}
					</span>
				</h1>
			</div>

			{/* Tagline */}
			<div style={{
				opacity: taglineOpacity,
				fontSize: '14px',
				color: '#5F5A66',
				fontFamily: 'JetBrains Mono, monospace',
				letterSpacing: '0.08em',
				fontWeight: 500,
				textTransform: 'uppercase',
			}}>
				stage.app — Direct DOM Annotation · No Screenshots · 0 Context Lost
			</div>
		</div>
	);
};
