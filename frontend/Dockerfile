FROM node:14-slim

WORKDIR /app

# Install frontend dependencies
COPY package*.json ./
RUN npm install

# Copy the frontend code
COPY . .

# Expose the frontend port
EXPOSE 3000

# Run the frontend server
CMD ["npm", "start"]