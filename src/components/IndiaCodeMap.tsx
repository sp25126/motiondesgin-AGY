import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';

const CODE_LINES = [
	'const NATION_SCALE = 1_428_627_663;',
	'async function routeTraffic(citizenId: string) {',
	'  const cluster = await ShardManager.getRegionalCluster();',
	'  return cluster.dispatchWithZeroDowntime({',
	'    concurrencyLimit: 50_000_000,',
	'    failover: "ACTIVE_ACTIVE_MESH",',
	'    auth: "AADHAAR_UIDAI_PKI_V3",',
	'    encryption: "AES_256_GCM"',
	'  });',
	'}',
	'interface CitizenSessionMatrix {',
	'  readonly nodeCount: 14_200;',
	'  readonly throughputRps: 8_500_000;',
	'  readonly p99LatencyMs: 14.2;',
	'  readonly region: "IN-CENTRAL-1" | "IN-SOUTH-1";',
	'}',
	'export const NATIONAL_GRID = new DistributedLedger();',
	'await NATIONAL_GRID.syncNodes({ timeout: 250 });',
	'// STACK: HIGH CONCURRENCY EVENT LOOP',
	'process.on("peakTrafficSpike", mitigateDDoS);',
	'const BUFFER_ALLOC = Buffer.allocUnsafe(1024 * 1024 * 64);',
];

// Major Indian tech/administrative server hub coordinates mapped to 0-100 normalized box
const NODES = [
	{ name: 'DELHI NCR', x: 42, y: 28, r: 6, color: '#00F0FF', code: 'NODE_DEL_01' },
	{ name: 'MUMBAI', x: 28, y: 58, r: 7, color: '#0066FF', code: 'NODE_BOM_02' },
	{ name: 'BENGALURU', x: 38, y: 78, r: 7, color: '#00F0FF', code: 'NODE_BLR_03' },
	{ name: 'HYDERABAD', x: 44, y: 64, r: 5, color: '#38BDF8', code: 'NODE_HYD_04' },
	{ name: 'CHENNAI', x: 46, y: 82, r: 6, color: '#0066FF', code: 'NODE_MAA_05' },
	{ name: 'KOLKATA', x: 72, y: 46, r: 6, color: '#00F0FF', code: 'NODE_CCU_06' },
	{ name: 'AHMEDABAD', x: 24, y: 44, r: 5, color: '#38BDF8', code: 'NODE_AMD_07' },
	{ name: 'GUWAHATI', x: 86, y: 34, r: 4, color: '#0066FF', code: 'NODE_GAU_08' },
];

