import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from 'remotion';
import { StageLogoMark } from './StageLogoMark';

export const StageBrowserChassis: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// === 35mm Virtual Lens Camera Orbit (Frames 0–72) ===
	// Snappier: starts more dramatic, snaps to flat with high stiffness
	const rotateY = interpolate(
		frame,
		[0, 72],
		[18, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);

	const rotateX = interpolate(
		frame,
		[0, 72],
		[10, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);

	// === Chassis Spring Entrance — high stiffness for a decisive snap-in ===
	const chassisSpring = spring({
		frame: frame - 60,   // delayed start after friction chaos clears
		fps,
		config: { stiffness: 130, damping: 16, mass: 1.0 },
	});

	// === Hover CTA Button Interaction (Hover: 90–115, Click: 115–120, Settle: 120–130) ===
	const buttonScale = interpolate(
		frame,
		[90, 112, 120, 132],
		[1, 1.03, 0.96, 1],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);

	// Focus ring pulses on hover, fades after click
	const buttonRingOpacity = interpolate(
		frame,
		[92, 112, 125, 200],
		[0, 0.9, 0.4, 0.2],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	// Button glow intensity — peaks at hover, settles after click
	const buttonGlow = interpolate(
		frame,
		[92, 112, 125, 240],
		[0.25, 0.6, 0.4, 0.3],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	// === Organic Floating Micro-Drift (foreground — moves FASTER than bg grid) ===
	// This creates parallax: chassis drifts at ~5px, bg grid at ~1.5px → depth perception
	const floatY = Math.sin(frame / 18) * 6;
	const floatX = Math.cos(frame / 24) * 2;

	// === Subtle breathing scale (cinematic micro-zoom) ===
	const breatheScale = 1 + Math.sin(frame / 60) * 0.004;

	// URL bar typewriter reveal
	const urlChars = 'stage.app/live-preview';
	const urlLength = Math.min(
		urlChars.length,
		Math.floor(interpolate(frame, [72, 90], [0, urlChars.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }))
	);

	return (
		<div
			style={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				width: '1200px',
				height: '700px',
				marginLeft: '-600px',
				marginTop: '-350px',
				transform: `
					perspective(1600px)
					rotateX(${rotateX}deg)
					rotateY(${rotateY}deg)
					translateX(${floatX}px)
					translateY(${floatY}px)
					scale(${chassisSpring * breatheScale})
				`,
				zIndex: 10,
			}}
		>
			{/* ── Outer Bezel: Physical Glass Rim ── */}
			<div
				style={{
					width: '100%',
					height: '100%',
					borderRadius: '38px',
					// Layered glass: frosted fill + crisp rim light + deep shadow
					backgroundColor: 'rgba(250, 248, 245, 0.82)',
					backdropFilter: 'blur(60px) saturate(1.4)',
					border: '1px solid rgba(255, 255, 255, 0.6)',
					boxShadow: `
						0 40px 80px -16px rgba(22, 20, 26, 0.14),
						0 16px 32px rgba(22, 20, 26, 0.06),
						0 4px 8px rgba(22, 20, 26, 0.04),
						inset 0 1px 0 rgba(255, 255, 255, 0.95),
						inset 0 -1px 0 rgba(22, 20, 26, 0.04)
					`,
					padding: '12px',
					display: 'flex',
					flexDirection: 'column',
					boxSizing: 'border-box',
				}}
			>
				{/* ── Inner Viewport ── */}
				<div
					style={{
						width: '100%',
						height: '100%',
						borderRadius: '28px',
						backgroundColor: '#FFFFFF',
						border: '1px solid rgba(22, 20, 26, 0.055)',
						overflow: 'hidden',
						display: 'flex',
						flexDirection: 'column',
						boxShadow: 'inset 0 1px 0 rgba(22, 20, 26, 0.03)',
					}}
				>
					{/* ── Browser Chrome Bar ── */}
					<div
						style={{
							height: '52px',
							backgroundColor: '#F7F5F2',
							borderBottom: '1px solid rgba(22, 20, 26, 0.055)',
							display: 'flex',
							alignItems: 'center',
							padding: '0 22px',
							justifyContent: 'space-between',
							gap: '16px',
						}}
					>
						{/* Traffic lights */}
						<div style={{ display: 'flex', gap: '7px', flexShrink: 0 }}>
							<div style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#E8615A', boxShadow: '0 0 0 0.5px rgba(0,0,0,0.1) inset' }} />
							<div style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#FEBC2E', boxShadow: '0 0 0 0.5px rgba(0,0,0,0.1) inset' }} />
							<div style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#28C840', boxShadow: '0 0 0 0.5px rgba(0,0,0,0.1) inset' }} />
						</div>

						{/* URL Bar with typewriter reveal */}
						<div
							style={{
								flex: 1,
								maxWidth: '440px',
								backgroundColor: '#FFFFFF',
								border: '1px solid rgba(22, 20, 26, 0.08)',
								borderRadius: '10px',
								padding: '6px 14px',
								fontSize: '12px',
								fontFamily: 'JetBrains Mono, monospace',
								color: '#5F5A66',
								display: 'flex',
								alignItems: 'center',
								gap: '7px',
								boxShadow: 'inset 0 1px 2px rgba(22, 20, 26, 0.03)',
							}}
						>
							<span style={{ color: '#2B4CFF', fontSize: '11px' }}>🔒</span>
							<span style={{ color: '#137333', fontWeight: 700 }}>stage</span>
							<span>.app/{urlChars.slice(11, urlLength)}</span>
							{frame >= 72 && frame < 90 && (
								<span style={{
									width: '1px', height: '13px', backgroundColor: '#2B4CFF',
									opacity: Math.sin(frame * 0.6) > 0 ? 1 : 0.15,
									display: 'inline-block',
								}} />
							)}
						</div>

						{/* Live indicator */}
						<div style={{
							fontSize: '11px',
							color: '#137333',
							fontFamily: 'JetBrains Mono, monospace',
							fontWeight: 700,
							display: 'flex',
							alignItems: 'center',
							gap: '5px',
							flexShrink: 0,
						}}>
							<div style={{
								width: '7px', height: '7px', borderRadius: '50%',
								backgroundColor: '#137333',
								boxShadow: `0 0 ${6 + Math.sin(frame / 12) * 3}px rgba(19, 115, 51, 0.8)`,
							}} />
							LIVE DOM • STAGE
						</div>
					</div>

					{/* ── Live Web Page Canvas ── */}
					<div
						style={{
							flex: 1,
							padding: '44px 60px 36px',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							backgroundColor: '#FFFFFF',
						}}
					>
						{/* Nav */}
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<StageLogoMark size={32} />
							<div style={{ display: 'flex', gap: '28px', fontSize: '14px', color: '#5F5A66', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>
								<span>Features</span>
								<span>Live Engine</span>
								<span style={{ color: '#16141A', fontWeight: 700 }}>DOM Inspection</span>
							</div>
							<button style={{
								backgroundColor: 'transparent',
								border: '1px solid rgba(22, 20, 26, 0.15)',
								borderRadius: '8px',
								padding: '7px 16px',
								fontSize: '13px',
								fontFamily: 'Inter, sans-serif',
								fontWeight: 600,
								color: '#16141A',
								cursor: 'pointer',
							}}>
								Sign In
							</button>
						</div>

						{/* Hero Body */}
						<div style={{ maxWidth: '640px' }}>
							<div style={{
								fontSize: '11px',
								fontFamily: 'JetBrains Mono, monospace',
								letterSpacing: '0.18em',
								color: '#7C4DFF',
								fontWeight: 700,
								textTransform: 'uppercase',
								marginBottom: '12px',
							}}>
								// THE DEATH OF SCREENSHOTS
							</div>

							<h1 style={{
								margin: 0,
								fontSize: '52px',
								fontWeight: 800,
								letterSpacing: '-0.04em',
								color: '#16141A',
								lineHeight: '1.04',
								fontFamily: 'Bricolage Grotesque, Inter, sans-serif',
							}}>
								Direct Feedback<br />
								on the <span style={{ color: '#2B4CFF' }}>Live DOM</span>
							</h1>

							<p style={{
								marginTop: '16px',
								fontSize: '16px',
								color: '#5F5A66',
								lineHeight: '1.65',
								fontFamily: 'Inter, sans-serif',
								maxWidth: '520px',
							}}>
								One link anchors spatial pins with computed CSS and instant resolution. No screenshots. No context lost.
							</p>

							{/* CTA Button — TARGET: button.cta-primary */}
							<div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
								<button
									id="button-cta-primary"
									style={{
										backgroundColor: '#2B4CFF',
										color: '#FFFFFF',
										fontSize: '15px',
										fontWeight: 700,
										fontFamily: 'Bricolage Grotesque, Inter, sans-serif',
										padding: '14px 32px',
										borderRadius: '12px',
										border: 'none',
										transform: `scale(${buttonScale})`,
										boxShadow: `
											0 12px 28px rgba(43, 76, 255, ${buttonGlow}),
											0 0 0 4px rgba(43, 76, 255, ${buttonRingOpacity})
										`,
										display: 'flex',
										alignItems: 'center',
										gap: '10px',
										cursor: 'pointer',
										letterSpacing: '-0.01em',
									}}
								>
									<span>Publish Changes</span>
									<span style={{ fontSize: '18px', lineHeight: 1 }}>→</span>
								</button>

								<span style={{ fontSize: '13px', color: '#5F5A66', fontFamily: 'Inter, sans-serif' }}>
									Free for teams up to 5
								</span>
							</div>
						</div>

						{/* Footer */}
						<div style={{
							borderTop: '1px solid rgba(22, 20, 26, 0.055)',
							paddingTop: '14px',
							display: 'flex',
							justifyContent: 'space-between',
							fontSize: '11px',
							color: '#8B8591',
							fontFamily: 'JetBrains Mono, monospace',
						}}>
							<span>DOM Node: HTMLButtonElement • Computed: button.cta-primary</span>
							<span>STAGE v2.0 • Live Preview Active</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
