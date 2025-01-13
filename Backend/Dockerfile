FROM python:3.10

# Establecer directorio de trabajo
WORKDIR /app

# Instalar dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el proyecto
COPY . .

# Dar permisos al entrypoint
RUN chmod +x entrypoint.sh

# Exponer el puerto
EXPOSE 8000