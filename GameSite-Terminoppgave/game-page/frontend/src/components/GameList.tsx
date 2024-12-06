import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GameModal from './GameModal';

interface Game {
    id: number;
    name: string;
    likes: number;
    downloads: number;
    comments: string[];
}

const GameList: React.FC = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchGames = async () => {
        try {
            const response = await axios.get('http://10.2.3.46:5000/api/games');
            setGames(response.data);
            setError(null); // Clear any previous error
        } catch (err) {
            console.error('Error fetching games:', err);
            setError('Failed to fetch games. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGames();
    }, []);

    const handleGameAction = async (
        action: 'like' | 'download' | 'comment',
        id: number,
        comment?: string
    ) => {
        try {
            const url =
                action === 'comment'
                    ? `http://10.2.3.46:5000/api/games/${id}/comments`
                    : `http://10.2.3.46:5000/api/games/${id}/${action}`;
            const payload = action === 'comment' ? { comment } : {};
            const response = await axios.post(url, payload);

            if (response.status !== 200) {
                throw new Error(`Failed to ${action} the game`);
            }

            fetchGames(); // Refresh the game list
        } catch (err) {
            console.error(`Error handling ${action} action:`, err);
            setError(`Failed to ${action} the game. Please try again.`);
        }
    };

    const openModal = (game: Game) => setSelectedGame(game);

    const closeModal = () => setSelectedGame(null);

    if (loading) {
        return <div>Loading...</div>; // Loading state
    }

    return (
        <div className="game-list">
            <h1>Games</h1>
            {error && <div className="error-message">{error}</div>} {/* Error message */}
            <div className="game-boxes">
                {games.map((game) => (
                    <div
                        key={game.id}
                        className="game-box"
                        onClick={() => openModal(game)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && openModal(game)} // Accessibility improvement
                    >
                        <h2>{game.name}</h2>
                        <p>Likes: {game.likes}</p>
                        <p>Downloads: {game.downloads}</p>
                    </div>
                ))}
            </div>
            {selectedGame && (
                <GameModal
                    game={selectedGame}
                    onClose={closeModal}
                    onLike={() => {
                        handleGameAction('like', selectedGame.id);
                        closeModal();
                    }}
                    onDownload={() => {
                        handleGameAction('download', selectedGame.id);
                        closeModal();
                    }}
                    onComment={(comment: string) => {
                        handleGameAction('comment', selectedGame.id, comment);
                        closeModal();
                    }}
                />
            )}
        </div>
    );
};

export default GameList;
