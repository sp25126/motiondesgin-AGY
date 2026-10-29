import React from 'react';

/**
 * High-fidelity SVG Botanical Woodcut / Engraving Illustrations
 * Directly inspired by the reference images:
 * - Oyster & Field Mushrooms with intricate gill and cap woodcut hatchings (Image 1)
 * - Kale / Savoy Cabbage Leaf with delicate botanical veining and engraved contours (Image 2)
 */

interface BotanicalProps {
	width?: number;
	height?: number;
	color?: string;
	opacity?: number;
	style?: React.CSSProperties;
}

export const MushroomClusterSvg: React.FC<BotanicalProps> = ({
	width = 320,
	height = 240,
	color = '#FFFFFF',
	opacity = 0.9,
	style,
}) => (
	<svg
		width={width}
		height={height}
		viewBox="0 0 400 300"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		style={{ ...style, opacity }}
	>
		{/* Large Oyster Mushroom Cap 1 */}
		<path
			d="M 280 40 C 220 30, 160 55, 120 100 C 95 128, 80 160, 95 190 C 110 220, 160 230, 210 220 C 270 210, 340 180, 360 130 C 375 90, 335 48, 280 40 Z"
			stroke={color}
			strokeWidth="2.5"
			strokeLinecap="round"
		/>
		{/* Cap Woodcut Contour Lines */}
		<path d="M 260 55 C 215 48, 170 70, 138 108 C 118 132, 108 160, 120 182" stroke={color} strokeWidth="1.2" strokeDasharray="6 3" />
		<path d="M 245 70 C 205 65, 165 85, 140 120 C 125 142, 120 165, 132 180" stroke={color} strokeWidth="1.2" />
		<path d="M 290 68 C 255 60, 210 80, 175 120 C 150 150, 145 178, 160 195" stroke={color} strokeWidth="1.2" strokeDasharray="8 4" />
		<path d="M 315 85 C 285 78, 240 100, 205 140 C 180 170, 180 195, 200 205" stroke={color} strokeWidth="1.2" />
		<path d="M 335 105 C 310 100, 270 125, 235 160 C 210 185, 215 205, 235 212" stroke={color} strokeWidth="1.2" strokeDasharray="5 3" />

		{/* Underside Gill Hatchings (Woodcut style) */}
		<path d="M 125 145 Q 165 160, 205 170" stroke={color} strokeWidth="1.4" />
		<path d="M 115 160 Q 155 175, 195 185" stroke={color} strokeWidth="1.4" />
		<path d="M 110 175 Q 150 190, 185 198" stroke={color} strokeWidth="1.4" />
		<path d="M 120 190 Q 155 200, 185 206" stroke={color} strokeWidth="1.4" />
		<path d="M 140 205 Q 170 212, 195 214" stroke={color} strokeWidth="1.4" />
		<path d="M 170 218 Q 190 220, 210 220" stroke={color} strokeWidth="1.4" />

		{/* Overlapping Small Oyster Mushroom 2 */}
		<path
			d="M 170 120 C 130 110, 85 130, 60 165 C 40 192, 45 220, 75 235 C 110 250, 160 245, 195 225 C 225 205, 240 175, 230 150 C 220 130, 200 122, 170 120 Z"
			stroke={color}
			strokeWidth="2.2"
			strokeLinecap="round"
		/>
		{/* Cap 2 Hatchings */}
		<path d="M 155 132 C 122 125, 88 142, 70 170 C 58 190, 62 210, 82 222" stroke={color} strokeWidth="1.2" />
		<path d="M 142 145 C 115 140, 85 158, 72 182 C 65 198, 72 215, 90 224" stroke={color} strokeWidth="1" strokeDasharray="4 2" />
		<path d="M 175 142 C 150 140, 120 160, 102 188 C 92 205, 100 220, 120 228" stroke={color} strokeWidth="1.2" />

		{/* Stems with Woodcut Fibers */}
		<path d="M 185 220 C 190 250, 200 275, 215 295" stroke={color} strokeWidth="2.5" />
		<path d="M 215 220 C 218 248, 225 272, 235 292" stroke={color} strokeWidth="2" />
		<path d="M 195 235 C 198 255, 206 274, 218 290" stroke={color} strokeWidth="1" strokeDasharray="3 2" />
		<path d="M 205 230 C 209 252, 216 270, 226 288" stroke={color} strokeWidth="1" />

		{/* Small Button Mushroom on the Side */}
		<path
			d="M 65 210 C 45 205, 25 218, 18 235 C 10 252, 22 270, 42 275 C 62 280, 85 270, 92 255 C 98 240, 85 215, 65 210 Z"
			stroke={color}
			strokeWidth="2"
		/>
		<path d="M 55 220 C 40 218, 28 228, 24 240" stroke={color} strokeWidth="1.2" />
		<path d="M 45 275 C 48 288, 52 296, 58 300" stroke={color} strokeWidth="2" />
	</svg>
);

