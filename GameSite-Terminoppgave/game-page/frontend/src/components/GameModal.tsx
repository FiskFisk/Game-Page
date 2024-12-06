import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
    List,
    ListItem,
} from '@mui/material';

interface Game {
    id: number;
    name: string;
    likes: number;
    downloads: number;
    comments: string[];
    liked: boolean; // Track whether the user liked the game
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
            setComment('');
        }
    };

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>{game.name}</DialogTitle>
            <DialogContent>
                <Typography variant="body1">Likes: {game.likes}</Typography>
                <Typography variant="body1">Downloads: {game.downloads}</Typography>

                {/* Action buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <Button variant="contained" color="primary" onClick={onLike}>
                        {game.liked ? '❤️' : '🤍'} {/* Filled or empty heart based on likes */}
                    </Button>
                    <Button variant="contained" color="secondary" onClick={onDownload}>
                        Download
                    </Button>
                </div>

                {/* Comment input area */}
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    placeholder="Enter your comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    margin="normal"
                />
                <Button variant="contained" color="primary" onClick={handleCommentSubmit}>
                    Comment
                </Button>

                {/* Comments display */}
                <Typography variant="h6" style={{ marginTop: '16px' }}>Comments:</Typography>
                <List>
                    {game.comments.slice().reverse().map((c, index) => (
                        <ListItem key={index}>
                            <Typography>{c}</Typography>
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default GameModal;
