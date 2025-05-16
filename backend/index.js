const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt"); // Sirve para encriptar contraseñas
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// creando la conexicion con la base de datos (virtualhero)
const db = mysql.createConnection({
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

  // Verificar si el usuario ya existe
  const checkUserQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkUserQuery, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Error en el servidor" });
    if (results.length > 0) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Encriptamos la contra
    const hashedPassword = await bcrypt.hash(password, 10);

    // Aqui insertamos un nuevo usuario en la base de 
    const insertUserQuery = "INSERT INTO users (email, password) VALUES (?, ?)";
    db.query(insertUserQuery, [email, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ message: "Error al registrar el usuario" });
      res.status(201).json({ message: "Usuario registrado con éxito" });
    });
  });
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
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Iniciar sesión exitoso
    res.status(200).json({ message: "Inicio de sesión exitoso", email: user.email });
  });
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
  const query = "INSERT INTO products (name, description, price, image, category) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [name, description, price, image, category], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al agregar producto");
    } else {
      res.status(201).send("Producto agregado");
    }
  });
});

// Endpoint para eliminar productos
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM products WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al eliminar producto");
    } else {
      res.send("Producto eliminado");
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});