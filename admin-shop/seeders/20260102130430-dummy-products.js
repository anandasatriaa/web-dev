"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const productData = [
      { name: "MacBook Pro M2", price: 21000000 },
      { name: "iPhone 15 Pro", price: 18500000 },
      { name: "Logitech MX Master 3S", price: 1500000 },
      { name: "Keychron K2 Wireless", price: 1200000 },
      { name: "Samsung Odyssey G7", price: 7500000 },
      { name: "Sony WH-1000XM5", price: 4500000 },
      { name: "Asus ROG Zephyrus G14", price: 25000000 },
      { name: "GoPro Hero 12", price: 6500000 },
      { name: "SSD Samsung 980 Pro 1TB", price: 1800000 },
      { name: "iPad Air Gen 5", price: 9500000 },
    ];

    const products = productData.map((p) => ({
      ...p,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("Products", products, {});

    const insertedProducts = await queryInterface.sequelize.query(
      `SELECT id from Products;`
    );

    const productRows = insertedProducts[0];

    return queryInterface.bulkInsert(
      "Stocks",
      productRows.map((row) => ({
        product_id: row.id,
        qty: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Stocks", null, {});
    return queryInterface.bulkDelete("Products", null, {});
  },
};