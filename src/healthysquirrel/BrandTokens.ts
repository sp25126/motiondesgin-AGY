// Healthy Squirrel Brand Design System Tokens
// Aesthetic: Athletic, trustworthy, calm. Flat, clean, light-mode.
// Strict rules: NO glassmorphism, NO glowing neon, NO bouncy overshoot exceeding 4%.

export const HEALTHY_SQUIRREL_THEME = {
	colors: {
		primaryGreen: '#2E8661', // Used only for primary actions and progress fills
		primaryGreenHover: '#267051',
		background: '#F9FAFB', // Warm off-white
		surface: '#FFFFFF', // Clean flat white card surface
		border: '#E5E7EB', // 1px subtle divider/card border
		textPrimary: '#111827', // Near-black for primary headline and titles
		textSecondary: '#6B7280', // Medium neutral for secondary text/labels
		textMuted: '#9CA3AF',
		proofText: '#4B5563', // Slate neutral for proof strip items
		badgeBg: '#F3F4F6',
		badgeBorder: '#E5E7EB',
	},
	shadows: {
		card: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.03)',
		subtle: '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
	},
	typography: {
		fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
	},
	radius: {
		card: '16px',
		pill: '9999px',
		sm: '8px',
	},
} as const;
