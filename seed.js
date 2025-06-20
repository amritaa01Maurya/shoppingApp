const mongoose = require("mongoose");

const Product = require('./models/Product') 


const products = [
  {
    name: "Wireless Bluetooth Earbuds",
    img: "https://images.unsplash.com/photo-1655804439989-24758d6e96b8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdpcmVsZXNzJTIwYnVkc3xlbnwwfHwwfHx8MA%3D%3D",
    price: 2999,
    description: "Compact wireless earbuds with high-quality sound and noise cancellation."
  },
  {
    name: "Stainless Steel Water Bottle",
    img: "https://plus.unsplash.com/premium_photo-1681284938505-62efa3494bf2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3RhaW5sZXNzJTIwc3RlZWwlMjB3YXRlciUyMGJvdHRsZXxlbnwwfHwwfHx8MA%3D%3D",
    price: 799,
    description: "Durable and insulated water bottle that keeps drinks hot or cold for hours."
  },
  {
    name: "Men's Casual Sneakers",
    img: "https://images.unsplash.com/photo-1608380272894-b3617f04b463?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1lbiUyMHNuZWFrZXJzfGVufDB8fDB8fHww",
    price: 1999,
    description: "Comfortable and stylish sneakers perfect for daily wear."
  },
  {
    name: "4K Smart LED TV - 43 inch",
    img: "https://images.unsplash.com/photo-1601944179066-29786cb9d32a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c21hcnQlMjB0dnxlbnwwfHwwfHx8MA%3D%3D",
    price: 24999,
    description: "Ultra HD Smart TV with built-in apps and voice control features."
  },
  {
    name: "Non-stick Frying Pan - 24cm",
    img: "https://images.unsplash.com/photo-1624031000828-dba1b7a3e4ce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJ5aW5nJTIwcGFufGVufDB8fDB8fHww",
    price: 999,
    description: "Durable non-stick frying pan for effortless cooking and easy cleaning."
  }
]

async function seedDB() {
    await Product.insertMany(products); // they return promise, so to save from chaining of promises we use async await
    console.log("data seeded successfully");
}

module.exports = seedDB;