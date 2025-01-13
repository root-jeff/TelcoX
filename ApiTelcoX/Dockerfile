FROM python:3.10

# Copia el script wait-for-it
COPY wait-for-it.sh /usr/local/bin/wait-for-it
RUN chmod +x /usr/local/bin/wait-for-it

# Establece el directorio de trabajo
WORKDIR /ApiTelcoX

# Copia los archivos de requisitos
COPY requirements.txt .

# Instala las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copia el código completo del proyecto al contenedor
COPY . /ApiTelcoX

# # Copia el entrypoint.sh al contenedor
# COPY entrypoint.sh /ApiTelcoX/entrypoint.sh

# # Da permisos de ejecución al archivo
# RUN chmod +x /ApiTelcoX/entrypoint.sh

# # Configura el entrypoint
# ENTRYPOINT ["/ApiTelcoX/entrypoint.sh"]
