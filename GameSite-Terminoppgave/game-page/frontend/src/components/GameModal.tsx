// src/GameModal.tsx
import React, { useState } from 'react';

interface Game {
    id: number;
    name: string;
    likes: number;
    downloads: number;
    comments: string[];
}

interface GameModalProps {
    game: Game;
    onClose: () => void;
    onLike: () => void;
    onDownload: () => void;
    onComment: (comment: string) => void;
}

const GameModal: React.FC<GameModalProps> = ({ game, onClose, onLike, onDownload, onComment }) => {
    const [comment, setComment] = useState('');

    const handleCommentSubmit = () => {
        if (comment.trim()) {
            onComment(comment);
            setComment(''); // Clear the input after submitting
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{game.name}</h2>
                <p>Likes: {game.likes}</p>
                <p>Downloads: {game.downloads}</p>

                {/* Like and Download buttons */}
                <div className="action-buttons">
                    <button onClick={onLike} className="like-button">
                        {game.likes ? '❤️' : '🤍'} {/* Filled or empty heart based on likes */}
                    </button>
                    <button onClick={onDownload} className="download-button">Download</button>
                </div>

                {/* Comment input area */}
                <div className="comment-section">
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Enter your comment..."
                    />
                    <button onClick={handleCommentSubmit}>Comment</button>
                </div>

                {/* Comments display */}
                <div className="comments-display">
                    <h3>Comments:</h3>
                    <ul>
                        {game.comments.slice().reverse().map((c, index) => ( // Reverse order for newest comments on top
                            <li key={index}>{c}</li>
                        ))}
                    </ul>
                </div>

                <button onClick={onClose} className="close-button">Close</button>
            </div>
        </div>
    );
};

export default GameModal;
