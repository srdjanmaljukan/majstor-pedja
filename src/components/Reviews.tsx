'use client'

import { useState } from 'react'
import { Review } from '@/lib/reviews'
import { siteConfig } from '@/lib/config'

// ─── Zvjezdice ──────────────────────────────────────────────

function Stars({ rating, interactive = false, onChange }: {
  rating: number
  interactive?: boolean
  onChange?: (r: number) => void
}) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          disabled={!interactive}
          onClick={() => onChange?.(i)}
          onMouseEnter={() => interactive && setHovered(i)}
          onMouseLeave={() => interactive && setHovered(0)}
          className={`text-xl transition-transform ${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}
        >
          <span className={i <= (hovered || rating) ? 'text-[#E9A800]' : 'text-[#D0CBc0]'}>★</span>
        </button>
      ))}
    </div>
  )
}

// ─── Kartica recenzije ──────────────────────────────────────

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-[#E8E4DC] hover:shadow-md transition-shadow">
      <Stars rating={review.rating} />
      <p className="text-[#3A4050] leading-relaxed my-5 text-base">"{review.text}"</p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-[#1D3557] rounded-full flex items-center justify-center text-white text-sm font-medium">
          {review.name.charAt(0)}
        </div>
        <div>
          <div className="font-medium text-[#0D1B2A] text-sm">{review.name}</div>
          {review.location && <div className="text-[#8A90A0] text-xs">{review.location}</div>}
        </div>
      </div>
    </div>
  )
}

// ─── Forma za slanje recenzije ──────────────────────────────

function ReviewForm() {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [text, setText] = useState('')
  const [rating, setRating] = useState(5)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !text || !rating) return
    setStatus('sending')

    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, location, text, rating }),
    })

    setStatus(res.ok ? 'success' : 'error')
  }

  if (status === 'success') {
    return (
      <div className="bg-white rounded-2xl p-8 border border-[#E8E4DC] text-center">
        <div className="text-4xl mb-3">🙏</div>
        <p className="font-medium text-[#0D1B2A]">Hvala na recenziji!</p>
        <p className="text-[#8A90A0] text-sm mt-1">Biće vidljiva nakon odobravanja.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-8 border border-[#E8E4DC]">
      <p className="font-medium text-[#0D1B2A] mb-5">Ostavite recenziju</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Vaše ime *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-[#F7F5F2] text-[#0D1B2A] placeholder-[#A0A8B0] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1D3557]/30 transition"
          />
          <input
            type="text"
            placeholder="Lokacija (opcionalno)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-[#F7F5F2] text-[#0D1B2A] placeholder-[#A0A8B0] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1D3557]/30 transition"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[#3A4050] text-sm">Ocjena:</span>
          <Stars rating={rating} interactive onChange={setRating} />
        </div>

        <textarea
          placeholder="Vaša recenzija *"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          maxLength={500}
          rows={3}
          className="w-full bg-[#F7F5F2] text-[#0D1B2A] placeholder-[#A0A8B0] rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1D3557]/30 transition resize-none"
        />

        {status === 'error' && (
          <p className="text-[#E63946] text-sm">Greška, pokušajte ponovo.</p>
        )}

        <button
          type="submit"
          disabled={status === 'sending' || !name || !text}
          className="w-full bg-[#1D3557] hover:bg-[#2A4A70] disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition text-sm"
        >
          {status === 'sending' ? 'Slanje...' : 'Pošalji recenziju'}
        </button>
      </form>
    </div>
  )
}

// ─── Glavna Reviews sekcija ─────────────────────────────────

interface ReviewsProps {
  reviews: Review[]
}

export default function Reviews({ reviews }: ReviewsProps) {
  // Fallback na hardkodirane iz config-a ako nema KV recenzija
  const hasLiveReviews = reviews && reviews.length > 0
  const displayReviews = hasLiveReviews
    ? reviews
    : siteConfig.reviews.map((r, i) => ({ ...r, id: `static-${i}`, approved: true, createdAt: '' }))

  return (
    <section id="recenzije" className="py-24 bg-[#EDE8E0]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-[#E63946] text-sm font-medium tracking-widest uppercase mb-3">
            Šta kažu klijenti
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-[#0D1B2A]">
            Recenzije
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayReviews.map((review) => (
            <ReviewCard key={review.id} review={review as Review} />
          ))}
          <ReviewForm />
        </div>
      </div>
    </section>
  )
}
