from flask import Flask, render_template, request, jsonify

app = Flask(__name__)
messages = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send_message', methods=['POST'])
def send_message():
    name = request.form['name']
    message = request.form['message']
    messages.append({'name': name, 'message': message})
    if len(messages) > 15:
        messages.pop(0)
    return 'OK'

@app.route('/get_messages')
def get_messages():
    return jsonify(messages)

if __name__ == '__main__':
    app.run(debug=True)