import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier n\'a été téléchargé' },
        { status: 400 }
      );
    }
    
    // Vérifier le type de fichier
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Type de fichier non autorisé. Seules les images sont acceptées.' },
        { status: 400 }
      );
    }
    
    // Générer un nom de fichier unique
    const fileExtension = file.name.split('.').pop();
    const randomName = crypto.randomBytes(16).toString('hex');
    const fileName = `${randomName}.${fileExtension}`;
    
    // Convertir le fichier en tableau d'octets
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Définir le chemin où le fichier sera enregistré
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const filePath = join(uploadDir, fileName);
    
    // Écrire le fichier sur le disque
    await writeFile(filePath, buffer);
    
    // Retourner le chemin d'accès relatif à l'image
    const imageUrl = `/uploads/${fileName}`;
    
    return NextResponse.json({ 
      success: true, 
      imageUrl 
    });
  } catch (error) {
    console.error('Erreur lors du téléchargement du fichier:', error);
    return NextResponse.json(
      { error: 'Erreur lors du téléchargement du fichier' },
      { status: 500 }
    );
  }
}
