import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { blobs } = await list({
      token: process.env.BLOB_READ_WRITE_TOKEN || 'vercel_blob_rw_2p6WE2Kroh5EozVC_JhV8QDV6yRCwokR66cN0uLB3nbiX5e'
    });

    const images = blobs.filter(blob => 
      blob.pathname.startsWith('Images/') && 
      (blob.pathname.toLowerCase().includes('.jpg') || 
       blob.pathname.toLowerCase().includes('.jpeg') || 
       blob.pathname.toLowerCase().includes('.png') || 
       blob.pathname.toLowerCase().includes('.webp'))
    );

    const videos = blobs.filter(blob => 
      blob.pathname.startsWith('Videos/') && 
      (blob.pathname.toLowerCase().includes('.mp4') || 
       blob.pathname.toLowerCase().includes('.webm') || 
       blob.pathname.toLowerCase().includes('.mov'))
    );

    return NextResponse.json({
      images: images.map(blob => ({
        url: blob.url,
        pathname: blob.pathname
      })),
      videos: videos.map(blob => ({
        url: blob.url,
        pathname: blob.pathname
      }))
    });
  } catch (error) {
    console.error('Error fetching blob media:', error);
    return NextResponse.json({ message: 'Error fetching media' }, { status: 500 });
  }
}