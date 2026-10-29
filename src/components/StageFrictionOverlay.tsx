import React from 'react';
import { useCurrentFrame, interpolate, Easing, spring, useVideoConfig } from 'remotion';

// 8 chaotic screenshot files with staggered entrance + scatter physics
const CHAOTIC_FILES = [
	{ name: 'Screen_Shot_2026_09.png',     x: 240,  y: 220,  r: -8,   tag: '"MAKE IT POP"',           entryDelay: 0,  exitDelay: 0   },
	{ name: 'client_feedback_v3.png',      x: 1380, y: 240,  r: 12,   tag: '"FIX ALIGNMENT??"',        entryDelay: 4,  exitDelay: 6   },
	{ name: 'slack_note_bug_final.png',    x: 1460, y: 740,  r: -14,  tag: '"WHY IS THIS RED"',         entryDelay: 8,  exitDelay: 12  },
	{ name: 'WhatsApp_Img_104.jpg',        x: 260,  y: 780,  r: 10,   tag: '"NOT WORKING ON MOBILE"',  entryDelay: 12, exitDelay: 3   },
	{ name: 'design_v7_FINAL_FINAL.png',   x: 860,  y: 130,  r: -5,   tag: '"USE THE OLD COLORS"',     entryDelay: 2,  exitDelay: 8   },
	{ name: 'screenshot_1920x1080.png',    x: 1120, y: 820,  r: 7,    tag: '"I ATTACHED THE FILE"',    entryDelay: 6,  exitDelay: 15  },
	{ name: 'URGENT_changes.png',          x: 550,  y: 900,  r: -11,  tag: '"LITERALLY JUST PIXELS"',  entryDelay: 10, exitDelay: 9   },
	{ name: 'Annotation_2026_v12.png',     x: 1650, y: 460,  r: 15,   tag: '"CAN WE DO A CALL?"',      entryDelay: 3,  exitDelay: 18  },
];

// Scatter vectors: each card flies off in a unique direction when dissolving
const SCATTER = [
	{ dx: -180, dy: -280 }, { dx: 220, dy: -260 },
	{ dx: 280,  dy: 200  }, { dx: -260, dy: 180 },
	{ dx: 60,   dy: -320 }, { dx: 180,  dy: 280 },
	{ dx: -100, dy: 260  }, { dx: 300,  dy: -120 },
];

export const StageFrictionOverlay: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	if (frame > 105) return null;

	return (
		<div style={{ position: 'absolute', inset: 0, zIndex: 25, pointerEvents: 'none' }}>
			{/* Red chaos vignette — max opacity at frame 20, fades out by frame 90 */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background: 'radial-gradient(ellipse at center, transparent 30%, rgba(232, 97, 90, 0.12) 100%)',
					opacity: interpolate(frame, [0, 20, 60, 95], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
				}}
			/>

			{CHAOTIC_FILES.map((file, i) => {
				const entryFrame = file.entryDelay;
				const enterSpring = spring({
					frame: frame - entryFrame,
					fps,
					config: { stiffness: 220, damping: 16, mass: 0.8 },
				});

				// Scatter dissolve: each card flies off on a unique vector
				const dissolveStart = 42 + file.exitDelay;
				const dissolveProgress = interpolate(
					frame,
					[dissolveStart, dissolveStart + 22],
					[0, 1],
					{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.4, 0, 1, 1) }
				);

				const entryProgress = frame >= entryFrame ? enterSpring : 0;
				const opacity = entryProgress * (1 - dissolveProgress);

				const scatterDx = SCATTER[i].dx * dissolveProgress;
				const scatterDy = SCATTER[i].dy * dissolveProgress;
				const scatterRotate = file.r + dissolveProgress * (file.r > 0 ? 25 : -25);
				const scatterScale = 1 - dissolveProgress * 0.35;

				// Micro-jitter during chaos phase (pre-dissolve)
				const jitterX = dissolveProgress < 0.1 ? Math.sin(frame * 3.7 + i * 44) * 1.5 : 0;
				const jitterY = dissolveProgress < 0.1 ? Math.cos(frame * 2.9 + i * 31) * 1.5 : 0;

				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: `${file.x}px`,
							top: `${file.y}px`,
							width: '280px',
							backgroundColor: 'rgba(255, 255, 255, 0.97)',
							border: '1.5px solid rgba(232, 97, 90, 0.7)',
							borderRadius: '14px',
							boxShadow: '0 16px 40px rgba(232, 97, 90, 0.2), 0 4px 12px rgba(22, 20, 26, 0.1)',
							padding: '14px 16px',
							transform: `
								translate(-50%, -50%)
								rotate(${scatterRotate}deg)
								translate(${scatterDx + jitterX}px, ${scatterDy + jitterY}px)
								scale(${scatterScale * entryProgress})
							`,
							opacity,
							backdropFilter: 'blur(8px)',
						}}
					>
						{/* Top bar: warning icon + filename */}
						<div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: '#E8615A', fontWeight: 700 }}>
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E8615A" strokeWidth="2.5" strokeLinecap="round">
								<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
								<line x1="12" y1="9" x2="12" y2="13" />
								<line x1="12" y1="17" x2="12.01" y2="17" />
							</svg>
							{file.name}
						</div>

						{/* Unanchored feedback tag */}
						<div style={{
							marginTop: '10px',
							fontSize: '13px',
							color: '#16141A',
							fontFamily: 'Inter, sans-serif',
							fontWeight: 800,
							lineHeight: '1.3',
						}}>
							{file.tag}
						</div>

						{/* Unanchored red rect wireframe */}
						<div style={{
							marginTop: '10px',
							height: '38px',
							border: '2px dashed rgba(232, 97, 90, 0.6)',
							borderRadius: '6px',
							backgroundColor: 'rgba(232, 97, 90, 0.07)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: '10px',
							color: 'rgba(232, 97, 90, 0.7)',
							fontFamily: 'JetBrains Mono, monospace',
						}}>
							← unanchored annotation →
						</div>
					</div>
				);
			})}
		</div>
	);
};
