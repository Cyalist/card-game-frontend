import Image from "next/image";
import PlayingCard from "@/components/game/PlayingCard";

export default function Home() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center py-16 px-8">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold mb-4 text-black dark:text-zinc-50">
						Card Game Project
					</h1>
					<p className="text-lg text-zinc-600 dark:text-zinc-400">
						French-suited playing cards component demo
					</p>
				</div>

				<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
					<h2 className="text-2xl font-semibold mb-6 text-center text-black dark:text-zinc-50">
						PlayingCard Component
					</h2>

					<div className="flex flex-wrap justify-center gap-8 mb-8">
						<div className="text-center">
							<div className="mb-2">
								<PlayingCard
									suit="hearts"
									rank="4"
								/>
							</div>
						</div>

						<div className="text-center">
							<div className="mb-2">
								<PlayingCard
									suit="diamonds"
									rank="7"
								/>
							</div>
						</div>

						<div className="text-center">
							<div className="mb-2">
								<PlayingCard
									suit="clubs"
									rank="2"
								/>
							</div>
						</div>

						<div className="text-center">
							<div className="mb-2">
								<PlayingCard
									suit="spades"
									rank="10"
								/>
							</div>
						</div>
					</div>

					<div className="border-t pt-6">
						<h3 className="text-lg font-medium mb-4 text-center text-black dark:text-zinc-50">
							Face-down cards
						</h3>
						<div className="flex justify-center gap-4">
							<PlayingCard
								suit="hearts"
								rank="7"
								faceDown
							/>
							<PlayingCard
								suit="spades"
								rank="10"
								faceDown
							/>
							<PlayingCard
								suit="diamonds"
								rank="3"
								faceDown
							/>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
