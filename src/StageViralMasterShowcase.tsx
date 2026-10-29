import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
	Easing,
	Img,
	Video,
	Audio,
	staticFile,
	Sequence,
} from 'remotion';

export const StageViralMasterShowcase: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// ── GLOBAL CAMERA ORCHESTRATION (Continuous Tom Lulofs / Sovera Fluid Micro-Motion) ──
	const globalFloatY = Math.sin(frame / 30) * 4.5;
	const globalFloatX = Math.cos(frame / 40) * 3.5;
	const globalZPush = interpolate(frame, [0, 3600], [1.0, 1.05], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});

	// ── ACT 1: THE AGITATION HOOK (Frames 0 - 480 / 0.0s - 8.0s) ──
	const s1Progress = interpolate(frame, [0, 440, 480], [1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const s1Glitch = frame < 45 ? Math.sin(frame * 4.2) * 7 * Math.max(0, 1 - frame / 45) : 0;
	const hookSpring = spring({ frame, fps, config: { damping: 13, stiffness: 150 } });
	const hookScale = interpolate(hookSpring, [0, 1], [0.82, 1.0]);

	const strikeProgress = interpolate(frame, [70, 125], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});

	const cardSlackSpring = spring({ frame: frame - 30, fps, config: { damping: 14, stiffness: 160 } });
	const cardWaSpring = spring({ frame: frame - 55, fps, config: { damping: 13, stiffness: 150 } });

	// ── ACT 2: THE OLD HOMEPAGE ROAST (Frames 480 - 920 / 8.0s - 15.3s) ──
	const s2Active = frame >= 460 && frame <= 930;
	const s2Progress = interpolate(frame, [460, 500, 890, 930], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const browserDockSpring = spring({ frame: frame - 470, fps, config: { damping: 15, stiffness: 120 } });
	const browserScale = interpolate(browserDockSpring, [0, 1], [0.86, 1.0]);
	const browserTiltX = interpolate(browserDockSpring, [0, 1], [15, 3]);
	const browserTiltY = interpolate(browserDockSpring, [0, 1], [-18, -2]);

	const stampSpring = spring({ frame: frame - 540, fps, config: { damping: 10, stiffness: 220 } });
	const stampScale = interpolate(stampSpring, [0, 1], [2.4, 1.0]);

	// ── ACT 3: COMMUNITY ROAST PINS (Frames 920 - 1520 / 15.3s - 25.3s) ──
	const s3Active = frame >= 910 && frame <= 1530;
	const s3Progress = interpolate(frame, [910, 950, 1490, 1530], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const pin1Spring = spring({ frame: frame - 940, fps, config: { damping: 12, stiffness: 190 } });
	const cardRajatSpring = spring({ frame: frame - 960, fps, config: { damping: 14, stiffness: 150 } });

	const pin2Spring = spring({ frame: frame - 1100, fps, config: { damping: 12, stiffness: 190 } });
	const cardAndriySpring = spring({ frame: frame - 1120, fps, config: { damping: 14, stiffness: 150 } });

	const pin3Spring = spring({ frame: frame - 1280, fps, config: { damping: 12, stiffness: 190 } });
	const cardDiscordSpring = spring({ frame: frame - 1300, fps, config: { damping: 14, stiffness: 150 } });

	// ── ACT 4: KINETIC SCANNER MORPH (Frames 1520 - 2040 / 25.3s - 34.0s) ──
	const s4Active = frame >= 1510 && frame <= 2050;
	const s4Progress = interpolate(frame, [1510, 1550, 2010, 2050], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const scanSweep = interpolate(frame, [1550, 1700], [-10, 110], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.2, 0.8, 0.2, 1),
	});
	const newHomeSpring = spring({ frame: frame - 1620, fps, config: { damping: 14, stiffness: 110 } });
	const newHomeScale = interpolate(newHomeSpring, [0, 1], [0.93, 1.0]);

	const brushWidth = interpolate(frame, [1710, 1800], [0, 100], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});

	const badge1Spring = spring({ frame: frame - 1820, fps, config: { damping: 12, stiffness: 180 } });
	const badge2Spring = spring({ frame: frame - 1860, fps, config: { damping: 12, stiffness: 180 } });
	const badge3Spring = spring({ frame: frame - 1900, fps, config: { damping: 12, stiffness: 180 } });

	// ── ACT 5: TOMMY MCGLYNN LIVE REVIEW SPOTLIGHT (Frames 2040 - 2640 / 34.0s - 44.0s) ──
	const s5Active = frame >= 2030 && frame <= 2650;
	const s5Progress = interpolate(frame, [2030, 2070, 2610, 2650], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const tommySpring = spring({ frame: frame - 2050, fps, config: { damping: 14, stiffness: 130 } });
	const tommyScale = interpolate(tommySpring, [0, 1], [0.85, 1.0]);

	// Kinetic captions sync for Tommy
	const tommySubtitle1 = frame >= 2070 && frame < 2250;
	const tommySubtitle2 = frame >= 2250 && frame < 2460;
	const tommySubtitle3 = frame >= 2460 && frame < 2640;

	// ── ACT 6: LIVE PRODUCT FEEDBACK DEMO & 3D RAYCASTING (Frames 2640 - 3140 / 44.0s - 52.3s) ──
	const s6Active = frame >= 2630 && frame <= 3150;
	const s6Progress = interpolate(frame, [2630, 2670, 3110, 3150], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const demoSpring = spring({ frame: frame - 2650, fps, config: { damping: 15, stiffness: 120 } });
	const demoScale = interpolate(demoSpring, [0, 1], [0.9, 1.0]);

	// ── ACT 7: VIRAL CTA & LOGO BURST (Frames 3140 - 3600 / 52.3s - 60.0s) ──
	const s7Active = frame >= 3130;
	const s7Progress = interpolate(frame, [3130, 3170], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const logoBurstSpring = spring({ frame: frame - 3150, fps, config: { damping: 11, stiffness: 180 } });
	const logoScale = interpolate(logoBurstSpring, [0, 1], [0.25, 1.0]);
	const logoGlowRadius = interpolate(logoBurstSpring, [0, 1], [10, 95]);

	const ctaButtonSpring = spring({ frame: frame - 3220, fps, config: { damping: 13, stiffness: 160 } });
	const ctaScale = interpolate(ctaButtonSpring, [0, 1], [0.8, 1.0]);

	const cursorClickSpring = spring({ frame: frame - 3380, fps, config: { damping: 8, stiffness: 300 } });
	const cursorClickScale = frame >= 3380 ? interpolate(cursorClickSpring, [0, 1], [0.85, 1.0]) : 1.0;

	const rippleProgress = interpolate(frame, [3380, 3450], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const rippleScale = interpolate(rippleProgress, [0, 1], [0.2, 4.0]);
	const rippleOpacity = interpolate(rippleProgress, [0, 0.2, 1], [0.95, 0.6, 0]);

	// Master BGM Volume Ducking (Smoothly duck when Tommy speaks between 2040 and 2640)
	const bgmVolume = interpolate(
		frame,
		[0, 2020, 2070, 2600, 2660, 3550, 3600],
		[0.32, 0.32, 0.12, 0.12, 0.32, 0.32, 0.0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#050608',
				color: '#FFFFFF',
				fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
				overflow: 'hidden',
			}}
		>
			{/* ── AUDIO BED: MASTER 60-SECOND DYNAMIC SOUNDTRACK ── */}
			<Audio
				src={staticFile('stage_assets/audio/stage_master_bgm_60s.wav')}
				volume={bgmVolume}
			/>

			{/* ── AUDIO VOICEOVER NARRATION CUES ── */}
			<Sequence from={15} durationInFrames={450}>
				<Audio src={staticFile('stage_assets/audio/scene1_hook.mp3')} volume={1.0} />
			</Sequence>
			<Sequence from={480} durationInFrames={400}>
				<Audio src={staticFile('stage_assets/audio/scene2_old_roast.mp3')} volume={1.0} />
			</Sequence>
			<Sequence from={930} durationInFrames={550}>
				<Audio src={staticFile('stage_assets/audio/scene3_community.mp3')} volume={1.0} />
			</Sequence>
			<Sequence from={1530} durationInFrames={490}>
				<Audio src={staticFile('stage_assets/audio/scene4_transform.mp3')} volume={1.0} />
			</Sequence>
			{/* Tommy McGlynn Speaks with his REAL AUDIO (Frames 2050 - 2650) */}
			<Sequence from={2650} durationInFrames={470}>
				<Audio src={staticFile('stage_assets/audio/scene5_product_demo.mp3')} volume={1.0} />
			</Sequence>
			<Sequence from={3140} durationInFrames={440}>
				<Audio src={staticFile('stage_assets/audio/scene6_outro.mp3')} volume={1.0} />
			</Sequence>

			{/* ── AUDIO SFX STINGS (Tom Lulofs & Sovera Layering) ── */}
			<Sequence from={0} durationInFrames={90}>
				<Audio src={staticFile('stage_assets/audio/sub_drop_heavy.wav')} volume={0.85} />
			</Sequence>
			<Sequence from={65} durationInFrames={30}>
				<Audio src={staticFile('stage_assets/audio/whoosh_air.wav')} volume={0.65} />
			</Sequence>
			<Sequence from={470} durationInFrames={90}>
				<Audio src={staticFile('stage_assets/audio/sub_drop_heavy.wav')} volume={0.65} />
			</Sequence>
			<Sequence from={540} durationInFrames={30}>
				<Audio src={staticFile('stage_assets/audio/camera_shutter.wav')} volume={0.8} />
			</Sequence>
			<Sequence from={940} durationInFrames={40}>
				<Audio src={staticFile('stage_assets/audio/sonar_ping.wav')} volume={0.75} />
				<Audio src={staticFile('stage_assets/audio/tactile_click.wav')} volume={0.7} />
			</Sequence>
			<Sequence from={1100} durationInFrames={40}>
				<Audio src={staticFile('stage_assets/audio/sonar_ping.wav')} volume={0.75} />
				<Audio src={staticFile('stage_assets/audio/tactile_click.wav')} volume={0.7} />
			</Sequence>
			<Sequence from={1280} durationInFrames={40}>
				<Audio src={staticFile('stage_assets/audio/sonar_ping.wav')} volume={0.75} />
				<Audio src={staticFile('stage_assets/audio/tactile_click.wav')} volume={0.7} />
			</Sequence>
			<Sequence from={1480} durationInFrames={80}>
				<Audio src={staticFile('stage_assets/audio/whoosh_air.wav')} volume={0.7} />
			</Sequence>
			<Sequence from={1560} durationInFrames={90}>
				<Audio src={staticFile('stage_assets/audio/sub_drop_heavy.wav')} volume={0.75} />
			</Sequence>
			<Sequence from={2040} durationInFrames={60}>
				<Audio src={staticFile('stage_assets/audio/whoosh_air.wav')} volume={0.7} />
				<Audio src={staticFile('stage_assets/audio/camera_shutter.wav')} volume={0.75} />
			</Sequence>
			<Sequence from={2640} durationInFrames={60}>
				<Audio src={staticFile('stage_assets/audio/whoosh_air.wav')} volume={0.7} />
			</Sequence>
			<Sequence from={3140} durationInFrames={90}>
				<Audio src={staticFile('stage_assets/audio/sub_drop_heavy.wav')} volume={0.9} />
			</Sequence>
			<Sequence from={3380} durationInFrames={40}>
				<Audio src={staticFile('stage_assets/audio/sonar_ping.wav')} volume={0.8} />
			</Sequence>

			{/* ── CINEMATIC AMBIENT SPECULAR GRID & RADIAL LIGHTING ── */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundImage: `
						radial-gradient(circle at 50% 25%, rgba(56, 189, 248, 0.14), transparent 60%),
						radial-gradient(circle at 85% 85%, rgba(129, 140, 248, 0.1), transparent 50%),
						linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
						linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px)
					`,
					backgroundSize: '100% 100%, 100% 100%, 48px 48px, 48px 48px',
					backgroundPosition: `0 0, 0 0, ${globalFloatX}px ${globalFloatY}px, ${globalFloatX}px ${globalFloatY}px`,
					pointerEvents: 'none',
					transform: `scale(${globalZPush})`,
				}}
			/>

			{/* ── TOP FLOATING BRAND HUD ── */}
			<div
				style={{
					position: 'absolute',
					top: 36,
					left: 48,
					right: 48,
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					zIndex: 60,
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
					<Img
						src={staticFile('stage_assets/stage_logo.png')}
						style={{ height: 28, objectFit: 'contain' }}
					/>
					<div
						style={{
							fontSize: 12,
							letterSpacing: '0.22em',
							color: 'rgba(255,255,255,0.7)',
							textTransform: 'uppercase',
							fontFamily: 'monospace',
							borderLeft: '1px solid rgba(255,255,255,0.2)',
							paddingLeft: 12,
						}}
					>
						Live Visual QA Engine
					</div>
				</div>

				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: 10,
						padding: '7px 18px',
						borderRadius: 999,
						background: 'rgba(255, 255, 255, 0.05)',
						border: '1px solid rgba(255, 255, 255, 0.15)',
						backdropFilter: 'blur(16px)',
						boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
					}}
				>
					<div
						style={{
							width: 8,
							height: 8,
							borderRadius: '50%',
							backgroundColor: '#10B981',
							boxShadow: '0 0 12px #10B981',
						}}
					/>
					<span
						style={{
							fontSize: 12,
							fontFamily: 'monospace',
							color: '#E2E8F0',
							letterSpacing: '0.08em',
							fontWeight: 600,
						}}
					>
						ZERO EXTENSIONS • ZERO LOGINS
					</span>
				</div>
			</div>

			{/* ========================================================================= */}
			{/* ACT 1: THE AGITATION HOOK (Frames 0 - 480)                                */}
			{/* ========================================================================= */}
			{frame <= 480 && (
				<AbsoluteFill
					style={{
						opacity: s1Progress,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						transform: `translate3d(${globalFloatX}px, ${globalFloatY}px, 0)`,
					}}
				>
					{/* Floating Messy Slack Card */}
					<div
						style={{
							position: 'absolute',
							left: 140,
							top: 190,
							width: 400,
							padding: 20,
							borderRadius: 18,
							background: 'rgba(15, 23, 42, 0.85)',
							border: '1px solid rgba(239, 68, 68, 0.4)',
							boxShadow: '0 30px 60px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.2)',
							transform: `scale(${interpolate(cardSlackSpring, [0, 1], [0.6, 1])}) rotate(-6deg)`,
							opacity: interpolate(cardSlackSpring, [0, 1], [0, 1]),
							backdropFilter: 'blur(20px)',
						}}
					>
						<div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
							<div style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }} />
							<span style={{ fontSize: 11, fontFamily: 'monospace', color: '#EF4444', fontWeight: 700 }}>
								SLACK #QA-FEEDBACK • 52 REPLIES
							</span>
						</div>
						<div style={{ fontSize: 13, color: '#CBD5E1', lineHeight: 1.45 }}>
							"Can we move this button 4px left? Also on mobile it's broken. See screenshot 14_final_v2.png"
						</div>
					</div>

					{/* Floating Messy WhatsApp Card */}
					<div
						style={{
							position: 'absolute',
							right: 140,
							bottom: 190,
							width: 380,
							padding: 20,
							borderRadius: 18,
							background: 'rgba(15, 23, 42, 0.85)',
							border: '1px solid rgba(245, 158, 11, 0.4)',
							boxShadow: '0 30px 60px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.2)',
							transform: `scale(${interpolate(cardWaSpring, [0, 1], [0.6, 1])}) rotate(7deg)`,
							opacity: interpolate(cardWaSpring, [0, 1], [0, 1]),
							backdropFilter: 'blur(20px)',
						}}
					>
						<div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
							<div style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B' }} />
							<span style={{ fontSize: 11, fontFamily: 'monospace', color: '#F59E0B', fontWeight: 700 }}>
								WHATSAPP CLIENT NOTE
							</span>
						</div>
						<div style={{ fontSize: 13, color: '#CBD5E1', lineHeight: 1.45 }}>
							"Hey Saumya, I drew red arrows on my screen with MS Paint. Did you get the email?"
						</div>
					</div>

					{/* Kinetic Main Hook Headline */}
					<div
						style={{
							textAlign: 'center',
							maxWidth: 1200,
							transform: `scale(${hookScale}) translate(${s1Glitch}px, ${-s1Glitch}px)`,
						}}
					>
						<div
							style={{
								fontSize: 16,
								fontWeight: 800,
								color: '#38BDF8',
								letterSpacing: '0.35em',
								textTransform: 'uppercase',
								marginBottom: 22,
							}}
						>
							THE DEATH OF CLIENT FEEDBACK HELL
						</div>

						<h1
							style={{
								fontSize: 92,
								fontWeight: 900,
								lineHeight: 1.05,
								letterSpacing: '-0.04em',
								margin: 0,
								background: 'linear-gradient(180deg, #FFFFFF 0%, #94A3B8 100%)',
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
							}}
						>
							Stop Taking Messy Screenshots.
						</h1>

						{/* Laser Strike-through Bar */}
						<div style={{ position: 'relative', display: 'inline-block', marginTop: 16 }}>
							<span
								style={{
									fontSize: 54,
									fontWeight: 800,
									color: '#64748B',
									letterSpacing: '-0.02em',
								}}
							>
								50 Confusing Messages Later.
							</span>

							<div
								style={{
									position: 'absolute',
									top: '50%',
									left: 0,
									width: `${strikeProgress * 100}%`,
									height: 7,
									backgroundColor: '#EF4444',
									boxShadow: '0 0 25px #EF4444, 0 0 50px #EF4444',
									transform: 'translateY(-50%)',
									borderRadius: 4,
								}}
							/>
						</div>
					</div>
				</AbsoluteFill>
			)}

			{/* ========================================================================= */}
			{/* ACT 2: THE OLD HOMEPAGE ROAST (Frames 480 - 920)                          */}
			{/* ========================================================================= */}
			{s2Active && (
				<AbsoluteFill
					style={{
						opacity: s2Progress,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						perspective: 1200,
					}}
				>
					<div
						style={{
							fontSize: 14,
							fontWeight: 700,
							color: '#EF4444',
							letterSpacing: '0.3em',
							textTransform: 'uppercase',
							marginBottom: 20,
							display: 'flex',
							alignItems: 'center',
							gap: 10,
						}}
					>
						<span style={{ padding: '4px 12px', background: 'rgba(239, 68, 68, 0.18)', borderRadius: 6 }}>
							VULNERABLE FOUNDER CONFESSION
						</span>
						<span>OUR FIRST HOMEPAGE WAS ROASTED</span>
					</div>

					<div
						style={{
							width: 1420,
							height: 760,
							borderRadius: 22,
							backgroundColor: '#0D111A',
							border: '1px solid rgba(255, 255, 255, 0.16)',
							boxShadow: '0 40px 100px rgba(0, 0, 0, 0.85), inset 0 1px 1px rgba(255,255,255,0.25)',
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
							transform: `
								scale(${browserScale})
								rotateX(${browserTiltX}deg)
								rotateY(${browserTiltY}deg)
							`,
							position: 'relative',
						}}
					>
						<div
							style={{
								height: 48,
								backgroundColor: 'rgba(255, 255, 255, 0.04)',
								borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
								display: 'flex',
								alignItems: 'center',
								padding: '0 20px',
								gap: 14,
							}}
						>
							<div style={{ display: 'flex', gap: 8 }}>
								<div style={{ width: 12, height: 12, borderRadius: '50%', background: '#EF4444' }} />
								<div style={{ width: 12, height: 12, borderRadius: '50%', background: '#F59E0B' }} />
								<div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10B981' }} />
							</div>
							<div
								style={{
									flex: 1,
									maxWidth: 440,
									margin: '0 auto',
									backgroundColor: 'rgba(0, 0, 0, 0.45)',
									padding: '6px 16px',
									borderRadius: 8,
									fontSize: 12,
									fontFamily: 'monospace',
									color: '#94A3B8',
									display: 'flex',
									alignItems: 'center',
									gap: 8,
								}}
							>
								<span style={{ color: '#10B981' }}>🔒</span> stage.entrext.com (Early Alpha V1)
							</div>
						</div>

						<div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
							<Img
								src={staticFile('stage_assets/old_homepage.png')}
								style={{
									width: '100%',
									height: '100%',
									objectFit: 'cover',
									objectPosition: 'top center',
								}}
							/>

							{/* Caution Stamp Overlay */}
							<div
								style={{
									position: 'absolute',
									top: '36%',
									right: '15%',
									transform: `scale(${stampScale}) rotate(-14deg)`,
									border: '5px solid #EF4444',
									padding: '16px 32px',
									borderRadius: 14,
									backgroundColor: 'rgba(239, 68, 68, 0.22)',
									backdropFilter: 'blur(10px)',
									boxShadow: '0 0 50px rgba(239, 68, 68, 0.6)',
								}}
							>
								<div
									style={{
										fontSize: 34,
										fontWeight: 900,
										color: '#EF4444',
										letterSpacing: '0.12em',
										fontFamily: 'monospace',
									}}
								>
									TOO MUCH CLUTTER
								</div>
								<div style={{ fontSize: 14, color: '#FCA5A5', textAlign: 'center', marginTop: 4 }}>
									NO REAL PROOF • TINY TEXT
								</div>
							</div>
						</div>
					</div>
				</AbsoluteFill>
			)}

			{/* ========================================================================= */}
			{/* ACT 3: COMMUNITY ROAST PINS (Frames 920 - 1520)                           */}
			{/* ========================================================================= */}
			{s3Active && (
				<AbsoluteFill
					style={{
						opacity: s3Progress,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						perspective: 1200,
					}}
				>
					<div
						style={{
							fontSize: 14,
							fontWeight: 700,
							color: '#38BDF8',
							letterSpacing: '0.3em',
							textTransform: 'uppercase',
							marginBottom: 16,
						}}
					>
						COMMUNITY PIN-DROPS • WHAT THEY ACTUALLY SAID
					</div>

					<div
						style={{
							width: 1420,
							height: 760,
							borderRadius: 22,
							backgroundColor: '#0D111A',
							border: '1px solid rgba(255, 255, 255, 0.18)',
							boxShadow: '0 40px 100px rgba(0, 0, 0, 0.85)',
							overflow: 'hidden',
							position: 'relative',
						}}
					>
						<Img
							src={staticFile('stage_assets/old_homepage.png')}
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'cover',
								filter: 'brightness(0.6)',
							}}
						/>

						{/* Pin 1: Rajat Shahi */}
						{frame >= 940 && (
							<>
								<div
									style={{
										position: 'absolute',
										top: 190,
										left: 680,
										width: 38,
										height: 38,
										borderRadius: '50%',
										backgroundColor: '#38BDF8',
										boxShadow: '0 0 30px #38BDF8',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										fontWeight: 900,
										fontSize: 16,
										color: '#000',
										transform: `scale(${interpolate(pin1Spring, [0, 1], [0, 1])})`,
										zIndex: 20,
									}}
								>
									1
								</div>

								<div
									style={{
										position: 'absolute',
										top: 90,
										left: 740,
										maxWidth: 580,
										borderRadius: 14,
										overflow: 'hidden',
										boxShadow: '0 25px 50px rgba(0,0,0,0.8)',
										border: '2px solid rgba(56, 189, 248, 0.6)',
										transform: `scale(${interpolate(cardRajatSpring, [0, 1], [0.7, 1])})`,
										opacity: interpolate(cardRajatSpring, [0, 1], [0, 1]),
										zIndex: 30,
									}}
								>
									<Img
										src={staticFile('stage_assets/feedback_rajat.png')}
										style={{ width: '100%', display: 'block' }}
									/>
								</div>
							</>
						)}

						{/* Pin 2: Andriy Bohutskyy */}
						{frame >= 1100 && (
							<>
								<div
									style={{
										position: 'absolute',
										top: 420,
										left: 220,
										width: 38,
										height: 38,
										borderRadius: '50%',
										backgroundColor: '#10B981',
										boxShadow: '0 0 30px #10B981',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										fontWeight: 900,
										fontSize: 16,
										color: '#000',
										transform: `scale(${interpolate(pin2Spring, [0, 1], [0, 1])})`,
										zIndex: 20,
									}}
								>
									2
								</div>

								<div
									style={{
										position: 'absolute',
										top: 360,
										left: 280,
										maxWidth: 700,
										borderRadius: 14,
										overflow: 'hidden',
										boxShadow: '0 25px 50px rgba(0,0,0,0.8)',
										border: '2px solid rgba(16, 185, 129, 0.6)',
										transform: `scale(${interpolate(cardAndriySpring, [0, 1], [0.7, 1])})`,
										opacity: interpolate(cardAndriySpring, [0, 1], [0, 1]),
										zIndex: 30,
									}}
								>
									<Img
										src={staticFile('stage_assets/feedback_andriy.png')}
										style={{ width: '100%', display: 'block' }}
									/>
								</div>
							</>
						)}

						{/* Pin 3: Discord Daymon */}
						{frame >= 1280 && (
							<>
								<div
									style={{
										position: 'absolute',
										bottom: 110,
										right: 580,
										width: 38,
										height: 38,
										borderRadius: '50%',
										backgroundColor: '#F43F5E',
										boxShadow: '0 0 30px #F43F5E',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										fontWeight: 900,
										fontSize: 16,
										color: '#fff',
										transform: `scale(${interpolate(pin3Spring, [0, 1], [0, 1])})`,
										zIndex: 20,
									}}
								>
									3
								</div>

								<div
									style={{
										position: 'absolute',
										bottom: 90,
										right: 80,
										maxWidth: 520,
										borderRadius: 14,
										overflow: 'hidden',
										boxShadow: '0 25px 50px rgba(0,0,0,0.8)',
										border: '2px solid rgba(244, 63, 94, 0.6)',
										transform: `scale(${interpolate(cardDiscordSpring, [0, 1], [0.7, 1])})`,
										opacity: interpolate(cardDiscordSpring, [0, 1], [0, 1]),
										zIndex: 30,
									}}
								>
									<Img
										src={staticFile('stage_assets/feedback_discord_daymon.png')}
										style={{ width: '100%', display: 'block' }}
									/>
								</div>
							</>
						)}
					</div>
				</AbsoluteFill>
			)}

			{/* ========================================================================= */}
			{/* ACT 4: KINETIC SCANNER MORPH (Frames 1520 - 2040)                         */}
			{/* ========================================================================= */}
			{s4Active && (
				<AbsoluteFill
					style={{
						opacity: s4Progress,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						perspective: 1200,
					}}
				>
					<div
						style={{
							fontSize: 14,
							fontWeight: 700,
							color: '#10B981',
							letterSpacing: '0.3em',
							textTransform: 'uppercase',
							marginBottom: 16,
							display: 'flex',
							alignItems: 'center',
							gap: 10,
						}}
					>
						<span>⚡ THE EVOLUTION IN REAL TIME</span>
						<span>•</span>
						<span>WE FIXED IT USING STAGE</span>
					</div>

					<div
						style={{
							width: 1440,
							height: 760,
							borderRadius: 22,
							backgroundColor: '#07070A',
							border: '1px solid rgba(56, 189, 248, 0.35)',
							boxShadow: '0 40px 120px rgba(0, 0, 0, 0.9), 0 0 80px rgba(56, 189, 248, 0.2)',
							overflow: 'hidden',
							position: 'relative',
							transform: `scale(${newHomeScale})`,
						}}
					>
						<Img
							src={staticFile('stage_assets/new_homepage.png')}
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'cover',
								objectPosition: 'top center',
							}}
						/>

						{/* Laser Scanner Sweep Line */}
						{frame < 1720 && (
							<div
								style={{
									position: 'absolute',
									top: 0,
									bottom: 0,
									left: `${scanSweep}%`,
									width: 5,
									backgroundColor: '#38BDF8',
									boxShadow: '0 0 30px #38BDF8, 0 0 60px #38BDF8, -30px 0 90px rgba(56,189,248,0.6)',
								}}
							/>
						)}

						{/* Animated Pink Marker Underline on 'not in screenshots' */}
						{frame >= 1710 && (
							<div
								style={{
									position: 'absolute',
									top: '49%',
									left: '26%',
									width: `${brushWidth * 4.8}px`,
									maxWidth: 480,
									height: 28,
									backgroundColor: 'rgba(251, 113, 133, 0.35)',
									borderRadius: 14,
									filter: 'blur(4px)',
									boxShadow: '0 0 20px rgba(251, 113, 133, 0.6)',
									pointerEvents: 'none',
								}}
							/>
						)}

						{/* Telemetry Badge Overlays */}
						<div
							style={{
								position: 'absolute',
								bottom: 30,
								left: 40,
								display: 'flex',
								gap: 16,
							}}
						>
							<div
								style={{
									padding: '10px 18px',
									borderRadius: 12,
									backgroundColor: 'rgba(15, 23, 42, 0.9)',
									border: '1px solid rgba(56, 189, 248, 0.4)',
									backdropFilter: 'blur(10px)',
									transform: `scale(${interpolate(badge1Spring, [0, 1], [0.5, 1])})`,
									opacity: interpolate(badge1Spring, [0, 1], [0, 1]),
								}}
							>
								<div style={{ fontSize: 11, fontFamily: 'monospace', color: '#94A3B8' }}>
									HEADLINE CLARITY
								</div>
								<div style={{ fontSize: 18, fontWeight: 800, color: '#38BDF8' }}>
									100% VALUE FOCUS
								</div>
							</div>

							<div
								style={{
									padding: '10px 18px',
									borderRadius: 12,
									backgroundColor: 'rgba(15, 23, 42, 0.9)',
									border: '1px solid rgba(16, 185, 129, 0.4)',
									backdropFilter: 'blur(10px)',
									transform: `scale(${interpolate(badge2Spring, [0, 1], [0.5, 1])})`,
									opacity: interpolate(badge2Spring, [0, 1], [0, 1]),
								}}
							>
								<div style={{ fontSize: 11, fontFamily: 'monospace', color: '#94A3B8' }}>
									USER FRICTION
								</div>
								<div style={{ fontSize: 18, fontWeight: 800, color: '#10B981' }}>
									0 EXTENSIONS NEEDED
								</div>
							</div>

							<div
								style={{
									padding: '10px 18px',
									borderRadius: 12,
									backgroundColor: 'rgba(15, 23, 42, 0.9)',
									border: '1px solid rgba(244, 63, 94, 0.4)',
									backdropFilter: 'blur(10px)',
									transform: `scale(${interpolate(badge3Spring, [0, 1], [0.5, 1])})`,
									opacity: interpolate(badge3Spring, [0, 1], [0, 1]),
								}}
							>
								<div style={{ fontSize: 11, fontFamily: 'monospace', color: '#94A3B8' }}>
									MOBILE PERFORMANCE
								</div>
								<div style={{ fontSize: 18, fontWeight: 800, color: '#F43F5E' }}>
									60 FPS FLUID
								</div>
							</div>
						</div>
					</div>
				</AbsoluteFill>
			)}

			{/* ========================================================================= */}
			{/* ACT 5: TOMMY MCGLYNN LIVE REVIEW SPOTLIGHT (Frames 2040 - 2640)           */}
			{/* ========================================================================= */}
			{s5Active && (
				<AbsoluteFill
					style={{
						opacity: s5Progress,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						perspective: 1200,
					}}
				>
					<div
						style={{
							fontSize: 14,
							fontWeight: 800,
							color: '#10B981',
							letterSpacing: '0.3em',
							textTransform: 'uppercase',
							marginBottom: 16,
							display: 'flex',
							alignItems: 'center',
							gap: 12,
						}}
					>
						<span style={{ padding: '4px 14px', background: 'rgba(16, 185, 129, 0.18)', borderRadius: 999 }}>
							● VERIFIED USER TESTIMONIAL
						</span>
						<span>HEAR WHAT TOMMY MCGLYNN EXPERIENCED</span>
					</div>

					{/* Centered Spotlight Frame with Tommy's Real Video and Audio */}
					<div
						style={{
							width: 1360,
							height: 720,
							borderRadius: 24,
							backgroundColor: '#090D16',
							border: '1px solid rgba(16, 185, 129, 0.5)',
							boxShadow: '0 40px 100px rgba(0, 0, 0, 0.9), 0 0 60px rgba(16, 185, 129, 0.25)',
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
							position: 'relative',
							transform: `scale(${tommyScale})`,
						}}
					>
						{/* Video Header with Live Equalizer */}
						<div
							style={{
								height: 52,
								backgroundColor: 'rgba(255, 255, 255, 0.05)',
								borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								padding: '0 24px',
							}}
						>
							<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
								<div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981' }} />
								<span style={{ fontSize: 13, fontWeight: 800, color: '#E2E8F0', letterSpacing: '0.05em' }}>
									TOMMY MCGLYNN • LIVE PRODUCT REVIEW
								</span>
							</div>

							{/* Dynamic Simulated Audio Waveform Bars */}
							<div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 24 }}>
								{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
									const barH = 6 + Math.abs(Math.sin((frame + i * 8) / 3)) * 16;
									return (
										<div
											key={i}
											style={{
												width: 3,
												height: `${barH}px`,
												backgroundColor: '#10B981',
												borderRadius: 2,
												boxShadow: '0 0 8px rgba(16, 185, 129, 0.5)',
											}}
										/>
									);
								})}
							</div>
						</div>

						{/* Tommy's Video Element Playing with Full Audio */}
						<div style={{ flex: 1, position: 'relative' }}>
							<Video
								src={staticFile('stage_assets/tommy_spotlight.mp4')}
								style={{
									width: '100%',
									height: '100%',
									objectFit: 'cover',
								}}
								volume={1.0}
							/>

							{/* Live Caption Overlays in Sync with Tommy's Words */}
							<div
								style={{
									position: 'absolute',
									bottom: 24,
									left: 36,
									right: 36,
									padding: '16px 24px',
									borderRadius: 16,
									background: 'rgba(9, 13, 22, 0.92)',
									border: '1px solid rgba(255, 255, 255, 0.15)',
									backdropFilter: 'blur(16px)',
									boxShadow: '0 10px 40px rgba(0,0,0,0.8)',
									textAlign: 'center',
								}}
							>
								{tommySubtitle1 && (
									<div style={{ fontSize: 22, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
										"Get client feedback on the <span style={{ color: '#38BDF8' }}>live page</span>, not in screenshots. Send one review link."
									</div>
								)}
								{tommySubtitle2 && (
									<div style={{ fontSize: 22, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
										"Your client clicks where something is wrong, and writes what they mean..."
									</div>
								)}
								{tommySubtitle3 && (
									<div style={{ fontSize: 22, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
										"You see the exact element and a screenshot, <span style={{ color: '#10B981' }}>nothing to install!</span>"
									</div>
								)}
							</div>
						</div>
					</div>
				</AbsoluteFill>
			)}

			{/* ========================================================================= */}
			{/* ACT 6: LIVE PRODUCT FEEDBACK DEMO & 3D RAYCASTING (Frames 2640 - 3140)    */}
			{/* ========================================================================= */}
			{s6Active && (
				<AbsoluteFill
					style={{
						opacity: s6Progress,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						perspective: 1200,
					}}
				>
					<div
						style={{
							fontSize: 14,
							fontWeight: 700,
							color: '#818CF8',
							letterSpacing: '0.3em',
							textTransform: 'uppercase',
							marginBottom: 16,
						}}
					>
						INSIDE THE LIVE REVIEW WORKSPACE • ZERO FRICTION
					</div>

					<div
						style={{
							width: 1440,
							height: 760,
							borderRadius: 22,
							backgroundColor: '#090D16',
							border: '1px solid rgba(129, 140, 248, 0.45)',
							boxShadow: '0 40px 100px rgba(0,0,0,0.85), 0 0 60px rgba(129, 140, 248, 0.2)',
							overflow: 'hidden',
							position: 'relative',
							transform: `scale(${demoScale})`,
						}}
					>
						<Video
							src={staticFile('stage_assets/feedback_page_demo.mp4')}
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'cover',
							}}
							volume={0}
						/>

						{/* High-Tech DOM Telemetry HUD Overlay */}
						<div
							style={{
								position: 'absolute',
								top: 24,
								left: 24,
								display: 'flex',
								flexDirection: 'column',
								gap: 8,
							}}
						>
							<div
								style={{
									padding: '8px 16px',
									borderRadius: 10,
									background: 'rgba(9, 13, 22, 0.88)',
									border: '1px solid rgba(56, 189, 248, 0.4)',
									backdropFilter: 'blur(10px)',
									display: 'flex',
									alignItems: 'center',
									gap: 10,
								}}
							>
								<div style={{ width: 8, height: 8, borderRadius: '50%', background: '#38BDF8' }} />
								<span style={{ fontSize: 12, fontFamily: 'monospace', color: '#E2E8F0' }}>
									RAYCAST: Three.js Mesh [x: 4.81, y: -2.34, z: 0.92]
								</span>
							</div>

							<div
								style={{
									padding: '8px 16px',
									borderRadius: 10,
									background: 'rgba(9, 13, 22, 0.88)',
									border: '1px solid rgba(16, 185, 129, 0.4)',
									backdropFilter: 'blur(10px)',
									display: 'flex',
									alignItems: 'center',
									gap: 10,
								}}
							>
								<div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
								<span style={{ fontSize: 12, fontFamily: 'monospace', color: '#E2E8F0' }}>
									DOM SELECTOR: main &gt; section.features &gt; div.card-grid
								</span>
							</div>
						</div>
					</div>
				</AbsoluteFill>
			)}

			{/* ========================================================================= */}
			{/* ACT 7: VIRAL CTA & LOGO BURST (Frames 3140 - 3600)                        */}
			{/* ========================================================================= */}
			{s7Active && (
				<AbsoluteFill
					style={{
						opacity: s7Progress,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						textAlign: 'center',
						transform: `translate3d(${globalFloatX}px, ${globalFloatY}px, 0)`,
					}}
				>
					<div
						style={{
							position: 'absolute',
							width: 650,
							height: 650,
							borderRadius: '50%',
							background: 'radial-gradient(circle, rgba(56, 189, 248, 0.28) 0%, rgba(129, 140, 248, 0.12) 40%, transparent 70%)',
							filter: `blur(${logoGlowRadius}px)`,
							pointerEvents: 'none',
						}}
					/>

					<div
						style={{
							transform: `scale(${logoScale})`,
							marginBottom: 28,
							filter: 'drop-shadow(0 0 40px rgba(56, 189, 248, 0.55))',
						}}
					>
						<Img
							src={staticFile('stage_assets/stage_logo.png')}
							style={{ height: 105, objectFit: 'contain' }}
						/>
					</div>

					<div
						style={{
							fontSize: 18,
							fontWeight: 800,
							color: '#38BDF8',
							letterSpacing: '0.28em',
							textTransform: 'uppercase',
							marginBottom: 16,
						}}
					>
						OUR NEW HOMEPAGE IS LIVE
					</div>

					<h2
						style={{
							fontSize: 76,
							fontWeight: 900,
							lineHeight: 1.1,
							letterSpacing: '-0.03em',
							maxWidth: 1100,
							margin: '0 auto 36px',
							background: 'linear-gradient(180deg, #FFFFFF 0%, #CBD5E1 100%)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
						}}
					>
						Now It’s Your Turn.<br />
						<span style={{ color: '#38BDF8', WebkitTextFillColor: '#38BDF8' }}>
							Roast Our Live Site Right Now.
						</span>
					</h2>

					<div
						style={{
							display: 'inline-flex',
							alignItems: 'center',
							gap: 20,
							padding: '12px 14px 12px 34px',
							borderRadius: 999,
							backgroundColor: 'rgba(15, 23, 42, 0.88)',
							border: '1px solid rgba(56, 189, 248, 0.45)',
							boxShadow: '0 25px 70px rgba(0, 0, 0, 0.8), 0 0 35px rgba(56, 189, 248, 0.3)',
							backdropFilter: 'blur(20px)',
							transform: `scale(${ctaScale * cursorClickScale})`,
							position: 'relative',
						}}
					>
						{frame >= 3380 && (
							<div
								style={{
									position: 'absolute',
									right: 30,
									top: '50%',
									width: 80,
									height: 80,
									borderRadius: '50%',
									border: '2px solid #38BDF8',
									transform: `translate(50%, -50%) scale(${rippleScale})`,
									opacity: rippleOpacity,
									pointerEvents: 'none',
								}}
							/>
						)}

						<span
							style={{
								fontSize: 24,
								fontFamily: 'monospace',
								fontWeight: 700,
								color: '#FFFFFF',
								letterSpacing: '0.02em',
							}}
						>
							stage.entrext.com
						</span>

						<div
							style={{
								padding: '16px 34px',
								borderRadius: 999,
								backgroundColor: '#38BDF8',
								color: '#050608',
								fontWeight: 900,
								fontSize: 16,
								letterSpacing: '0.08em',
								display: 'flex',
								alignItems: 'center',
								gap: 10,
								boxShadow: '0 0 28px rgba(56, 189, 248, 0.6)',
							}}
						>
							<span>DROP A PIN</span>
							<span style={{ fontSize: 18 }}>→</span>
						</div>
					</div>

					<div
						style={{
							marginTop: 34,
							fontSize: 13,
							color: '#94A3B8',
							fontFamily: 'monospace',
							letterSpacing: '0.15em',
						}}
					>
						ZERO EXTENSIONS • 1 REVIEW LINK • PINS ON LIVE 3D &amp; DOM
					</div>
				</AbsoluteFill>
			)}
		</AbsoluteFill>
	);
};
