# backend/Dockerfile
FROM python:3.9-slim

RUN apt-get update && apt-get install -y ffmpeg

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
RUN pip install flask-cors

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
