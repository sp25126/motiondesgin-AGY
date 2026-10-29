import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from 'remotion';

export const GlassBrowser: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Browser Entrance Spring (Frame 0 to 50)
	const browserSpring = spring({
		frame,
		fps,
		config: { stiffness: 100, damping: 14 },
	});

	// Micro Floating motion
	const floatY = Math.sin(frame / 18) * 6;
	const rotateX = interpolate(
		frame,
		[0, 100, 600],
		[6, 4, 3],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	// CTA Button click depression physics (Frame 85 to 105)
	const buttonClickScale = interpolate(
		frame,
		[85, 92, 105],
		[1, 0.94, 1],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) }
	);

	const buttonGlowOpacity = interpolate(
		frame,
		[90, 110, 180],
		[0, 0.6, 0.2],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	return (
		<div
			style={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				width: '1160px',
				height: '680px',
				marginLeft: '-580px',
				marginTop: '-340px',
				transform: `perspective(1200px) rotateX(${rotateX}deg) translateY(${floatY}px) scale(${browserSpring})`,
				zIndex: 10,
			}}
		>
			{/* Outer Glass Bezel Layer */}
			<div
				style={{
					width: '100%',
					height: '100%',
					borderRadius: '24px',
					backgroundColor: 'rgba(255, 255, 255, 0.75)',
					backdropFilter: 'blur(30px)',
					border: '1px solid rgba(255, 255, 255, 0.9)',
					outline: '1px solid rgba(0, 0, 0, 0.06)',
					boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.08), 0 10px 25px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 1)',
					overflow: 'hidden',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{/* Inner Double-Bezel Header Bar */}
				<div
					style={{
						height: '52px',
						backgroundColor: 'rgba(245, 244, 240, 0.5)',
						borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
						display: 'flex',
						alignItems: 'center',
						padding: '0 24px',
						justifyContent: 'space-between',
					}}
				>
					{/* Window Traffic Lights */}
					<div style={{ display: 'flex', gap: '8px' }}>
						<div style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#FF5F57' }} />
						<div style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#FEBC2E' }} />
						<div style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#28C840' }} />
					</div>

					{/* URL Bar */}
					<div
						style={{
							backgroundColor: 'rgba(255, 255, 255, 0.8)',
							border: '1px solid rgba(0, 0, 0, 0.05)',
							borderRadius: '12px',
							padding: '5px 24px',
							fontSize: '12px',
							fontFamily: 'Inter, monospace',
							color: '#64748B',
							display: 'flex',
							alignItems: 'center',
							gap: '8px',
							boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.03)',
						}}
					>
						<span style={{ color: '#10B981', fontSize: '10px' }}>🔒</span> vercel.com/preview/linear-design-review
					</div>

					<div style={{ fontSize: '12px', color: '#94A3B8', fontFamily: 'monospace' }}>
						Vercel Preview v2.4
					</div>
				</div>

				{/* Website Preview Canvas */}
				<div
					style={{
						flex: 1,
						backgroundColor: '#FFFFFF',
						padding: '48px 60px',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						position: 'relative',
					}}
				>
					{/* Canvas Top Nav */}
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
							<div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontWeight: 900, fontSize: '14px' }}>
								▲
							</div>
							<span style={{ fontWeight: 800, fontSize: '18px', color: '#0F172A', letterSpacing: '-0.03em' }}>
								Acme Studio
							</span>
						</div>

						<div style={{ display: 'flex', gap: '32px', fontSize: '14px', color: '#64748B', fontWeight: 500 }}>
							<span>Products</span>
							<span>Design System</span>
							<span>Changelog</span>
							<span style={{ color: '#0F172A', fontWeight: 700 }}>Reviews</span>
						</div>
					</div>

					{/* Canvas Hero Content & Target CTA Button */}
					<div style={{ maxWidth: '640px', marginTop: '20px' }}>
						<div
							style={{
								fontSize: '12px',
								fontFamily: 'monospace',
								letterSpacing: '0.2em',
								color: '#2563EB',
								fontWeight: 700,
								textTransform: 'uppercase',
								marginBottom: '12px',
							}}
						>
							// PREVIEW FEEDBACK ENGINE
						</div>
						<h1
							style={{
								margin: 0,
								fontSize: '52px',
								fontWeight: 900,
								letterSpacing: '-0.04em',
								color: '#0F172A',
								lineHeight: '1.05',
							}}
						>
							Collaborative UI Review at Light Speed
						</h1>
						<p style={{ marginTop: '16px', fontSize: '16px', color: '#64748B', lineHeight: '1.6' }}>
							Drop spatial pin feedback, iterate on spring physics, and publish design tokens directly to production.
						</p>

						{/* The Target CTA Button: button.cta-primary */}
						<div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
							<button
								id="button-cta-primary"
								style={{
									backgroundColor: '#2563EB',
									color: '#FFFFFF',
									fontSize: '15px',
									fontWeight: 700,
									fontFamily: 'Inter, sans-serif',
									padding: '14px 32px',
									borderRadius: '14px',
									border: 'none',
									cursor: 'pointer',
									transform: `scale(${buttonClickScale})`,
									boxShadow: `0 10px 25px rgba(37, 99, 235, 0.35), 0 0 ${buttonGlowOpacity * 40}px rgba(37, 99, 235, ${buttonGlowOpacity})`,
									display: 'flex',
									alignItems: 'center',
									gap: '10px',
									transition: 'transform 0.1s ease',
								}}
							>
								<span>Publish Changes</span>
								<span style={{ fontSize: '16px' }}>→</span>
							</button>

							<span style={{ fontSize: '13px', color: '#94A3B8', fontFamily: 'monospace' }}>
								⌘K to open command menu
							</span>
						</div>
					</div>

					{/* Canvas Footer Bar */}
					<div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94A3B8' }}>
						<span>Branch: main • Commit: a8f9c2d</span>
						<span>1 Active Reviewer</span>
					</div>
				</div>
			</div>
		</div>
	);
};
