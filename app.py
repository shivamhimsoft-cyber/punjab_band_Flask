from flask import Flask, render_template
from config import config
import os

def create_app(config_name='default'):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    
    # Register blueprints/routes here if multi-page
    @app.route('/')
    @app.route('/index')
    def index():
        return render_template('index.html')
    
    @app.route('/booking')
    def booking():
        return render_template('index.html')  # Redirect to #booking section
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return render_template('404.html'), 404  # Add 404.html if needed
    
    @app.errorhandler(500)
    def internal_error(error):
        return "Internal Server Error", 500
    
    return app

app = create_app(os.getenv('FLASK_CONFIG') or 'default')

if __name__ == '__main__':
    app.run(debug=app.config['DEBUG'], host='0.0.0.0', port=5000)