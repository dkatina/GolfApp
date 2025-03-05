from marshmallow import ValidationError
from sqlalchemy.orm import Session
from flask import request, jsonify
from app.blueprints.players.schemas import players_schema
from app.models import Event, Player, db, EventPlayers
from app.extensions import ma
from app.utils.utils import token_required
from .schemas import event_schema, events_schema
from . import event_bp

#GET ALL EVENTS
@event_bp.route('/', methods=['GET'])
def get_events():
    with Session(db.engine) as session:
        events = session.query(Event).all()
        return jsonify(events_schema.dump(events))
    
#GET SPECIFIC EVENT
@event_bp.route('/<int:event_id>', methods=['GET'])
def get_event(event_id):
    with Session(db.engine) as session:
        event = session.get(Event, event_id)
        if event:
            return jsonify(event_schema.dump(event))
        return jsonify({'error': 'Event not found'}), 404

#CREATE AN EVENT
@event_bp.route('/', methods=['POST'])
@token_required
def create_event():
    data = request.json
    try:
        data['owner_id'] = request.user_id
        new_event = event_schema.load(data)
        with Session(db.engine) as session:
            session.add(new_event)
            session.commit()
            new_event_player = EventPlayers(player_id=request.user_id, event_id=new_event.id, invite_accepted=True, event_score=0)
            session.add(new_event_player)
            session.commit()
            return jsonify(event_schema.dump(new_event)), 201
    except ValidationError as err:
        return jsonify({'errors': err.messages}), 400

#UPDATE EVENT
@event_bp.route('/<int:event_id>', methods=['PUT'])
@token_required
def update_event(event_id):
    data = request.json
    with Session(db.engine) as session:
        event = session.get(Event, event_id)
        if event:
            if event.owner_id != request.user_id:
                return jsonify({'error': 'Unauthorized'}), 403
            try:
                event = event_schema.load(data, instance=event, partial=True)
                session.commit()
                return jsonify(event_schema.dump(event))
            except ValidationError as err:
                return jsonify({'errors': err.messages}), 400
        return jsonify({'error': 'Event not found'}), 404

#DELETE EVENT
@event_bp.route('/<int:event_id>', methods=['DELETE'])
@token_required
def delete_event(event_id):
    with Session(db.engine) as session:
        event = session.get(Event, event_id)
        if event:
            if event.owner_id != request.user_id:
                return jsonify({'error': 'Unauthorized'}), 403
            session.delete(event)
            session.commit()
            return jsonify({'message': 'Event deleted'})
        return jsonify({'error': 'Event not found'}), 404
    

#MY EVENTS
@event_bp.route('/my-events', methods=['GET'])
@token_required
def get_my_events():
    with Session(db.engine) as session:
        my_events = session.query(Event).join(Event.event_players).filter_by(player_id=request.user_id).all()
        return jsonify(events_schema.dump(my_events))
    


@event_bp.route('/<int:event_id>/players', methods=['GET'])
@token_required
def event_players(event_id):
    with Session(db.engine) as session:
        event_players = session.query(Player).join(Player.event_players).filter_by(event_id=event_id).all()
        return jsonify(players_schema.dump(event_players))
    