FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy prisma schema before install to allow postinstall scripts to run
COPY prisma ./prisma/

# Install dependencies (will run prisma generate via postinstall)
RUN npm install

# Copy the rest of the application
COPY . .

# Generate Prisma Client again to ensure it's up to date with any copied changes
RUN npx prisma generate

# Build the Next.js application
RUN npm run build

EXPOSE 3000

# Start the application
CMD ["npm", "start"]