import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
	Easing,
} from 'remotion';
import { THEME } from './BrandTokens';
import { MushroomClusterSvg, KaleLeafSvg } from './BotanicalEtchings';

interface StepData {
	id: number;
	title: string;
	time: string;
	temp: string;
	desc: string;
	icon: React.ReactNode;
}

const STEPS: StepData[] = [
	{
		id: 1,
		title: 'Farm Harvest',
		time: '04:00 AM',
		temp: 'Ambient 52°F',
		desc: 'Harvested at dawn from certified Salinas organic fields.',
		icon: (
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={THEME.green.fresh} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
				<path d="M12 2a9 9 0 0 1 9 9c0 4.97-4.03 9-9 9A9 9 0 0 1 3 11a9 9 0 0 1 9-9Z" />
				<path d="M12 7v10M8 12l4-4 4 4" />
			</svg>
		),
	},
	{
		id: 2,
		title: 'Hydro Pre-Cool',
		time: '06:15 AM',
		temp: 'Chilled 34.0°F',
		desc: 'Hydro-vacuum chilled to remove field heat within 90 minutes.',
		icon: (
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={THEME.green.fresh} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
				<line x1="12" y1="2" x2="12" y2="22" />
				<line x1="2" y1="12" x2="22" y2="12" />
				<line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
				<line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
			</svg>
		),
	},
	{
		id: 3,
		title: 'Cold Transit',
		time: '09:30 AM',
		temp: 'Constant 34.5°F',
		desc: 'Refrigerated fleet with continuous IoT thermal telemetry.',
		icon: (
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={THEME.green.fresh} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
				<rect x="1" y="3" width="15" height="13" />
				<polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
				<circle cx="5.5" cy="18.5" r="2.5" />
				<circle cx="18.5" cy="18.5" r="2.5" />
			</svg>
		),
	},
	{
		id: 4,
		title: 'Metro Hub',
		time: '01:00 AM',
		temp: 'Direct 34.2°F',
		desc: 'Automated cold-dock sorting directly to route carriers.',
		icon: (
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={THEME.green.fresh} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
				<path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v4M12 14v4M16 14v4" />
			</svg>
		),
	},
	{
		id: 5,
		title: 'Kitchen Drop',
		time: '05:45 AM',
		temp: 'Verified 34.1°F',
		desc: 'Walk-in refrigerator placement before prep shift begins.',
		icon: (
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={THEME.green.fresh} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
				<path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
				<line x1="6" y1="17" x2="18" y2="17" />
			</svg>
		),
	},
];

