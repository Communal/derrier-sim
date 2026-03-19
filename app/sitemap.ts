import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://www.decarriersim.com/',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        // If you add individual product pages later (e.g., /sim/t-mobile), you would add them here with a priority of 0.8
    ];
}