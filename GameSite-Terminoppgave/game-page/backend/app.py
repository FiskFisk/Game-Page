from flask import Flask, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import bcrypt

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///games.db'  # Use SQLite for development
app.secret_key = 'your_secret_key'  # Set a secret key for session management
db = SQLAlchemy(app)

# Enable CORS to allow cross-origin requests
CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "http://10.2.3.46:3000"}})

# Define the User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    likes = db.relationship('Like', backref='user', lazy=True)  # Relationship for likes

# Define the Game model
class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    likes = db.Column(db.Integer, default=0)
    downloads = db.Column(db.Integer, default=0)
    comments = db.relationship('Comment', backref='game', lazy=True)
    liked_by = db.relationship('Like', backref='game', lazy=True)  # Relationship for likes

# Define the Comment model
class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('game.id'), nullable=False)
    content = db.Column(db.String(200), nullable=False)

# Define the Like model
class Like(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey('game.id'), nullable=False)

# Route to register a new user
@app.route('/api/register', methods=['POST'])
def register():
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')

    if not username or not email or not password:
        return jsonify({"message": "All fields are required!"}), 400

    if User.query.filter((User.username == username) | (User.email == email)).first():
        return jsonify({"message": "User already exists!"}), 409

    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    new_user = User(username=username, email=email, password=hashed.decode('utf-8'))
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully!", "username": new_user.username}), 201

# Route to login a user
@app.route('/api/login', methods=['POST'])
def login():
    email = request.json.get('email')  # Changed to email
    password = request.json.get('password')

    user = User.query.filter_by(email=email).first()  # Authenticate by email

    if user and bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        session['user_id'] = user.id
        return jsonify({"message": "Login successful!", "username": user.username}), 200
    
    return jsonify({"message": "Invalid credentials!"}), 401

# Route to logout a user
@app.route('/api/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)  # Remove user ID from session
    return jsonify({"message": "Logout successful!"}), 200

# Route to get the list of games
@app.route('/api/games', methods=['GET'])
def get_games():
    games = Game.query.all()
    return jsonify([{
        'id': game.id,
        'name': game.name,
        'likes': game.likes,
        'downloads': game.downloads,
        'comments': [comment.content for comment in game.comments],
        'liked': any(like.user_id == session.get('user_id') for like in game.liked_by)  # Check if user liked the game
    } for game in games])

# Route to like or unlike a game
@app.route('/api/games/<int:game_id>/like', methods=['POST'])
def like_game(game_id):
    game = Game.query.get_or_404(game_id)
    user_id = session.get('user_id')

    if not user_id:
        return jsonify({"message": "You need to be logged in to like a game."}), 401

    # Check if the user already liked the game
    existing_like = Like.query.filter_by(game_id=game.id, user_id=user_id).first()

    if existing_like:
        db.session.delete(existing_like)  # Unlike the game
        game.likes -= 1
        message = "Game unliked!"
    else:
        new_like = Like(user_id=user_id, game_id=game.id)
        db.session.add(new_like)  # Like the game
        game.likes += 1
        message = "Game liked!"

    db.session.commit()
    return jsonify(message=message)

# Route to download a game
@app.route('/api/games/<int:game_id>/download', methods=['POST'])
def download_game(game_id):
    game = Game.query.get_or_404(game_id)
    game.downloads += 1
    db.session.commit()
    return jsonify(message="Game downloaded!")

# Route to add a comment to a game
@app.route('/api/games/<int:game_id>/comments', methods=['POST'])
def comment_game(game_id):
    game = Game.query.get_or_404(game_id)
    data = request.json
    comment_content = data.get('comment')

    if not comment_content:
        return jsonify({"message": "Comment cannot be empty!"}), 400

    comment = Comment(content=comment_content, game=game)
    db.session.add(comment)
    db.session.commit()
    return jsonify(message="Comment added!")

# Route to check current user
@app.route('/api/current_user', methods=['GET'])
def current_user():
    if 'user_id' in session:
        user = User.query.get(session['user_id'])
        return jsonify({"username": user.username}), 200
    return jsonify({"message": "User not logged in!"}), 401

# Run the app
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create database tables

        # Add sample data (if the database is empty)
        if not Game.query.first():
            sample_games = [
                Game(name='Game One'),
                Game(name='Game Two'),
                Game(name='Game Three')
            ]
            db.session.add_all(sample_games)
            db.session.commit()

    app.run(host='0.0.0.0', port=5000, debug=True)  # Run the app on all interfaces
