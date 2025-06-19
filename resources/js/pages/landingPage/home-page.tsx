import LandingSection2 from '@/components/landing-section2';
import LandingSection3 from '@/components/landing-section3';
import LandingSection1 from '@/components/landing-sectoin1';
import NavLanding from '@/components/nav-landing';
import { Head } from '@inertiajs/react';

export default function HomePage() {
    return (
        <div>
            <Head title="Home Page" />
            <NavLanding />

            {/* Section 1 with scroll zoom and animated text */}
            <LandingSection1 />

            {/* Section 2 */}
            <LandingSection2 />

            {/* Section 3 */}
            <LandingSection3 />
        </div>
    );
}
