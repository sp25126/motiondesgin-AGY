import React from 'react';
import { useCurrentFrame } from 'remotion';

const REDDIT_POSTS = [
	{
		subreddit: 'r/india',
		author: 'u/frontend_guy_24',
		time: '6h ago',
		title: 'Why is every single government portal designed like it is 2003 with zero mobile UX?',
		upvotes: '4.8k',
		comments: '642',
		tag: 'RANT / DISCUSSION',
		tagColor: '#EF4444',
	},
	{
		subreddit: 'r/developersIndia',
		author: 'u/fullstack_warrior',
		time: '3h ago',
		title: 'IRCTC microscopic 34px inputs and distorted CAPTCHAs literally cost me my Tatkal train ticket.',
		upvotes: '8.2k',
		comments: '1,120',
		tag: 'UI HORROR',
		tagColor: '#F97316',
	},
	{
		subreddit: 'r/india',
		author: 'u/design_lead_blr',
		time: '8h ago',
		title: 'Income Tax e-Filing navbar has 7 tiny dropdowns on a heavy blue bar. How does any citizen navigate this?',
		upvotes: '5.9k',
		comments: '810',
		tag: 'UX REVIEW',
		tagColor: '#EF4444',
	},
	{
		subreddit: 'r/developersIndia',
		author: 'u/techie_mumbai',
		time: '12h ago',
		title: 'EPFO mobile login is completely unscaled desktop HTML. You have to pinch-to-zoom just to type your password.',
		upvotes: '11.4k',
		comments: '1,450',
		tag: 'BROKEN MOBILE',
		tagColor: '#DC2626',
	},
	{
		subreddit: 'r/UXDesign',
		author: 'u/product_ninja',
		time: '1d ago',
		title: 'We have world-class engineers building UPI & DPI. Why are the public citizen portals so cluttered?',
		upvotes: '14.2k',
		comments: '2,100',
		tag: 'SYSTEMIC UX',
		tagColor: '#EA580C',
	},
];

export const RedditAngryFeed: React.FC = () => {
	const frame = useCurrentFrame();

	// Smooth continuous upward scroll drift
	const scrollY = (frame * 1.6) % 900;

	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				backgroundColor: '#0E1117',
				fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
				position: 'relative',
				overflow: 'hidden',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				padding: '40px 0',
				boxSizing: 'border-box',
			}}
		>
			{/* Top Reddit App Bar */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					height: 54,
					backgroundColor: '#1A1A1B',
					borderBottom: '1px solid #343536',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '0 48px',
					zIndex: 20,
					color: '#D7DADC',
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
					<div
						style={{
							width: 32,
							height: 32,
							borderRadius: '50%',
							backgroundColor: '#FF4500',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#FFFFFF',
							fontWeight: 900,
							fontSize: 18,
						}}
					>
						r/
					</div>
					<span style={{ fontSize: 16, fontWeight: 800, color: '#FFFFFF' }}>
						reddit.com / r/india • r/developersIndia
					</span>
				</div>

				<div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 12, color: '#818384' }}>
					<span>🔥 Hot Discussions</span>
					<span>⚡ 24.8k Online</span>
				</div>
			</div>

			{/* Scrolling Feed Container with Blur */}
			<div
				style={{
					width: 820,
					marginTop: 50,
					display: 'flex',
					flexDirection: 'column',
					gap: 18,
					transform: `translateY(${-scrollY}px)`,
					filter: 'blur(0.8px)', // Blurry scrolling aesthetic requested
					opacity: 0.88,
				}}
			>
				{/* Loop posts twice for seamless infinite feel */}
				{[...REDDIT_POSTS, ...REDDIT_POSTS].map((post, idx) => (
					<div
						key={idx}
						style={{
							backgroundColor: '#1A1A1B',
							border: '1px solid #343536',
							borderRadius: 12,
							padding: '18px 22px',
							display: 'flex',
							gap: 16,
							color: '#D7DADC',
							boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
						}}
					>
						{/* Upvote Column */}
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								gap: 4,
								width: 44,
								paddingTop: 2,
								flexShrink: 0,
							}}
						>
							<div
								style={{
									width: 26,
									height: 26,
									borderRadius: 4,
									backgroundColor: 'rgba(255, 69, 0, 0.15)',
									color: '#FF4500',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontSize: 14,
									fontWeight: 900,
								}}
							>
								▲
							</div>
							<span style={{ fontSize: 12, fontWeight: 800, color: '#FF4500' }}>
								{post.upvotes}
							</span>
							<div style={{ color: '#818384', fontSize: 14 }}>▼</div>
						</div>

						{/* Content Column */}
						<div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
							{/* Post Meta */}
							<div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#818384' }}>
								<span style={{ fontWeight: 700, color: '#FFFFFF' }}>{post.subreddit}</span>
								<span>•</span>
								<span>Posted by {post.author}</span>
								<span>{post.time}</span>
								<span
									style={{
										marginLeft: 'auto',
										fontSize: 10,
										fontWeight: 800,
										color: post.tagColor,
										backgroundColor: `${post.tagColor}22`,
										border: `1px solid ${post.tagColor}55`,
										padding: '2px 8px',
										borderRadius: 4,
									}}
								>
									{post.tag}
								</span>
							</div>

							{/* Post Title */}
							<div style={{ fontSize: 16, fontWeight: 700, color: '#D7DADC', lineHeight: 1.4 }}>
								{post.title}
							</div>

							{/* Footer Comments */}
							<div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 12, color: '#818384', marginTop: 4 }}>
								<div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
									<span>💬</span>
									<span>{post.comments} Comments</span>
								</div>
								<div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
									<span>↗️</span>
									<span>Share</span>
								</div>
								<div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
									<span>⭐</span>
									<span>Award</span>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Blur Vignette Edge Masks */}
			<div
				style={{
					position: 'absolute',
					top: 54,
					left: 0,
					right: 0,
					height: 60,
					background: 'linear-gradient(to bottom, #0E1117 0%, transparent 100%)',
					pointerEvents: 'none',
					zIndex: 10,
				}}
			/>
			<div
				style={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0,
					height: 80,
					background: 'linear-gradient(to top, #0E1117 0%, transparent 100%)',
					pointerEvents: 'none',
					zIndex: 10,
				}}
			/>
		</div>
	);
};
