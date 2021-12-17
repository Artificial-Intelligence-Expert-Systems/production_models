import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from models import Fact, Session, Production


@app.route("/api/fact/create/<fact_name>")
def create_fact(fact_name):
    try:
        fact = Fact(name=fact_name)
        db.session.add(fact)
        db.session.commit()
        return jsonify(fact.serialize())
    except Exception as e:
        return(str(e))


@app.route("/api/production/create")
def create_productions():
    try:
        session = Session()
        db.session.add(session)
        db.session.commit()

        productions = request.get_json()
        for condition, conclusion in productions:
            new_production = Production(condition=condition, conclusion=conclusion, session_id=session.id)
            db.session.add(production)
            db.session.commit()

        return jsonify(session.serialize())
    except Exception as e:
        return(str(e))


@app.route("/api/<session_id>/get_conclusions")
def get_conclusions(session_id):
    try:
        known_facts = request.get_json()
        all_processed_facts = list(set(known_facts)).slice()
        conclusions = {}

        # Крутим цикл пока есть необработанные нам известные факты
        while len(known_facts):
            fact = known_facts.pop(0)
            # Достаем все факты по условию
            productions = Production.query.filter_by(session_id=session_id, condition=fact).all()

            # Так как на одно условие может быть несколько фактов, пробегаемся по им всем
            for result in productions:
                # Добавлем соответсвие Условие - Факт в результат
                conclusions[fact] = result.conclusion

                # Чтобы не было рекурсии, проверям, что факт еще не был обработан
                #     и в этом случае добавляем его в массив известных на данный момент фактов
                if result.conclusion not in all_processed_facts:
                    known_facts.append(result.conclusion)

        return jsonify(conclusions)
    except Exception as e:
        return(str(e))

if __name__ == '__main__':
    app.run()