export const Pin4ColdChainFlow: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Line animation from 0% to 100% across frame 20 to 120
	const lineProgress = interpolate(frame, [20, 120], [0, 100], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});

	// Frame delays for the 5 icons: 20, 42, 64, 86, 108
	const delays = [20, 42, 64, 86, 108];

	// Active step index
	let activeStep = 0;
	delays.forEach((d, idx) => {
		if (frame >= d) activeStep = idx;
	});

	// Card entry spring
	const cardSpring = spring({
		frame: frame - 5,
		fps,
		config: { damping: 14, stiffness: 120 },
	});
	const cardY = interpolate(cardSpring, [0, 1], [40, 0]);
	const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: THEME.midnight.base,
				fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
				overflow: 'hidden',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				padding: '60px 40px',
				position: 'relative',
			}}
		>
			{/* Ambient Cerulean & Emerald Glow Backdrop */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background: `
						radial-gradient(ellipse at 50% 25%, rgba(2, 132, 199, 0.28) 0%, transparent 60%),
						radial-gradient(ellipse at 50% 85%, rgba(21, 128, 61, 0.18) 0%, transparent 65%),
						linear-gradient(180deg, ${THEME.midnight.base} 0%, ${THEME.midnight.navy} 100%)
					`,
				}}
			/>

			{/* Botanical Watermark on sides */}
			<div style={{ position: 'absolute', top: 40, right: 30, opacity: 0.12, pointerEvents: 'none' }}>
				<MushroomClusterSvg width={380} height={280} color="#FFFFFF" />
			</div>
			<div style={{ position: 'absolute', bottom: 40, left: 30, opacity: 0.1, pointerEvents: 'none' }}>
				<KaleLeafSvg width={380} height={340} color="#FFFFFF" />
			</div>

			{/* Background Cold Chain Grid */}
			<div
				style={{
					position: 'absolute',
					inset: -40,
					backgroundImage: `
						linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
						linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px)
					`,
					backgroundSize: '40px 40px',
					opacity: 0.7,
				}}
			/>

			{/* Header Title Section with Delivery & SKU stats from Image 1 */}
			<div
				style={{
					textAlign: 'center',
					marginBottom: 44,
					zIndex: 10,
					maxWidth: 780,
					opacity: cardOpacity,
					transform: `translateY(${cardY}px)`,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<div
					style={{
						display: 'inline-flex',
						alignItems: 'center',
						gap: 12,
						padding: '8px 20px',
						background: 'rgba(2, 132, 199, 0.18)',
						border: '1px solid rgba(56, 189, 248, 0.4)',
						borderRadius: 999,
						color: THEME.blue.light,
						fontSize: 13,
						fontWeight: 800,
						letterSpacing: '0.1em',
						textTransform: 'uppercase',
						marginBottom: 16,
					}}
				>
					<span
						style={{
							width: 8,
							height: 8,
							borderRadius: '50%',
							backgroundColor: THEME.green.neon,
							boxShadow: `0 0 10px ${THEME.green.neon}`,
						}}
					/>
					Guaranteed Unbroken Cold Chain • 6-Day Delivery • 394 SKUs
				</div>

				<h1
					style={{
						margin: '0 0 12px 0',
						fontSize: 44,
						fontWeight: 800,
						color: '#FFFFFF',
						letterSpacing: '-0.03em',
					}}
				>
					Zero-Degradation Supply Journey
				</h1>
				<p style={{ margin: 0, fontSize: 18, color: THEME.midnight.textMuted }}>
					From harvest cutting to your walk-in cooler: 34°F calibrated and locked at every second.
				</p>
			</div>

			{/* ── Main Infographic Card (Warm Cream Linen base from Image 1) ── */}
			<div
				style={{
					width: '100%',
					maxWidth: 980,
					background: THEME.cream.card,
					borderRadius: 24,
					padding: '44px 48px',
					border: `1px solid ${THEME.cream.border}`,
					boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.65), 0 0 45px rgba(2, 132, 199, 0.15)',
					zIndex: 10,
					opacity: cardOpacity,
					transform: `translateY(${cardY}px)`,
					display: 'flex',
					flexDirection: 'column',
					gap: 40,
				}}
			>
				{/* ── DEVELOPER SPEC: display: flex; justify-content: space-between; align-items: flex-start; position: relative; width: 100%; padding: 24px 0; ── */}
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'flex-start',
						position: 'relative',
						width: '100%',
						padding: '24px 0',
						boxSizing: 'border-box',
					}}
				>
					{/* ── Connecting Line (Background): position: absolute; top: 32px; left: 0; right: 0; height: 2px; border-top: 2px dashed #E5E7EB; z-index: 1; ── */}
					<div
						style={{
							position: 'absolute',
							top: 32,
							left: '5%',
							right: '5%',
							height: 2,
							borderTop: '2px dashed #D1D5DB',
							zIndex: 1,
						}}
					/>

					{/* ── Animated Neon Green Traveled Path (#15803D / Neon) ── */}
					<div
						style={{
							position: 'absolute',
							top: 31,
							left: '5%',
							width: `${lineProgress * 0.9}%`,
							height: 4,
							background: `linear-gradient(90deg, ${THEME.blue.primary} 0%, ${THEME.green.fresh} 80%, ${THEME.green.neon} 100%)`,
							boxShadow: `0 0 14px ${THEME.green.neon}`,
							borderRadius: 2,
							zIndex: 2,
						}}
					/>

					{/* ── Icons (Nodes): 5 distinct div containers, z-index: 2, background: #FFFFFF, border-radius: 50%, padding: 12px, border: 2px solid #15803D. Inside: 24x24px SVG icons (stroke-width: 2px, stroke: #15803D). ── */}
					{STEPS.map((step, idx) => {
						const delay = delays[idx];
						const nodeSpring = spring({
							frame: frame - delay,
							fps,
							config: { damping: 11, stiffness: 180 }, // cubic-bezier(0.34, 1.56, 0.64, 1) pop
						});

						const nodeScale = frame >= delay ? interpolate(nodeSpring, [0, 1], [0, 1]) : 0;
						const isPassed = frame >= delay;
						const isCurrent = activeStep === idx;

						return (
							<div
								key={step.id}
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									width: 150,
									zIndex: 10,
									transform: `scale(${nodeScale})`,
								}}
							>
								{/* Node Circle */}
								<div
									style={{
										width: 52,
										height: 52,
										borderRadius: '50%',
										background: '#FFFFFF',
										border: isPassed ? `2px solid ${THEME.green.fresh}` : '2px solid #D1D5DB',
										padding: 12,
										boxSizing: 'border-box',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										boxShadow: isCurrent
											? `0 0 20px ${THEME.green.neon}, 0 4px 10px rgba(0,0,0,0.15)`
											: '0 2px 6px rgba(0,0,0,0.08)',
										position: 'relative',
									}}
								>
									{step.icon}

									{/* Step Number Badge */}
									<div
										style={{
											position: 'absolute',
											top: -6,
											right: -6,
											width: 18,
											height: 18,
											borderRadius: '50%',
											background: isPassed ? THEME.green.fresh : '#94A3B8',
											color: '#FFFFFF',
											fontSize: 10,
											fontWeight: 800,
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
										}}
									>
										{step.id}
									</div>
								</div>

								{/* Node Label Details */}
								<div
									style={{
										textAlign: 'center',
										marginTop: 14,
										display: 'flex',
										flexDirection: 'column',
										gap: 4,
									}}
								>
									<span style={{ fontSize: 11, fontWeight: 700, color: THEME.blue.primary, letterSpacing: '0.04em' }}>
										{step.time}
									</span>
									<span style={{ fontSize: 15, fontWeight: 800, color: '#111827' }}>
										{step.title}
									</span>
									<span
										style={{
											fontSize: 11,
											fontWeight: 700,
											color: THEME.green.fresh,
											background: THEME.green.pale,
											padding: '2px 6px',
											borderRadius: 4,
											display: 'inline-block',
										}}
									>
										{step.temp}
									</span>
									<p style={{ margin: '4px 0 0 0', fontSize: 11, color: '#6B7280', lineHeight: 1.35 }}>
										{step.desc}
									</p>
								</div>
							</div>
						);
					})}
				</div>

				{/* Telemetry Live Feed Strip at Bottom */}
				<div
					style={{
						background: '#FAF7F2',
						border: `1px solid ${THEME.cream.border}`,
						borderRadius: 14,
						padding: '16px 24px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
						<div
							style={{
								width: 10,
								height: 10,
								borderRadius: '50%',
								backgroundColor: THEME.green.neon,
								boxShadow: `0 0 8px ${THEME.green.neon}`,
							}}
						/>
						<span style={{ fontSize: 13, fontWeight: 700, color: THEME.cream.inkNavy }}>
							Continuous Fleet Telemetry: Active Sensor #TC-8834
						</span>
					</div>
					<div style={{ display: 'flex', gap: 24, fontSize: 13 }}>
						<span style={{ color: '#64748B' }}>
							Variance: <strong style={{ color: THEME.green.fresh }}>±0.2°F</strong>
						</span>
						<span style={{ color: '#64748B' }}>
							Cold Loss: <strong style={{ color: THEME.green.fresh }}>0.00%</strong>
						</span>
						<span style={{ color: '#64748B' }}>
							Status: <strong style={{ color: THEME.blue.primary }}>100% Locked</strong>
						</span>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};
