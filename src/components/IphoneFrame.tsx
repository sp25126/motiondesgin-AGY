import React from 'react';

interface IphoneFrameProps {
	children: React.ReactNode;
	width?: number;
	height?: number;
}

export const IphoneFrame: React.FC<IphoneFrameProps> = ({
	children,
	width = 414,
	height = 840,
}) => {
	return (
		<div
			style={{
				width,
				height,
				borderRadius: 52,
				backgroundColor: '#000000',
				boxShadow: `
					0 40px 100px -20px rgba(0, 0, 0, 0.9),
					0 0 0 4px #262626,
					0 0 0 6px #404040,
					0 0 0 8px #171717,
					0 0 50px rgba(0, 102, 255, 0.15)
				`,
				position: 'relative',
				overflow: 'hidden',
				display: 'flex',
				flexDirection: 'column',
				border: '3px solid #1c1c1e',
			}}
		>
			{/* Top Glass Bezel Reflection Highlight */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					height: 120,
					background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, transparent 100%)',
					pointerEvents: 'none',
					zIndex: 90,
				}}
			/>

			{/* Dynamic Island / Pill Notch */}
			<div
				style={{
					position: 'absolute',
					top: 14,
					left: '50%',
					transform: 'translateX(-50%)',
					width: 120,
					height: 32,
					backgroundColor: '#000000',
					borderRadius: 20,
					zIndex: 100,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '0 10px',
					boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
				}}
			>
				{/* Camera Lens */}
				<div
					style={{
						width: 11,
						height: 11,
						borderRadius: '50%',
						backgroundColor: '#081426',
						border: '1.5px solid #1a2942',
					}}
				/>
				{/* Sensor Dot */}
				<div
					style={{
						width: 7,
						height: 7,
						borderRadius: '50%',
						backgroundColor: '#050c17',
					}}
				/>
			</div>

			{/* iOS Top Status Bar */}
			<div
				style={{
					height: 48,
					padding: '12px 28px 0',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					color: '#0F172A',
					fontSize: 13,
					fontWeight: 700,
					fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
					zIndex: 80,
					backgroundColor: 'transparent',
				}}
			>
				<span>9:41</span>
				<div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
					<span>5G</span>
					<span>📶</span>
					<span>🔋</span>
				</div>
			</div>

			{/* Phone Inner Screen Viewport */}
			<div
				style={{
					flex: 1,
					position: 'relative',
					overflow: 'hidden',
					backgroundColor: '#FFFFFF',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{children}
			</div>

			{/* iOS Home Indicator Bar */}
			<div
				style={{
					position: 'absolute',
					bottom: 8,
					left: '50%',
					transform: 'translateX(-50%)',
					width: 134,
					height: 5,
					backgroundColor: '#000000',
					borderRadius: 3,
					opacity: 0.8,
					zIndex: 100,
				}}
			/>
		</div>
	);
};
