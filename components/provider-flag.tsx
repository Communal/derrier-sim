import React from 'react';
import { cn } from '@/lib/utils';

interface ProviderFlagProps {
    provider: string;
    className?: string;
}

export default function ProviderFlag({ provider, className }: ProviderFlagProps) {
    // Determine the country code based on the provider string
    let countryCode = 'us'; // Default to US

    const lowerProvider = provider.toLowerCase();

    if (lowerProvider.includes('o2') || lowerProvider.includes('uk') || lowerProvider.includes('giffgaff') || lowerProvider.includes('ee') || lowerProvider.includes('vodafone')) {
        countryCode = 'gb'; // Great Britain / UK
    } else if (lowerProvider.includes('t-mobile') || lowerProvider.includes('at&t') || lowerProvider.includes('verizon') || lowerProvider.includes('lyca')) {
        countryCode = 'us'; // United States
    }

    return (
        <img
            src={`https://flagcdn.com/${countryCode}.svg`}
            alt={`${provider} flag`}
            // object-cover and rounded-full make it a perfect circle
            className={cn("w-5 h-5 object-cover rounded-full border border-[#FFFFFF33]", className)}
        />
    );
}