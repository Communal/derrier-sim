"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Types for the images
interface GridImage {
    id: number;
    src: string;
    alt: string;
    caption?: string;
}

interface ImageGridProps {
    title?: string;
    description?: string;
    images: GridImage[];
}

export default function ImageGrid({ title, description, images }: ImageGridProps) {
    // State to manage the lightbox (full-screen view)
    const [selectedImage, setSelectedImage] = useState<GridImage | null>(null);

    // Limit to exactly 6 images just to be safe based on requirements
    const displayingImages = images.slice(0, 6);

    return (
        <section className="container mx-auto px-4 py-24 space-y-16">

            {/* Header Area */}
            {(title || description) && (
                <div className="max-w-3xl text-left md:text-center md:mx-auto space-y-3">
                    {title && (
                        <h2 className="font-heading text-4xl md:text-5xl font-light text-white tracking-tight">
                            {title}
                        </h2>
                    )}
                    {description && (
                        <p className="font-body text-base md:text-lg text-neutral-400 leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>
            )}

            {/* --- The Grid --- */}
            <div className={cn(
                "grid gap-6 md:gap-8",
                "grid-cols-1",           // Mobile: Single Column (6 rows)
                "lg:grid-cols-2 lg:grid-rows-3" // Large Screen: 2 Columns, 3 Rows
            )}>
                {displayingImages.map((image) => (
                    <div
                        key={image.id}
                        onClick={() => setSelectedImage(image)}
                        className={cn(
                            "relative group aspect-[4/3] overflow-hidden rounded-3xl cursor-pointer",
                            "border border-[#FFFFFF1A] bg-[#121212]",
                            "transition-all duration-300 hover:border-neutral-500 hover:-translate-y-1"
                        )}
                    >
                        {/* Next.js Optimized Image */}
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(max-w-768px) 100vw, 50vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Subtle Overlay on Hover */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-sm font-medium px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm border border-[#FFFFFF33]">
                                View Image
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- Lightbox / Modal --- */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex flex-col animate-in fade-in duration-300 p-4 md:p-10"
                    onClick={() => setSelectedImage(null)} // Close on backdrop click
                >
                    {/* Close Button */}
                    <button className="absolute top-6 right-6 p-3 rounded-full bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white z-10 transition-colors">
                        <X className="w-6 h-6" />
                    </button>

                    {/* Image Container */}
                    <div className="relative flex-1 w-full h-full flex items-center justify-center">
                        <Image
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            width={1600}
                            height={1200}
                            className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl shadow-black/50"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
                        />
                    </div>

                    {/* Caption */}
                    {selectedImage.caption && (
                        <div className="text-center pt-6 pb-4">
                            <p className="font-body text-white text-lg">{selectedImage.caption}</p>
                            <p className="font-body text-neutral-400 text-sm">{selectedImage.alt}</p>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}