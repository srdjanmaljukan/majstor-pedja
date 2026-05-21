import { siteConfig } from '@/lib/config'

export default function Footer() {
  return (
    <footer className="bg-[#0D1B2A] py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="font-display text-xl text-white">
          {siteConfig.title}
        </div>
        <div className="text-white/40 text-sm">
          © {new Date().getFullYear()} {siteConfig.name}
        </div>
        <a
          href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
          className="text-white/70 text-sm hover:text-white transition-colors"
        >
          {siteConfig.phone}
        </a>
      </div>
    </footer>
  )
}
