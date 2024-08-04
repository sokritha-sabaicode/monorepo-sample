# BUILD STAGE
FROM node:20-alpine3.19 as builder

WORKDIR /app
COPY package.json ./

RUN npm install

COPY tsconfig.json nodemon.json tsoa.json build-script.js ecosystem.config.js ./
COPY src ./src

RUN npm run build

# FINAL STAGE
FROM node:20-alpine3.19

WORKDIR /app

COPY package.json ./
RUN npm install --only=production

# Copy the built application from the build stage
COPY --from=builder /app/build/ .

# Expose the port the app runs on
EXPOSE 4003

# Command to run the application
CMD ["node", "server.js"]
