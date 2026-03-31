'use client'

import React from "react"
import Image from "next/image"
import Link from "next/link"

const Home: React.FC = () => {
  return (
    <main className=''>
      <div className="min-h-screen bg-white text-momentum-black selection:bg-momentum-primary-purple/30">
        {/* 1. NAV BAR */}
        <nav className="flex justify-between items-center px-6 py-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-momentum-primary-purple rounded-lg flex items-center justify-center text-white font-black">M</div>
            <span className="text-xl font-black tracking-tighter uppercase italic">Momentum</span>
          </div>
          <Link 
            href="/login" 
            className="bg-momentum-primary-purple text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-momentum-midnight-indigo transition-all"
          >
            Log in
          </Link>
        </nav>

        {/* 2. HERO SECTION */}
        <header className="relative px-6 pt-16 pb-24 max-w-7xl mx-auto text-center md:text-left md:flex items-center gap-12">
          <div className="md:w-1/2 space-y-8">
            <div className="inline-block px-4 py-1.5 bg-momentum-primary-purple/10 text-momentum-primary-purple rounded-full text-xs font-bold uppercase tracking-widest">
              Based in Amsterdam 🇳🇱
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9]">
              Turn your <span className="text-momentum-primary-purple italic">kilometers</span> into <span className="underline decoration-momentum-primary-purple">insights</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto md:mx-0">
              <span className="font-bold text-momentum-primary-purple">Demo</span> of a fitness oriented dashboard that calculates your bike's amortization and converts your Strava sweat into Bitterballen, Burgers, and Milanesas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <div className="flex items-center gap-2 px-4 py-4 justify-center">
                <Image src="/strava-logo.svg" width={20} height={20} alt="strava" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">CONNECT WITH STRAVA</span>
              </div>
              
              <Link 
                href="/login" 
                className="px-8 py-4 bg-momentum-midnight-indigo text-white rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl shadow-black/20 text-center"
              >
                Start Demo
              </Link>
            </div>
          </div>

          {/* Hero Visual - Dashboard Preview */}
          <div className="hidden md:block md:w-1/2 relative">
            {/* The Glow Effect */}
            <div className="absolute -inset-4 bg-linear-to-r from-purple-500/20 to-emerald-500/20 blur-3xl rounded-full" />
            
            {/* The Glass Card Frame */}
            <div className="relative bg-white/80 backdrop-blur-md border border-white p-4 rounded-[2rem] shadow-2xl rotate-2">
              
              {/* The Image Container - relative + overflow-hidden to clip the image to the rounded corners */}
              <div className="relative bg-slate-50 rounded-xl aspect-video flex items-center justify-center overflow-hidden">
                  <Image 
                    src='/dashboard-image.png' 
                    alt='Momentum Dashboard Preview'
                    fill // fill the parent container
                    className="object-cover" // cover the area without stretching (cropping edges if needed)
                    priority
                  />
              </div>
              
            </div>
          </div>
        </header>

        {/* 3. FEATURE GRID */}
        <section className="bg-slate-50 py-24 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Amortization Feature */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-white shadow-sm space-y-4">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-2xl">🚲</div>
              <h3 className="text-xl font-black">Bike Amortization</h3>
              <p className="text-sm text-slate-500 font-medium">
                More than biking, you&apos;re saving money. Track your amortization progress and estimated completion time.
              </p>
            </div>

            {/* Momentum Tracking */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-white shadow-sm space-y-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-2xl">📈</div>
              <h3 className="text-xl font-black">Pure Momentum</h3>
              <p className="text-sm text-slate-500 font-medium">
                No clutter. Just the numbers that matter to your performance and your wallet. Simple, fast, and Strava-integrated.
              </p>
            </div>

          </div>
        </section>

        {/* 4. FOOTER */}
        <footer className="py-12 text-center text-slate-400 border-t border-slate-100">
          <p className="text-xs font-bold uppercase tracking-widest">Momentum &copy; 2025 — Made possible by bdki.development</p>
        </footer>
      </div>
    </main>
  )
}

export default Home