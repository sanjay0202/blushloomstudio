const fs = require('fs');
const path = require('path');

// Product metadata for each category
const productMetadata = {
  'flowers-and-bouquet': {
    basePrice: 299,
    priceVariation: 200,
    descriptions: [
      'Beautiful handcrafted flower bouquet perfect for any occasion',
      'Elegant floral arrangement with premium quality flowers',
      'Stunning bouquet designed with love and care',
      'Gorgeous flower arrangement for special moments',
      'Delicate and vibrant flower bouquet'
    ],
    tags: ['flowers', 'bouquet', 'gift', 'handmade', 'decoration'],
    colors: ['Red', 'Pink', 'White', 'Yellow', 'Purple', 'Mixed'],
    customizable: true
  },
  'keychain': {
    basePrice: 99,
    priceVariation: 50,
    descriptions: [
      'Cute and stylish keychain perfect for everyday use',
      'Handcrafted keychain with unique design',
      'Adorable keychain accessory for your keys',
      'Trendy keychain with premium quality materials',
      'Charming keychain that makes a great gift'
    ],
    tags: ['keychain', 'accessory', 'gift', 'handmade', 'cute'],
    colors: ['Blue', 'Pink', 'Purple', 'Green', 'Yellow', 'Multi-color'],
    customizable: true
  },
  'ribbon-and-clips': {
    basePrice: 149,
    priceVariation: 100,
    descriptions: [
      'Beautiful ribbon and clip set for hair styling',
      'Elegant hair accessories with premium ribbons',
      'Stylish clips and ribbons for any hairstyle',
      'Handcrafted hair accessories with unique designs',
      'Pretty ribbon and clip collection for daily wear'
    ],
    tags: ['ribbon', 'clips', 'hair accessory', 'handmade', 'fashion'],
    colors: ['Red', 'Blue', 'Pink', 'White', 'Black', 'Multi-color'],
    customizable: true
  }
};

// Helper function to generate product name
function generateProductName(category, index) {
  const categoryNames = {
    'flowers-and-bouquet': 'Flower Bouquet',
    'keychain': 'Keychain',
    'ribbon-and-clips': 'Ribbon & Clip Set'
  };
  
  const adjectives = [
    'Premium', 'Deluxe', 'Classic', 'Elegant', 'Charming',
    'Beautiful', 'Lovely', 'Gorgeous', 'Stunning', 'Exquisite'
  ];
  
  const adj = adjectives[index % adjectives.length];
  return `${adj} ${categoryNames[category]} #${index + 1}`;
}

// Helper function to generate product ID
function generateProductId(category, index) {
  const prefix = category.split('-').map(w => w[0]).join('').toUpperCase();
  return `${prefix}-${String(index + 1).padStart(3, '0')}`;
}

// Helper function to get random items from array
function getRandomItems(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Main function to generate products
function generateProducts() {
  const assetsDir = path.join(__dirname, '..', 'assets');
  const products = [];
  
  // Read each category folder
  const categories = ['Flowers-and-bouquet', 'keychain', 'ribbon-and-clips'];
  
  categories.forEach(categoryFolder => {
    const categoryKey = categoryFolder.toLowerCase();
    const categoryPath = path.join(assetsDir, categoryFolder);
    
    if (!fs.existsSync(categoryPath)) {
      console.log(`Skipping ${categoryFolder} - folder not found`);
      return;
    }
    
    const metadata = productMetadata[categoryKey];
    if (!metadata) {
      console.log(`Skipping ${categoryFolder} - no metadata defined`);
      return;
    }
    
    // Read all files and subdirectories
    const items = fs.readdirSync(categoryPath, { withFileTypes: true });
    
    // Group images by product (either individual images or subdirectories)
    const productGroups = [];
    const individualImages = [];
    
    items.forEach(item => {
      if (item.isDirectory()) {
        // This is a product with multiple images
        const subPath = path.join(categoryPath, item.name);
        const images = fs.readdirSync(subPath)
          .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
          .map(file => `/assets/${categoryFolder}/${item.name}/${file}`);
        
        if (images.length > 0) {
          productGroups.push(images);
        }
      } else if (/\.(jpg|jpeg|png|webp)$/i.test(item.name)) {
        // Individual image file
        individualImages.push(`/assets/${categoryFolder}/${item.name}`);
      }
    });
    
    // Each individual image becomes a product
    individualImages.forEach(image => {
      productGroups.push([image]);
    });
    
    // Generate product data for each group
    productGroups.forEach((images, index) => {
      const price = metadata.basePrice + Math.floor(Math.random() * metadata.priceVariation);
      const isFeatured = Math.random() > 0.7; // 30% chance of being featured
      
      const product = {
        id: generateProductId(categoryKey, products.length),
        name: generateProductName(categoryKey, index),
        description: metadata.descriptions[index % metadata.descriptions.length],
        price: price,
        category: categoryKey,
        images: images,
        colors: getRandomItems(metadata.colors, Math.min(3, metadata.colors.length)),
        customizable: metadata.customizable,
        inStock: true,
        featured: isFeatured,
        tags: metadata.tags
      };
      
      products.push(product);
    });
    
    console.log(`Generated ${productGroups.length} products for ${categoryFolder}`);
  });
  
  // Sort products by category and then by ID
  products.sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return a.id.localeCompare(b.id);
  });
  
  // Write to data folder
  const dataDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  const outputPath = path.join(dataDir, 'products.json');
  fs.writeFileSync(outputPath, JSON.stringify(products, null, 2));
  
  console.log(`\n✅ Successfully generated ${products.length} products!`);
  console.log(`📁 Output: ${outputPath}`);
  
  // Print summary
  const summary = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  
  console.log('\n📊 Summary:');
  Object.entries(summary).forEach(([category, count]) => {
    console.log(`   ${category}: ${count} products`);
  });
  
  return products;
}

// Run the script
try {
  generateProducts();
} catch (error) {
  console.error('❌ Error generating products:', error);
  process.exit(1);
}

// Made with Bob
