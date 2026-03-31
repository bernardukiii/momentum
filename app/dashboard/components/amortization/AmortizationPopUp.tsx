'use client'

import React, { useState } from 'react'
import { getSupabaseBrowserClient } from '@/lib/supabase/browser-client'
import Link from 'next/link'

interface AmortizationPopUpProps {
  isOpen: boolean
  onClose: () => void
  userId: string
  onSuccess: () => void // Refresh the dashboard data after saving
}

const AmortizationPopUp: React.FC<AmortizationPopUpProps> = ({ isOpen, onClose, userId, onSuccess }) => {
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [price, setPrice] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const supabase = getSupabaseBrowserClient()

    try {
      // 1. Insert and SELECT the new record back
      const { data, error } = await supabase
        .from('bikes')
        .insert([
          {
            user_id: userId,
            brand: brand,
            model: model,
            price: parseFloat(price),
            total_km: 0, 
            cost_per_km: 0.41 
          }
        ])
        .select() // <--- CRITICAL: Returns the created bike data
        .single() // <--- Ensures we get just the one object

      if (error) throw error
      
      // 2. Pass the new ID back to the dashboard's success handler
      if (data) {
        onSuccess(data.id)
      }
      
      onClose()
    } catch (err) {
      console.error("Error saving bike:", err)
      alert("Failed to save bike. Check console.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-momentum-black/20 backdrop-blur-sm p-4">
      {/* Modal Container */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl border border-white/50 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-momentum-black tracking-tight">
              Let's calculate the amortization for your bike
            </h2>
            <button onClick={onClose} className="text-slate-400 hover:text-momentum-black transition-colors">
              ✕
            </button>
          </div>

          <form onSubmit={handleCalculate} className="space-y-4">
            {/* Brand Field */}
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1 ml-1">Brand</label>
              <input 
                required
                type="text"
                placeholder="e.g. Specialized"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-momentum-primary-purple/20 transition-all"
              />
            </div>

            {/* Model Field */}
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1 ml-1">Model</label>
              <input 
                required
                type="text"
                placeholder="e.g. Tarmac SL7"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-momentum-primary-purple/20 transition-all"
              />
            </div>

            {/* Price Field */}
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1 ml-1">Purchase Price (€)</label>
              <input 
                required
                type="number"
                step="0.01"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-momentum-primary-purple/20 transition-all font-mono"
              />
            </div>

            {/* Calculate Button */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-4 bg-momentum-primary-purple text-white font-bold rounded-2xl shadow-lg shadow-momentum-primary-purple/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? "Saving..." : "Start Tracking Amortization"}
            </button>
          </form>
          
          <p className="mt-4 text-[10px] text-center text-slate-400 font-medium px-4">
            Based on Amsterdam fixed rate (second semester of 2025): <Link href={'https://github.com/Bikeumeter/bikeumeter-data-analysis'} target='_blank' className="text-slate-600">€0.41 / km</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AmortizationPopUp