from app import db
from scipy.stats import beta
import numpy as np

class Session(db.Model):
    __tablename__ = 'session'

    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, default="NOW()")

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def serialize(self):
        return {
            'id': self.id,
            'timestamp': self.timestamp
        }

class Fact(db.Model):
    __tablename__ = 'fact'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<id {}>'.format(self.id)
    
    def serialize(self):
        return {
            'id': self.id, 
            'name': self.name
        }


class Production(db.Model):
    __tablename__ = 'production'

    id = db.Column(db.Integer, primary_key=True)
    condition = db.Column(db.Integer, db.ForeignKey('fact.id'), nullable=False)
    conclusion = db.Column(db.Integer, db.ForeignKey('fact.id'), nullable=False)
    session_id = db.Column(db.Integer, db.ForeignKey('session.id'), nullable=False)

    def __init__(self, condition, conclusion, session_id):
        self.condition = condition
        self.conclusion = conclusion
        self.session_id = session_id

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def serialize(self):
        return {
            'id': self.id, 
            'condition': self.condition,
            'conclusion': self.conclusion,
            'session_id': self.session_id
        }
