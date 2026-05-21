'use client'

import { useState } from 'react'
import { siteConfig } from '@/lib/config'

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID
    if (!formId) {
      // Dev mode — samo simuliraj slanje
      setTimeout(() => setStatus('sent'), 1000)
      return
    }

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="kontakt" className="py-24 bg-[#F8F4EE]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Lijeva strana */}
          <div>
            <p className="text-[#E63946] text-sm font-medium tracking-widest uppercase mb-3">
              Stupite u kontakt
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-[#0D1B2A] mb-6">
              Pišite mi
            </h2>
            <p className="text-[#5A6070] leading-relaxed mb-10">
              Opišite problem i javim se u roku od nekoliko sati. Procjena i dolazak na lice mjesta je besplatno.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#1D3557] rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0">
                  📞
                </div>
                <div>
                  <div className="text-xs text-[#8A90A0] mb-0.5">Telefon</div>
                  <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="font-medium text-[#0D1B2A] hover:text-[#E63946] transition-colors">
                    {siteConfig.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#1D3557] rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0">
                  ✉️
                </div>
                <div>
                  <div className="text-xs text-[#8A90A0] mb-0.5">Email</div>
                  <a href={`mailto:${siteConfig.email}`} className="font-medium text-[#0D1B2A] hover:text-[#E63946] transition-colors">
                    {siteConfig.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#1D3557] rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0">
                  📍
                </div>
                <div>
                  <div className="text-xs text-[#8A90A0] mb-0.5">Područje rada</div>
                  <div className="font-medium text-[#0D1B2A]">{siteConfig.location}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Desna strana — forma */}
          <div>
            {status === 'sent' ? (
              <div className="bg-white border border-[#E8E4DC] rounded-2xl p-10 text-center h-full flex items-center justify-center">
                <div>
                  <div className="text-5xl mb-4">✓</div>
                  <h3 className="font-display text-2xl text-[#0D1B2A] mb-2">Poruka poslana!</h3>
                  <p className="text-[#5A6070]">Javim se uskoro.</p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white border border-[#E8E4DC] rounded-2xl p-8 space-y-5"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#8A90A0] mb-1.5">Ime i prezime</label>
                    <input
                      name="name"
                      required
                      className="w-full border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm text-[#0D1B2A] focus:outline-none focus:border-[#1D3557] transition-colors bg-[#FAFAF8]"
                      placeholder="Vaše ime"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#8A90A0] mb-1.5">Telefon</label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      className="w-full border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm text-[#0D1B2A] focus:outline-none focus:border-[#1D3557] transition-colors bg-[#FAFAF8]"
                      placeholder="+381 ..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#8A90A0] mb-1.5">Vrsta posla</label>
                  <input
                    name="service"
                    className="w-full border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm text-[#0D1B2A] focus:outline-none focus:border-[#1D3557] transition-colors bg-[#FAFAF8]"
                    placeholder="npr. Zamjena slavine, farbanje sobe..."
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#8A90A0] mb-1.5">Opis</label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full border border-[#E8E4DC] rounded-xl px-4 py-3 text-sm text-[#0D1B2A] focus:outline-none focus:border-[#1D3557] transition-colors bg-[#FAFAF8] resize-none"
                    placeholder="Opišite problem ukratko..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-[#0D1B2A] text-white py-4 rounded-xl text-sm font-medium hover:bg-[#1D3557] transition-colors disabled:opacity-60"
                >
                  {status === 'sending' ? 'Slanje...' : 'Pošaljite poruku'}
                </button>

                {status === 'error' && (
                  <p className="text-red-500 text-sm text-center">
                    Greška pri slanju. Pozovite me direktno.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
