# Etapa 1: Construção da imagem
FROM node:18

# Diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia o arquivo package.json e o package-lock.json
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta 3000 para o container
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]
