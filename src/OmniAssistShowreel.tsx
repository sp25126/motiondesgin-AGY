import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { ParticleSpace } from './components/ParticleSpace';
import { MorphContainer } from './components/MorphContainer';
import { OmniLogo } from './components/OmniLogo';

export const OmniAssistShowreel: React.FC = () => {
	const frame = useCurrentFrame();

	// Smooth camera zoom
	const cameraZoom = 1 + Math.sin(frame / 60) * 0.015;

	// Global fade to black near end (frames 850-900)
	const globalOpacity = interpolate(
		frame,
		[840, 890],
		[1, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#0A0A0A',
				overflow: 'hidden',
				transform: `scale(${cameraZoom})`,
				opacity: globalOpacity,
			}}
		>
			<ParticleSpace />
			<MorphContainer />
			<OmniLogo />
		</AbsoluteFill>
	);
};
