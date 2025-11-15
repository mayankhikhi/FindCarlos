# This file is the entry point for WSGI servers like Gunicorn.
# It simply imports the 'app' object from your main 'app.py' file.

from app import app as application

if __name__ == "__main__":
    application.run()
