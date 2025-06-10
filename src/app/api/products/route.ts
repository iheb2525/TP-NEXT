import { NextRequest, NextResponse } from 'next/server';
import { getProducts, createProduct } from '@/lib/products';

// GET /api/products - Récupérer tous les produits
export async function GET() {
  try {
    console.log('Tentative de récupération des produits...');
    const products = getProducts();
    
    // Trier les produits par date de création (du plus récent au plus ancien)
    const sortedProducts = [...products].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    console.log('Produits récupérés avec succès:', sortedProducts.length);
    return NextResponse.json(sortedProducts);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    // Log the detailed error
    if (error instanceof Error) {
      console.error('Message d\'erreur:', error.message);
      console.error('Stack trace:', error.stack);
    }
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des produits' },
      { status: 500 }
    );
  }
}

// POST /api/products - Créer un nouveau produit
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { name, description, price, imageUrl, stock } = body;
    
    // Validation simple
    if (!name || !description || !price) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }
    
    try {
      console.log('Tentative de création d\'un produit...', { name, description, price, stock });
      
      // Créer un nouveau produit en utilisant notre système de stockage de fichiers
      const newProduct = createProduct({
        name,
        description,
        price: parseFloat(price),
        imageUrl: imageUrl || null,
        stock: stock ? parseInt(stock) : 0
      });
      
      console.log('Produit créé avec succès:', newProduct);
      return NextResponse.json(newProduct, { status: 201 });
    } catch (createError) {
      console.error('Erreur lors de la création du produit:', createError);
      if (createError instanceof Error) {
        console.error('Message d\'erreur:', createError.message);
        console.error('Stack trace:', createError.stack);
      }
      
      // Retourner une erreur plus détaillée
      return NextResponse.json(
        { error: 'Erreur lors de la création du produit', details: createError instanceof Error ? createError.message : String(createError) },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Erreur lors de la création du produit:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du produit' },
      { status: 500 }
    );
  }
}
