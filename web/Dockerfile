FROM node:18-alpine
EXPOSE 3000

WORKDIR /app

# Install dependencies
COPY package*.json .
RUN npm install

# Build source code
COPY . .
RUN npm run build

# Install serve
RUN npm install -g serve

CMD ["serve", "-s", "build"]