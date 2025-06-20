import { useForm } from '@inertiajs/react';
import React from 'react';

export default function Login() {
    const { data, setData, post, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-full max-w-md">
                <h1 className="text-xl font-bold mb-4">Login Admin</h1>

                <div className="mb-4">
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full border px-3 py-2 rounded"
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div className="mb-4">
                    <label className="block mb-1">Password</label>
                    <input
                        type="password"
                        className="w-full border px-3 py-2 rounded"
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
                    Login
                </button>
            </form>
        </div>
    );
}
