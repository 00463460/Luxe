// Seed data for development
// Run with: npm run seed

import pool from '../config/database.js';

const seedData = async () => {
  try {
    console.log('🌱 Starting to seed database...');

    // Sample Perfumes
    const perfumes = [
      {
        name: 'Midnight Essence',
        category: 'perfume',
        sub_category: 'Men',
        price: 129.99,
        description: 'A sophisticated blend of woody and musky notes.',
        stock_quantity: 50,
        tags: '["woody", "musky", "luxury"]',
        scent_family: 'Woody',
        notes: 'Top: Bergamot, Heart: Cedarwood, Base: Musk',
        concentration: 'Eau de Parfum',
        volume_ml: 100
      },
      {
        name: 'Floral Paradise',
        category: 'perfume',
        sub_category: 'Women',
        price: 119.99,
        description: 'Elegant floral fragrance with fresh citrus top notes.',
        stock_quantity: 75,
        tags: '["floral", "fresh", "feminine"]',
        scent_family: 'Floral',
        notes: 'Top: Lemon, Heart: Rose, Base: Vanilla',
        concentration: 'Eau de Toilette',
        volume_ml: 100
      }
    ];

    // Sample Clothing
    const clothing = [
      {
        name: 'Premium Cotton T-Shirt',
        category: 'clothing',
        sub_category: 'Men',
        price: 49.99,
        description: '100% organic cotton, ultra-soft and breathable.',
        stock_quantity: 100,
        tags: '["cotton", "casual", "eco-friendly"]',
        material: 'Organic Cotton',
        available_sizes: '["XS", "S", "M", "L", "XL", "XXL"]'
      }
    ];

    console.log('✅ Database seeding structure ready (seeds to be inserted in Phase 2)');

  } catch (error) {
    console.error('❌ Seeding error:', error);
  } finally {
    await pool.end();
  }
};

seedData();
