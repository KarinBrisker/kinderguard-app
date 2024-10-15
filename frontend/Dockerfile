FROM node:14-slim

WORKDIR /app

# Install frontend dependencies
COPY package*.json ./
RUN npm install && apt-get update && apt-get install -y curl wget iputils-ping

# Copy the frontend code
COPY . .

# Expose the frontend port
EXPOSE 3000

# Run the frontend server
CMD ["npm", "start"]