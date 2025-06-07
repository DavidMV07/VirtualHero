# Virtual Hero - Tienda de Tecnología 🖥️🎮

## Descripción
Virtual Hero es una tienda en línea especializada en productos tecnológicos y gaming. La plataforma ofrece una experiencia de compra completa con autenticación de usuarios, carrito de compras, chat en línea y panel de administración.

## Características Principales 🌟

- **Autenticación de Usuarios**
  - Registro de usuarios
  - Inicio de sesión
  - Sistema de roles (admin/usuario)
  - Protección de rutas

- **Catálogo de Productos**
  - Visualización de productos por categorías
  - Detalles de productos
  - Filtrado y búsqueda
  - Gestión de inventario (admin)

- **Carrito de Compras**
  - Agregar/eliminar productos
  - Actualizar cantidades
  - Proceso de checkout

- **Panel de Administración**
  - CRUD de productos
  - Gestión de inventario
  - Acceso restringido a administradores

- **Chat en Línea**
  - Soporte al cliente
  - Respuestas automáticas
  - Información de productos y servicios

## Tecnologías Utilizadas 💻

- **Frontend**
  - React.js
  - React Router DOM
  - CSS personalizado
  - Context API para gestión de estado

- **Backend/Servicios**
  - Firebase Authentication
  - Firebase Firestore
  - Firebase Storage

## Requisitos Previos 📋

```bash
# Node.js (versión 14 o superior)
# NPM (versión 6 o superior)
# Cuenta de Firebase
```

## Instalación 🚀

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd VirtualHero
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
Crear un archivo `.env` en la raíz del proyecto:
```env
VITE_API_URL=tu_url_de_api
```

4. Configurar Firebase:
   - Crear un proyecto en Firebase Console
   - Habilitar Authentication y Firestore
   - Copiar las credenciales de Firebase en `src/firebase/config.js`

5. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

## Estructura del Proyecto 📁

```
VirtualHero/
├── src/
│   ├── components/
│   │   ├── Accesorios/
│   │   ├── ChatOnline/
│   │   ├── Header/
│   │   └── ...
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── firebase/
│   │   └── config.js
│   ├── pages/
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   └── ...
├── public/
└── ...
```

## Guía de Uso 📖

### Para Usuarios

1. **Registro e Inicio de Sesión**
   - Crear una cuenta nueva en `/signup`
   - Iniciar sesión en `/login`
   - Los usuarios nuevos tienen rol 'user' por defecto

2. **Navegación**
   - Explorar productos por categorías
   - Usar el carrito de compras
   - Acceder al chat de soporte

### Para Administradores

1. **Acceso al Panel Admin**
   - Iniciar sesión con cuenta de administrador
   - Acceder a través del enlace "Admin" en el menú

2. **Gestión de Productos**
   - Crear nuevos productos
   - Editar productos existentes
   - Eliminar productos
   - Gestionar inventario

### Asignar Rol de Administrador

1. Acceder a Firebase Console
2. Ir a Firestore Database
3. Buscar la colección 'users'
4. Encontrar el documento del usuario
5. Cambiar el campo 'role' a 'admin'

## Componentes Principales 🔍

### AuthContext
Maneja la autenticación y roles de usuarios:
```jsx
const { user, userRole, loading } = useAuth();
```

### ProtectedRoute
Protege rutas basadas en roles:
```jsx
<ProtectedRoute>
  <ComponenteProtegido />
</ProtectedRoute>
```

### ChatOnline
Sistema de chat integrado con información de la empresa:
```jsx
<Chatbot />
```

## Mantenimiento y Desarrollo 🛠️

### Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Construcción
npm run build

# Vista previa de producción
npm run preview
```

### Agregar Nuevas Características

1. Crear el componente en `src/components`
2. Importar y agregar rutas en `App.jsx` si es necesario
3. Actualizar la documentación

## Solución de Problemas Comunes ⚠️

1. **Error de Autenticación**
   - Verificar credenciales de Firebase
   - Comprobar permisos de Firestore

2. **Problemas de Roles**
   - Verificar documento de usuario en Firestore
   - Comprobar campo 'role'

3. **Chat no Funciona**
   - Verificar API_URL en .env
   - Comprobar conexión a servicios

## Contribuir 🤝

1. Fork del repositorio
2. Crear rama para feature: `git checkout -b nueva-caracteristica`
3. Commit cambios: `git commit -m 'Agregar nueva característica'`
4. Push a la rama: `git push origin nueva-caracteristica`
5. Crear Pull Request

## Licencia 📄

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles

## Contacto 📧

- Desarrolladores: David Mellizo, Alejandro Gonzalez, Ivan Echeverry, Miguel Molina.
- Email: davidmellizo654@gmail.com, gonzajuan2003@gmail.com, 
- GitHub: DavidMV07, Alejo20030, echeverry2003, smallxx
