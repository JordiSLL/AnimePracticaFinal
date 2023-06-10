FROM node:19
# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración de dependencias
COPY package*.json ./


# Instalar las dependencias
RUN npm install
COPY . ./
# Exponer el puerto 8080 para acceder a la aplicación Vue
EXPOSE 8080

# Comando para iniciar la aplicación Vue
CMD ["npm", "run", "dev"]
