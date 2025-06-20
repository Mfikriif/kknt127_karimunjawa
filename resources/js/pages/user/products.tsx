import React from 'react';

type Product = {
    id: number;
    name: string;
    description: string;
    category: string;
    type: string;
    gambar?: string;
    link?: string;
};

type Props = {
    products: Product[];
};

export default function LandingProducts({ products }: Props) {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Produk Hasil Laut</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="border rounded shadow p-4">
                        {product.gambar && (
                            <img
                                src={`/storage/${product.gambar}`}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded mb-3"
                            />
                        )}
                        <h2 className="text-lg font-semibold">{product.name}</h2>
                        <p className="text-sm text-gray-600">{product.category} - {product.type}</p>
                        <p className="mt-2 text-sm">{product.description}</p>
                        {product.link && (
                            <a
                                href={product.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 text-sm mt-2 inline-block"
                            >
                                Lihat Detail
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
