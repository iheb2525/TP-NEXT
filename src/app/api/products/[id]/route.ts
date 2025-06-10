import { NextRequest, NextResponse } from 'next/server';
import { getProductById, updateProduct, deleteProduct } from '@/lib/products';

// GET /api/products/[id] - Récupérer un produit spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    console.log('Tentative de récupération du produit:', id);
    const product = getProductById(id);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Produit non trouvé' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du produit' },
      { status: 500 }
    );
  }
}

// PUT /api/products/[id] - Mettre à jour un produit
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Récupérer l'ID du produit à partir des paramètres de la route
    const id = params.id;
    console.log('ID du produit à mettre à jour:', id);
    
    // Récupérer les données du corps de la requête
    const body = await request.json();
    console.log('Données reçues dans la requête:', body);
    
    // Vérifier si le produit existe
    const existingProduct = getProductById(id);
    
    if (!existingProduct) {
      console.error(`Produit avec l'ID ${id} non trouvé`);
      return NextResponse.json(
        { error: 'Produit non trouvé' },
        { status: 404 }
      );
    }
    
    console.log('Produit existant trouvé:', existingProduct);
    
    // Extraire les données du corps de la requête
    const { name, description, price, imageUrl, stock } = body;
    
    // Créer un nouvel objet pour les données mises à jour
    const productToUpdate = {
      // Conserver les valeurs existantes si aucune nouvelle valeur n'est fournie
      name: name || existingProduct.name,
      description: description || existingProduct.description,
      price: price ? Number(price) : existingProduct.price,
      imageUrl: imageUrl !== undefined ? imageUrl : existingProduct.imageUrl,
      stock: stock !== undefined ? Number(stock) : existingProduct.stock
    };
    
    console.log('Données préparées pour la mise à jour:', productToUpdate);
    
    // Mettre à jour le produit dans le fichier JSON
    const updatedProduct = updateProduct(id, productToUpdate);
    
    if (!updatedProduct) {
      console.error('Échec de la mise à jour du produit');
      return NextResponse.json(
        { error: 'Échec de la mise à jour du produit' },
        { status: 500 }
      );
    }
    
    console.log('Produit mis à jour avec succès:', updatedProduct);
    
    // Retourner le produit mis à jour
    return NextResponse.json(updatedProduct);
  } catch (error) {
    // Journaliser l'erreur
    console.error('Erreur lors de la mise à jour du produit:', error);
    if (error instanceof Error) {
      console.error('Message d\'erreur:', error.message);
      console.error('Stack trace:', error.stack);
    }
    
    // Retourner une réponse d'erreur
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du produit', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id] - Supprimer un produit
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Vérifier si le produit existe
    const existingProduct = getProductById(id);
    
    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Produit non trouvé' },
        { status: 404 }
      );
    }
    
    try {
      // Supprimer le produit en utilisant notre système de stockage de fichiers
      console.log('Tentative de suppression du produit:', id);
      const result = deleteProduct(id);
      
      if (!result) {
        return NextResponse.json(
          { error: 'Erreur lors de la suppression du produit' },
          { status: 500 }
        );
      }
      
      console.log('Produit supprimé avec succès');
      return NextResponse.json(
        { message: 'Produit supprimé avec succès' },
        { status: 200 }
      );
    } catch (deleteError) {
      console.error('Erreur lors de la suppression du produit:', deleteError);
      if (deleteError instanceof Error) {
        console.error('Message d\'erreur:', deleteError.message);
        console.error('Stack trace:', deleteError.stack);
      }
      
      return NextResponse.json(
        { error: 'Erreur lors de la suppression du produit', details: deleteError instanceof Error ? deleteError.message : String(deleteError) },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error('Erreur lors de la suppression du produit:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du produit' },
      { status: 500 }
    );
  }
}
