import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import UmkmHero from '@/components/umkm/umkm-hero';
import UmkmAbout from '@/components/umkm/umkm-about';
import UmkmPrograms from '@/components/umkm/umkm-programs';
import UmkmContact from '@/components/umkm/umkm-contact';
import UmkmFooter from '@/components/umkm/umkm-footer';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';

// Interface untuk stats yang diterima dari Controller
interface Stats {
    total_umkm: number;
    total_products: number;
    total_categories: number;
}

// Interface untuk featured products
interface FeaturedProduct {
    name: string;
    description: string;
    price: string;
    image: string;
}

// Interface untuk UMKM data
interface Umkm {
    id: number;
    name: string;
    owner: string;
    category: string;
    description: string;
    address: string;
    products: string[];
    contact: string;
    rating: number;
    image: string;
    instagram?: string;
    facebook?: string;
    is_verified: boolean;
    is_active: boolean;
    created_at: string;
}

// Interface untuk category stats
interface CategoryStat {
    name: string;
    count: number;
}

// Interface untuk props yang diterima dari Controller
interface UmkmPageProps {
    stats?: Stats;
    featured_products?: FeaturedProduct[];
    featured_umkms?: Umkm[];
    categories?: CategoryStat[];
}

export default function UmkmPage({ stats, featured_umkms, categories }: UmkmPageProps) {
    
    // Handle hash navigation ketika halaman pertama kali load
    useEffect(() => {
        const handleHashNavigation = () => {
            const hash = window.location.hash;
            if (hash) {
                // Tunggu sebentar agar DOM sudah ter-render
                setTimeout(() => {
                    const element = document.getElementById(hash.substring(1));
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
        };

        // Handle saat halaman pertama load
        handleHashNavigation();

        // Handle saat hash berubah (back/forward browser)
        window.addEventListener('hashchange', handleHashNavigation);

        return () => {
            window.removeEventListener('hashchange', handleHashNavigation);
        };
    }, []);

    return (
        <>
            <Head title="UMKM Desa Kemujan - Karimunjawa, Jepara" />
            
            <div className="min-h-screen bg-white">
                {/* Hero Section dengan Navigation */}
                <UmkmHero stats={stats} />
                
                {/* About Section */}
                <UmkmAbout />
                
                {/* Programs Section - Terhubung dengan data UMKM dari admin panel */}
                <UmkmPrograms 
                    featured_umkms={featured_umkms} 
                    categories={categories}
                    stats={stats} 
                />

                {/* Contact Section */}
                <UmkmContact />
                
                {/* Footer */}
                <UmkmFooter />

                {/* Scroll to Top Button - Muncul ketika user mencapai section about */}
                <ScrollToTopButton 
                    targetSectionId="hero"
                    showOnSection={true}
                />
            </div>
        </>
    );
}