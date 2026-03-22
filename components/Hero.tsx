'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setTextVisible(true), 300);
  }, []);

  const rates = [
    { symbol: 'BTC', price: '6,532,000', change: '+2.3%', positive: true },
    { symbol: 'ETH', price: '352,000', change: '+1.8%', positive: true },
    { symbol: 'USDT', price: '92.30', change: '-0.1%', positive: false },
  ];

  return (
    <section className="relative min-h-screen pt-32 pb-20 px-6">
      {/* Particles Background */}
      <div className="particle-container" />

      {/* Morph Background */}
      <div className="morph-bg" />

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Badge */}
        <div className="flex justify-center mb-12 reveal" style={{ opacity: mounted ? 1 : 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-neo border border-neon-cyan rounded-full">
            <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-neon-cyan tracking-wider uppercase">Neo-Future</span>
          </div>
        </div>

        {/* Glitch Heading */}
        <div className="text-center mb-16 reveal" style={{ transitionDelay: '0.1s', opacity: mounted ? 1 : 0 }}>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight leading-tight relative glitch-text" data-text="CRYPTO">
            <span className="text-gradient-neon">CRYPTO</span>
            <span className="text-gradient-neon">EXCHANGE</span>
            <span className="text-neon-cyan">.2077</span>
          </h1>
          <p className="text-2xl md:text-3xl text-text-secondary max-w-4xl mx-auto mb-10 font-light">
            Обмен криптовалюты в <span className="text-neon-cyan font-semibold">неоновом будущем</span>
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="#cities" className="btn-neon inline-flex items-center gap-2 text-lg">
              Начать обмен
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link href="#contact" className="btn-neon-secondary inline-flex items-center gap-2">
              Связаться
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Cyberpunk Cards Grid */}
        <div className="grid md:grid-cols-12 gap-6 mb-16">
          {/* Live Rates - Large Card */}
          <div className="md:col-span-8 reveal" style={{ transitionDelay: '0.2s', opacity: mounted ? 1 : 0 }}>
            <div className="card-cyber relative">
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-neon-cyan to-neon-purple rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-void-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">LIVE RATES</h3>
                      <div className="text-neon-cyan text-xs tracking-wider uppercase">Real-time</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-neon-cyan/10 border border-neon-cyan/30 rounded-full">
                    <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
                    <span className="text-xs font-semibold text-neon-cyan">LIVE</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {rates.map((rate, index) => (
                    <div
                      key={rate.symbol}
                      className="glass-neo border border-white/5 rounded-xl p-6 hover:border-neon-cyan/50 transition-all duration-300"
                      style={{ transitionDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-neon-purple to-neon-pink rounded-xl flex items-center justify-center text-xl font-bold text-void-bg">
                            {rate.symbol.slice(0, 2)}
                          </div>
                          <div>
                            <div className="text-2xl font-black text-white font-mono">{rate.price}</div>
                            <div className="text-sm text-text-tertiary">₽ RUB</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-bold ${rate.positive ? 'text-neon-lime' : 'text-neon-pink'}`}>
                            {rate.change}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats - Medium Card */}
          <div className="md:col-span-4 space-y-6 reveal" style={{ transitionDelay: '0.3s', opacity: mounted ? 1 : 0 }}>
            <div className="card-cyber p-8">
              <div className="text-neon-cyan text-sm tracking-wider uppercase mb-6">STATISTICS</div>
              <div className="space-y-6">
                <div>
                  <div className="text-5xl font-black text-gradient-neon mb-2">100K+</div>
                  <div className="text-text-secondary">Transactions</div>
                </div>
                <div>
                  <div className="text-5xl font-black text-gradient-neon mb-2">98%</div>
                  <div className="text-text-secondary">Satisfaction</div>
                </div>
                <div>
                  <div className="text-5xl font-black text-gradient-neon mb-2">15m</div>
                  <div className="text-text-secondary">Avg. Time</div>
                </div>
              </div>
            </div>

            {/* Small Features */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '⚡', label: 'FAST' },
                { icon: '🔒', label: 'SECURE' },
                { icon: '🌍', label: 'GLOBAL' },
                { icon: '✨', label: 'PREMIUM' },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="card-cyber p-6 text-center hover:border-neon-cyan/50 transition-all duration-300"
                  style={{ transitionDelay: `${(index + 4) * 0.1}s` }}
                >
                  <div className="text-4xl mb-2">{feature.icon}</div>
                  <div className="text-neon-cyan text-sm font-bold tracking-wider uppercase">
                    {feature.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex justify-center gap-6 flex-wrap reveal" style={{ transitionDelay: '0.4s', opacity: mounted ? 1 : 0 }}>
          {[
            { icon: '⭐', label: '4.9 Rating', color: 'neon-yellow' },
            { icon: '🛡️', label: '100% Secure', color: 'neon-cyan' },
            { icon: '⚡', label: '15m Exchange', color: 'neon-lime' },
            { icon: '🌍', label: 'Worldwide', color: 'neon-purple' },
          ].map((badge, index) => (
            <div
              key={index}
              className="glass-neo border border-white/10 px-6 py-3 flex items-center gap-3 hover:border-neon-cyan/50 transition-all duration-300"
              style={{ transitionDelay: `${(index + 6) * 0.1}s` }}
            >
              <span className="text-2xl">{badge.icon}</span>
              <span className={`text-${badge.color} text-sm font-semibold tracking-wider uppercase`}>
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .reveal {
          animation: slide 0.8s ease forwards;
        }
      `}</style>
    </section>
  );
}
