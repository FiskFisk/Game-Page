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
    Divider,
    Box,
} from '@mui/material';

interface Game {
    id: number;
    name: string;
    likes: number;
    downloads: number;
    comments: string[]; // List of comments
    liked: boolean; // Track whether the user liked the game
}

interface GameModalProps {
    game: Game;
    onClose: () => void;
    onLike: () => void;
    onDownload: () => void;
    onComment: (comment: string) => void;
    username: string | null; // Add username prop
}

const GameModal: React.FC<GameModalProps> = ({ game, onClose, onLike, onDownload, onComment, username }) => {
    const [comment, setComment] = useState('');

    const handleCommentSubmit = () => {
        if (comment.trim()) {
            // Include the username in the comment
            onComment(`${username} : ${comment}`); // Add username to the comment
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
                <Box display="flex" justifyContent="space-between" marginBottom={2}>
                    <Button variant="contained" color="primary" onClick={onLike}>
                        {game.liked ? '❤️' : '🤍'} {/* Filled or empty heart based on likes */}
                    </Button>
                    <Button variant="contained" color="secondary" onClick={onDownload}>
                        Download
                    </Button>
                </Box>

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
                <Button variant="contained" color="primary" onClick={handleCommentSubmit} style={{ marginBottom: '16px' }}>
                    Comment
                </Button>

                {/* Comments display */}
                <Typography variant="h6" style={{ marginTop: '16px' }}>Comments:</Typography>
                <List>
                    {game.comments.slice().reverse().map((c, index) => (
                        <div key={index}>
                            <ListItem>
                                <Typography variant="body2" style={{ whiteSpace: 'pre-wrap' }}>{c}</Typography> {/* Display the full comment */}
                            </ListItem>
                            {index < game.comments.length - 1 && <Divider />} {/* Add a divider between comments */}
                        </div>
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
