import { siteConfig } from '@/lib/config'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0D1B2A] overflow-hidden pt-24 pb-12 md:pt-0 md:pb-0">
      {/* Dekorativna mrežasta pozadina */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Akcentni krug */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#1D3557]/40 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-sm px-4 py-1.5 rounded-full mb-8 animate-fade-up stagger-1">
          <span className="w-2 h-2 bg-[#E63946] rounded-full" />
          {siteConfig.location}
        </div>

        {/* Naslov */}
        <h1 className="font-display text-5xl md:text-7xl text-white leading-tight mb-6 animate-fade-up stagger-2">
          {siteConfig.tagline}
        </h1>

        {/* Podnaslov */}
        <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up stagger-3">
          {siteConfig.subtitle}
        </p>

        {/* CTA dugmad */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up stagger-4">
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
            className="bg-[#E63946] text-white px-8 py-4 rounded-xl text-base font-medium hover:bg-[#FF5A63] transition-colors w-full sm:w-auto text-center"
          >
            Pozovite: {siteConfig.phone}
          </a>
          <a
            href="#galerija"
            className="border border-white/30 text-white px-8 py-4 rounded-xl text-base hover:bg-white/10 transition-colors w-full sm:w-auto text-center"
          >
            Pogledajte radove
          </a>
        </div>

        {/* Stat brojke */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-up stagger-5">
          {[
            { value: '200+', label: 'zadovoljnih klijenata' },
            { value: '3', label: 'vrste usluga' },
            { value: '100%', label: 'tačna cena' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl text-white mb-1">{stat.value}</div>
              <div className="text-white/40 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indikator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  )
}
