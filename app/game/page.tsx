"use client";

import React, { useState } from "react";
import GameBoard, { Card, Player } from "@/components/game/GameBoard";

const GameDemo = () => {
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

	const shuffledDeck = shuffleArray(initialDeck);

	// Deal cards to players
	const [players, setPlayers] = useState<Player[]>([
		{
			id: "player-1",
			name: "You",
			cards: shuffledDeck.slice(0, 5).map(card => ({ ...card, faceDown: false })),
			score: 0,
		},
		{
			id: "player-2",
			name: "Alice",
			cards: shuffledDeck.slice(5, 10).map(card => ({ ...card, faceDown: true })),
			score: 0,
		},
		{
			id: "player-3",
			name: "Bob",
			cards: shuffledDeck.slice(10, 15).map(card => ({ ...card, faceDown: true })),
			score: 0,
		},
	]);

	const [deck, setDeck] = useState<Card[]>(shuffledDeck.slice(15));
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
		const newPlayers = [
			{
				id: "player-1",
				name: "You",
				cards: newShuffledDeck.slice(0, 5).map(card => ({ ...card, faceDown: false })),
				score: 0,
			},
			{
				id: "player-2",
				name: "Alice",
				cards: newShuffledDeck.slice(5, 10).map(card => ({ ...card, faceDown: true })),
				score: 0,
			},
			{
				id: "player-3",
				name: "Bob",
				cards: newShuffledDeck.slice(10, 15).map(card => ({ ...card, faceDown: true })),
				score: 0,
			},
		];

		setPlayers(newPlayers);
		setDeck(newShuffledDeck.slice(15));
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
					<div className="space-y-2">
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