import React, { useEffect, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { ShoppingBag, Search, Star, Sparkles } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Navbar() {
  return (
    <div className="w-full fixed top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-orange-200/60">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl text-orange-600">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-400 to-amber-500 grid place-items-center text-white"><Sparkles size={18} /></div>
          PlayBlocks
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a className="hover:text-orange-600 transition" href="#features">Featured</a>
          <a className="hover:text-orange-600 transition" href="#catalog">Catalog</a>
          <a className="hover:text-orange-600 transition" href="#about">About</a>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition">
            <ShoppingBag size={18} /> Cart
          </button>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="relative min-h-[80vh] pt-24 overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/95Gu7tsx2K-0F3oi/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/50 to-white pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div className="py-16">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-slate-900">
            Toys that spark imagination
          </h1>
          <p className="mt-4 text-lg text-slate-700 max-w-prose">
            Explore playful, high-quality toys curated for curious minds. From building blocks to STEM kits, find joy in every box.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#catalog" className="px-5 py-3 rounded-xl bg-orange-600 text-white hover:bg-orange-700 transition">Shop Featured</a>
            <a href="#about" className="px-5 py-3 rounded-xl border border-orange-300 text-orange-700 bg-white/70 hover:bg-orange-50 transition">Learn More</a>
          </div>
          <div className="mt-6 flex items-center gap-2 text-amber-600">
            <Star className="fill-amber-400 text-amber-400" size={18} /> Trusted by thousands of happy families
          </div>
        </div>
        <div className="h-[420px]" />
      </div>
    </section>
  )
}

function ProductCard({ item }) {
  return (
    <div className="group bg-white rounded-2xl border border-orange-100 shadow-sm hover:shadow-md transition overflow-hidden">
      <div className="aspect-square bg-gradient-to-br from-orange-50 to-amber-50 grid place-items-center">
        <img src={item.image} alt={item.name} className="w-40 h-40 object-contain transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-slate-900">{item.name}</h3>
          <span className="font-bold text-orange-700">${item.price.toFixed(2)}</span>
        </div>
        <p className="mt-1 text-sm text-slate-600 line-clamp-2">{item.description}</p>
        <div className="mt-2 flex items-center gap-1 text-amber-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={16} className={i < Math.round(item.rating) ? 'fill-amber-400 text-amber-400' : 'text-amber-300'} />
          ))}
        </div>
        <button className="mt-4 w-full px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition">Add to Cart</button>
      </div>
    </div>
  )
}

function Catalog() {
  const [items, setItems] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = new URL(API_BASE + '/products')
        if (query) url.searchParams.set('category', query)
        const res = await fetch(url)
        const data = await res.json()
        setItems(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [query])

  return (
    <section id="catalog" className="relative py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Toys</h2>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border border-orange-200 bg-white">
              <Search size={16} className="text-orange-500" />
              <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Filter by category (e.g. blocks)" className="outline-none text-sm" />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid place-items-center py-16 text-slate-500">Loading toys…</div>
        ) : (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item, idx) => (
              <ProductCard key={idx} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function Footer(){
  return (
    <footer id="about" className="py-12 border-t border-orange-100 bg-white/70">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-sm">
        <div>
          <div className="font-bold text-orange-600 text-lg">PlayBlocks</div>
          <p className="mt-2 text-slate-600">Delightful toys and learning kits for curious kids. Built with love.</p>
        </div>
        <div>
          <div className="font-semibold">Customer Care</div>
          <ul className="mt-2 space-y-1 text-slate-600">
            <li>Shipping & Returns</li>
            <li>Contact Support</li>
            <li>Gift Cards</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold">Newsletter</div>
          <div className="mt-2 flex gap-2">
            <input placeholder="Email address" className="flex-1 px-3 py-2 rounded-lg border border-orange-200" />
            <button className="px-4 py-2 rounded-lg bg-orange-500 text-white">Subscribe</button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Catalog />
      <Footer />
    </div>
  )
}
