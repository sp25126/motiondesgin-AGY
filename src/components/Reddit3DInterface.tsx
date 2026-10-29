import React from 'react';
import { interpolate, Easing } from 'remotion';

interface Reddit3DInterfaceProps {
	frame: number;
	scale?: number;
	opacity?: number;
}

export const Reddit3DInterface: React.FC<Reddit3DInterfaceProps> = ({
	frame,
	scale = 1,
	opacity = 1,
}) => {
	// Frame is relative to scene start or overall
	// 3D camera float and tilt
	const floatY = Math.sin(frame / 35) * 8;
	const floatX = Math.cos(frame / 45) * 6;
	const rotateY = -6 + Math.sin(frame / 50) * 2;
	const rotateX = 10 + Math.cos(frame / 40) * 1.5;

	// Upvote pulsing orange glow
	const upvotePulse = 1 + Math.sin(frame / 12) * 0.12;

	// Comment card stagger entries (starts appearing from frame 200)
	const comment1Y = interpolate(frame, [210, 240], [40, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const comment1Opacity = interpolate(frame, [210, 235], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const comment2Y = interpolate(frame, [230, 260], [50, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const comment2Opacity = interpolate(frame, [230, 255], [0, 1], {
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
				perspective: 1200,
				transformStyle: 'preserve-3d',
				opacity,
				pointerEvents: 'none',
			}}
		>
			{/* Ambient Reddit Orange & Charcoal Glow Orbs */}
			<div
				style={{
					position: 'absolute',
					width: 800,
					height: 800,
					borderRadius: '50%',
					background: 'radial-gradient(circle, rgba(255, 69, 0, 0.18) 0%, rgba(255, 87, 0, 0.06) 40%, transparent 70%)',
					filter: 'blur(90px)',
					transform: `translate(${floatX * 1.5}px, ${floatY * 1.5}px)`,
				}}
			/>

			{/* Main 3D Container with Isometric Tilt */}
			<div
				style={{
					width: 1040,
					transform: `
						scale(${scale})
						rotateX(${rotateX}deg)
						rotateY(${rotateY}deg)
						translateY(${floatY}px)
						translateX(${floatX}px)
					`,
					transformStyle: 'preserve-3d',
					display: 'flex',
					flexDirection: 'column',
					gap: 20,
				}}
			>
				{/* ── Main Reddit Post Card ── */}
				<div
					style={{
						background: 'rgba(26, 26, 27, 0.88)',
						backdropFilter: 'blur(24px)',
						WebkitBackdropFilter: 'blur(24px)',
						border: '1px solid rgba(255, 255, 255, 0.12)',
						borderRadius: 18,
						padding: '24px 28px',
						boxShadow: `
							0 30px 60px -15px rgba(0, 0, 0, 0.8),
							0 0 40px rgba(255, 69, 0, 0.12),
							0 0 0 1px rgba(255, 69, 0, 0.2) inset
						`,
						display: 'flex',
						gap: 20,
						transform: 'translateZ(30px)',
					}}
				>
					{/* Left Vote Column */}
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: 6,
							paddingTop: 4,
						}}
					>
						{/* Upvote Arrow (Glowing Orange) */}
						<div
							style={{
								width: 36,
								height: 36,
								borderRadius: 8,
								background: 'rgba(255, 69, 0, 0.18)',
								border: '1px solid rgba(255, 69, 0, 0.45)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: '#FF4500',
								transform: `scale(${upvotePulse})`,
								boxShadow: '0 0 16px rgba(255, 69, 0, 0.45)',
							}}
						>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="#FF4500">
								<path d="M12 4L3 15H9V20H15V15H21L12 4Z" />
							</svg>
						</div>

						<span
							style={{
								fontSize: 16,
								fontWeight: 800,
								color: '#FF4500',
								fontFamily: 'Inter, sans-serif',
								letterSpacing: '-0.02em',
							}}
						>
							4.9k
						</span>

						{/* Downvote Arrow */}
						<div
							style={{
								width: 36,
								height: 36,
								borderRadius: 8,
								background: 'rgba(255, 255, 255, 0.04)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: '#717375',
							}}
						>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="#717375">
								<path d="M12 20L21 9H15V4H9V9H3L12 20Z" />
							</svg>
						</div>
					</div>

					{/* Right Content Column */}
					<div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
						{/* Subreddit Header Tag */}
						<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
							<div
								style={{
									width: 28,
									height: 28,
									borderRadius: '50%',
									background: '#FF4500',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									boxShadow: '0 0 12px rgba(255, 69, 0, 0.5)',
								}}
							>
								{/* Mini Reddit Snoo */}
								<svg width="18" height="18" viewBox="0 0 20 20" fill="#FFFFFF">
									<circle cx="10" cy="10" r="7" />
									<circle cx="7.5" cy="9.5" r="1.2" fill="#FF4500" />
									<circle cx="12.5" cy="9.5" r="1.2" fill="#FF4500" />
								</svg>
							</div>
							<span style={{ fontSize: 14, fontWeight: 700, color: '#D7DADC' }}>
								r/startups
							</span>
							<span style={{ fontSize: 13, color: '#717375' }}>•</span>
							<span style={{ fontSize: 13, color: '#818384' }}>Posted by u/stage_founder 4h ago</span>
							<span
								style={{
									marginLeft: 'auto',
									background: 'rgba(255, 69, 0, 0.15)',
									color: '#FF4500',
									border: '1px solid rgba(255, 69, 0, 0.3)',
									borderRadius: 999,
									padding: '2px 10px',
									fontSize: 11,
									fontWeight: 700,
									letterSpacing: '0.04em',
								}}
							>
								🔥 BRUTAL ROAST
							</span>
						</div>

						{/* Post Title */}
						<h2
							style={{
								margin: 0,
								fontSize: 24,
								fontWeight: 800,
								color: '#FFFFFF',
								letterSpacing: '-0.02em',
								lineHeight: 1.3,
							}}
						>
							We spent 6 months building STAGE. Tell us why it&apos;s going to fail. Roast us.
						</h2>

						{/* Mock Video / Demo Card */}
						<div
							style={{
								height: 180,
								borderRadius: 12,
								background: 'linear-gradient(135deg, #0A0D14 0%, #0F172A 100%)',
								border: '1px solid rgba(0, 194, 255, 0.25)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								position: 'relative',
								overflow: 'hidden',
								boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
							}}
						>
							{/* Cyan Background Wave */}
							<div
								style={{
									position: 'absolute',
									inset: 0,
									background: 'radial-gradient(circle at 50% 50%, rgba(0, 194, 255, 0.15) 0%, transparent 70%)',
								}}
							/>

							{/* Glowing Cyan STAGE watermark */}
							<span
								style={{
									fontSize: 48,
									fontWeight: 900,
									letterSpacing: '0.1em',
									color: 'rgba(255, 255, 255, 0.15)',
								}}
							>
								STAGE DEMO
							</span>

							{/* Play Button */}
							<div
								style={{
									position: 'absolute',
									width: 60,
									height: 60,
									borderRadius: '50%',
									background: 'rgba(255, 69, 0, 0.9)',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									boxShadow: '0 0 25px rgba(255, 69, 0, 0.7)',
								}}
							>
								<svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF">
									<polygon points="8,5 19,12 8,19" />
								</svg>
							</div>
						</div>

						{/* Action Bar */}
						<div
							style={{
								display: 'flex',
								gap: 20,
								alignItems: 'center',
								fontSize: 13,
								fontWeight: 700,
								color: '#818384',
								paddingTop: 4,
							}}
						>
							<div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#D7DADC' }}>
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
								</svg>
								<span>1,428 Comments</span>
							</div>
							<div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<circle cx="18" cy="5" r="3" />
									<circle cx="6" cy="12" r="3" />
									<circle cx="18" cy="19" r="3" />
									<line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
									<line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
								</svg>
								<span>Share</span>
							</div>
							<span style={{ marginLeft: 'auto', color: '#FF4500' }}>🏆 24 Awards</span>
						</div>
					</div>
				</div>

				{/* ── Floating Staggered 3D Roast Comments ── */}
				{/* Roast Comment 1 */}
				<div
					style={{
						background: 'rgba(20, 20, 22, 0.92)',
						backdropFilter: 'blur(20px)',
						border: '1px solid rgba(255, 69, 0, 0.3)',
						borderRadius: 14,
						padding: '16px 20px',
						boxShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 25px rgba(255, 69, 0, 0.1)',
						transform: `translateZ(60px) translateY(${comment1Y}px)`,
						opacity: comment1Opacity,
						display: 'flex',
						gap: 14,
						alignItems: 'flex-start',
						maxWidth: 620,
						marginLeft: 80,
					}}
				>
					<div
						style={{
							width: 32,
							height: 32,
							borderRadius: '50%',
							background: '#3B82F6',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: 14,
							fontWeight: 800,
							color: '#FFFFFF',
						}}
					>
						P
					</div>
					<div>
						<div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
							<span style={{ fontSize: 13, fontWeight: 700, color: '#D7DADC' }}>u/pixel_perfectionist</span>
							<span style={{ fontSize: 12, color: '#FF4500', fontWeight: 600 }}>Top Contributor</span>
							<span style={{ fontSize: 12, color: '#717375' }}>• 3h ago</span>
						</div>
						<p style={{ margin: 0, fontSize: 14, color: '#F1F5F9', lineHeight: 1.4 }}>
							&ldquo;Did you accidentally ship Figma inside a toaster? Because this is looking dangerously crispy. 10/10 would roast again. 🔥&rdquo;
						</p>
					</div>
				</div>

				{/* Roast Comment 2 */}
				<div
					style={{
						background: 'rgba(20, 20, 22, 0.92)',
						backdropFilter: 'blur(20px)',
						border: '1px solid rgba(0, 194, 255, 0.3)',
						borderRadius: 14,
						padding: '16px 20px',
						boxShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 25px rgba(0, 194, 255, 0.1)',
						transform: `translateZ(80px) translateY(${comment2Y}px)`,
						opacity: comment2Opacity,
						display: 'flex',
						gap: 14,
						alignItems: 'flex-start',
						maxWidth: 580,
						marginLeft: 140,
					}}
				>
					<div
						style={{
							width: 32,
							height: 32,
							borderRadius: '50%',
							background: '#10B981',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: 14,
							fontWeight: 800,
							color: '#FFFFFF',
						}}
					>
						V
					</div>
					<div>
						<div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
							<span style={{ fontSize: 13, fontWeight: 700, color: '#D7DADC' }}>u/vc_whisperer</span>
							<span style={{ fontSize: 12, color: '#00C2FF', fontWeight: 600 }}>Angel Investor</span>
							<span style={{ fontSize: 12, color: '#717375' }}>• 2h ago</span>
						</div>
						<p style={{ margin: 0, fontSize: 14, color: '#F1F5F9', lineHeight: 1.4 }}>
							&ldquo;Take my term sheet before I come to my senses. The motion polish is illegal.&rdquo;
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
