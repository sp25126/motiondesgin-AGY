import React from 'react';

export const BotanicalLeafIllustration: React.FC<{
	width?: number;
	height?: number;
	opacity?: number;
	color?: string;
	style?: React.CSSProperties;
}> = ({
	width = 380,
	height = 380,
	opacity = 0.5,
	color = '#FFFFFF',
	style = {},
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 320 320"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style={{ opacity, pointerEvents: 'none', ...style }}
		>
			<g stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
				{/* Main Central Stem */}
				<path d="M290 290 Q200 240 140 170 T60 40" strokeWidth="2.5" />
				
				{/* Primary Side Ribs */}
				<path d="M140 170 Q170 140 220 150" />
				<path d="M140 170 Q110 130 90 90" />
				<path d="M175 210 Q215 190 260 210" />
				<path d="M175 210 Q145 180 120 160" />
				<path d="M210 245 Q255 240 285 270" />
				<path d="M100 120 Q140 90 180 100" />
				<path d="M100 120 Q70 80 50 50" />
				<path d="M75 75 Q100 50 140 60" />

				{/* Savoy/Kale Frilled Outer Contour */}
				<path
					d="M60 40 C45 35 30 50 35 65 C25 80 30 100 45 110 C35 125 40 145 55 155 C45 170 55 190 70 200 C60 215 75 235 95 240 C90 255 110 270 130 270 C135 285 160 295 180 290 C195 305 220 305 240 295 C260 305 285 295 290 290"
					strokeWidth="1.8"
				/>

				{/* Dense Botanical Vein Etchings */}
				<path d="M60 40 Q80 35 100 45 Q120 40 140 50" strokeDasharray="3 2" />
				<path d="M45 110 Q70 100 100 110" strokeDasharray="4 2" />
				<path d="M55 155 Q85 145 120 150" strokeDasharray="4 2" />
				<path d="M70 200 Q105 185 145 190" strokeDasharray="4 2" />
				<path d="M95 240 Q130 220 175 225" strokeDasharray="4 2" />
				
				{/* Kale curly leaf crinkles */}
				<path d="M180 100 Q200 85 225 90 T250 120" />
				<path d="M220 150 Q240 135 265 140 T285 175" />
				<path d="M260 210 Q275 195 295 205" />
				
				<path d="M110 130 C125 115 135 120 150 110" strokeWidth="0.8" />
				<path d="M145 180 C160 165 175 170 190 160" strokeWidth="0.8" />
				<path d="M175 215 C190 200 205 205 225 195" strokeWidth="0.8" />
				<path d="M85 85 C100 70 115 75 130 65" strokeWidth="0.8" />
			</g>
		</svg>
	);
};
