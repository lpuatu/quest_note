from flask import Flask

app = Flask(
    __name__,
    static_folder='../static',
    template_folder='../templates'
)

@app.route('/')
def index():
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(debug=True, port=5002)