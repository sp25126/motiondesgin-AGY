import React from 'react';

interface WireframeWorkspaceProps {
	frame: number;
	clipPercentage?: number; // 0 to 100%, for scanning reveal mask
	opacity?: number;
}

export const WireframeWorkspace: React.FC<WireframeWorkspaceProps> = ({
	frame,
	clipPercentage = 100,
	opacity = 1,
}) => {
	// Macro camera slow idle float
	const floatY = Math.sin(frame / 60) * 10;
	const floatX = Math.cos(frame / 75) * 8;
	const tiltX = 8 + Math.sin(frame / 80) * 2;
	const tiltY = -6 + Math.cos(frame / 90) * 2;

	// Blinking cursor / node pulses
	const pulse = 1 + Math.sin(frame / 15) * 0.08;

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				perspective: 1400,
				transformStyle: 'preserve-3d',
				clipPath: `polygon(${clipPercentage}% 0, 100% 0, 100% 100%, ${clipPercentage}% 100%)`,
				opacity,
				pointerEvents: 'none',
			}}
		>
			{/* Isometric Ambient Macro Grid */}
			<div
				style={{
					position: 'absolute',
					inset: -100,
					backgroundImage: `
						linear-gradient(to right, rgba(34, 197, 94, 0.04) 1px, transparent 1px),
						linear-gradient(to bottom, rgba(34, 197, 94, 0.04) 1px, transparent 1px)
					`,
					backgroundSize: '40px 40px',
					transform: `translate(${floatX * 0.4}px, ${floatY * 0.4}px)`,
				}}
			/>

			{/* Main 3D Floating Wireframe Cluster */}
			<div
				style={{
					width: 1280,
					transform: `
						rotateX(${tiltX}deg)
						rotateY(${tiltY}deg)
						translateY(${floatY}px)
						translateX(${floatX}px)
					`,
					transformStyle: 'preserve-3d',
					display: 'flex',
					gap: 32,
					alignItems: 'center',
					justifyContent: 'center',
					position: 'relative',
				}}
			>
				{/* ── Left Wireframe: Skeletal Pricing Table ── */}
				<div
					style={{
						width: 440,
						border: '1.5px dashed rgba(34, 197, 94, 0.75)',
						borderRadius: 20,
						padding: '32px 28px',
						background: 'rgba(6, 18, 12, 0.45)',
						boxShadow: '0 0 35px rgba(34, 197, 94, 0.12), inset 0 0 20px rgba(34, 197, 94, 0.06)',
						position: 'relative',
						display: 'flex',
						flexDirection: 'column',
						gap: 20,
						transform: 'translateZ(20px)',
					}}
				>
					{/* Vertex Dots on Corners */}
					<div style={{ position: 'absolute', top: -5, left: -5, width: 9, height: 9, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px #22C55E' }} />
					<div style={{ position: 'absolute', top: -5, right: -5, width: 9, height: 9, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px #22C55E' }} />
					<div style={{ position: 'absolute', bottom: -5, left: -5, width: 9, height: 9, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px #22C55E' }} />
					<div style={{ position: 'absolute', bottom: -5, right: -5, width: 9, height: 9, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px #22C55E' }} />

					{/* Wireframe Header */}
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<div style={{ width: 120, height: 14, border: '1px dashed #22C55E', borderRadius: 4, background: 'rgba(34, 197, 94, 0.15)' }} />
						<div style={{ width: 60, height: 20, border: '1px solid #22C55E', borderRadius: 999, fontSize: 10, color: '#4ADE80', fontFamily: 'monospace', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
							TIER_01
						</div>
					</div>

					{/* Skeletal Price Tag */}
					<div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
						<div style={{ fontSize: 44, fontWeight: 900, color: '#4ADE80', fontFamily: 'monospace', textShadow: '0 0 12px rgba(34, 197, 94, 0.6)' }}>
							$---/mo
						</div>
						<div style={{ width: 70, height: 10, border: '1px dashed #22C55E', borderRadius: 2 }} />
					</div>

					{/* Dashed Feature Rows */}
					<div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '8px 0' }}>
						{[85, 70, 90, 60].map((w, idx) => (
							<div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
								<div style={{ width: 12, height: 12, border: '1px solid #22C55E', borderRadius: 2, background: 'rgba(34, 197, 94, 0.2)' }} />
								<div style={{ width: `${w}%`, height: 10, border: '1px dashed rgba(34, 197, 94, 0.6)', borderRadius: 2 }} />
							</div>
						))}
					</div>

					{/* Bare-Bones Button */}
					<div
						style={{
							height: 48,
							border: '1.5px dashed #22C55E',
							borderRadius: 10,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#4ADE80',
							fontFamily: 'monospace',
							fontSize: 13,
							fontWeight: 700,
							letterSpacing: '0.15em',
							background: 'rgba(34, 197, 94, 0.08)',
							transform: `scale(${pulse})`,
						}}
					>
						[ PENDING_AI_SYNTHESIS ]
					</div>
				</div>

				{/* ── Center Wireframe: Skeletal Fluid Graph & Live Node ── */}
				<div
					style={{
						width: 520,
						border: '1.5px dashed rgba(34, 197, 94, 0.75)',
						borderRadius: 20,
						padding: '30px',
						background: 'rgba(6, 18, 12, 0.45)',
						boxShadow: '0 0 35px rgba(34, 197, 94, 0.12)',
						position: 'relative',
						display: 'flex',
						flexDirection: 'column',
						gap: 18,
						transform: 'translateZ(40px)',
					}}
				>
					{/* Vertex Dots */}
					<div style={{ position: 'absolute', top: -5, left: -5, width: 9, height: 9, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px #22C55E' }} />
					<div style={{ position: 'absolute', top: -5, right: -5, width: 9, height: 9, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px #22C55E' }} />
					<div style={{ position: 'absolute', bottom: -5, left: -5, width: 9, height: 9, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px #22C55E' }} />
					<div style={{ position: 'absolute', bottom: -5, right: -5, width: 9, height: 9, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px #22C55E' }} />

					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<div style={{ fontFamily: 'monospace', fontSize: 13, color: '#4ADE80', letterSpacing: '0.08em' }}>
							&lt;GRAPH_NODE : BARE_BONES /&gt;
						</div>
						<div style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(74, 222, 128, 0.7)' }}>
							AI_PASS: 0%
						</div>
					</div>

					{/* Skeletal Chart Grid */}
					<div
						style={{
							height: 160,
							border: '1px dashed rgba(34, 197, 94, 0.4)',
							borderRadius: 8,
							position: 'relative',
							overflow: 'hidden',
						}}
					>
						{/* Coordinate Lines */}
						<div style={{ position: 'absolute', top: '33%', left: 0, right: 0, borderTop: '1px dashed rgba(34, 197, 94, 0.2)' }} />
						<div style={{ position: 'absolute', top: '66%', left: 0, right: 0, borderTop: '1px dashed rgba(34, 197, 94, 0.2)' }} />

						{/* Jagged Green Skeleton Vector Path */}
						<svg width="100%" height="100%" viewBox="0 0 460 160" fill="none">
							<polyline
								points="0,130 60,110 120,125 180,85 240,95 300,50 360,70 420,30 460,45"
								stroke="#22C55E"
								strokeWidth="2"
								strokeDasharray="6 4"
							/>
							{[
								[0, 130], [60, 110], [120, 125], [180, 85], [240, 95],
								[300, 50], [360, 70], [420, 30], [460, 45],
							].map(([x, y], i) => (
								<circle key={i} cx={x} cy={y} r="3.5" fill="#4ADE80" stroke="#06120C" strokeWidth="1" />
							))}
						</svg>
					</div>

					{/* Metrics Footer */}
					<div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'monospace', fontSize: 11, color: '#4ADE80' }}>
						<span>VECTOR_POINTS: 9</span>
						<span>SAMPLING: RAW_MATH</span>
						<span>RENDER_MODE: WIREFRAME</span>
					</div>
				</div>

				{/* ── Floating Raw CSS Code Nodes in 3D Space ── */}
				{/* Code Node 1 (Upper Floating) */}
				<div
					style={{
						position: 'absolute',
						top: -90,
						left: 40,
						background: 'rgba(8, 24, 15, 0.85)',
						border: '1px solid rgba(34, 197, 94, 0.5)',
						borderRadius: 12,
						padding: '12px 18px',
						fontFamily: '"Fira Code", monospace',
						fontSize: 12,
						color: '#86EFAC',
						boxShadow: '0 15px 30px rgba(0,0,0,0.7), 0 0 15px rgba(34, 197, 94, 0.2)',
						transform: 'translateZ(90px) rotate(-4deg)',
					}}
				>
					<span style={{ color: '#4ADE80' }}>.glass-pricing</span> &#123;
					<br />
					&nbsp;&nbsp;<span style={{ color: '#93C5FD' }}>backdrop-filter</span>: blur(28px);
					<br />
					&nbsp;&nbsp;<span style={{ color: '#93C5FD' }}>border</span>: 1px solid rgba(255,255,255,0.2);
					<br />
					&#125;
				</div>

				{/* Code Node 2 (Right Floating) */}
				<div
					style={{
						position: 'absolute',
						bottom: -70,
						right: 40,
						background: 'rgba(8, 24, 15, 0.85)',
						border: '1px solid rgba(34, 197, 94, 0.5)',
						borderRadius: 12,
						padding: '12px 18px',
						fontFamily: '"Fira Code", monospace',
						fontSize: 12,
						color: '#86EFAC',
						boxShadow: '0 15px 30px rgba(0,0,0,0.7), 0 0 15px rgba(34, 197, 94, 0.2)',
						transform: 'translateZ(70px) rotate(3deg)',
					}}
				>
					<span style={{ color: '#4ADE80' }}>@keyframes</span> fluidSpline &#123;
					<br />
					&nbsp;&nbsp;0% &#123; <span style={{ color: '#93C5FD' }}>stroke-dashoffset</span>: 400; &#125;
					<br />
					&nbsp;&nbsp;100% &#123; <span style={{ color: '#93C5FD' }}>stroke-dashoffset</span>: 0; &#125;
					<br />
					&#125;
				</div>

				{/* Code Node 3 (Connecting Traces) */}
				<div
					style={{
						position: 'absolute',
						top: -40,
						right: 120,
						background: 'rgba(8, 24, 15, 0.85)',
						border: '1px solid rgba(34, 197, 94, 0.5)',
						borderRadius: 8,
						padding: '8px 14px',
						fontFamily: '"Fira Code", monospace',
						fontSize: 11,
						color: '#4ADE80',
						transform: 'translateZ(50px)',
					}}
				>
					// SYNTHESIZING_GRAPH_NODES...
				</div>
			</div>
		</div>
	);
};
