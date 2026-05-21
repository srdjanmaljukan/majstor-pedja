import { siteConfig } from '@/lib/config'

export default function About() {
  return (
    <section id="o-meni" className="py-24 bg-[#F8F4EE]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Lijeva strana — avatar i dekoracija */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Dekorativni kvadrat iza */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#1D3557] rounded-2xl" />
              {/* Inicijali avatar */}
              <div className="relative w-64 h-64 bg-[#1D3557] rounded-2xl flex items-center justify-center">
                <span className="font-display text-8xl text-white/20 select-none">
                  {siteConfig.name.charAt(0)}
                </span>
                {/* Badge */}
                <div className="absolute -bottom-4 -right-4 bg-[#E63946] text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg">
                  {siteConfig.experience}
                </div>
              </div>
            </div>
          </div>

          {/* Desna strana — tekst */}
          <div>
            <p className="text-[#E63946] text-sm font-medium tracking-widest uppercase mb-3">
              Ko sam
            </p>
            <h2 className="font-display text-4xl text-[#0D1B2A] mb-6">
              {siteConfig.name}
            </h2>
            <div className="space-y-4">
              {siteConfig.about.split('\n').filter(Boolean).map((paragraph, i) => (
                <p key={i} className="text-[#5A6070] leading-relaxed">
                  {paragraph.trim()}
                </p>
              ))}
            </div>

            {/* Kontakt info */}
            <div className="mt-8 flex flex-col gap-3">
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-3 text-[#0D1B2A] hover:text-[#E63946] transition-colors"
              >
                <span className="text-lg">📞</span>
                <span className="font-medium">{siteConfig.phone}</span>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 text-[#0D1B2A] hover:text-[#E63946] transition-colors"
              >
                <span className="text-lg">✉️</span>
                <span className="font-medium">{siteConfig.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
