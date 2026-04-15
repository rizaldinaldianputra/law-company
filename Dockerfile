FROM node:22-alpine

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies without running postinstall scripts
RUN npm ci --ignore-scripts

# Copy the rest of the application
COPY . .

# Generate Prisma Client (more robust now with updated prisma.config.js)
RUN npx prisma generate

# Build the Next.js application
RUN npm run build

EXPOSE 3000

# Start the application
CMD ["npm", "start"]