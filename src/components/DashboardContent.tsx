import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from 'remotion';

const CHART_BARS = [45, 68, 32, 85, 94, 60, 78, 90, 82, 100];

export const DashboardContent: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Active range for Dashboard view (frame 85 to 310)
	if (frame < 80 || frame > 320) return null;

	const contentOpacity = interpolate(
		frame,
		[85, 105, 290, 310],
		[0, 1, 1, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	// Continuous parallax drift for cards
	const driftY1 = Math.sin(frame / 25) * 4;
	const driftY2 = Math.cos(frame / 22) * 5;

	// Animated metric counters (frame 140 to 220)
	const countProgress = interpolate(
		frame,
		[140, 220],
		[0, 1],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);

	const revenue = Math.round(countProgress * 482910);
	const activeUsers = Math.round(countProgress * 24950);
	const growthRate = (countProgress * 148.2).toFixed(1);

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				padding: '24px 32px',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				opacity: contentOpacity,
				color: '#FFFFFF',
				fontFamily: 'Inter, sans-serif',
				boxSizing: 'border-box',
			}}
		>
			{/* Top Header Bar */}
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
					<div
						style={{
							width: '12px',
							height: '12px',
							borderRadius: '50%',
							backgroundColor: '#38BDF8',
							boxShadow: '0 0 10px #38BDF8',
						}}
					/>
					<span style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '-0.02em' }}>
						OmniAssist Intelligence Suite
					</span>
					<span
						style={{
							fontSize: '11px',
							fontFamily: 'monospace',
							backgroundColor: 'rgba(56, 189, 248, 0.15)',
							color: '#38BDF8',
							border: '1px solid rgba(56, 189, 248, 0.3)',
							padding: '3px 10px',
							borderRadius: '12px',
						}}
					>
						LIVE METRICS
					</span>
				</div>

				<div style={{ fontSize: '13px', color: '#94A3B8', fontFamily: 'monospace' }}>
					Q3 ANALYTICS • AUTOMATED REASONING
				</div>
			</div>

			{/* Top 3 Metric Cards */}
			<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
				{[
					{ label: 'Q3 ARR REVENUE', value: `$${revenue.toLocaleString()}`, change: `+${growthRate}%`, color: '#38BDF8', drift: driftY1 },
					{ label: 'ACTIVE AI AGENTS', value: activeUsers.toLocaleString(), change: '+340 today', color: '#818CF8', drift: driftY2 },
					{ label: 'AVG RESPONSE TIME', value: '12.4 ms', change: '99.99% uptime', color: '#34D399', drift: driftY1 },
				].map((card, i) => {
					const cardSpring = spring({
						frame: frame - (110 + i * 8),
						fps,
						config: { stiffness: 120, damping: 14 },
					});

					return (
						<div
							key={i}
							style={{
								backgroundColor: 'rgba(255, 255, 255, 0.04)',
								border: '1px solid rgba(255, 255, 255, 0.1)',
								borderRadius: '16px',
								padding: '20px',
								transform: `translateY(${card.drift}px) scale(${cardSpring})`,
								boxShadow: `0 8px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)`,
							}}
						>
							<div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'monospace', letterSpacing: '0.1em' }}>
								{card.label}
							</div>
							<div style={{ fontSize: '32px', fontWeight: 900, margin: '8px 0', color: '#FFFFFF', letterSpacing: '-0.04em' }}>
								{card.value}
							</div>
							<div style={{ fontSize: '12px', color: card.color, fontWeight: 700 }}>
								{card.change}
							</div>
						</div>
					);
				})}
			</div>

			{/* Main Revenue Chart & Live Stream Split */}
			<div
				style={{
					backgroundColor: 'rgba(255, 255, 255, 0.03)',
					border: '1px solid rgba(255, 255, 255, 0.08)',
					borderRadius: '18px',
					padding: '20px 24px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					height: '280px',
				}}
			>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<span style={{ fontSize: '14px', fontWeight: 700, color: '#E2E8F0' }}>
						Autonomous Execution Volume
					</span>
					<div style={{ display: 'flex', gap: '8px' }}>
						<span style={{ fontSize: '11px', color: '#38BDF8', fontFamily: 'monospace' }}>● Real-time</span>
					</div>
				</div>

				{/* Animated Bar Chart */}
				<div
					style={{
						display: 'flex',
						alignItems: 'flex-end',
						justifyContent: 'space-between',
						height: '180px',
						paddingTop: '20px',
						gap: '12px',
					}}
				>
					{CHART_BARS.map((targetHeight, i) => {
						const barSpring = spring({
							frame: frame - (130 + i * 4),
							fps,
							config: { stiffness: 100, damping: 12 },
						});

						const barHeight = targetHeight * barSpring;

						return (
							<div
								key={i}
								style={{
									flex: 1,
									height: '100%',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'flex-end',
									alignItems: 'center',
								}}
							>
								<div
									style={{
										width: '100%',
										height: `${barHeight}%`,
										borderRadius: '6px 6px 2px 2px',
										background: i === 7 || i === 9
											? 'linear-gradient(180deg, #38BDF8 0%, #2563EB 100%)'
											: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
										boxShadow: i === 7 || i === 9 ? '0 0 16px rgba(56, 189, 248, 0.5)' : 'none',
										transition: 'height 0.1s ease',
									}}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
