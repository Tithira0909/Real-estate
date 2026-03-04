const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;

// Secret key for JWT (In production, use environment variables)
const JWT_SECRET = 'cevon_atelier_super_secret_key_2024';

app.use(cors());
app.use(express.json());

// Database Setup
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'cevon_store.sqlite'),
  logging: false
});

// Product Model
const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  images: {
    type: DataTypes.STRING, // Store as JSON string to hold an array of up to 6 image URLs
    allowNull: true,
    defaultValue: '[]',
    get() {
      const rawValue = this.getDataValue('images');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('images', JSON.stringify(value || []));
    }
  },
  // We'll keep a single 'image' column for backward compatibility or as the main thumbnail
  // to avoid breaking existing pages that expect product.image, setting it to images[0] below.
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 10
  },
  // Additional standard e-commerce specifications
  materials: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dimensions: {
    type: DataTypes.STRING,
    allowNull: true
  },
  weight: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

// Seed Data
const seedProducts = async () => {
  const count = await Product.count();
  if (count === 0) {
    const products = [
      // Necklaces
      {
        name: "The Ethereal Drop",
        price: 1250,
        category: "Necklaces",
        description: "A delicate drop of pure elegance, crafted to capture the light.",
        images: ["https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=2565&auto=format&fit=crop", "https://images.unsplash.com/photo-1599643477874-c4ca778bc0f8?q=80&w=2670&auto=format&fit=crop"],
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=2565&auto=format&fit=crop",
        stock: 5,
        materials: "18k Solid Gold, VVS1 Diamonds",
        dimensions: "18 inches (adjustable to 16 inches)",
        weight: "4.2g"
      },
      // Rings
      {
        name: "Solstice Diamond Ring",
        price: 3400,
        category: "Rings",
        description: "Inspired by the celestial dance, a ring that shines forever.",
        images: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2670&auto=format&fit=crop"],
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2670&auto=format&fit=crop",
        stock: 8,
        materials: "Platinum, 1.5ct Center Diamond",
        dimensions: "Band width: 2mm",
        weight: "5.1g"
      },
      // Earrings
      {
        name: "Lunar Pearl Earrings",
        price: 890,
        category: "Earrings",
        description: "Pearls as timeless as the moon itself.",
        images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2670&auto=format&fit=crop"],
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2670&auto=format&fit=crop",
        stock: 12,
        materials: "14k White Gold, South Sea Pearls",
        dimensions: "Drop length: 1 inch",
        weight: "3.5g"
      },
      // Bracelets
      {
        name: "Obsidian Gold Cuff",
        price: 2100,
        category: "Bracelets",
        description: "Bold, modern, and unmistakably luxurious.",
        images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2670&auto=format&fit=crop"],
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2670&auto=format&fit=crop",
        stock: 3,
        materials: "18k Yellow Gold, Black Obsidian",
        dimensions: "Inner circumference: 6.5 inches",
        weight: "18g"
      },
      // Pendants (New Category)
      {
        name: "Aurora Crystal Pendant",
        price: 950,
        category: "Pendants",
        description: "A crystal that reflects the colors of the northern lights.",
        images: ["https://images.unsplash.com/photo-1602751584552-8ba42d523f05?q=80&w=2574&auto=format&fit=crop"],
        image: "https://images.unsplash.com/photo-1602751584552-8ba42d523f05?q=80&w=2574&auto=format&fit=crop",
        stock: 15,
        materials: "Sterling Silver, Aurora Borealis Crystal",
        dimensions: "Pendant size: 1.5 x 1 inch",
        weight: "8g"
      },
      // More Necklaces
      {
        name: "Golden Chain Link",
        price: 1800,
        category: "Necklaces",
        description: "Classic links reimagined for the modern wearer.",
        images: ["https://images.unsplash.com/photo-1596944924616-00f8fdb92db1?q=80&w=2574&auto=format&fit=crop"],
        image: "https://images.unsplash.com/photo-1596944924616-00f8fdb92db1?q=80&w=2574&auto=format&fit=crop",
        stock: 7,
        materials: "14k Yellow Gold",
        dimensions: "20 inches",
        weight: "12g"
      },
      // More Rings
      {
        name: "Vintage Ruby Ring",
        price: 2750,
        category: "Rings",
        description: "A touch of vintage glamour with a deep red ruby.",
        images: ["https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=2680&auto=format&fit=crop"],
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=2680&auto=format&fit=crop",
        stock: 4,
        materials: "18k Rose Gold, 2ct Pigeon Blood Ruby",
        dimensions: "Band width: 2.5mm",
        weight: "6g"
      },
      // More Bracelets
      {
        name: "Silver Charm Bracelet",
        price: 650,
        category: "Bracelets",
        description: "Collect your memories with this elegant charm bracelet.",
        images: ["https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2675&auto=format&fit=crop"],
        image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2675&auto=format&fit=crop",
        stock: 20,
        materials: "925 Sterling Silver",
        dimensions: "7.5 inches",
        weight: "14g"
      },
       // More Pendants
       {
        name: "Sapphire Teardrop",
        price: 1450,
        category: "Pendants",
        description: "A deep blue sapphire in a teardrop setting.",
        images: ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2670&auto=format&fit=crop"],
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2670&auto=format&fit=crop",
        stock: 6,
        materials: "18k White Gold, 1.2ct Blue Sapphire",
        dimensions: "Pendant size: 1 x 0.5 inch",
        weight: "5g"
      }
    ];
    await Product.bulkCreate(products);
    console.log("Database seeded successfully.");
  }
};

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token." });
    req.user = user;
    next();
  });
};

// Routes

// Auth Route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Hardcoded for prototype purposes. In production, verify against hashed DB password.
  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '12h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/products', async (req, res) => {
  try {
    const { category } = req.query;
    const whereClause = category && category !== 'All' ? { category } : {};
    const products = await Product.findAll({ where: whereClause });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/products', authenticateToken, async (req, res) => {
  try {
    const data = { ...req.body };
    if (data.images && data.images.length > 0) {
      data.image = data.images[0]; // Set main image for backward compatibility
    } else if (data.image) {
      data.images = [data.image]; // Fallback if only single image provided
    }
    const product = await Product.create(data);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/products/:id', authenticateToken, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const data = { ...req.body };
    if (data.images && data.images.length > 0) {
      data.image = data.images[0];
    } else if (data.image) {
      data.images = [data.image];
    }

    await product.update(data);
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/products/:id', authenticateToken, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    await product.destroy();
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sync DB with alter: true to update schema safely without dropping
sequelize.sync({ alter: true }).then(async () => {
  await seedProducts();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
