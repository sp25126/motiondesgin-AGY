import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	useCurrentFrame,
	Easing,
	staticFile,
	Img,
} from 'remotion';
import { THEME } from './BrandTokens';
import { MushroomClusterSvg, ProduceBotanicalBadge } from './BotanicalEtchings';

interface ProductItem {
	sku: string;
	title: string;
	category: string;
	origin: string;
	temp: string;
	price: string;
	unit: string;
	image: string;
	badge?: string;
	initialQty: number;
}

const PRODUCTS: ProductItem[] = [
	{
		sku: 'SKU-7721',
		title: 'Organic Heirloom Rainbow Carrots',
		category: 'Roots & Tubers',
		origin: 'Salinas Valley, CA',
		temp: '34°F Optimal',
		price: '$24.50',
		unit: 'Case of 24 Bunches',
		image: staticFile('images/carrots.jpg'),
		badge: 'Harvested Today',
		initialQty: 4,
	},
	{
		sku: 'SKU-8834',
		title: 'Wild Chanterelle & Cremini Box',
		category: 'Foraged Mushrooms',
		origin: 'Olympic Peninsula, WA',
		temp: '33°F Chilled',
		price: '$48.00',
		unit: '5 lb Chef Flat',
		image: staticFile('images/mushrooms.jpg'),
		badge: 'Limited Yield',
		initialQty: 2,
	},
	{
		sku: 'SKU-9012',
		title: 'Heritage Multicolored Tomatoes',
		category: 'Vine-Ripened',
		origin: 'Watsonville Farms, CA',
		temp: '45°F Ambient Cold',
		price: '$38.00',
		unit: '10 lb Wood Crate',
		image: staticFile('images/tomatoes.jpg'),
		badge: 'Chef Favorite',
		initialQty: 6,
	},
	{
		sku: 'SKU-4509',
		title: 'Heirloom Rainbow Roots (Grade A)',
		category: 'Specialty Roots',
		origin: 'Ventura Coastal, CA',
		temp: '35°F Handled',
		price: '$32.00',
		unit: '24-Count Master Flat',
		image: staticFile('images/carrots.jpg'),
		badge: 'Kitchen Ready',
		initialQty: 3,
	},
];

