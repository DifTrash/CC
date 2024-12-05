FROM node:18.20.2

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./src/firebase/env.json ./dist/firebase/env.json

COPY . .

# Jalankan build menggunakan TypeScript Compiler
RUN npm run build

# Ekspos port API
EXPOSE 8080

# Jalankan aplikasi
CMD ["npm", "start"]
