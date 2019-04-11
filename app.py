from flask import (Flask, render_template, request)
from flask_restful import Resource, Api
from sqlalchemy import create_engine
from json import dumps

# #Create a engine for connecting to SQLite3.
e = create_engine('sqlite:///rest.db')
app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')
@app.route('/graph.html')
def graph():
    return render_template('graph.html')
@app.route('/map.html')
def maps():
    return render_template('map.html')

# if __name__ == '__main__':
#     app.run(debug=True)    

api = Api(app)

class Rest(Resource):
    def get(self):
        #Connect to databse
        conn = e.connect()
        #Perform query and return JSON data
        query = conn.execute("select * from data")
        return {'data': [dict(zip(tuple (query.keys()) ,i)) for i in query.cursor.fetchall()]}

api.add_resource(Rest, '/data')

if __name__ == '__main__':
    app.run()
