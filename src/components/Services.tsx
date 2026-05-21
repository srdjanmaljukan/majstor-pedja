import { siteConfig } from '@/lib/config'

export default function Services() {
  return (
    <section id="usluge" className="py-24 bg-[#F8F4EE]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="text-[#E63946] text-sm font-medium tracking-widest uppercase mb-3">
            Šta nudim
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-[#0D1B2A]">
            Usluge
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.services.map((service, i) => (
            <div
              key={service.name}
              className="group bg-white border border-[#E8E4DC] rounded-2xl p-7 hover:border-[#1D3557] hover:shadow-lg transition-all duration-300"
            >
              <div className="text-3xl mb-5">{service.icon}</div>
              <h3 className="font-display text-xl text-[#0D1B2A] mb-3">
                {service.name}
              </h3>
              <p className="text-[#5A6070] text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA ispod */}
        <div className="mt-12 text-center">
          <p className="text-[#5A6070] mb-4">
            Niste sigurni da li radim to što vam treba?
          </p>
          <a
            href="#kontakt"
            className="inline-block border-2 border-[#0D1B2A] text-[#0D1B2A] px-8 py-3 rounded-xl text-sm font-medium hover:bg-[#0D1B2A] hover:text-white transition-colors"
          >
            Pitajte me
          </a>
        </div>
      </div>
    </section>
  )
}
