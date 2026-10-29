import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import { Pin1HeroPromise } from './Pin1HeroPromise';
import { Pin2SkuTableView } from './Pin2SkuTableView';
import { Pin3DualCtaPath } from './Pin3DualCtaPath';
import { Pin4ColdChainFlow } from './Pin4ColdChainFlow';
import { Pin5MobileStickyCta } from './Pin5MobileStickyCta';
import { THEME } from './BrandTokens';

export const MasterPinsShowcase: React.FC = () => {
	const frame = useCurrentFrame();

	// Global progress indicator
	const totalFrames = 600;
	const globalProgress = (frame / totalFrames) * 100;

	// Active Pin label
	let activePinName = 'PIN #1: HERO BUSINESS PROMISE';
	if (frame >= 480) {
		activePinName = 'PIN #5: MOBILE STICKY CTA BOTTOM BAR';
	} else if (frame >= 360) {
		activePinName = 'PIN #4: COLD CHAIN VISUAL FLOW';
	} else if (frame >= 240) {
		activePinName = 'PIN #3: DUAL CTA USER PATH';
	} else if (frame >= 120) {
		activePinName = 'PIN #2: HIGH-DENSITY SKU TABLE VIEW';
	}

	return (
		<AbsoluteFill style={{ backgroundColor: THEME.midnight.base }}>
			{/* Top Global Navigation Bar for Showreel */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					height: 64,
					background: 'rgba(6, 13, 23, 0.88)',
					backdropFilter: 'blur(16px)',
					borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
					zIndex: 99999,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '0 40px',
					color: '#FFFFFF',
					fontFamily: '"Inter", sans-serif',
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
					<span
						style={{
							width: 10,
							height: 10,
							borderRadius: '50%',
							backgroundColor: THEME.blue.light,
							boxShadow: `0 0 10px ${THEME.blue.light}`,
						}}
					/>
					<span style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.06em' }}>
						FRESHFLOW B2B MOTION SUITE • 394 SKUS
					</span>
				</div>

				<div
					style={{
						fontSize: 12,
						fontWeight: 700,
						background: 'rgba(2, 132, 199, 0.2)',
						border: `1px solid ${THEME.blue.primary}`,
						color: THEME.blue.light,
						padding: '4px 14px',
						borderRadius: 6,
						letterSpacing: '0.04em',
					}}
				>
					{activePinName}
				</div>

				{/* Progress bar line */}
				<div
					style={{
						position: 'absolute',
						bottom: 0,
						left: 0,
						height: 3,
						width: `${globalProgress}%`,
						backgroundColor: THEME.blue.light,
						boxShadow: `0 0 8px ${THEME.blue.light}`,
					}}
				/>
			</div>

			{/* ── PIN 1: 0 to 120 (4 seconds) ── */}
			<Sequence durationInFrames={120} name="Pin1_HeroPromise">
				<Pin1HeroPromise />
			</Sequence>

			{/* ── PIN 2: 120 to 240 (4 seconds) ── */}
			<Sequence from={120} durationInFrames={120} name="Pin2_SkuTableView">
				<Pin2SkuTableView />
			</Sequence>

			{/* ── PIN 3: 240 to 360 (4 seconds) ── */}
			<Sequence from={240} durationInFrames={120} name="Pin3_DualCtaPath">
				<Pin3DualCtaPath />
			</Sequence>

			{/* ── PIN 4: 360 to 480 (4 seconds) ── */}
			<Sequence from={360} durationInFrames={120} name="Pin4_ColdChainFlow">
				<Pin4ColdChainFlow />
			</Sequence>

			{/* ── PIN 5: 480 to 600 (4 seconds) ── */}
			<Sequence from={480} durationInFrames={120} name="Pin5_MobileStickyCta">
				<Pin5MobileStickyCta />
			</Sequence>
		</AbsoluteFill>
	);
};
