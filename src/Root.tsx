import React from 'react';
import { Composition } from 'remotion';
import { HealthySquirrelPin1 } from './healthysquirrel/HealthySquirrelPin1';
import { HealthySquirrelPin2 } from './healthysquirrel/HealthySquirrelPin2';
import { HealthySquirrelPin3 } from './healthysquirrel/HealthySquirrelPin3';
import { HealthySquirrelPin4 } from './healthysquirrel/HealthySquirrelPin4';
import { AntigravityAiCinema } from './AntigravityAiCinema';
import { AntigravityWireframeToUi } from './AntigravityWireframeToUi';
import { StageRedditRoast } from './StageRedditRoast';
import { StageDiscordRoast } from './StageDiscordRoast';
import { Pin1HeroPromise } from './pins/Pin1HeroPromise';
import { Pin2SkuTableView } from './pins/Pin2SkuTableView';
import { Pin3DualCtaPath } from './pins/Pin3DualCtaPath';
import { Pin4ColdChainFlow } from './pins/Pin4ColdChainFlow';
import { Pin5MobileStickyCta } from './pins/Pin5MobileStickyCta';
import { MasterPinsShowcase } from './pins/MasterPinsShowcase';
import { StageTravelRedesign } from './StageTravelRedesign';
import { StageGovNavRedesign } from './StageGovNavRedesign';
import { StageMobileLoginRedesign } from './StageMobileLoginRedesign';
import { Scene1ScaleDisclaimer } from './Scene1ScaleDisclaimer';
import { Scene2RedditToBlueprint } from './Scene2RedditToBlueprint';
import { Scene3IrctcDocking } from './Scene3IrctcDocking';
import { Scene4IrctcTransform } from './Scene4IrctcTransform';
import { Scene5CommunityPinRain } from './Scene5CommunityPinRain';
import { Scene6OutroCallToAction } from './Scene6OutroCallToAction';
import { StageViralMasterShowcase } from './StageViralMasterShowcase';

