from flask import Blueprint, request, jsonify
from sqlalchemy.orm import Session
from marshmallow import ValidationError
from app.models import Player, db
from app.extensions import ma
from app.utils.utils import token_required
from . import player_bp
from .schemas import player_schema, players_schema

#Get Players
@player_bp.route('/', methods=['GET'])
def get_players():
    with Session(db.engine) as session:
        players = session.query(Player).all()
        return jsonify(players_schema.dump(players))

#Get Specific Player
@player_bp.route('/<int:player_id>', methods=['GET'])
def get_player(player_id):
    with Session(db.engine) as session:
        player = session.get(Player, player_id)
        if player:
            return jsonify(player_schema.dump(player))
        return jsonify({'error': 'Player not found'}), 404


#Update Player
@player_bp.route('/', methods=['PUT'])
@token_required
def update_player():
    try:
        player_data = player_schema.load(request.json)
    except ValidationError as err:
                return jsonify({'errors': err.messages}), 400
    with Session(db.engine) as session:
        player = session.get(Player, request.user_id)
        
        if player:
            for field, value in player_data.items():
             setattr(player, field, value)
                
            session.commit()
            return jsonify(player_schema.dump(player))
            
        return jsonify({'error': 'Player not found'}), 404
    
#search player by name
@player_bp.route('/search', methods=['GET'])
def search_players():
    name_query = request.args.get('name').replace('-', ' ')

    if not name_query:
        return jsonify({'error': 'Name query parameter is required'}), 400

    with Session(db.engine) as session:
        players = session.query(Player).filter(Player.name.ilike(f"%{name_query}%")).all()
        return jsonify(players_schema.dump(players))
    
    