export const KaleLeafSvg: React.FC<BotanicalProps> = ({
	width = 300,
	height = 280,
	color = '#FFFFFF',
	opacity = 0.9,
	style,
}) => (
	<svg
		width={width}
		height={height}
		viewBox="0 0 360 340"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		style={{ ...style, opacity }}
	>
		{/* Main Central Rib (Petiole & Midrib) */}
		<path
			d="M 60 320 C 100 280, 160 210, 220 140 C 260 90, 295 45, 330 20"
			stroke={color}
			strokeWidth="3.5"
			strokeLinecap="round"
		/>
		<path
			d="M 68 322 C 106 282, 164 214, 222 144 C 261 95, 296 50, 330 20"
			stroke={color}
			strokeWidth="1.5"
			strokeDasharray="6 3"
		/>

		{/* Ruffled / Frilled Leaf Contour (Right Side) */}
		<path
			d="M 330 20 C 315 40, 335 60, 310 80 C 330 95, 305 120, 325 140 C 295 155, 310 185, 280 200 C 295 220, 260 240, 245 265 C 220 280, 200 300, 160 310 C 120 320, 80 325, 60 320"
			stroke={color}
			strokeWidth="2.2"
			strokeLinecap="round"
		/>

		{/* Ruffled / Frilled Leaf Contour (Left Side) */}
		<path
			d="M 330 20 C 290 15, 270 35, 250 25 C 230 45, 210 35, 190 60 C 170 55, 155 80, 135 85 C 115 105, 95 125, 80 155 C 60 190, 50 230, 55 270 C 58 295, 60 320, 60 320"
			stroke={color}
			strokeWidth="2.2"
			strokeLinecap="round"
		/>

		{/* Lateral Secondary Veins (Woodcut Style) */}
		<path d="M 285 65 C 255 75, 230 78, 205 92" stroke={color} strokeWidth="1.8" />
		<path d="M 255 105 C 225 115, 190 125, 165 140" stroke={color} strokeWidth="1.8" />
		<path d="M 220 150 C 185 165, 150 180, 125 205" stroke={color} strokeWidth="1.8" />
		<path d="M 175 205 C 145 220, 115 240, 95 265" stroke={color} strokeWidth="1.8" />
		<path d="M 130 255 C 105 270, 85 285, 75 300" stroke={color} strokeWidth="1.8" />

		{/* Left Secondary Veins */}
		<path d="M 260 50 C 280 65, 305 70, 320 75" stroke={color} strokeWidth="1.8" />
		<path d="M 225 95 C 250 115, 280 120, 300 130" stroke={color} strokeWidth="1.8" />
		<path d="M 185 145 C 215 170, 250 180, 270 195" stroke={color} strokeWidth="1.8" />
		<path d="M 145 200 C 175 225, 210 240, 230 255" stroke={color} strokeWidth="1.8" />
		<path d="M 110 250 C 135 275, 165 290, 185 300" stroke={color} strokeWidth="1.8" />

		{/* Fine Tertiary Reticulate Hatchings */}
		<path d="M 270 70 Q 285 85, 298 90" stroke={color} strokeWidth="1" strokeDasharray="3 2" />
		<path d="M 240 110 Q 255 128, 272 135" stroke={color} strokeWidth="1" strokeDasharray="3 2" />
		<path d="M 205 155 Q 225 175, 245 185" stroke={color} strokeWidth="1" strokeDasharray="3 2" />
		<path d="M 165 210 Q 185 230, 205 245" stroke={color} strokeWidth="1" strokeDasharray="3 2" />
		<path d="M 240 75 Q 220 85, 205 105" stroke={color} strokeWidth="1" strokeDasharray="3 2" />
		<path d="M 205 120 Q 180 135, 160 155" stroke={color} strokeWidth="1" strokeDasharray="3 2" />
		<path d="M 165 170 Q 140 190, 120 215" stroke={color} strokeWidth="1" strokeDasharray="3 2" />
		<path d="M 125 225 Q 100 245, 85 270" stroke={color} strokeWidth="1" strokeDasharray="3 2" />
	</svg>
);

export const ProduceBotanicalBadge: React.FC<{
	deliveryText?: string;
	rangeText?: string;
	color?: string;
	accentColor?: string;
}> = ({
	deliveryText = '6 days / wk',
	rangeText = '394 SKUs',
	color = '#FFFFFF',
	accentColor = 'rgba(255, 255, 255, 0.75)',
}) => (
	<div
		style={{
			display: 'flex',
			alignItems: 'center',
			gap: 32,
			fontFamily: '"Inter", sans-serif',
		}}
	>
		<div>
			<div
				style={{
					fontSize: 11,
					fontWeight: 700,
					letterSpacing: '0.18em',
					textTransform: 'uppercase',
					color: accentColor,
					marginBottom: 4,
				}}
			>
				DELIVERY
			</div>
			<div
				style={{
					fontFamily: '"Cormorant Garamond", Georgia, "Times New Roman", serif',
					fontSize: 26,
					fontWeight: 700,
					color: color,
					lineHeight: 1.1,
				}}
			>
				{deliveryText}
			</div>
		</div>

		<div
			style={{
				width: 1,
				height: 36,
				backgroundColor: 'rgba(255, 255, 255, 0.25)',
			}}
		/>

		<div>
			<div
				style={{
					fontSize: 11,
					fontWeight: 700,
					letterSpacing: '0.18em',
					textTransform: 'uppercase',
					color: accentColor,
					marginBottom: 4,
				}}
			>
				RANGE
			</div>
			<div
				style={{
					fontFamily: '"Cormorant Garamond", Georgia, "Times New Roman", serif',
					fontSize: 26,
					fontWeight: 700,
					color: color,
					lineHeight: 1.1,
				}}
			>
				{rangeText}
			</div>
		</div>
	</div>
);
