# Proyecto Backend eCommerce - Comisión 38150

Este es un proyecto backend para un eCommerce desarrollado como parte del curso de Desarrollo Backend. 
El servidor permite gestionar productos, carritos, mensajes de usuarios en tiempo real (chat) y registrar órdenes.

## Documentación y Acceso al Servidor

Puedes acceder a la documentación completa de la API en el siguiente enlace: [Documentación de la API](https://documenter.getpostman.com/view/27830576/2s93sZ5DUA).
La documentación proporciona detalles sobre los diferentes endpoints disponibles y cómo interactuar con ellos.

El servidor está desplegado y disponible en la siguiente URL: [Servidor en render](https://ecommerce-backend-k7nv.onrender.com).
Recuerda que para acceder a los endpoints protegidos, necesitarás incluir el token JWT en la cabecera de la solicitud.

## Autenticación y Autorización

El servidor implementa autenticación y autorización utilizando tokens JWT (JSON Web Tokens). Para acceder a los endpoints protegidos, debes incluir el token JWT en la cabecera de la solicitud.

## Variables de Entorno

El servidor utiliza varias variables de entorno para su configuración. A continuación se muestran ejemplos de las variables de entorno que se pueden configurar:

```
PORT=8080
BASE_URL=http://localhost:8080
DATABASE_TYPE=MONGO
MONGO_URL_KEY=key_example
MONGO_STORE_SECRET=secret
MONGO_URL=mongodb+srv://<MONGO_URL_USER>:<MONGO_URL_KEY>@<CLUSTER_NAME>.henetdi.mongodb.net/<DB_NAME>?retryWrites=true&w=majority
TOKEN_SECRET=secret_example
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USER=example@ethereal.email
SMTP_PASSWORD=smtp_password_example
ADMIN_EMAIL=admin@gmail.com
ENVIRONMENT=development
```

Asegúrate de configurar estas variables de entorno adecuadamente antes de ejecutar el servidor.

## Contacto

Si tienes alguna pregunta o sugerencia sobre este proyecto, no dudes en contactarme:

- GitHub: [https://github.com/fedeambroggio](https://github.com/fedeambroggio)
- LinkedIn: [https://www.linkedin.com/in/federico-ambroggio/](https://www.linkedin.com/in/federico-ambroggio/)
- Email: [fedeericoambroggio@gmail.com](mailto:federicoambroggio@gmail.com)