export const Root: React.FC = () => {
	return (
		<>
			{/* ── HEALTHY SQUIRREL (THEME LOCK) ── */}
			<Composition
				id="HealthySquirrelPin1"
				component={HealthySquirrelPin1}
				durationInFrames={150}
				fps={30}
				width={1080}
				height={1920}
			/>
			<Composition
				id="HealthySquirrelPin1Landscape"
				component={HealthySquirrelPin1}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="HealthySquirrelPin2"
				component={HealthySquirrelPin2}
				durationInFrames={150}
				fps={30}
				width={1080}
				height={1920}
			/>
			<Composition
				id="HealthySquirrelPin2Landscape"
				component={HealthySquirrelPin2}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="HealthySquirrelPin3"
				component={HealthySquirrelPin3}
				durationInFrames={150}
				fps={30}
				width={1080}
				height={1920}
			/>
			<Composition
				id="HealthySquirrelPin3Landscape"
				component={HealthySquirrelPin3}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="HealthySquirrelPin4"
				component={HealthySquirrelPin4}
				durationInFrames={150}
				fps={30}
				width={1080}
				height={1920}
			/>
			<Composition
				id="HealthySquirrelPin4Landscape"
				component={HealthySquirrelPin4}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
			/>

			{/* ── ANTIGRAVITY AI 25-SECOND 60FPS CINEMATIC MASTER ── */}
			<Composition
				id="AntigravityAiCinema"
				component={AntigravityAiCinema}
				durationInFrames={1500}
				fps={60}
				width={1920}
				height={1080}
			/>

			{/* ── ANTIGRAVITY WIREFRAME TO UI SCANNER SWEEP (12s, 60FPS) ── */}
			<Composition
				id="AntigravityWireframeToUi"
				component={AntigravityWireframeToUi}
				durationInFrames={720}
				fps={60}
				width={1920}
				height={1080}
			/>

			{/* ── STAGE REDDIT ROAST ── */}
			<Composition
				id="StageRedditRoast"
				component={StageRedditRoast}
				durationInFrames={480}
				fps={60}
				width={1920}
				height={1080}
			/>

			{/* ── STAGE DISCORD ROAST (DAY 03) ── */}
			<Composition
				id="StageDiscordRoast"
				component={StageDiscordRoast}
				durationInFrames={480}
				fps={60}
				width={1920}
				height={1080}
			/>

			{/* ── FRESHFLOW PINS ── */}
			<Composition
				id="Pin1HeroPromise"
				component={Pin1HeroPromise}
				durationInFrames={150}
				fps={30}
				width={1080}
				height={1920}
			/>
			<Composition
				id="Pin2SkuTableView"
				component={Pin2SkuTableView}
				durationInFrames={160}
				fps={30}
				width={1080}
				height={1920}
			/>
			<Composition
				id="Pin3DualCtaPath"
				component={Pin3DualCtaPath}
				durationInFrames={160}
				fps={30}
				width={1080}
				height={1920}
			/>
			<Composition
				id="Pin4ColdChainFlow"
				component={Pin4ColdChainFlow}
				durationInFrames={160}
				fps={30}
				width={1080}
				height={1920}
			/>
			<Composition
				id="Pin5MobileStickyCta"
				component={Pin5MobileStickyCta}
				durationInFrames={160}
				fps={30}
				width={1080}
				height={1920}
			/>
			<Composition
				id="MasterPinsShowcase"
				component={MasterPinsShowcase}
				durationInFrames={600}
				fps={30}
				width={1080}
				height={1920}
			/>
			{/* ── STAGE TRAVEL REDESIGN (IRCTC TO MODERN 56PX UI WIPE) ── */}
			<Composition
				id="StageTravelRedesign"
				component={StageTravelRedesign}
				durationInFrames={480}
				fps={60}
				width={1920}
				height={1080}
			/>
			{/* ── STAGE GOV NAV REDESIGN (ACCORDION MENU & #15803D LOGIN) ── */}
			<Composition
				id="StageGovNavRedesign"
				component={StageGovNavRedesign}
				durationInFrames={450}
				fps={60}
				width={1920}
				height={1080}
			/>
			{/* ── STAGE MOBILE LOGIN REDESIGN (BREATHING 48PX EXPANSION & PASSKEY) ── */}
			<Composition
				id="StageMobileLoginRedesign"
				component={StageMobileLoginRedesign}
				durationInFrames={450}
				fps={60}
				width={1920}
				height={1080}
			/>
			{/* ── SCENE 1: THE SCALE & THE DISCLAIMER (10s, 60FPS) ── */}
			<Composition
				id="Scene1ScaleDisclaimer"
				component={Scene1ScaleDisclaimer}
				durationInFrames={600}
				fps={60}
				width={1920}
				height={1080}
			/>
			{/* ── SCENE 2: REDDIT TO STAGE BLUEPRINT (7.5s, 60FPS) ── */}
			<Composition
				id="Scene2RedditToBlueprint"
				component={Scene2RedditToBlueprint}
				durationInFrames={450}
				fps={60}
				width={1920}
				height={1080}
			/>
			{/* ── SCENE 3: IRCTC CLUTTER & STAGE BROWSER DOCKING (6s, 60FPS) ── */}
			<Composition
				id="Scene3IrctcDocking"
				component={Scene3IrctcDocking}
				durationInFrames={360}
				fps={60}
				width={1920}
				height={1080}
			/>
			{/* ── SCENE 4: IRCTC WIDGET PIN & VOLUMETRIC TRANSFORM (6s, 60FPS) ── */}
			<Composition
				id="Scene4IrctcTransform"
				component={Scene4IrctcTransform}
				durationInFrames={360}
				fps={60}
				width={1920}
				height={1080}
			/>
			{/* ── SCENE 5: COMMUNITY PIN RAIN & ISOMETRIC PULLBACK (7.5s, 60FPS) ── */}
			<Composition
				id="Scene5CommunityPinRain"
				component={Scene5CommunityPinRain}
				durationInFrames={450}
				fps={60}
				width={1920}
				height={1080}
			/>
			{/* ── SCENE 6: OUTRO CALL TO ACTION (5s, 60FPS) ── */}
			<Composition
				id="Scene6OutroCallToAction"
				component={Scene6OutroCallToAction}
				durationInFrames={300}
				fps={60}
				width={1920}
				height={1080}
			/>
			{/* ── STAGE VIRAL 1M-VIEW MASTER SHOWCASE (60s, 60FPS) ── */}
			<Composition
				id="StageViralMasterShowcase"
				component={StageViralMasterShowcase}
				durationInFrames={3600}
				fps={60}
				width={1920}
				height={1080}
			/>
		</>
	);
};

export const RemotionRoot = Root;
