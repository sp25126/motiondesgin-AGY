import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const CommentCard: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	if (frame < 195) return null;

	// Unfolding Spring Entrance (Frame 210+)
	const cardSpring = spring({
		frame: frame - 210,
		fps,
		config: { stiffness: 120, damping: 14 },
	});

	const cardOpacity = interpolate(
		frame,
		[205, 225, 570, 600],
		[0, 1, 1, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	// Fixed status morph (Frame 360+)
	const isResolved = frame >= 360;

	const statusBg = isResolved ? 'rgba(16, 185, 129, 0.12)' : 'rgba(37, 99, 235, 0.12)';
	const statusColor = isResolved ? '#10B981' : '#2563EB';

	// Floating micro motion
	const floatY = Math.sin(frame / 16) * 4;

	return (
		<div
			style={{
				position: 'absolute',
				left: '560px',
				top: '520px',
				width: '380px',
				opacity: cardOpacity,
				transform: `translateY(${floatY}px) scale(${cardSpring})`,
				transformOrigin: 'top left',
				zIndex: 35,
				pointerEvents: 'none',
			}}
		>
			{/* Outer Glass Bezel Layer */}
			<div
				style={{
					width: '100%',
					borderRadius: '20px',
					backgroundColor: 'rgba(255, 255, 255, 0.92)',
					backdropFilter: 'blur(30px)',
					border: '1px solid rgba(255, 255, 255, 1)',
					outline: '1px solid rgba(0, 0, 0, 0.08)',
					boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.12), 0 0 30px rgba(37, 99, 235, 0.1)',
					padding: '20px 24px',
					display: 'flex',
					flexDirection: 'column',
					gap: '14px',
				}}
			>
				{/* Header: Selector Monospace Tag & Status Badge */}
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					{/* Floating Tag: button.cta-primary */}
					<div
						style={{
							backgroundColor: 'rgba(15, 23, 42, 0.06)',
							border: '1px solid rgba(15, 23, 42, 0.12)',
							borderRadius: '8px',
							padding: '4px 10px',
							fontSize: '11px',
							fontFamily: '"Fira Code", Consolas, monospace',
							fontWeight: 600,
							color: '#2563EB',
							display: 'flex',
							alignItems: 'center',
							gap: '6px',
						}}
					>
						<span style={{ color: '#94A3B8' }}>#</span> button.cta-primary
					</div>

					{/* Status Badge */}
					<div
						style={{
							backgroundColor: statusBg,
							color: statusColor,
							fontSize: '11px',
							fontFamily: 'Inter, sans-serif',
							fontWeight: 700,
							padding: '3px 10px',
							borderRadius: '12px',
							transition: 'all 0.3s ease',
						}}
					>
						{isResolved ? '✓ RESOLVED' : '● OPEN REVIEW'}
					</div>
				</div>

				{/* User Profile Info */}
				<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
					<div
						style={{
							width: '32px',
							height: '32px',
							borderRadius: '50%',
							backgroundColor: '#2563EB',
							color: '#FFFFFF',
							fontWeight: 800,
							fontSize: '13px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontFamily: 'Inter, sans-serif',
							boxShadow: '0 4px 10px rgba(37, 99, 235, 0.3)',
						}}
					>
						AR
					</div>
					<div>
						<div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', fontFamily: 'Inter, sans-serif' }}>
							Alex Rivera
						</div>
						<div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'monospace' }}>
							Staff Design Engineer • 2m ago
						</div>
					</div>
				</div>

				{/* Comment Body Copy */}
				<p
					style={{
						margin: 0,
						fontSize: '14px',
						lineHeight: '1.55',
						color: '#334155',
						fontFamily: 'Inter, sans-serif',
						fontWeight: 500,
					}}
				>
					Tighten spring stiffness to <span style={{ fontFamily: 'monospace', color: '#2563EB', backgroundColor: 'rgba(37, 99, 235, 0.08)', padding: '2px 6px', borderRadius: '4px' }}>140</span> & update primary accent to Cobalt.
				</p>
			</div>
		</div>
	);
};