export const IndiaCodeMap: React.FC = () => {
	const frame = useCurrentFrame();

	// Slow 3D Z-space scale push (0 to 240 frames)
	const zProgress = interpolate(frame, [0, 240], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});

	const scale = interpolate(zProgress, [0, 1], [0.82, 1.25]);
	const rotateX = interpolate(zProgress, [0, 1], [22, 14]);
	const rotateY = interpolate(zProgress, [0, 1], [-8, 6]);
	const translateY = interpolate(zProgress, [0, 1], [30, -20]);

	// Network Pulse Wave (Periodic radar rings expanding from nodes)
	const pulseTime = frame % 60;
	const pulseRadius = interpolate(pulseTime, [0, 60], [4, 40]);
	const pulseOpacity = interpolate(pulseTime, [0, 15, 60], [0, 0.8, 0]);

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				position: 'absolute',
				inset: 0,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				perspective: 1200,
				overflow: 'hidden',
				pointerEvents: 'none',
			}}
		>
			{/* 3D Transform Pivot Stage */}
			<div
				style={{
					width: 1000,
					height: 800,
					position: 'relative',
					transform: `
						scale(${scale})
						rotateX(${rotateX}deg)
						rotateY(${rotateY}deg)
						translateY(${translateY}px)
					`,
					transformStyle: 'preserve-3d',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{/* ── 1. AMBIENT GLOW BACKDROP ── */}
				<div
					style={{
						position: 'absolute',
						width: 600,
						height: 600,
						borderRadius: '50%',
						background: 'radial-gradient(circle at 50% 50%, rgba(0, 102, 255, 0.22) 0%, rgba(0, 240, 255, 0.08) 50%, transparent 75%)',
						filter: 'blur(30px)',
					}}
				/>

				{/* ── 2. GLOWING CODE SNIPPET LINES FILLING MAP SILHOUETTE ── */}
				<div
					style={{
						position: 'absolute',
						width: 680,
						height: 720,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						opacity: 0.75,
						fontFamily: '"JetBrains Mono", monospace',
						fontSize: 11,
						lineHeight: 1.5,
						maskImage: `radial-gradient(ellipse 70% 85% at 48% 50%, black 40%, transparent 80%)`,
						WebkitMaskImage: `radial-gradient(ellipse 70% 85% at 48% 50%, black 40%, transparent 80%)`,
					}}
				>
					{CODE_LINES.map((code, idx) => {
						const lineShift = Math.sin((frame + idx * 10) / 18) * 12;
						const lineOpacity = 0.4 + 0.6 * Math.sin((frame + idx * 8) / 14);
						const isHighlight = idx % 4 === 0;

						return (
							<div
								key={idx}
								style={{
									color: isHighlight ? '#00F0FF' : '#60A5FA',
									transform: `translateX(${lineShift}px)`,
									opacity: lineOpacity,
									textShadow: isHighlight ? '0 0 10px #00F0FF' : '0 0 6px rgba(0, 102, 255, 0.5)',
									whiteSpace: 'nowrap',
									letterSpacing: '0.04em',
								}}
							>
								<span style={{ color: 'rgba(255, 255, 255, 0.4)', marginRight: 12 }}>
									{(idx + 1).toString().padStart(2, '0')}
								</span>
								{code}
							</div>
						);
					})}
				</div>

				{/* ── 3. ABSTRACT GEOMETRIC WIREFRAME OUTLINE OF INDIA ── */}
				<svg
					viewBox="0 0 800 850"
					style={{
						position: 'absolute',
						width: 720,
						height: 760,
						overflow: 'visible',
					}}
				>
					<defs>
						<linearGradient id="mapNeonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="#00F0FF" stopOpacity="0.9" />
							<stop offset="50%" stopColor="#0066FF" stopOpacity="0.7" />
							<stop offset="100%" stopColor="#38BDF8" stopOpacity="0.85" />
						</linearGradient>
						<filter id="neonGlow">
							<feGaussianBlur stdDeviation="3" result="coloredBlur" />
							<feMerge>
								<feMergeNode in="coloredBlur" />
								<feMergeNode in="SourceGraphic" />
							</feMerge>
						</filter>
					</defs>

					{/* Precision Wireframe Polyline of India Boundaries */}
					<path
						d="
							M 360,70 L 400,100 L 420,130 L 450,140 L 420,180 L 470,220 L 520,240
							L 580,240 L 640,280 L 680,290 L 720,330 L 700,380 L 650,380 L 600,360
							L 560,400 L 580,480 L 530,550 L 460,630 L 410,720 L 380,780 L 360,740
							L 320,680 L 280,590 L 240,510 L 260,430 L 210,380 L 190,320 L 240,280
							L 280,240 L 300,180 L 330,130 Z
						"
						fill="none"
						stroke="url(#mapNeonGrad)"
						strokeWidth="2.5"
						strokeDasharray="6 4"
						filter="url(#neonGlow)"
					/>

					{/* Internal Triangulated Topology Grid Lines */}
					<g stroke="rgba(0, 240, 255, 0.25)" strokeWidth="1" strokeDasharray="3 3">
						<line x1="360" y1="70" x2="420" y2="280" />
						<line x1="420" y1="280" x2="280" y2="590" />
						<line x1="420" y1="280" x2="580" y2="480" />
						<line x1="280" y1="590" x2="380" y2="780" />
						<line x1="580" y1="480" x2="380" y2="780" />
						<line x1="420" y1="280" x2="650" y2="380" />
						<line x1="210" y1="380" x2="420" y2="280" />
						<line x1="280" y1="590" x2="440" y2="540" />
						<line x1="440" y1="540" x2="460" y2="690" />
					</g>

					{/* Inter-node Data Arcs */}
					<path
						d="M 360,240 Q 300,400 250,480"
						fill="none"
						stroke="#00F0FF"
						strokeWidth="1.5"
						opacity="0.6"
					/>
					<path
						d="M 250,480 Q 330,580 340,650"
						fill="none"
						stroke="#38BDF8"
						strokeWidth="1.5"
						opacity="0.6"
					/>
					<path
						d="M 360,240 Q 500,320 580,380"
						fill="none"
						stroke="#0066FF"
						strokeWidth="1.5"
						opacity="0.6"
					/>
				</svg>

				{/* ── 4. MAJOR REGIONAL CLUSTER SERVER NODES ── */}
				{NODES.map((node, i) => {
					const nodeX = (node.x / 100) * 800 - 400 + 380;
					const nodeY = (node.y / 100) * 800 - 400 + 400;

					return (
						<div
							key={i}
							style={{
								position: 'absolute',
								left: nodeX,
								top: nodeY,
								transform: 'translate(-50%, -50%)',
								display: 'flex',
								alignItems: 'center',
								gap: 8,
							}}
						>
							{/* Pulsing Radar Ring */}
							<div
								style={{
									position: 'absolute',
									left: 0,
									top: 0,
									width: pulseRadius * 2,
									height: pulseRadius * 2,
									borderRadius: '50%',
									border: `1.5px solid ${node.color}`,
									boxShadow: `0 0 12px ${node.color}`,
									transform: 'translate(-50%, -50%)',
									opacity: pulseOpacity,
								}}
							/>

							{/* Glowing Node Core */}
							<div
								style={{
									width: node.r * 2,
									height: node.r * 2,
									borderRadius: '50%',
									backgroundColor: '#FFFFFF',
									boxShadow: `0 0 16px ${node.color}, 0 0 30px ${node.color}`,
									border: `2px solid ${node.color}`,
									position: 'relative',
								}}
							/>

							{/* Node HUD Tag */}
							<div
								style={{
									backgroundColor: 'rgba(7, 9, 14, 0.85)',
									border: '1px solid rgba(0, 240, 255, 0.4)',
									padding: '2px 6px',
									borderRadius: 4,
									color: '#FFFFFF',
									fontFamily: '"JetBrains Mono", monospace',
									fontSize: 9,
									fontWeight: 700,
									whiteSpace: 'nowrap',
									boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
								}}
							>
								<span style={{ color: node.color }}>●</span> {node.name}
							</div>
						</div>
					);
				})}
			</div>

			{/* ── 5. HUD TELEMETRY METRICS IN CORNERS ── */}
			<div
				style={{
					position: 'absolute',
					top: 60,
					left: 60,
					display: 'flex',
					flexDirection: 'column',
					gap: 6,
					fontFamily: '"JetBrains Mono", monospace',
					fontSize: 11,
					color: 'rgba(255, 255, 255, 0.7)',
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#00F0FF', fontWeight: 800 }}>
					<span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#00F0FF', boxShadow: '0 0 8px #00F0FF' }} />
					<span>NATIONAL INFRASTRUCTURE GRID // 1.4B CITIZENS</span>
				</div>
				<div>CONCURRENT SESSIONS: <span style={{ color: '#FFFFFF', fontWeight: 700 }}>1,428,627,663</span></div>
				<div>REGIONAL EDGE SHARDS: <span style={{ color: '#60A5FA' }}>28 ACTIVE NODES</span></div>
				<div>PEAK THROUGHPUT: <span style={{ color: '#38BDF8' }}>14.2M REQ/SEC</span></div>
			</div>

			<div
				style={{
					position: 'absolute',
					bottom: 60,
					right: 60,
					textAlign: 'right',
					fontFamily: '"JetBrains Mono", monospace',
					fontSize: 11,
					color: 'rgba(255, 255, 255, 0.6)',
				}}
			>
				<div style={{ color: '#00F0FF', fontWeight: 700 }}>SCALE COMPLEXITY: MAXIMUM</div>
				<div>AVAILABILITY TARGET: 99.999%</div>
				<div>LATENCY TOLERANCE: &lt; 20ms</div>
			</div>
		</div>
	);
};
