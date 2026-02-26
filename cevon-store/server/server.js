const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const app = express();
const PORT = 3001;

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
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 10
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
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=2565&auto=format&fit=crop",
        stock: 5
      },
      // Rings
      {
        name: "Solstice Diamond Ring",
        price: 3400,
        category: "Rings",
        description: "Inspired by the celestial dance, a ring that shines forever.",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2670&auto=format&fit=crop",
        stock: 8
      },
      // Earrings
      {
        name: "Lunar Pearl Earrings",
        price: 890,
        category: "Earrings",
        description: "Pearls as timeless as the moon itself.",
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2670&auto=format&fit=crop",
        stock: 12
      },
      // Bracelets
      {
        name: "Obsidian Gold Cuff",
        price: 2100,
        category: "Bracelets",
        description: "Bold, modern, and unmistakably luxurious.",
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2670&auto=format&fit=crop",
        stock: 3
      },
      // Pendants (New Category)
      {
        name: "Aurora Crystal Pendant",
        price: 950,
        category: "Pendants",
        description: "A crystal that reflects the colors of the northern lights.",
        image: "https://images.unsplash.com/photo-1602751584552-8ba42d523f05?q=80&w=2574&auto=format&fit=crop",
        stock: 15
      },
      // More Necklaces
      {
        name: "Golden Chain Link",
        price: 1800,
        category: "Necklaces",
        description: "Classic links reimagined for the modern wearer.",
        image: "https://images.unsplash.com/photo-1596944924616-00f8fdb92db1?q=80&w=2574&auto=format&fit=crop",
        stock: 7
      },
      // More Rings
      {
        name: "Vintage Ruby Ring",
        price: 2750,
        category: "Rings",
        description: "A touch of vintage glamour with a deep red ruby.",
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=2680&auto=format&fit=crop",
        stock: 4
      },
      // More Bracelets
      {
        name: "Silver Charm Bracelet",
        price: 650,
        category: "Bracelets",
        description: "Collect your memories with this elegant charm bracelet.",
        image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2675&auto=format&fit=crop",
        stock: 20
      },
       // More Pendants
       {
        name: "Sapphire Teardrop",
        price: 1450,
        category: "Pendants",
        description: "A deep blue sapphire in a teardrop setting.",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2670&auto=format&fit=crop",
        stock: 6
      }
    ];
    await Product.bulkCreate(products);
    console.log("Database seeded successfully.");
  }
};

// Routes
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

app.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    await product.update(req.body);
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    await product.destroy();
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sync DB and Start Server
sequelize.sync().then(async () => {
  await seedProducts();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
