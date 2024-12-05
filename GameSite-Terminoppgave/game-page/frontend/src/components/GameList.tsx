// src/GameList.tsx
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
    const [error, setError] = useState<string | null>(null); // State for error messages

    const fetchGames = async () => {
        try {
            const response = await axios.get('http://10.2.3.46:5000/api/games');
            setGames(response.data);
            setError(null); // Clear previous errors
        } catch (error) {
            console.error('Error fetching games:', error);
            setError('Failed to fetch games. Please try again later.'); // User-friendly error message
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGames();
    }, []);

    const likeGame = async (id: number) => {
        try {
            const response = await axios.post(`http://10.2.3.46:5000/api/games/${id}/like`);
            if (response.status !== 200) {
                throw new Error('Failed to like the game');
            }
            fetchGames(); // Refresh the game list
        } catch (error) {
            console.error('Error liking the game:', error);
            setError('Failed to like the game. Please try again.'); // User-friendly error message
        }
    };

    const downloadGame = async (id: number) => {
        try {
            const response = await axios.post(`http://10.2.3.46:5000/api/games/${id}/download`);
            if (response.status !== 200) {
                throw new Error('Failed to download the game');
            }
            fetchGames(); // Refresh the game list
        } catch (error) {
            console.error('Error downloading the game:', error);
            setError('Failed to download the game. Please try again.'); // User-friendly error message
        }
    };

    const commentGame = async (id: number, comment: string) => {
        try {
            const response = await axios.post(`http://10.2.3.46:5000/api/games/${id}/comments`, { comment });
            if (response.status !== 200) {
                throw new Error('Failed to add comment');
            }
            fetchGames(); // Refresh the game list
        } catch (error) {
            console.error('Error commenting on the game:', error);
            setError('Failed to add comment. Please try again.'); // User-friendly error message
        }
    };

    const openModal = (game: Game) => {
        setSelectedGame(game);
    };

    const closeModal = () => {
        setSelectedGame(null);
    };

    if (loading) {
        return <div>Loading...</div>; // Loading state
    }

    return (
        <div className="game-list">
            <h1>Games</h1>
            {error && <div className="error-message">{error}</div>} {/* Display error message if it exists */}
            <div className="game-boxes">
                {games.map((game) => (
                    <div key={game.id} className="game-box" onClick={() => openModal(game)}>
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
                        likeGame(selectedGame.id);
                        closeModal();
                    }}
                    onDownload={() => {
                        downloadGame(selectedGame.id);
                        closeModal();
                    }}
                    onComment={(comment: string) => {
                        commentGame(selectedGame.id, comment);
                        closeModal();
                    }}
                />
            )}
        </div>
    );
};

export default GameList;
