'use client'

import React from "react"

const Dashboard: React.FC = () => {
  return (
    <main className=''>
        <div className="h-screen flex flex-col justify-around items-center bg-linear-to-t from-momentum-primary-purple via-momentum-bg-soft via-90% to-white">
          <section className="w-full flex flex-col justify-between items-center">
            DASHBOARD PAGE

            <button 
              className="w-full h-12 bg-momentum-primary-purple hover:bg-momentum-primary-indigo-hover text-white font-bold rounded-lg shadow-lg shadow-momentum-primary-purple/20 transition-all active:scale-[0.98] disabled:opacity-70"
              >
              SIGN OUT
            </button>
          </section>
        </div>
    </main>
  )
}

export default Dashboard