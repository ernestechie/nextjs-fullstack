'use client';

import { throwAxiosError } from '@/helpers/toast';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({ email: '', password: '', username: '' });

  const { email, username, password } = user;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      // Call signup endpoint
      const response = await axios.post('/api/auth/signup', user);
      if (!response.status) console.error('Response -> ', response);

      const apiData = await response.data;

      console.log('Data -> ', apiData);

      setUser({ email: '', password: '', username: '' });

      toast.success('Account Created Successfully!');
      router.push('/login');
    } catch (err) {
      console.log(err);
      throwAxiosError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="p-2 py-16 min-h-screen">
      <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
        <h1 className="mb-4 font-bold text-xl">Sign Up</h1>
        <hr />
        <form className="w-full" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleInputChange}
            />
          </div>
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
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Submit'}
          </button>

          <div className="mt-4 flex items-center justify-end gap-2">
            <span>Already have an account?</span>
            <Link href="/login" className="font-medium text-blue-700">
              Login
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
