import connectDB from '@/lib/mongoose';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  await connectDB();

  const product = await Product.findById(params.id).lean();

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function PUT(req, { params }) {
  await connectDB();

  const data = await req.json();

  const updatedProduct = await Product.findByIdAndUpdate(params.id, data, { new: true }).lean();

  if (!updatedProduct) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(updatedProduct);
}

export async function DELETE(req, { params }) {
  await connectDB();

  const deletedProduct = await Product.findByIdAndDelete(params.id);

  if (!deletedProduct) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Product deleted successfully' });
}
