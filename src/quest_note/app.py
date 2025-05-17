from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(
    __name__,
    static_folder='static',
    template_folder='templates'
)
CORS(app)

class EditorState:
    def __init__(self):
        self.text = ""
        self.word_count = 0
        self.health_percentage = 100
        self.decay_rate = 2.0
        self.last_update = None

editor_state = EditorState()

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/update-text', methods=['POST'])
def update_text():
    data = request.json
    editor_state.text = data.get('text', '')
    words = editor_state.text.strip().split()
    editor_state.word_count = len(words)
    return jsonify({
        'word_count': editor_state.word_count,
        'health_percentage': editor_state.health_percentage
    })

@app.route('/api/get-state', methods=['GET'])
def get_state():
    return jsonify({
        'text': editor_state.text,
        'word_count': editor_state.word_count,
        'health_percentage': editor_state.health_percentage,
        'decay_rate': editor_state.decay_rate
    })

@app.route('/api/update-decay', methods=['POST'])
def update_decay():
    data = request.json
    editor_state.decay_rate = float(data.get('rate', 2.0))
    return jsonify({'decay_rate': editor_state.decay_rate})

@app.route('/api/clear', methods=['POST'])
def clear():
    editor_state.text = ""
    editor_state.word_count = 0
    editor_state.health_percentage = 100
    return jsonify({
        'text': editor_state.text,
        'word_count': editor_state.word_count,
        'health_percentage': editor_state.health_percentage
    })

if __name__ == '__main__':
    app.run(debug=True, port=5002)