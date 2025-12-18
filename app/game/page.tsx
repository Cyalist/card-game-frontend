"use client";

import React, { useState } from "react";
import GameBoard, { Card, Player } from "@/components/game/GameBoard";

const GameDemo = () => {
	const [playerCount, setPlayerCount] = useState<number>(4);

	// Sample deck of cards
	const createDeck = (): Card[] => {
		const suits: ("hearts" | "diamonds" | "clubs" | "spades")[] = ["hearts", "diamonds", "clubs", "spades"];
		const ranks: ("A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K")[] =
			["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

		const deck: Card[] = [];
		let id = 0;

		for (const suit of suits) {
			for (const rank of ranks) {
				deck.push({
					id: `card-${id++}`,
					suit,
					rank,
					faceDown: false,
				});
			}
		}

		return deck;
	};

	const initialDeck = createDeck();

	// Shuffle and deal cards
	const shuffleArray = <T,>(array: T[]): T[] => {
		const shuffled = [...array];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled;
	};

	// Function to create players dynamically
	const createPlayers = (count: number, deck: Card[]): Player[] => {
		const playerNames = [
			"You", "Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace"
		];

		const cardsPerPlayer = 5;
		const players: Player[] = [];

		for (let i = 0; i < count; i++) {
			const startIndex = i * cardsPerPlayer;
			const endIndex = startIndex + cardsPerPlayer;

			players.push({
				id: `player-${i + 1}`,
				name: playerNames[i],
				cards: deck.slice(startIndex, endIndex).map(card => ({
					...card,
					faceDown: i !== 0 // Only show first player's cards face up
				})),
				score: 0,
			});
		}

		return players;
	};

	const shuffledDeck = shuffleArray(initialDeck);

	// Deal cards to players
	const [players, setPlayers] = useState<Player[]>(createPlayers(playerCount, shuffledDeck));

	const [deck, setDeck] = useState<Card[]>(shuffledDeck.slice(playerCount * 5));
	const [communityCards, setCommunityCards] = useState<Card[]>([]);
	const [currentPlayerId, setCurrentPlayerId] = useState<string>("player-1");

	const handleCardPlay = (playerId: string, cardId: string) => {
		if (playerId !== currentPlayerId) return;

		setPlayers(prevPlayers => {
			return prevPlayers.map(player => {
				if (player.id === playerId) {
					const cardToPlay = player.cards.find(card => card.id === cardId);
					if (cardToPlay) {
						// Add card to community area
						setCommunityCards(prev => [...prev, { ...cardToPlay, faceDown: false }]);

						// Remove card from player's hand
						return {
							...player,
							cards: player.cards.filter(card => card.id !== cardId),
							score: (player.score || 0) + 1, // Simple scoring
						};
					}
				}
				return player;
			});
		});

		// Move to next player
		const currentIndex = players.findIndex(p => p.id === playerId);
		const nextIndex = (currentIndex + 1) % players.length;
		setCurrentPlayerId(players[nextIndex].id);
	};

	const handleCardDraw = (playerId: string) => {
		if (deck.length === 0) return;

		const drawnCard = deck[deck.length - 1];

		setDeck(prev => prev.slice(0, -1));

		setPlayers(prevPlayers => {
			return prevPlayers.map(player => {
				if (player.id === playerId) {
					return {
						...player,
						cards: [...player.cards, { ...drawnCard, faceDown: playerId === "player-1" }],
					};
				}
				return player;
			});
		});
	};

	const handlePlayerSelect = (playerId: string) => {
		console.log("Selected player:", playerId);
	};

	const resetGame = () => {
		const newShuffledDeck = shuffleArray(createDeck());
		const newPlayers = createPlayers(playerCount, newShuffledDeck);

		setPlayers(newPlayers);
		setDeck(newShuffledDeck.slice(playerCount * 5));
		setCommunityCards([]);
		setCurrentPlayerId("player-1");
	};

	const handlePlayerCountChange = (newCount: number) => {
		setPlayerCount(newCount);
		const newShuffledDeck = shuffleArray(createDeck());
		const newPlayers = createPlayers(newCount, newShuffledDeck);

		setPlayers(newPlayers);
		setDeck(newShuffledDeck.slice(newCount * 5));
		setCommunityCards([]);
		setCurrentPlayerId("player-1");
	};

	return (
		<div className="relative w-full h-screen">
			<GameBoard
				players={players}
				deck={deck}
				communityCards={communityCards}
				currentPlayerId={currentPlayerId}
				onCardPlay={handleCardPlay}
				onCardDraw={handleCardDraw}
				onPlayerSelect={handlePlayerSelect}
			/>

			{/* Game Controls */}
			<div className="absolute top-4 right-4 z-20">
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
					<h3 className="text-sm font-semibold text-black dark:text-zinc-50 mb-3">
						Controls
					</h3>
					<div className="space-y-3">
						<div>
							<label className="block text-xs font-medium text-black dark:text-zinc-50 mb-1">
								Players: {playerCount}
							</label>
							<select
								value={playerCount}
								onChange={(e) => handlePlayerCountChange(Number(e.target.value))}
								className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-black dark:text-zinc-50">
								<option value={1}>1 Player</option>
								<option value={2}>2 Players</option>
								<option value={3}>3 Players</option>
								<option value={4}>4 Players</option>
								<option value={5}>5 Players</option>
								<option value={6}>6 Players</option>
								<option value={7}>7 Players</option>
								<option value={8}>8 Players</option>
							</select>
						</div>
						<button
							onClick={resetGame}
							className="w-full px-3 py-2 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors">
							New Game
						</button>
					</div>
				</div>
			</div>

			{/* Instructions */}
			<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
				<div className="bg-black bg-opacity-75 text-white rounded-lg px-4 py-2 text-sm">
					<p>Click your cards to play them • Click the deck to draw • It's your turn!</p>
				</div>
			</div>
		</div>
	);
};

export default GameDemo;