from flask import Flask, request, render_template
from flask_cors import CORS
import torch

from PIL import Image
import io

# 플라스크 객체 인스턴스 생성
app = Flask(__name__)
# CORS 설정. 웹 애플리케이션에서 Cross-Origin 요청에서 자격 증명을 허용하도록 설정하는 부분.
CORS(app, resources={r"/*": {"origins": "*"}})
app.config["CORS_SUPPORTS_CREDENTIALS"] = True

@app.route("/ai/cert", methods=["POST"])
def hello_world():  # put application's code here
    if not request.method == "POST":
        return

    if request.files.get("image"):
        image_file = request.files["image"]
        image_bytes = image_file.read()
        img = Image.open(io.BytesIO(image_bytes))

        model = torch.hub.load('ultralytics/yolov5', "yolov5n")
        results = model(img, size=640) # reduce size=320 for faster inference

        records = results.pandas().xyxy[0].to_dict(orient="records")

        if not records:
            return {"result": "not found"}

        return {"result": records[0]["name"]}

if __name__ == '__main__':
    app.run()