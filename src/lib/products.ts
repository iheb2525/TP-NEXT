import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Flag to check if we're running on the server
const isServer = typeof window === 'undefined';

// Define the Product type
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

// Path to the JSON file
const productsFilePath = isServer ? path.join(process.cwd(), 'src', 'data', 'products.json') : '';

// Function to read products from the JSON file
export function getProducts(): Product[] {
  if (!isServer) {
    // When running on the client, we'll fetch from the API instead
    return [];
  }
  
  try {
    const fileContent = fs.readFileSync(productsFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading products file:', error);
    return [];
  }
}

// Function to write products to the JSON file
function saveProducts(products: Product[]): void {
  if (!isServer) {
    console.error('Cannot save products on the client side');
    return;
  }
  
  try {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing to products file:', error);
    throw new Error('Failed to save products');
  }
}

// Function to get a product by ID
export function getProductById(id: string): Product | null {
  const products = getProducts();
  return products.find(product => product.id === id) || null;
}

// Function to create a new product
export function createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product {
  const products = getProducts();
  
  const now = new Date().toISOString();
  const newProduct: Product = {
    id: uuidv4(),
    ...productData,
    createdAt: now,
    updatedAt: now
  };
  
  products.push(newProduct);
  saveProducts(products);
  
  return newProduct;
}

// Function to update a product
export function updateProduct(id: string, productData: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>): Product | null {
  if (!isServer) {
    console.error('Cannot update products on the client side');
    return null;
  }

  try {
    // Lire tous les produits du fichier
    const products = getProducts();
    console.log(`Recherche du produit avec l'ID ${id} parmi ${products.length} produits`);
    
    // Trouver l'index du produit à mettre à jour
    const productIndex = products.findIndex(product => product.id === id);
    
    if (productIndex === -1) {
      console.error(`Produit avec l'ID ${id} non trouvé`);
      return null;
    }
    
    // Récupérer le produit actuel
    const currentProduct = products[productIndex];
    console.log('Produit actuel:', currentProduct);
    console.log('Données de mise à jour reçues:', productData);
    
    // Créer un nouveau produit avec les données mises à jour
    const updatedProduct: Product = {
      ...currentProduct,  // Conserver toutes les propriétés existantes
      ...productData,     // Écraser avec les nouvelles propriétés
      id: currentProduct.id,  // S'assurer que l'ID reste le même
      createdAt: currentProduct.createdAt,  // Conserver la date de création
      updatedAt: new Date().toISOString()   // Mettre à jour la date de modification
    };
    
    console.log('Produit mis à jour:', updatedProduct);
    
    // Remplacer le produit dans le tableau
    products[productIndex] = updatedProduct;
    
    // Sauvegarder tous les produits dans le fichier
    saveProducts(products);
    console.log('Produits sauvegardés avec succès');
    
    // Retourner le produit mis à jour
    return updatedProduct;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du produit:', error);
    return null;
  }
}

// Function to delete a product
export function deleteProduct(id: string): boolean {
  const products = getProducts();
  const initialLength = products.length;
  
  const filteredProducts = products.filter(product => product.id !== id);
  
  if (filteredProducts.length === initialLength) {
    return false;
  }
  
  saveProducts(filteredProducts);
  return true;
}
