from flask import Flask, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import bcrypt

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///games.db'  # Use SQLite for development
app.secret_key = 'your_secret_key'  # Set a secret key for session management
db = SQLAlchemy(app)
CORS(app, supports_credentials=True)  # Enable CORS to allow cross-origin requests

# Define the User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

# Define the Game model
class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    likes = db.Column(db.Integer, default=0)
    downloads = db.Column(db.Integer, default=0)
    comments = db.relationship('Comment', backref='game', lazy=True)

# Define the Comment model
class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('game.id'), nullable=False)
    content = db.Column(db.String(200), nullable=False)

# Route to register a new user
@app.route('/api/register', methods=['POST'])
def register():
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')

    if not username or not email or not password:
        return jsonify({"message": "Missing fields!"}), 400

    if User.query.filter((User.username == username) | (User.email == email)).first():
        return jsonify({"message": "User already exists!"}), 409

    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    new_user = User(username=username, email=email, password=hashed.decode('utf-8'))
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully!"}), 201

# Route to login a user
@app.route('/api/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    user = User.query.filter_by(username=username).first()

    if user and bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        session['user_id'] = user.id
        return jsonify({"message": "Login successful!"}), 200
    
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
        'comments': [comment.content for comment in game.comments]
    } for game in games])

# Route to like a game
@app.route('/api/games/<int:game_id>/like', methods=['POST'])
def like_game(game_id):
    game = Game.query.get_or_404(game_id)
    game.likes += 1
    db.session.commit()
    return jsonify(message="Game liked!")

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
