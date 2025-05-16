from flask import Flask, render_template

app = Flask(__name__, static_folder='static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/build')
def build():
    # This route is used by GitHub Actions to build the static files
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, port=5002)
