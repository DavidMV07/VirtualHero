import express, { json } from "express";
import { createConnection } from "mysql2";
import cors from "cors";
import { hash, compare } from "bcrypt"; // Sirve para encriptar contraseñas
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(json());

// creando la conexicion con la base de datos (virtualhero)
const db = createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "virtualhero",
});

db.connect((err) => {
  if (err) {
    console.error("Error de conexión:", err);
    return;
  }
  console.log("Conectado a la base de datos MySQL");
});

// Endpoint para registrar usuarios
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // Validación básica
  if (!email || !password) {
    return res.status(400).json({ message: "Email y contraseña son obligatorios" });
  }

  try {
    // Verificar si el usuario ya existe
    const checkUserQuery = "SELECT * FROM users WHERE email = ?";
    db.query(checkUserQuery, [email], async (err, results) => {
      if (err) return res.status(500).json({ message: "Error en el servidor" });

      if (results.length > 0) {
        return res.status(400).json({ message: "El usuario ya existe" });
      }

      // Encriptar la contraseña
      const hashedPassword = await hash(password, 10);

      // Insertar nuevo usuario
      const insertUserQuery = "INSERT INTO users (email, password) VALUES (?, ?)";
      db.query(insertUserQuery, [email, hashedPassword], (err, result) => {
        if (err) {
          console.error("Error al registrar el usuario:", err);
          return res.status(500).json({ message: "Error al registrar el usuario" });
        }

        res.status(201).json({
          message: "Usuario registrado con éxito",
          userId: result.insertId,
        });
      });
    });
  } catch (error) {
    console.error("Error inesperado:", error);
    res.status(500).json({ message: "Error inesperado en el registro" });
  }
});


// Endpoint para iniciar sesión
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Verificar si el usuario existe
  const checkUserQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkUserQuery, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Error en el servidor" });
    if (results.length === 0) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const user = results[0];

    // Verificar la contraseña
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });


    // Enviar token al cliente
    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  });
});
// Middleware para autenticar el token JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.get("/admin", authenticateToken, (req, res) => {
  // Lógica para la sección de administración
});
// Endpoint para obtener productos
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al obtener productos");
    } else {
      res.json(results);
    }
  });
});

// Endpoint para agregar productos
app.post("/products", (req, res) => {
  const { name, description, price, image, category } = req.body;

  // Validación básica
  if (!name || !description || !price || !image || !category) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  const query = `
    INSERT INTO products (name, description, price, image, category)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [name, description, price, image, category], (err, result) => {
    if (err) {
      console.error("Error al agregar producto:", err);
      return res.status(500).send("Error al agregar producto");
    }

    // Puedes retornar el ID del producto insertado
    res.status(201).json({
      message: "Producto agregado correctamente",
      productId: result.insertId,
    });
  });
});


// Endpoint para eliminar productos
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM products WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error al eliminar producto");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("Producto no encontrado");
    }

    res.send("Producto eliminado correctamente");
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});