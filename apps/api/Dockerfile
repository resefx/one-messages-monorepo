FROM node:lts-alpine

WORKDIR /apps/api

RUN addgroup --system api && \
    adduser --system -G api api

# Copia o código compilado do dist correto
COPY ./dist ./dist/

# Copia o package.json gerado pelo webpack e instala as dependências
COPY ./dist/package.json ./
RUN npm install --omit=dev

# Copia os arquivos do Prisma para o local correto
RUN mkdir -p src/generated/prisma && \
    cp -r dist/src/generated/prisma/* src/generated/prisma/

# Muda as permissões
RUN chown -R api:api ./dist ./src

USER api

CMD [ "node", "dist/main.js" ]