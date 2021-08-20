FROM node:14 as base

WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install

COPY . .
RUN npx tsc -p .

FROM node:14 as prod

COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package*.json ./
COPY --from=base /app/dist ./dist

CMD ["node", "dist/index"]
