FROM python:3.9-slim

# Set environment variables to prevent Python from writing pyc files and buffer outputs
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y libsndfile1 && \
    rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Install additional Python packages if needed
RUN pip install flask-cors

# Copy the application code
COPY . .

# Expose port 5000 (ensure it matches your Flask app's port)
EXPOSE 5000

# Run the application
CMD ["python", "app.py"]