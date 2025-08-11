import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function UmkmContact() {
    const teamMembers = [
        {
            name: "Wisnu",
            role: "FT",
            image: "/imageassets/radityawisnu.jpg"
        },
        {
            name: "Galang",
            role: "SV",
            image: "/imageassets/Fase4-Profile-pic_galang.jpg"
        },
        {
            name: "Nareswari",
            role: "FISIP",
            image: "/imageassets/Fase4-Profile-Pic_Nareswari.jpg"

        },
        {
            name: "Pramesty",
            role: "FISIP",
            image: "/imageassets/Fase4-Profile-Pic-Pramesty.jpg"
        },
        {
            name: "Najwan",
            role: "FPP", 
            image: "/imageassets/Fase4-Profile-Pic_Najwan.jpg"
        },
        {
            name: "Tondi",
            role: "FPIK",
            image: "/imageassets/Fase4-Profile-pic_MuhammadTondi.jpg"
        },
        {
            name: "Rianza",
            role: "FH",
            image: "/imageassets/Fase4-Profile-Pic_Rianza.jpg"
        },
        {
            name: "Leila",
            role: "FPSI",
            image: "/imageassets/Fase4-Profile-Pic_Leila.png"
        },
        {
            name: "Naomi",
            role: "SV",
            image: "/imageassets/Fase4-Profile-Pic_Naomi.jpg"
        },
        {
            name: "Revinda",
            role: "FPIK",
            image: "/imageassets/Fase4_Profile-pic_Rere.png"
        }
    ];

    return (
        <section id="contact" className="py-20 bg-[rgb(12,52,76)]">
            <div className="container mx-auto px-4">
                {/* Team Members Section - Responsive Layout dengan Overlapping */}
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12 md:mb-6 px-4">
                        Lebih Detail Tentang Program Kerja UMKM 👋
                    </h2>
                    
                    {/* Desktop: Single Row Overlapping Layout */}
                    <div className="hidden lg:flex justify-center items-center">
                        <div className="relative flex items-center">
                            {teamMembers.map((member, index) => (
                                <div 
                                    key={index} 
                                    className="relative group text-center"
                                    style={{
                                        marginLeft: index > 0 ? '-12px' : '0',
                                        zIndex: teamMembers.length - index
                                    }}
                                >
                                    {/* Main Photo Circle */}
                                    <div className="w-24 h-24 rounded-full flex items-center justify-center shadow-xl border-2 border-white group-hover:scale-105 transition-all duration-300 group-hover:z-50 relative mb-6 overflow-hidden">
                                        <img 
                                            src={member.image} 
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                // Fallback jika image tidak ditemukan
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                        />    
                                    </div>
                                    
                                    {/* Role Badge */}
                                        <div className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded-full">
                                            {member.role}
                                        </div>
                                    
                                    {/* Name Below Photo */}
                                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-max">
                                        <h3 className="font-semibold text-white text-sm lg:text-base whitespace-nowrap">
                                            {member.name}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tablet: 2 Rows dengan 5 Foto per Baris (Overlapping) */}
                    <div className="hidden md:block lg:hidden px-4">
                        {/* Baris Pertama - 5 Foto */}
                        <div className="flex justify-center items-center mb-12">
                            <div className="relative flex items-center">
                                {teamMembers.slice(0, 5).map((member, index) => (
                                    <div 
                                        key={index} 
                                        className="relative group text-center"
                                        style={{
                                            marginLeft: index > 0 ? '-10px' : '0',
                                            zIndex: 5 - index
                                        }}
                                    >
                                        {/* Main Photo Circle */}
                                        <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-xl border-2 border-white group-hover:scale-105 transition-all duration-300 group-hover:z-50 relative mb-6 overflow-hidden">
                                            <img 
                                                src={member.image} 
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    // Fallback jika image tidak ditemukan
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />       
                                        </div>
                                        
                                        {/* Role Badge */}
                                            <div className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                                {member.role}
                                            </div>
                                        
                                        {/* Name Below Photo */}
                                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-max">
                                            <h3 className="font-semibold text-white text-sm whitespace-nowrap">
                                                {member.name}
                                            </h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Baris Kedua - 5 Foto */}
                        <div className="flex justify-center items-center">
                            <div className="relative flex items-center">
                                {teamMembers.slice(5, 10).map((member, index) => (
                                    <div 
                                        key={index + 5} 
                                        className="relative group text-center"
                                        style={{
                                            marginLeft: index > 0 ? '-10px' : '0',
                                            zIndex: 5 - index
                                        }}
                                    >
                                        {/* Main Photo Circle */}
                                        <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-xl border-2 border-white group-hover:scale-105 transition-all duration-300 group-hover:z-50 relative mb-6 overflow-hidden">
                                            <img 
                                                src={member.image} 
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    // Fallback jika image tidak ditemukan
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />    
                                        </div>
                                            
                                            {/* Role Badge */}
                                            <div className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                                {member.role}
                                            </div>
                                        
                                        {/* Name Below Photo */}
                                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-max">
                                            <h3 className="font-semibold text-white text-sm whitespace-nowrap">
                                                {member.name}
                                            </h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mobile: 3 Baris dengan 3, 3, 4 Foto (Overlapping) */}
                    <div className="md:hidden px-4">
                        {/* Baris Pertama - 3 Foto */}
                        <div className="flex justify-center items-center mb-8">
                            <div className="relative flex items-center">
                                {teamMembers.slice(0, 3).map((member, index) => (
                                    <div 
                                        key={index} 
                                        className="relative group text-center"
                                        style={{
                                            marginLeft: index > 0 ? '-8px' : '0',
                                            zIndex: 3 - index
                                        }}
                                    >
                                        {/* Main Photo Circle */}
                                        <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl border-2 border-white group-hover:scale-105 transition-all duration-300 group-hover:z-50 relative mb-6 overflow-hidden">
                                            <img 
                                                src={member.image} 
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    // Fallback jika image tidak ditemukan
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />        
                                        </div>
                                        
                                        {/* Role Badge */}
                                            <div className="absolute -top-0.5 -right-0.5 bg-gray-900 text-white text-xs font-bold px-1 py-0.5 rounded-full">
                                                {member.role}
                                            </div>
                                        
                                        {/* Name Below Photo */}
                                        <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-max">
                                            <h3 className="font-semibold text-white text-xs whitespace-nowrap">
                                                {member.name}
                                            </h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Baris Kedua - 3 Foto */}
                        <div className="flex justify-center items-center mb-8">
                            <div className="relative flex items-center">
                                {teamMembers.slice(3, 6).map((member, index) => (
                                    <div 
                                        key={index + 3} 
                                        className="relative group text-center"
                                        style={{
                                            marginLeft: index > 0 ? '-8px' : '0',
                                            zIndex: 3 - index
                                        }}
                                    >
                                        {/* Main Photo Circle */}
                                        <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl border-2 border-white group-hover:scale-105 transition-all duration-300 group-hover:z-50 relative mb-6 overflow-hidden">
                                            <img 
                                                src={member.image} 
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    // Fallback jika image tidak ditemukan
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />                                                   
                                        </div>

                                        {/* Role Badge */}
                                            <div className="absolute -top-0.5 -right-0.5 bg-gray-900 text-white text-xs font-bold px-1 py-0.5 rounded-full">
                                                {member.role}
                                            </div>
                                        
                                        {/* Name Below Photo */}
                                        <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-max">
                                            <h3 className="font-semibold text-white text-xs whitespace-nowrap">
                                                {member.name}
                                            </h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Baris Ketiga - 4 Foto */}
                        <div className="flex justify-center items-center">
                            <div className="relative flex items-center">
                                {teamMembers.slice(6, 10).map((member, index) => (
                                    <div 
                                        key={index + 6} 
                                        className="relative group text-center"
                                        style={{
                                            marginLeft: index > 0 ? '-8px' : '0',
                                            zIndex: 4 - index
                                        }}
                                    >
                                        {/* Main Photo Circle */}
                                        <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl border-2 border-white group-hover:scale-105 transition-all duration-300 group-hover:z-50 relative mb-6 overflow-hidden">
                                            <img 
                                                src={member.image} 
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    // Fallback jika image tidak ditemukan
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />
                                        </div>
                                            
                                        {/* Role Badge */}
                                            <div className="absolute -top-0.5 -right-0.5 bg-gray-900 text-white text-xs font-bold px-1 py-0.5 rounded-full">
                                                {member.role}
                                            </div>
                                        
                                        {/* Name Below Photo */}
                                        <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-max">
                                            <h3 className="font-semibold text-white text-xs whitespace-nowrap">
                                                {member.name}
                                            </h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Main CTA */}
                <div className="text-center">
                    <Link
                        href="/umkm/program-kerja"
                        className="group relative inline-flex items-center space-x-2 transform overflow-hidden rounded-lg border border-white/30 bg-white/5 px-6 py-3 text-white shadow-lg backdrop-blur-md transition-all duration-500 ease-in-out before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-transparent before:via-transparent before:to-transparent before:opacity-0 before:transition-all before:duration-500 hover:scale-[1.03] hover:bg-[#64FFDA] hover:shadow-[#64FFDA]/30 hover:before:from-[#64FFDA]/10 hover:before:to-transparent hover:before:opacity-100 hover:text-[rgb(12,52,76)]"
                    >
                        <span>Lihat Program Kerja</span>
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

        </section>
    );
}