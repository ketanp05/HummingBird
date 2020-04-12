from flask import Flask, jsonify, request
import time
import json

app = Flask(__name__)
url_timestamp = {}
url_viewtime = {}
prev_url = ""

def index():
    return render_template('abc.html')
def url_strip(url):
    if "http://" in url or "https://" in url:
        url = url.replace("https://", '').replace("http://", '').replace("\"", '').replace("www.", '').replace(".com",'')
    if "/" in url:
        url = url.split('/', 1)[0]
    return url
@app.route('/send_url', methods=['POST'])
def send_url():
    resp_json = request.get_data()
    params = resp_json.decode()
    url = params.replace("url=", "")
    print("currently viewing: " + url_strip(url))
    parent_url = url_strip(url)

    global url_timestamp
    global url_viewtime
    global prev_url

    print("initial db prev tab: ", prev_url)
    print("initial db timestamp: ", url_timestamp)
    print("initial db viewtime: ", url_viewtime)

    if parent_url not in url_timestamp.keys():
        url_viewtime[parent_url] = 0

    if prev_url != '':
        time_spent = int(time.time() - url_timestamp[prev_url])
        url_viewtime[prev_url] = url_viewtime[prev_url] + time_spent

    x = int(time.time())
    url_timestamp[parent_url] = x
    prev_url = parent_url
    print("final timestamps: ", url_timestamp)
    print("final viewtimes: ", url_viewtime)
    data = url_viewtime
    with open('personal.json','w') as json_file:
        json.dump(data,json_file)

    return jsonify({'message': 'success!'}), 200
@app.route('/quit_url', methods=['POST'])
def quit_url():
    resp_json = request.get_data()
    print("Url closed: " + resp_json.decode())
    return jsonify({'message': 'quit success!'}), 200    


app.run(host="0.0.0.0", port=5000)