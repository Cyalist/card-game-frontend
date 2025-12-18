import React, { useState } from "react";
import PlayingCard, { Suit, Rank, PlayingCardProps } from "./PlayingCard";

export interface Card {
	id: string;
	suit: Suit;
	rank: Rank;
	faceDown?: boolean;
}

export interface Player {
	id: string;
	name: string;
	cards: Card[];
	score?: number;
	isCurrentPlayer?: boolean;
}

export interface GameBoardProps {
	players: Player[];
	deck?: Card[];
	communityCards?: Card[];
	currentPlayerId?: string;
	onCardPlay?: (playerId: string, cardId: string) => void;
	onCardDraw?: (playerId: string) => void;
	onPlayerSelect?: (playerId: string) => void;
	className?: string;
}

const GameBoard: React.FC<GameBoardProps> = ({
	players,
	deck = [],
	communityCards = [],
	currentPlayerId,
	onCardPlay,
	onCardDraw,
	onPlayerSelect,
	className = "",
}) => {
	const [selectedCard, setSelectedCard] = useState<string | null>(null);

	const handleCardClick = (playerId: string, cardId: string, card: Card) => {
		if (card.faceDown) return;

		if (selectedCard === cardId) {
			setSelectedCard(null);
		} else {
			setSelectedCard(cardId);
			if (onCardPlay && playerId === currentPlayerId) {
				onCardPlay(playerId, cardId);
			}
		}
	};

	const handleDeckClick = () => {
		if (onCardDraw && currentPlayerId) {
			onCardDraw(currentPlayerId);
		}
	};

	const renderPlayerArea = (
		player: Player,
		position: "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right",
	) => {
		const isCurrentPlayer = player.id === currentPlayerId;
		const positionClasses = {
			top: "top-4 left-1/2 transform -translate-x-1/2",
			bottom: "bottom-4 left-1/2 transform -translate-x-1/2",
			left: "left-4 top-1/2 transform -translate-y-1/2",
			right: "right-4 top-1/2 transform -translate-y-1/2",
			"top-left": "top-12 left-12",
			"top-right": "top-12 right-12",
			"bottom-left": "bottom-12 left-12",
			"bottom-right": "bottom-12 right-12",
		};

		const cardOrientation =
			position === "left" || position === "right" || position === "top-left" || position === "top-right" || position === "bottom-left" || position === "bottom-right"
				? "vertical"
				: "horizontal";

		return (
			<div
				className={`absolute ${positionClasses[position]} z-10 ${
					isCurrentPlayer ? "ring-2 ring-blue-500 ring-offset-2" : ""
				}`}
				onClick={() => onPlayerSelect?.(player.id)}>
				{/* Player Info */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 mb-2 min-w-[120px]">
					<div className="text-sm font-semibold text-black dark:text-zinc-50">
						{player.name}
					</div>
					<div className="text-xs text-zinc-600 dark:text-zinc-400">
						{player.cards.length} cards
					</div>
					{player.score !== undefined && (
						<div className="text-xs font-medium text-blue-600 dark:text-blue-400">
							Score: {player.score}
						</div>
					)}
					{isCurrentPlayer && (
						<div className="text-xs font-medium text-green-600 dark:text-green-400">
							Current Turn
						</div>
					)}
				</div>

				{/* Player's Cards */}
				<div
					className={`flex ${
						cardOrientation === "vertical" ? "flex-col" : "flex-row"
					} gap-1`}>
					{player.cards.map((card) => (
						<PlayingCard
							key={card.id}
							suit={card.suit}
							rank={card.rank}
							faceDown={
								card.faceDown || player.id !== currentPlayerId
							}
							className={
								selectedCard === card.id && isCurrentPlayer
									? "ring-2 ring-yellow-400 ring-offset-1"
									: ""
							}
							onClick={() =>
								handleCardClick(player.id, card.id, card)
							}
						/>
					))}
				</div>
			</div>
		);
	};

	const renderDeck = () => {
		return (
			<div className="absolute bottom-1/2 right-8 transform translate-y-1/2 z-10">
				<div className="text-center mb-2">
					<div className="text-sm font-medium text-black dark:text-zinc-50 mb-1">
						Deck
					</div>
					<div className="text-xs text-zinc-600 dark:text-zinc-400">
						{deck.length} cards
					</div>
				</div>
				<div className="relative">
					{/* Stack effect for deck */}
					<div className="absolute inset-0">
						{deck.slice(-3).map((_, index) => (
							<div
								key={index}
								className="absolute bg-gradient-to-br from-blue-900 to-blue-950 border border-gray-800 rounded-lg shadow-lg"
								style={{
									width: "64px",
									height: "96px",
									top: `${index * 2}px`,
									left: `${index * 2}px`,
									zIndex: 3 - index,
								}}
							/>
						))}
					</div>
					{deck.length > 0 ? (
						<PlayingCard
							suit={deck[deck.length - 1].suit}
							rank={deck[deck.length - 1].rank}
							faceDown
							className="relative cursor-pointer transition-transform hover:scale-105 z-10"
							onClick={handleDeckClick}
						/>
					) : (
						<div className="relative w-16 h-24 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center">
							<div className="text-xs text-zinc-500 text-center">
								Empty
							</div>
						</div>
					)}
				</div>
			</div>
		);
	};

	const renderCommunityArea = () => {
		return (
			<div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-center z-10">
				<div className="bg-green-700 dark:bg-green-800 rounded-xl shadow-inner p-8 min-h-[200px] min-w-[400px]">
					<div className="text-center mb-4">
						<div className="text-white font-semibold text-sm">
							Play Area
						</div>
					</div>
					<div className="flex flex-wrap justify-center gap-2 min-h-[120px]">
						{communityCards.length === 0 ? (
							<div className="flex items-center justify-center text-green-600 text-sm opacity-50">
								No cards in play
							</div>
						) : (
							communityCards.map((card) => (
								<PlayingCard
									key={card.id}
									suit={card.suit}
									rank={card.rank}
									faceDown={card.faceDown}
									className="transform hover:scale-105 transition-transform"
								/>
							))
						)}
					</div>
				</div>
			</div>
		);
	};

	return (
		<div
			className={`relative w-full h-screen bg-green-800 dark:bg-green-900 overflow-hidden ${className}`}>
			{/* Table texture */}
			<div className="absolute inset-0 bg-gradient-to-br from-green-700 via-green-800 to-green-900 opacity-50"></div>

			{/* Table pattern */}
			<div className="absolute inset-0 opacity-10">
				<div
					className="h-full w-full"
					style={{
						backgroundImage:
							"radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
						backgroundSize: "20px 20px",
					}}></div>
			</div>

			{/* Community Area */}
			{renderCommunityArea()}

			{/* Players positioned around the table */}
			{players.map((player, index) => {
				let position: "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right";

				if (players.length === 1) {
					position = "bottom";
				} else if (players.length === 2) {
					position = index === 0 ? "bottom" : "top";
				} else if (players.length === 3) {
					position =
						index === 0 ? "bottom" : index === 1 ? "left" : "right";
				} else if (players.length === 4) {
					switch (index) {
						case 0:
							position = "bottom";
							break;
						case 1:
							position = "left";
							break;
						case 2:
							position = "top";
							break;
						case 3:
							position = "right";
							break;
						default:
							position = "bottom";
							break;
					}
				} else if (players.length === 5) {
					switch (index) {
						case 0:
							position = "bottom";
							break;
						case 1:
							position = "left";
							break;
						case 2:
							position = "top";
							break;
						case 3:
							position = "right";
							break;
						case 4:
							position = "bottom-left";
							break;
						default:
							position = "bottom";
							break;
					}
				} else if (players.length === 6) {
					switch (index) {
						case 0:
							position = "bottom";
							break;
						case 1:
							position = "bottom-left";
							break;
						case 2:
							position = "left";
							break;
						case 3:
							position = "top";
							break;
						case 4:
							position = "right";
							break;
						case 5:
							position = "bottom-right";
							break;
						default:
							position = "bottom";
							break;
					}
				} else if (players.length === 7) {
					switch (index) {
						case 0:
							position = "bottom";
							break;
						case 1:
							position = "bottom-left";
							break;
						case 2:
							position = "left";
							break;
						case 3:
							position = "top-left";
							break;
						case 4:
							position = "top";
							break;
						case 5:
							position = "right";
							break;
						case 6:
							position = "bottom-right";
							break;
						default:
							position = "bottom";
							break;
					}
				} else { // 8 players
					switch (index) {
						case 0:
							position = "bottom";
							break;
						case 1:
							position = "bottom-left";
							break;
						case 2:
							position = "left";
							break;
						case 3:
							position = "top-left";
							break;
						case 4:
							position = "top";
							break;
						case 5:
							position = "top-right";
							break;
						case 6:
							position = "right";
							break;
						case 7:
							position = "bottom-right";
							break;
						default:
							position = "bottom";
							break;
					}
				}

				return (
					<div key={player.id}>
						{renderPlayerArea(player, position)}
					</div>
				);
			})}

			{/* Deck */}
			{renderDeck()}

			{/* Game Controls */}
			<div className="absolute top-4 left-4 z-20">
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
					<div className="text-sm font-semibold text-black dark:text-zinc-50 mb-2">
						Game Status
					</div>
					<div className="text-xs text-zinc-600 dark:text-zinc-400">
						{currentPlayerId ? (
							<span>
								Current:{" "}
								{
									players.find(
										(p) => p.id === currentPlayerId,
									)?.name
								}
							</span>
						) : (
							<span>Waiting to start...</span>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default GameBoard;
