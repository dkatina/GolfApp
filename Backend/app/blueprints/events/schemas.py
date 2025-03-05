
from xml.etree.ElementInclude import include
from app.models import Event
from app.extensions import ma


class EventSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Event
        include_fk = True
        load_instance = True

event_schema = EventSchema()
events_schema = EventSchema(many=True)