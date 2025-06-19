import React from 'react';
import { usePage } from '@inertiajs/react';

type SeaweedType = {
    id: number;
    name: string;
    characteristics?: string;
    benefits?: string;
    image?: string;
};

export default function SeaweedTypesPage() {
    const page = usePage();
    const seaweedTypes = (page.props as any).seaweedTypes as SeaweedType[] || [];

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-8 text-green-700">Jenis Rumput Laut</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {seaweedTypes.map((seaweed) => (
                    <div key={seaweed.id} className="bg-white rounded-lg shadow hover:shadow-md transition p-4">
                        {seaweed.image && (
                            <img
                                src={`/storage/${seaweed.image}`}
                                alt={seaweed.name}
                                className="w-full h-48 object-cover rounded mb-3"
                            />
                        )}
                        <h2 className="text-xl font-semibold text-green-800">{seaweed.name}</h2>
                        <p className="text-gray-600 text-sm mt-1">
                            {seaweed.characteristics?.slice(0, 100)}{seaweed.characteristics && seaweed.characteristics.length > 100 && '...'}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
