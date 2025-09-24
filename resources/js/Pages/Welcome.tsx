import React from 'react';
import { Link } from '@inertiajs/react';

export default function Welcome({ canLogin, canRegister, laravelVersion, phpVersion }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">Welcome to Laravel + Inertia + React + TS</h1>
      <p className="mb-6">PHP {phpVersion} · Laravel {laravelVersion}</p>

      <div className="space-x-4">
        {canLogin && <Link href="/login" className="text-blue-500">Login</Link>}
        {canRegister && <Link href="/register" className="text-blue-500">Register</Link>}
      </div>
    </div>
  );
}
