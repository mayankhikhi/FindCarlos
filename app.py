from flask import Flask, jsonify, request
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)

GAME_DATA = {
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
TOTAL_LEVELS = len(GAME_DATA)

@app.route("/api/get_level_data/<level_num>", methods=["GET"])
def get_level_data(level_num):
    """
    Sends the frontend the *public* data for a level (just the image URL).
    """
    level_data = GAME_DATA.get(level_num)

    if not level_data:
        return jsonify({"error": "Invalid level"}), 404

    return jsonify({
        "level": level_num,
        "image_url": level_data["image_url"],
        "total_levels": TOTAL_LEVELS
    })

@app.route("/api/check", methods=["POST"])
def check_click():
    """
    Checks a user's click (x,y) for a *specific level*.
    """
    data = request.get_json()
    print(f"Received click data: {data}")

    try:
        user_x = int(data['x'])
        user_y = int(data['y'])
        level_num = str(data['level']) # Get the level from the frontend
    except:
        return jsonify({"error": "Invalid coordinates or level sent"}), 400

    # Get the secret answer for this level
    level_answer = GAME_DATA.get(level_num)
    if not level_answer:
        return jsonify({"error": "Invalid level"}), 404
        
    target = level_answer["target_box"]

    if (target["x1"] <= user_x <= target["x2"]) and \
       (target["y1"] <= user_y <= target["y2"]):
        result = "hit"
    else:
        result = "miss"

    return jsonify({"result": result})


if __name__ == '__main__':
    print("Starting 'Find Carlos!' server at http://127.0.0.1:5000")
    app.run(debug=True, host="127.0.0.1", port=5000)