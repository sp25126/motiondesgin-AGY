/**
 * FreshFlow Brand Design Tokens
 * Harmonized with the user's reference images:
 * - Cerulean Azure Blue & Ocean Gradient (#0284C7 / #0077B6 / #0369A1)
 * - Deep Midnight Obsidian Navy Canvas (#060D17 / #0A1424 / #08121E)
 * - Warm Organic Linen / Cream Canvas (#FAF7F2 / #FBF9F5 / #E8E3D7)
 * - B2B Produce Fresh Green (#15803D / #22C55E / #F0FDF4)
 * - WhatsApp Conversion Green (#25D366)
 */

export const THEME = {
	// Cerulean Azure Blue from Reference Images 1 & 2
	blue: {
		primary: '#0284C7',
		gradient: 'linear-gradient(135deg, #0284C7 0%, #0077B6 55%, #0369A1 100%)',
		gradientHover: 'linear-gradient(135deg, #0369A1 0%, #0284C7 100%)',
		dark: '#0369A1',
		deep: '#075985',
		light: '#38BDF8',
		pale: '#E0F2FE',
		glow: 'rgba(2, 132, 199, 0.35)',
		glowStrong: 'rgba(2, 132, 199, 0.7)',
	},

	// Midnight Obsidian Navy Backgrounds (from bottom of reference image 2)
	midnight: {
		base: '#060D17',
		navy: '#0A1424',
		card: '#0E1B2F',
		pill: '#08121E',
		border: 'rgba(255, 255, 255, 0.12)',
		textMuted: '#94A3B8',
	},

	// Warm Organic Linen & Cream Surfaces (from reference image 1)
	cream: {
		canvas: '#FAF7F2',
		card: '#FBF9F5',
		border: '#E8E3D7',
		borderSubtle: '#F0ECE3',
		inkNavy: '#0A192F',
		textDark: '#111827',
		textMuted: '#4B5563',
		textSubtle: '#6B7280',
	},

	// B2B Produce Fresh Green (from prompt developer specs)
	green: {
		fresh: '#15803D',
		freshHover: '#16A34A',
		pale: '#F0FDF4',
		border: '#BBF7D0',
		neon: '#22C55E',
		glow: 'rgba(21, 128, 61, 0.35)',
	},

	// Conversion & WhatsApp Actions
	whatsapp: {
		green: '#25D366',
		glow: 'rgba(37, 211, 102, 0.4)',
	},

	// Easing Presets
	ease: {
		snappy: 'cubic-bezier(0.16, 1, 0.3, 1)',
		pop: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
	},
} as const;
