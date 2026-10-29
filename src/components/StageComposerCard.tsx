import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from 'remotion';

const COMMENT_TEXT = "Button font weight should be 600, padding feels tight. Also — border-radius inconsistency on mobile breakpoint.";

const TAGS = [
	{ label: 'button.cta-primary', color: '#7C4DFF', bg: '#ECE6F6' },
	{ label: '.hero-section',       color: '#2B4CFF', bg: '#EBF1FE' },
];

export const StageComposerCard: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	if (frame < 140) return null;

	// === Card Reveal Spring (decisive snap-in from below) ===
	const cardSpring = spring({
		frame: frame - 144,
		fps,
		config: { stiffness: 160, damping: 15, mass: 0.9 },
	});

	const cardOpacity = interpolate(
		frame,
		[140, 152, 338, 360],
		[0, 1, 1, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	const entryY = interpolate(
		frame,
		[140, 155],
		[24, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);

	// === Character Staggered Typing Cadence ===
	const charCount = Math.floor(
		interpolate(frame, [162, 245], [0, COMMENT_TEXT.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
	);
	const typedComment = COMMENT_TEXT.slice(0, charCount);

	// === Floating — DIFFERENT SPEED from browser (parallax depth) ===
	// Browser floats at sin(frame/18), card at sin(frame/14) — slightly faster = closer foreground
	const floatY = Math.sin(frame / 14) * 5;
	const floatX = Math.cos(frame / 22) * 2;

	// === Developer "Mark as Fixed" ===
	const isFixed = frame >= 278;
	const fixedSpring = spring({ frame: frame - 278, fps, config: { stiffness: 200, damping: 14 } });
	const fixedScale = isFixed ? fixedSpring : 1;

	const statusBg    = isFixed ? '#E6F4EA' : '#FCE7E4';
	const statusColor = isFixed ? '#137333' : '#E8615A';
	const statusText  = isFixed ? '✓ FIXED'  : '● BUG';

	// === Tag stagger reveal ===
	const tag0Opacity = interpolate(frame, [152, 162], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
	const tag1Opacity = interpolate(frame, [158, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

	return (
		<div
			style={{
				position: 'absolute',
				left: '580px',
				top: '485px',
				width: '400px',
				opacity: cardOpacity,
				transform: `
					translateX(${floatX}px)
					translateY(${floatY + entryY}px)
					scale(${cardSpring})
				`,
				transformOrigin: 'top left',
				zIndex: 35,
				pointerEvents: 'none',
			}}
		>
			{/* ── Outer Bezel ── */}
			<div
				style={{
					width: '100%',
					borderRadius: '22px',
					backgroundColor: 'rgba(250, 248, 245, 0.96)',
					backdropFilter: 'blur(40px) saturate(1.3)',
					border: '1px solid rgba(255, 255, 255, 0.7)',
					boxShadow: `
						0 24px 48px rgba(22, 20, 26, 0.1),
						0 8px 16px rgba(22, 20, 26, 0.06),
						inset 0 1px 0 rgba(255, 255, 255, 0.95),
						inset 0 -1px 0 rgba(22, 20, 26, 0.03)
					`,
					padding: '9px',
					boxSizing: 'border-box',
				}}
			>
				{/* ── Inner White Card ── */}
				<div
					style={{
						width: '100%',
						borderRadius: '16px',
						backgroundColor: '#FFFFFF',
						border: '1px solid rgba(22, 20, 26, 0.05)',
						padding: '18px 20px',
						display: 'flex',
						flexDirection: 'column',
						gap: '14px',
					}}
				>
					{/* Header Row */}
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
						<div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
							{/* Pin # + Status */}
							<div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
								<span style={{
									fontSize: '11px', fontWeight: 900, color: '#2B4CFF',
									backgroundColor: '#EBF1FE', padding: '2px 8px',
									borderRadius: '10px', fontFamily: 'JetBrains Mono, monospace',
								}}>
									#1
								</span>
								<span style={{
									fontSize: '11px', fontFamily: 'JetBrains Mono, monospace',
									fontWeight: 700, color: statusColor, backgroundColor: statusBg,
									padding: '2px 8px', borderRadius: '10px',
									transform: `scale(${fixedScale})`,
									display: 'inline-block',
									transformOrigin: 'left center',
								}}>
									{statusText}
								</span>
							</div>

							{/* Floating Target Tags — staggered reveal */}
							<div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
								{TAGS.map((tag, ti) => (
									<div
										key={ti}
										style={{
											backgroundColor: tag.bg,
											color: tag.color,
											fontSize: '10px',
											fontFamily: 'JetBrains Mono, monospace',
											fontWeight: 600,
											padding: '3px 8px',
											borderRadius: '6px',
											display: 'flex',
											alignItems: 'center',
											gap: '4px',
											opacity: ti === 0 ? tag0Opacity : tag1Opacity,
										}}
									>
										<span style={{
											width: '5px', height: '5px', borderRadius: '50%',
											backgroundColor: tag.color,
											boxShadow: `0 0 6px ${tag.color}`,
										}} />
										{tag.label}
									</div>
								))}
							</div>
						</div>

						{/* Timestamp */}
						<span style={{ fontSize: '10px', color: '#8B8591', fontFamily: 'JetBrains Mono, monospace' }}>
							just now
						</span>
					</div>

					{/* Typed Comment Area */}
					<div style={{
						fontSize: '13.5px',
						color: '#16141A',
						fontFamily: 'Inter, sans-serif',
						lineHeight: '1.55',
						minHeight: '52px',
						fontWeight: 500,
					}}>
						{typedComment}
						{frame >= 162 && frame <= 248 && (
							<span style={{
								width: '2px', height: '15px', backgroundColor: '#7C4DFF',
								display: 'inline-block', marginLeft: '2px', verticalAlign: 'text-bottom',
								opacity: Math.sin(frame * 0.35) > 0 ? 1 : 0.1,
							}} />
						)}
					</div>

					{/* Footer: Avatar + Mark as Fixed */}
					<div style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						paddingTop: '10px',
						borderTop: '1px solid rgba(22, 20, 26, 0.055)',
					}}>
						<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
							<div style={{
								width: '26px', height: '26px', borderRadius: '50%',
								background: 'linear-gradient(135deg, #16141A, #3D3A44)',
								color: '#FFF', fontSize: '10px', fontWeight: 800,
								display: 'flex', alignItems: 'center', justifyContent: 'center',
								fontFamily: 'Inter, sans-serif',
								letterSpacing: '-0.02em',
							}}>
								AR
							</div>
							<div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
								<span style={{ fontSize: '11px', color: '#16141A', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
									Alex Rivera
								</span>
								<span style={{ fontSize: '10px', color: '#8B8591', fontFamily: 'JetBrains Mono, monospace' }}>
									Design Lead
								</span>
							</div>
						</div>

						{/* Mark as Fixed Button */}
						<button
							id="mark-as-fixed-btn"
							style={{
								backgroundColor: isFixed ? '#137333' : '#16141A',
								color: '#FFFFFF',
								border: 'none',
								borderRadius: '8px',
								padding: '7px 14px',
								fontSize: '11px',
								fontFamily: 'JetBrains Mono, monospace',
								fontWeight: 700,
								cursor: 'pointer',
								boxShadow: isFixed
									? '0 4px 14px rgba(19, 115, 51, 0.35)'
									: '0 4px 10px rgba(22, 20, 26, 0.25)',
								transform: frame >= 272 && frame <= 282 ? 'scale(0.94)' : 'scale(1)',
								display: 'flex',
								alignItems: 'center',
								gap: '6px',
								letterSpacing: '0.01em',
							}}
						>
							{isFixed ? (
								<>
									<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
										<polyline points="20 6 9 17 4 12" />
									</svg>
									Fixed in GitHub
								</>
							) : (
								'Mark as Fixed'
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
