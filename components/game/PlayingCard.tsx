import React from "react";

export type Suit = "hearts" | "diamonds" | "clubs" | "spades";
export type Rank =
	| "A"
	| "2"
	| "3"
	| "4"
	| "5"
	| "6"
	| "7"
	| "8"
	| "9"
	| "10"
	| "J"
	| "Q"
	| "K";

export interface PlayingCardProps {
	suit: Suit;
	rank: Rank;
	faceDown?: boolean;
	className?: string;
	onClick?: () => void;
}

const PlayingCard: React.FC<PlayingCardProps> = ({
	suit,
	rank,
	faceDown = false,
	className = "",
	onClick,
}) => {
	const getSuitSymbol = (suit: Suit): string => {
		switch (suit) {
			case "hearts":
				return "♥";
			case "diamonds":
				return "♦";
			case "clubs":
				return "♣";
			case "spades":
				return "♠";
		}
	};

	const getSuitColor = (suit: Suit): string => {
		return suit === "hearts" || suit === "diamonds"
			? "text-red-500"
			: "text-black";
	};

	const getRankDisplay = (rank: Rank): string => {
		return rank;
	};

	if (faceDown) {
		return (
			// Outer card container - main blue gradient background and card shadow
			<div
				className={`relative w-16 h-24 bg-gradient-to-br from-blue-900 to-blue-950 border border-gray-800 rounded-lg shadow-lg cursor-pointer transition-transform hover:scale-105 ${className}`}
				onClick={onClick}>
				{/* Centered decorative back pattern - creates the layered card back design */}
				<div className="absolute inset-0 flex items-center justify-center">
					{/*
							Inner center - darkest blue square
							This simulates the center medallion/pattern on real playing cards
						*/}
					<div className="w-full h-full flex items-center justify-center">
						<div className="w-12 h-21 bg-gradient-to-br from-blue-600 to-blue-700 rounded-sm border border-blue-500"></div>
					</div>
				</div>

				{/*
					Top highlight line - simulates light reflection on the card surface
					This gives the card a subtle 3D effect
				*/}
				<div className="absolute inset-x-0 top-0 h-px bg-blue-400 opacity-30"></div>

				{/*
					Bottom shadow line - adds depth and contrast to the card
					This makes the card look more realistic by simulating ambient light
				*/}
				<div className="absolute inset-x-0 bottom-0 h-px bg-blue-950 opacity-50"></div>
			</div>
		);
	}

	const suitSymbol = getSuitSymbol(suit);
	const colorClass = getSuitColor(suit);
	const rankDisplay = getRankDisplay(rank);

	return (
		<div
			className={`relative w-16 h-24 bg-white border border-gray-400 rounded-sm shadow-md cursor-pointer transition-transform hover:scale-105 overflow-hidden ${className}`}
			onClick={onClick}>
			{/* Subtle inner border like real cards */}
			<div className="absolute inset-[2px] border border-gray-300 rounded-sm pointer-events-none"></div>

			{/* Top left corner with background */}
			<div className="absolute top-0.5 left-0.5 rounded-sm px-0.5 py-0.5 z-10">
				<div
					className={`text-xs font-black leading-none ${colorClass}`}>
					{rankDisplay}
				</div>
				<div
					className={`text-sm leading-none ${colorClass} font-semibold`}>
					{suitSymbol}
				</div>
			</div>

			{/* Center suit symbol */}
			<div
				className={`absolute inset-0 flex items-center justify-center ${colorClass} z-20`}>
				<div className="text-5xl font-bold">{suitSymbol}</div>
			</div>

			{/* Bottom right corner (upside down) with background */}
			<div className="absolute bottom-0.5 right-0.5  rounded-sm px-0.5 py-0.5 rotate-180 z-10">
				<div
					className={`text-xs font-black leading-none ${colorClass}`}>
					{rankDisplay}
				</div>
				<div
					className={`text-sm leading-none ${colorClass} font-semibold`}>
					{suitSymbol}
				</div>
			</div>
		</div>
	);
};

export default PlayingCard;