export const Pin2SkuTableView: React.FC = () => {
	const frame = useCurrentFrame();

	// Split screen wiping transition (Frame 25 to 80)
	// Dull list on left wiped away by glowing vertical laser line revealing wholesale grid
	const wipeProgress = interpolate(frame, [25, 80], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});

	// Glowing vertical line position (percentage 0 to 100%)
	const wipePercent = wipeProgress * 100;

	// Simulated quantity stepper interaction on Product 1 (Frame 95 to 130)
	const qtyIncrement = interpolate(frame, [95, 115], [0, 2], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const activeQty = 4 + Math.floor(qtyIncrement);

	// Card 1 subtle hover lift (Smooth 0.3s transform: translateY(-2px) and box-shadow increase)
	const hoverLift = interpolate(frame, [90, 105, 140, 155], [0, -4, -4, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: THEME.cream.canvas,
				fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
				overflow: 'hidden',
				display: 'flex',
				flexDirection: 'column',
				position: 'relative',
			}}
		>
			{/* ── TOP NAV HEADER: Cerulean Ocean Blue from Reference Images ── */}
			<div
				style={{
					height: 120,
					background: THEME.blue.gradient,
					borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '0 50px',
					boxShadow: '0 4px 20px rgba(2, 132, 199, 0.25)',
					zIndex: 50,
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				{/* Botanical Mushroom Watermark in Header (Image 1 style) */}
				<div
					style={{
						position: 'absolute',
						right: 280,
						top: -40,
						opacity: 0.25,
						pointerEvents: 'none',
					}}
				>
					<MushroomClusterSvg width={240} height={180} color="#FFFFFF" />
				</div>

				<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
					<div
						style={{
							width: 44,
							height: 44,
							borderRadius: 10,
							background: '#FFFFFF',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: THEME.blue.primary,
							fontWeight: 900,
							fontSize: 22,
							boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
						}}
					>
						F
					</div>
					<div>
						<div style={{ fontWeight: 800, fontSize: 22, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
							FreshFlow Wholesale
						</div>
						<div style={{ fontSize: 13, color: 'rgba(224, 242, 254, 0.9)', fontWeight: 500 }}>
							High-Density Chef Catalog • 394 Active SKUs
						</div>
					</div>
				</div>

				<div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
					<ProduceBotanicalBadge
						deliveryText="6 days / wk"
						rangeText="394 SKUs"
						color="#FFFFFF"
						accentColor="rgba(224, 242, 254, 0.85)"
					/>
					<div
						style={{
							background: THEME.midnight.pill,
							color: '#FFFFFF',
							padding: '10px 20px',
							borderRadius: 999,
							fontSize: 14,
							fontWeight: 700,
							display: 'flex',
							alignItems: 'center',
							gap: 8,
							boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
						}}
					>
						<span>Cart: 15 Cases</span>
						<span style={{ color: THEME.blue.light }}>→</span>
					</div>
				</div>
			</div>

			{/* Main Comparison Area */}
			<div style={{ flex: 1, position: 'relative', width: '100%', height: '100%' }}>
				{/* ── LAYER 1: Dull, archaic, text-only legacy view (Underneath) ── */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						background: '#EDE8DF',
						padding: '40px 60px',
						fontFamily: '"Courier New", Courier, monospace',
						color: '#334155',
					}}
				>
					<div
						style={{
							background: '#DFD8CC',
							padding: '14px 20px',
							border: '1px solid #C8BEAF',
							marginBottom: 20,
							fontWeight: 700,
							fontSize: 15,
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<span>LEGACY B2B FAX/PRINT ORDER SHEET (REV 2011)</span>
						<span style={{ color: '#DC2626' }}>[SLOW MANUAL ENTRY]</span>
					</div>

					<div
						style={{
							border: '1px solid #C8BEAF',
							background: '#FFFFFF',
							borderRadius: 4,
							overflow: 'hidden',
						}}
					>
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: '120px 2fr 120px 100px 100px',
								background: '#F5F1E9',
								padding: '12px 16px',
								borderBottom: '2px solid #C8BEAF',
								fontWeight: 'bold',
								fontSize: 14,
							}}
						>
							<div>SKU CODE</div>
							<div>COMMODITY DESCRIPTION</div>
							<div>PACK SIZE</div>
							<div>PRICE</div>
							<div>ORDER QTY</div>
						</div>

						{[
							{ code: 'SKU-7721', desc: 'ORGANIC HEIRLOOM RAINBOW CARROTS', pack: '24 BN', price: '$24.50' },
							{ code: 'SKU-8834', desc: 'WILD CHANTERELLE & CREMINI BOX', pack: '5 LB BX', price: '$48.00' },
							{ code: 'SKU-9012', desc: 'HERITAGE MULTICOLORED TOMATOES', pack: '10 LB CR', price: '$38.00' },
							{ code: 'SKU-4509', desc: 'HEIRLOOM RAINBOW ROOTS (GRADE A)', pack: '24 CT', price: '$32.00' },
							{ code: 'SKU-4410', desc: 'ROMAINE HEARTS WASHED 48CT', pack: '48 CT', price: '$28.00' },
							{ code: 'SKU-5192', desc: 'HERB FRESH BASIL BULK 1LB', pack: '1 LB', price: '$12.00' },
							{ code: 'SKU-6281', desc: 'YUKON GOLD POTATO 50LB SACK', pack: '50 LB', price: '$29.50' },
							{ code: 'SKU-7729', desc: 'SHALLOTS FRENCH BULK 10LB', pack: '10 LB', price: '$31.00' },
						].map((item, idx) => (
							<div
								key={idx}
								style={{
									display: 'grid',
									gridTemplateColumns: '120px 2fr 120px 100px 100px',
									padding: '14px 16px',
									borderBottom: '1px solid #E5E0D5',
									fontSize: 13,
									backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#FAF7F2',
								}}
							>
								<div>{item.code}</div>
								<div>{item.desc}</div>
								<div>{item.pack}</div>
								<div>{item.price}</div>
								<div style={{ border: '1px solid #94A3B8', padding: '2px 8px', textAlign: 'center' }}>
									___
								</div>
							</div>
						))}
					</div>
				</div>

				{/* ── LAYER 2: Modern High-Density SKU Wholesale Grid (Revealed by Wipe) ── */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						background: THEME.cream.canvas,
						padding: '36px 60px',
						clipPath: `polygon(0 0, ${wipePercent}% 0, ${wipePercent}% 100%, 0 100%)`,
						overflow: 'hidden',
					}}
				>
					{/* Category Filters Bar */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							marginBottom: 24,
						}}
					>
						<div style={{ display: 'flex', gap: 10 }}>
							{['All 394 SKUs', 'Chef Specials', 'Roots & Tubers', 'Fungi & Wild', 'Vine Produce'].map(
								(cat, i) => (
									<div
										key={i}
										style={{
											padding: '8px 18px',
											borderRadius: 8,
											fontSize: 14,
											fontWeight: i === 0 ? 700 : 500,
											background: i === 0 ? THEME.blue.primary : '#FFFFFF',
											color: i === 0 ? '#FFFFFF' : '#475569',
											border: i === 0 ? `1px solid ${THEME.blue.primary}` : '1px solid #E2E8F0',
											boxShadow: i === 0 ? '0 4px 12px rgba(2,132,199,0.3)' : 'none',
										}}
									>
										{cat}
									</div>
								)
							)}
						</div>
						<div style={{ fontSize: 14, color: '#64748B', fontWeight: 500 }}>
							Showing <strong style={{ color: THEME.cream.inkNavy }}>Top Wholesale Harvests</strong>
						</div>
					</div>

					{/* ── Layout: CSS Grid layout grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; ── */}
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
							gap: 16,
							width: '100%',
						}}
					>
						{PRODUCTS.map((prod, index) => {
							const isFirstCard = index === 0;
							const cardQty = isFirstCard ? activeQty : prod.initialQty;

							return (
								/* Card Structure: border: 1px solid #E5E7EB, border-radius: 8px, background: #FFFFFF, box-shadow: 0 1px 3px rgba(0,0,0,0.05); */
								<div
									key={prod.sku}
									style={{
										border: isFirstCard ? `1px solid ${THEME.blue.light}` : '1px solid #E5E7EB',
										borderRadius: 8,
										background: '#FFFFFF',
										boxShadow: isFirstCard
											? '0 12px 28px -5px rgba(2, 132, 199, 0.2), 0 8px 10px -6px rgba(0,0,0,0.08)'
											: '0 1px 3px rgba(0,0,0,0.05)',
										transform: `translateY(${isFirstCard ? hoverLift : 0}px)`,
										overflow: 'hidden',
										display: 'flex',
										flexDirection: 'column',
										position: 'relative',
									}}
								>
									{/* Badge */}
									{prod.badge && (
										<div
											style={{
												position: 'absolute',
												top: 10,
												left: 10,
												zIndex: 10,
												background: isFirstCard ? THEME.green.fresh : 'rgba(2, 132, 199, 0.92)',
												backdropFilter: 'blur(8px)',
												color: '#FFFFFF',
												fontSize: 11,
												fontWeight: 700,
												padding: '3px 8px',
												borderRadius: 4,
												letterSpacing: '0.04em',
												textTransform: 'uppercase',
											}}
										>
											{prod.badge}
										</div>
									)}

									{/* Image Spec: aspect-ratio: 16/9, object-fit: cover, border-radius: 8px 8px 0 0, high-res WebP format */}
									<div
										style={{
											width: '100%',
											aspectRatio: '16/9',
											overflow: 'hidden',
											borderRadius: '8px 8px 0 0',
											position: 'relative',
											background: '#F1F5F9',
										}}
									>
										<Img
											src={prod.image}
											alt={prod.title}
											style={{
												width: '100%',
												height: '100%',
												objectFit: 'cover',
												display: 'block',
											}}
										/>
									</div>

									{/* Content */}
									<div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
										<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
											<span style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>{prod.sku}</span>
											<span
												style={{
													fontSize: 11,
													color: THEME.green.fresh,
													fontWeight: 600,
													background: THEME.green.pale,
													padding: '2px 6px',
													borderRadius: 4,
												}}
											>
												{prod.temp}
											</span>
										</div>

										<div
											style={{
												fontWeight: 700,
												fontSize: 16,
												color: '#111827',
												lineHeight: 1.3,
												minHeight: 42,
											}}
										>
											{prod.title}
										</div>

										<div style={{ fontSize: 12, color: '#64748B' }}>
											Origin: <strong>{prod.origin}</strong>
										</div>

										{/* Price & Unit */}
										<div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 'auto' }}>
											<span style={{ fontWeight: 800, fontSize: 20, color: '#111827' }}>{prod.price}</span>
											<span style={{ fontSize: 12, color: '#6B7280' }}>/ {prod.unit}</span>
										</div>

										{/* ── Quantity Stepper UI: display: flex; align-items: center; justify-content: space-between; border: 1px solid #D1D5DB; border-radius: 6px; padding: 4px 8px; height: 36px; Buttons (- and +) use color: #15803D. ── */}
										<div
											style={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'space-between',
												border: isFirstCard ? `1px solid ${THEME.green.fresh}` : '1px solid #D1D5DB',
												borderRadius: 6,
												padding: '4px 8px',
												height: 36,
												boxSizing: 'border-box',
												background: isFirstCard ? THEME.green.pale : '#FFFFFF',
											}}
										>
											<button
												type="button"
												style={{
													border: 'none',
													background: 'transparent',
													color: THEME.green.fresh,
													fontSize: 20,
													fontWeight: 700,
													cursor: 'pointer',
													padding: '0 6px',
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
												}}
											>
												−
											</button>

											<span
												style={{
													fontFamily: 'Inter, sans-serif',
													fontSize: 14,
													fontWeight: 700,
													color: '#111827',
													minWidth: 50,
													textAlign: 'center',
												}}
											>
												{cardQty} {cardQty === 1 ? 'case' : 'cases'}
											</span>

											<button
												type="button"
												style={{
													border: 'none',
													background: 'transparent',
													color: THEME.green.fresh,
													fontSize: 20,
													fontWeight: 700,
													cursor: 'pointer',
													padding: '0 6px',
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
												}}
											>
												+
											</button>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* ── THE GLOWING VERTICAL LASER LINE WIPER ── */}
				{wipeProgress > 0 && wipeProgress < 1 && (
					<div
						style={{
							position: 'absolute',
							top: 0,
							bottom: 0,
							left: `${wipePercent}%`,
							width: 3,
							backgroundColor: '#FFFFFF',
							boxShadow: `
								0 0 10px #FFFFFF,
								0 0 20px ${THEME.blue.light},
								0 0 40px ${THEME.blue.primary},
								0 0 80px rgba(2, 132, 199, 0.8)
							`,
							zIndex: 100,
							transform: 'translateX(-50%)',
						}}
					>
						{/* Top and Bottom Energy Pointers */}
						<div
							style={{
								position: 'absolute',
								top: 20,
								left: '50%',
								transform: 'translateX(-50%)',
								background: THEME.blue.primary,
								color: '#FFFFFF',
								borderRadius: 20,
								padding: '5px 12px',
								fontSize: 11,
								fontWeight: 800,
								whiteSpace: 'nowrap',
								boxShadow: '0 0 20px rgba(2, 132, 199, 0.9)',
								letterSpacing: '0.04em',
							}}
						>
							TRANSFORMING B2B →
						</div>

						<div
							style={{
								position: 'absolute',
								bottom: 30,
								left: '50%',
								transform: 'translateX(-50%)',
								width: 20,
								height: 20,
								borderRadius: '50%',
								background: THEME.blue.light,
								boxShadow: `0 0 25px ${THEME.blue.light}`,
							}}
						/>
					</div>
				)}
			</div>
		</AbsoluteFill>
	);
};
