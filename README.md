# Find Carlos! 🐢

"Find Carlos!" is a multi-level "Where's Waldo"-style web game. The user is presented with a series of large, busy ocean-themed images and must find Carlos the turtle, who is hiding somewhere in each one.

---

## 🚀 Getting Started

### 1. Backend Setup (Flask Server)

**(Optional but Recommended) Create a virtual environment:**
```bash
python3 -m venv venv
source venv/bin/activate
# On Windows, use:
venv\Scripts\activate
```

**Install the required Python libraries:**
> This fixes the `ModuleNotFoundError` for flask.
```bash
pip install flask flask-cors
```

**Run the Flask server:**
```bash
python app.py
```
Your terminal should now say:

```
Starting 'Find Carlos!' server at http://127.0.0.1:5000
```

Leave this terminal running.

---

### 2. Frontend Setup (The Game)

**Open the game:**  
With the server running, just double-click on `index.html` (or open it in your browser). The game will connect with your Flask backend automatically.

---

## 🖼️ Level Data Structure

Here's an example of how level data is structured:

```json
{
    "1": {
        "image_url": "/static/1.jpg",
        "target_box": {"x1": 887, "y1": 406, "x2": 1205, "y2": 567}
    },
    "2": {
        "image_url": "/static/2.jpg",
        "target_box": {"x1": 120, "y1": 505, "x2": 297, "y2": 583}
    },
    "3": {
        "image_url": "/static/3.jpg",
        "target_box": {"x1": 890, "y1": 419, "x2": 1148, "y2": 556}
    }
}
```

---

## 🌐 API Endpoints

This project uses two simple API endpoints:

### `GET /api/get_level_data/<level_num>`
- Fetches the public data for a given level (image URL and total levels).

### `POST /api/check`
- Checks a user's click coordinates to see if Carlos was found.

---


Enjoy the game and happy Carlos hunting!
