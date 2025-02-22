'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({ email: '', password: '' });

  const { email, password } = user;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    //
    try {
    } catch (err) {
      console.log('Error -> ', err);
    } finally {
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Payload -> ', user);
  };

  return (
    <section className="p-2 py-16 min-h-screen">
      <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
        <h1 className="mb-4 font-bold text-xl">Login</h1>
        <hr />
        <form className="w-full" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Submit</button>

          <div className="mt-4 flex items-center justify-end gap-2">
            <span>Don`t have an account?</span>
            <Link href="/signup" className="font-medium text-blue-700">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
