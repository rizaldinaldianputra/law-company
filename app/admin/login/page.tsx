'use client';

import { useState } from 'react';
import { loginAction } from '../actions';
import { useRouter } from 'next/navigation';
import { Lock, Shield, ArrowRight, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('password', password);

    const result = await loginAction(formData);

    if (result.success) {
      router.push('/admin');
      router.refresh();
    } else {
      setError(result.error || 'Login failed');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Cinematic Elements */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 grayscale"
          style={{ backgroundImage: "url('/images/hero-bg.png')" }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black via-black/80 to-black" />
        
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-maroon/20 blur-[120px] rounded-full animate-pulse" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-2xl p-10 shadow-2xl overflow-hidden relative group">
          {/* Subtle line at top */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-gold to-transparent opacity-50" />
          
          <div className="text-center mb-10">
            <div className="inline-flex w-16 h-16 items-center justify-center rounded-2xl bg-maroon/10 border border-maroon/20 text-maroon mb-6 group-hover:scale-110 transition-transform duration-500">
              <Shield className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-white mb-2 tracking-wide">Secure Access</h1>
            <p className="text-gray-500 text-sm tracking-widest uppercase font-bold">Admin Portal Control</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gold uppercase tracking-[0.2em] ml-1">Access Credentials</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  className="w-full bg-white/5 border border-white/10 rounded-sm py-4 px-12 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold/50 focus:bg-white/[0.08] transition-all"
                  required
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gold/50" />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs py-3 px-4 rounded-sm text-center animate-shake">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-maroon hover:bg-maroon-dark text-white font-bold tracking-[0.2em] uppercase text-xs py-5 rounded-sm flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(124,29,29,0.3)] disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Authenticate Access <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em]">
              Authorized Personnel Only
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center animate-fade-in opacity-50" style={{ animationDelay: '1s' }}>
          <button 
            onClick={() => router.push('/')}
            className="text-gray-500 text-[10px] uppercase tracking-widest hover:text-gold transition-colors"
          >
            ← Return to Public Site
          </button>
        </div>
      </div>
    </div>
  );
}
