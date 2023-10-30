FROM python:3.9
WORKDIR /app

RUN rm -rf /var/lib/apt/lists/* && apt-get update && apt-get -y install libgl1-mesa-glx
COPY . /app
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["python", "app.py", "--host", "0.0.0.0", "--port", "5000"]
