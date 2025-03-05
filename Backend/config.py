class DevelopmentConfig:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///dev.db'
    DEBUG = True
    FLASK_APP = "app.py"