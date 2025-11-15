Find Carlos! 🐢"Find Carlos!" is a multi-level "Where's Waldo"-style web game. The user is presented with a series of large, busy ocean-themed images and must find Carlos the turtle, who is hiding somewhere in each one.This project was built as a class project, demonstrating a full-stack application with a Python-based backend API and an interactive JavaScript frontend.✨ Features3 Unique Levels: Hunt for Carlos across three different, full-size ocean images.Dynamic API Backend: A Python/Flask server handles all game logic, keeping the "answer" coordinates secret.Interactive Frontend: A clean, themed UI built with Tailwind CSS and vanilla JavaScript that responds to user clicks.Level Completion Popups: After finding Carlos, a popup appears showing the time taken for that level.Final "Win" Screen: A humorous "Thank You" page congratulates the user on reuniting Carlos with his mother.Custom Zoom Handling: The frontend is set to a default 67% zoom and includes the necessary coordinate correction logic to ensure click accuracy.🛠️ Tech StackBackend:Python 3Flask: For the webserver and API endpoints.Flask-CORS: To allow the frontend (on a file:// URL) to communicate with the backend server.Frontend:HTML5Tailwind CSS: For all styling, loaded via a CDN.Vanilla JavaScript (ES6+): For all game logic, DOM manipulation, and fetch calls to the API.🚀 How to Run This ProjectTo get the game running, you need to start the backend server and then open the frontend game file.1. Backend Setup (The Server)Navigate to the project folder:cd /path/to/FindCarlos
(Optional but Recommended) Create a virtual environment:python3 -m venv venv
source venv/bin/activate  
# On Windows, use: venv\Scripts\activate
Install the required Python libraries:(This fixes the ModuleNotFoundError for flask)pip install flask flask-cors
Run the Flask server:python app.py
Your terminal should now say Starting 'Find Carlos!' server at http://127.0.0.1:5000. Leave this terminal running.2. Frontend Setup (The Game)Open the game: With the server running, just double-click the index.html file to open it in your default web browser (like Chrome or Firefox).The game will load, fetch the level 1 data from your running server, and you can start playing!⚙️ How to Configure LevelsAll game levels (images and answers) are stored in the app.py file in the GAME_DATA dictionary.To add or change a level, you must:Update the image_url: Find a new image and add its URL.Update the target_box: This is the most important step.Open your new image in an editor (like GIMP, Photoshop, or even MS Paint).Move your mouse over your target (Carlos).Find the top-left (x1, y1) coordinates and the bottom-right (x2, y2) coordinates that form a small box around him.Update the target_box values in app.py with these new, 100%-scale coordinates.Example GAME_DATA structure in app.py:GAME_DATA = {
    "1": {
        "image_url": "[https://your-level-1-image.jpg](https://your-level-1-image.jpg)",
        "target_box": {"x1": 300, "y1": 450, "x2": 350, "y2": 480}
    },
    "2": {
        "image_url": "[https://your-level-2-image.jpg](https://your-level-2-image.jpg)",
        "target_box": {"x1": 800, "y1": 600, "x2": 850, "y2": 650}
    },
    "3": {
        "image_url": "[https://your-level-3-image.jpg](https://your-level-3-image.jpg)",
        "target_box": {"x1": 100, "y1": 100, "x2": 150, "y2": 150}
    }
}
🌐 API EndpointsThis project uses two simple API endpoints:GET /api/get_level_data/<level_num>Fetches the public data for a given level (image URL and total levels).POST /api/checkChecks a user's click against the secret answer.Expects JSON: {"x": <num>, "y": <num>, "level": <num>}Returns JSON: {"result": "hit"} or {"result": "miss"}
