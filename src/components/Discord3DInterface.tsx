import React from 'react';
import { interpolate, Easing } from 'remotion';

interface Discord3DInterfaceProps {
	frame: number;
	scale: number;
	opacity: number;
}

export const Discord3DInterface: React.FC<Discord3DInterfaceProps> = ({
	frame,
	scale,
	opacity,
}) => {
	// Floating subtle 3D rotational drift
	const rotY = interpolate(frame, [200, 480], [-7, -2], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.quad),
	});
	const rotX = interpolate(frame, [200, 480], [5, 2], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Message typing / appearance staggered
	const msg1Opacity = interpolate(frame, [230, 245], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const msg2Opacity = interpolate(frame, [245, 260], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const msg3Opacity = interpolate(frame, [260, 275], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				perspective: 1400,
				opacity,
				pointerEvents: 'none',
				zIndex: 25,
			}}
		>
			{/* 3D Angled Discord App Chassis */}
			<div
				style={{
					width: 1480,
					height: 880,
					backgroundColor: '#313338', // Authentic Discord Chat BG
					borderRadius: 20,
					border: '1px solid rgba(255, 255, 255, 0.08)',
					boxShadow: `
						0 35px 90px -20px rgba(0, 0, 0, 0.85),
						0 0 120px rgba(88, 101, 242, 0.18),
						0 0 0 1px rgba(88, 101, 242, 0.12)
					`,
					display: 'flex',
					overflow: 'hidden',
					transform: `
						scale(${scale})
						rotateY(${rotY}deg)
						rotateX(${rotX}deg)
						translateZ(40px)
					`,
					transformStyle: 'preserve-3d',
				}}
			>
				{/* ── Discord Column 1: Server Sidebar (#1E1F22) ── */}
				<div
					style={{
						width: 72,
						backgroundColor: '#1E1F22',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						padding: '14px 0',
						gap: 12,
						borderRight: '1px solid rgba(0, 0, 0, 0.3)',
					}}
				>
					{/* Discord Direct Messages Icon */}
					<div
						style={{
							width: 48,
							height: 48,
							borderRadius: 16,
							backgroundColor: '#5865F2', // Discord Blurple
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							boxShadow: '0 0 16px rgba(88, 101, 242, 0.6)',
						}}
					>
						<svg width="28" height="22" viewBox="0 0 28 22" fill="none">
							<path
								d="M23.02 1.9C21.28 1.1 19.42 0.5 17.48 0.15C17.22 0.6 16.92 1.25 16.71 1.76C14.65 1.45 12.61 1.45 10.58 1.76C10.37 1.25 10.07 0.6 9.81 0.15C7.87 0.5 6.01 1.1 4.27 1.9C0.77 7.07 -0.17 12.11 0.05 17.07C2.37 18.78 4.61 19.82 6.81 20.5C7.36 19.75 7.85 18.95 8.27 18.1C7.47 17.8 6.7 17.41 5.97 16.94C6.16 16.8 6.35 16.65 6.53 16.5C10.89 18.52 15.62 18.52 19.93 16.5C20.12 16.65 20.31 16.8 20.5 16.94C19.76 17.41 18.99 17.8 18.19 18.1C18.61 18.95 19.11 19.75 19.66 20.5C21.86 19.82 24.11 18.78 26.43 17.07C26.71 11.41 25.42 6.42 23.02 1.9ZM9.3 14.1C8 14.1 6.93 12.92 6.93 11.49C6.93 10.06 7.98 8.88 9.3 8.88C10.63 8.88 11.7 10.06 11.67 11.49C11.67 12.92 10.63 14.1 9.3 14.1ZM17.98 14.1C16.68 14.1 15.61 12.92 15.61 11.49C15.61 10.06 16.66 8.88 17.98 8.88C19.31 8.88 20.38 10.06 20.35 11.49C20.35 12.92 19.31 14.1 17.98 14.1Z"
								fill="#FFFFFF"
							/>
						</svg>
					</div>

					<div style={{ width: 32, height: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 1 }} />

					{/* Antigravity AI Server Icon */}
					<div
						style={{
							width: 48,
							height: 48,
							borderRadius: '50%',
							backgroundColor: '#0F172A',
							border: '2px solid #00E5FF',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#00E5FF',
							fontWeight: 900,
							fontSize: 14,
							boxShadow: '0 0 12px rgba(0, 229, 255, 0.4)',
						}}
					>
						AGY
					</div>

					{/* Healthy Squirrel Critique Server Icon */}
					<div
						style={{
							width: 48,
							height: 48,
							borderRadius: 16,
							backgroundColor: '#2E8661',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#FFFFFF',
							fontWeight: 800,
							fontSize: 16,
							boxShadow: '0 0 12px rgba(46, 134, 97, 0.4)',
							position: 'relative',
						}}
					>
						HS
						{/* Active Notification Pill Indicator */}
						<div
							style={{
								position: 'absolute',
								left: -14,
								width: 4,
								height: 40,
								backgroundColor: '#FFFFFF',
								borderRadius: '0 4px 4px 0',
							}}
						/>
					</div>

					{/* Other Servers */}
					<div
						style={{
							width: 48,
							height: 48,
							borderRadius: '50%',
							backgroundColor: '#2B2D31',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#949BA4',
							fontWeight: 700,
							fontSize: 15,
						}}
					>
						UI
					</div>
					<div
						style={{
							width: 48,
							height: 48,
							borderRadius: '50%',
							backgroundColor: '#2B2D31',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#949BA4',
							fontWeight: 700,
							fontSize: 14,
						}}
					>
						DEV
					</div>
				</div>

				{/* ── Discord Column 2: Channels List (#2B2D31) ── */}
				<div
					style={{
						width: 240,
						backgroundColor: '#2B2D31',
						display: 'flex',
						flexDirection: 'column',
						borderRight: '1px solid rgba(0, 0, 0, 0.25)',
					}}
				>
					{/* Server Header */}
					<div
						style={{
							height: 52,
							padding: '0 16px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							borderBottom: '1px solid rgba(0, 0, 0, 0.3)',
							fontWeight: 700,
							fontSize: 15,
							color: '#FFFFFF',
						}}
					>
						<span>Design Roasts HQ</span>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#949BA4" strokeWidth="2">
							<path d="M6 9l6 6 6-6" />
						</svg>
					</div>

					{/* Channels List */}
					<div style={{ padding: '16px 8px', display: 'flex', flexDirection: 'column', gap: 6 }}>
						<div
							style={{
								fontSize: 12,
								fontWeight: 700,
								color: '#949BA4',
								padding: '0 8px',
								textTransform: 'uppercase',
								letterSpacing: '0.04em',
							}}
						>
							Text Channels
						</div>

						{/* Channel 1: general */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 8,
								padding: '8px 10px',
								borderRadius: 6,
								color: '#949BA4',
								fontSize: 14,
								fontWeight: 500,
							}}
						>
							<span style={{ fontSize: 18, color: '#80848E' }}>#</span>
							<span>general</span>
						</div>

						{/* Channel 2: #design-feedback (ACTIVE & GLOWING) */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 8,
								padding: '8px 10px',
								borderRadius: 6,
								backgroundColor: 'rgba(88, 101, 242, 0.2)',
								border: '1px solid rgba(88, 101, 242, 0.4)',
								boxShadow: '0 0 16px rgba(88, 101, 242, 0.25)',
								color: '#FFFFFF',
								fontSize: 14,
								fontWeight: 700,
							}}
						>
							<span style={{ fontSize: 18, color: '#5865F2' }}>#</span>
							<span style={{ color: '#FFFFFF' }}>design-feedback</span>
							<span
								style={{
									marginLeft: 'auto',
									fontSize: 11,
									fontWeight: 700,
									backgroundColor: '#DA373C',
									color: '#FFFFFF',
									padding: '1px 6px',
									borderRadius: 10,
								}}
							>
								24
							</span>
						</div>

						{/* Channel 3: roast-my-saas */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 8,
								padding: '8px 10px',
								borderRadius: 6,
								color: '#949BA4',
								fontSize: 14,
								fontWeight: 500,
							}}
						>
							<span style={{ fontSize: 18, color: '#80848E' }}>#</span>
							<span>roast-my-saas</span>
						</div>

						{/* Channel 4: live-critique */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 8,
								padding: '8px 10px',
								borderRadius: 6,
								color: '#949BA4',
								fontSize: 14,
								fontWeight: 500,
							}}
						>
							<span style={{ fontSize: 18, color: '#80848E' }}>#</span>
							<span>live-critique</span>
						</div>
					</div>
				</div>

				{/* ── Discord Column 3: Main Chat Feed (#313338) ── */}
				<div
					style={{
						flex: 1,
						backgroundColor: '#313338',
						display: 'flex',
						flexDirection: 'column',
						position: 'relative',
					}}
				>
					{/* Chat Channel Header */}
					<div
						style={{
							height: 52,
							padding: '0 20px',
							display: 'flex',
							alignItems: 'center',
							gap: 10,
							borderBottom: '1px solid rgba(0, 0, 0, 0.25)',
							backgroundColor: '#313338',
							zIndex: 2,
						}}
					>
						<span style={{ fontSize: 24, fontWeight: 700, color: '#80848E' }}>#</span>
						<span style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF' }}>design-feedback</span>
						<div style={{ width: 1, height: 16, backgroundColor: 'rgba(255, 255, 255, 0.1)', margin: '0 8px' }} />
						<span style={{ fontSize: 13, color: '#949BA4' }}>
							Brutally honest feedback on new AI designs & motion systems
						</span>
					</div>

					{/* Messages Stream */}
					<div
						style={{
							flex: 1,
							padding: '24px 28px',
							display: 'flex',
							flexDirection: 'column',
							gap: 20,
							overflow: 'hidden',
						}}
					>
						{/* Message 1 */}
						<div
							style={{
								display: 'flex',
								gap: 16,
								opacity: msg1Opacity,
								transform: `translateY(${(1 - msg1Opacity) * 10}px)`,
							}}
						>
							{/* Avatar */}
							<div
								style={{
									width: 42,
									height: 42,
									borderRadius: '50%',
									backgroundColor: '#E0245E',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									color: '#FFFFFF',
									fontWeight: 700,
									fontSize: 16,
									flexShrink: 0,
								}}
							>
								KV
							</div>
							<div>
								<div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
									<span style={{ fontWeight: 700, fontSize: 15, color: '#F2F3F5' }}>KevinDev</span>
									<span
										style={{
											fontSize: 10,
											fontWeight: 700,
											backgroundColor: '#5865F2',
											color: '#FFFFFF',
											padding: '1px 5px',
											borderRadius: 4,
										}}
									>
										MOD
									</span>
									<span style={{ fontSize: 12, color: '#949BA4' }}>Today at 4:18 PM</span>
								</div>
								<div style={{ fontSize: 15, color: '#DBDEE1', lineHeight: 1.4 }}>
									Someone dropped this new Healthy Squirrel prototype in the pipeline... who authorized these micro-animations?? 😂
								</div>
								{/* Reactions */}
								<div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
									<span
										style={{
											padding: '3px 8px',
											backgroundColor: '#2B2D31',
											borderRadius: 8,
											fontSize: 12,
											border: '1px solid rgba(255, 255, 255, 0.08)',
											color: '#DBDEE1',
										}}
									>
										💀 19
									</span>
									<span
										style={{
											padding: '3px 8px',
											backgroundColor: '#2B2D31',
											borderRadius: 8,
											fontSize: 12,
											border: '1px solid rgba(255, 255, 255, 0.08)',
											color: '#DBDEE1',
										}}
									>
										🔥 34
									</span>
								</div>
							</div>
						</div>

						{/* Message 2 */}
						<div
							style={{
								display: 'flex',
								gap: 16,
								opacity: msg2Opacity,
								transform: `translateY(${(1 - msg2Opacity) * 10}px)`,
							}}
						>
							{/* Avatar */}
							<div
								style={{
									width: 42,
									height: 42,
									borderRadius: '50%',
									backgroundColor: '#23A55A',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									color: '#FFFFFF',
									fontWeight: 700,
									fontSize: 16,
									flexShrink: 0,
								}}
							>
								SA
							</div>
							<div>
								<div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
									<span style={{ fontWeight: 700, fontSize: 15, color: '#57F287' }}>Sarah_UX</span>
									<span style={{ fontSize: 12, color: '#949BA4' }}>Today at 4:19 PM</span>
								</div>
								<div style={{ fontSize: 15, color: '#DBDEE1', lineHeight: 1.4 }}>
									Wait honestly the strict 4% overshoot rule on the progress bars is genius. Zero cheesy bounce, looks like Apple Health.
								</div>
								{/* Reactions */}
								<div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
									<span
										style={{
											padding: '3px 8px',
											backgroundColor: 'rgba(88, 101, 242, 0.25)',
											borderRadius: 8,
											fontSize: 12,
											border: '1px solid #5865F2',
											color: '#FFFFFF',
										}}
									>
										🐿️ 42
									</span>
									<span
										style={{
											padding: '3px 8px',
											backgroundColor: '#2B2D31',
											borderRadius: 8,
											fontSize: 12,
											border: '1px solid rgba(255, 255, 255, 0.08)',
											color: '#DBDEE1',
										}}
									>
										💯 16
									</span>
								</div>
							</div>
						</div>

						{/* Message 3: Highlighted Target Message (healthysquirrel.vercel.app) */}
						<div
							style={{
								display: 'flex',
								gap: 16,
								padding: '12px 14px',
								backgroundColor: 'rgba(88, 101, 242, 0.1)',
								borderRadius: 12,
								borderLeft: '4px solid #5865F2',
								opacity: msg3Opacity,
								transform: `translateY(${(1 - msg3Opacity) * 10}px)`,
							}}
						>
							{/* Avatar */}
							<div
								style={{
									width: 42,
									height: 42,
									borderRadius: '50%',
									backgroundColor: '#5865F2',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									color: '#FFFFFF',
									fontWeight: 800,
									fontSize: 16,
									flexShrink: 0,
								}}
							>
								AG
							</div>
							<div style={{ flex: 1 }}>
								<div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
									<span style={{ fontWeight: 700, fontSize: 15, color: '#00E5FF' }}>Antigravity_Lead</span>
									<span
										style={{
											fontSize: 10,
											fontWeight: 700,
											backgroundColor: '#2E8661',
											color: '#FFFFFF',
											padding: '1px 5px',
											borderRadius: 4,
										}}
									>
										BOT
									</span>
									<span style={{ fontSize: 12, color: '#949BA4' }}>Today at 4:20 PM</span>
								</div>
								<div style={{ fontSize: 15, color: '#FFFFFF', lineHeight: 1.4 }}>
									Reviewing the production pin build right now on staging:
								</div>

								{/* Embedded Rich Link Card */}
								<div
									style={{
										marginTop: 10,
										padding: '12px 16px',
										backgroundColor: '#2B2D31',
										borderRadius: 10,
										borderLeft: '4px solid #2E8661',
										display: 'flex',
										flexDirection: 'column',
										gap: 4,
										boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
									}}
								>
									<span style={{ fontSize: 11, fontWeight: 700, color: '#2E8661', textTransform: 'uppercase' }}>
										Healthy Squirrel • Staging
									</span>
									<span
										style={{
											fontSize: 18,
											fontWeight: 800,
											color: '#00E5FF',
											letterSpacing: '-0.01em',
										}}
									>
										healthysquirrel.vercel.app
									</span>
									<span style={{ fontSize: 12, color: '#949BA4' }}>
										Three-tier safety verification, mobile sticky checkout & live telemetry
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
