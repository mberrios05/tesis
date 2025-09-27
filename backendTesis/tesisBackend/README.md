# ⚙️ Backend - Sistema de Seguimiento Estudiantil
Este proyecto corresponde al **backend** del sistema de seguimiento estudiantil con **Agente hibrido**, desarrollado para la **gestión de notas, observaciones y comunicación con padres de familia**.  
Está construido con **Node.js + Express**, desplegado en **Railway**, y utiliza **MongoDB** como base de datos.

---

## 🚀 Tecnologías principales

- [Node.js](https://nodejs.org/) - Entorno de ejecución del backend.  
- [Express.js](https://expressjs.com/) - Framework para creación de API REST.  
- [MongoDB](https://www.mongodb.com/) - Base de datos NoSQL.  
- [Mongoose](https://mongoosejs.com/) - ODM para modelado de datos en MongoDB.  
---

## 📋 Requisitos previos

- [Node.js](https://nodejs.org/) **v22.11.0 o superior**  
- [NPM](https://www.npmjs.com/) o [Yarn](https://yarnpkg.com/) instalado  
- Cuenta en [Railway](https://railway.com/) u otro servicio de despliegue  
- Instancia de **MongoDB Atlas** o un servidor local de MongoDB  
---

## 🛠️ Instalación en local

---
Clonar el repositorio
git clone https://github.com/mberrios05/tesis/new/main/backendTesis
cd backendTesis/TesisBackend

Instalar dependencias
npm install

Ejecutar en modo desarrollo
npm run dev

## 🛠️ Variables de entorno
```bash
PORT=3000
MONGODB_URI=mongodb+srv://project-tesis:qo7mnMYgaWk5AJ4u@tesis.gbhotf8.mongodb.net/?retryWrites=true&w=majority&appName=Tesis
MONGO_NAME=db-tesis
ENCRYPTION_KEY=project-tesis
