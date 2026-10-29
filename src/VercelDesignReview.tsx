import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { AlabasterPaper } from './components/AlabasterPaper';
import { GlassBrowser } from './components/GlassBrowser';
import { CursorAndPin } from './components/CursorAndPin';
import { CommentCard } from './components/CommentCard';

export const VercelDesignReview: React.FC = () => {
	const frame = useCurrentFrame();

	// Smooth camera zoom
	const cameraZoom = 1 + Math.sin(frame / 70) * 0.01;

	// Global fade out near end (frames 570-600)
	const globalOpacity = interpolate(
		frame,
		[560, 595],
		[1, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#F5F4F0',
				overflow: 'hidden',
				transform: `scale(${cameraZoom})`,
				opacity: globalOpacity,
			}}
		>
			<AlabasterPaper />
			<GlassBrowser />
			<CursorAndPin />
			<CommentCard />
		</AbsoluteFill>
	);
};
