"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { GalleryItem, GalleryImage, BeforeAfterPair } from "@/lib/cloudinary";

// ─── Before/After Slider ────────────────────────────────────────────────────

function BeforeAfterSlider({ item }: { item: BeforeAfterPair }) {
  const [sliderX, setSliderX] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateSlider = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(
      100,
      Math.max(0, ((clientX - rect.left) / rect.width) * 100),
    );
    setSliderX(pct);
  }, []);

  const onMouseDown = () => {
    dragging.current = true;
  };
  const onMouseUp = () => {
    dragging.current = false;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (dragging.current) updateSlider(e.clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    updateSlider(e.touches[0].clientX);
  };

  useEffect(() => {
    const up = () => {
      dragging.current = false;
    };
    window.addEventListener("mouseup", up);
    return () => window.removeEventListener("mouseup", up);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-xl select-none cursor-col-resize"
      style={{ aspectRatio: `${item.width} / ${item.height}` }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onTouchMove={onTouchMove}
    >
      {/* After (donja slika – uvijek vidljiva) */}
      <Image
        src={item.afterUrl}
        alt="Poslije"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 50vw, 33vw"
        draggable={false}
      />

      {/* Before (gornja slika – clip do sliderX) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderX}% 0 0)` }}
      >
        <Image
          src={item.beforeUrl}
          alt="Prije"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 33vw"
          draggable={false}
        />
      </div>

      {/* Linija */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.6)] pointer-events-none"
        style={{ left: `${sliderX}%`, transform: "translateX(-50%)" }}
      />

      {/* Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center pointer-events-none"
        style={{ left: `${sliderX}%` }}
      >
        <svg
          className="w-4 h-4 text-[#0D1B2A]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 9l-3 3 3 3M16 9l3 3-3 3"
          />
        </svg>
      </div>

      {/* Labele Prije / Poslije */}
      <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] font-medium px-2 py-0.5 rounded-full pointer-events-none">
        Prije
      </div>
      <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-medium px-2 py-0.5 rounded-full pointer-events-none">
        Poslije
      </div>
    </div>
  );
}

// ─── Lightbox ───────────────────────────────────────────────────────────────

function Lightbox({
  item,
  onClose,
}: {
  item: GalleryItem;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === "single" ? (
          <Image
            src={item.secure_url}
            alt={item.caption || "Rad"}
            width={item.width}
            height={item.height}
            className="object-contain max-h-[85vh] w-full rounded-xl"
          />
        ) : (
          // Slider u lightboxu — veći format
          <div className="w-full max-w-2xl mx-auto">
            <BeforeAfterSlider item={item} />
          </div>
        )}

        {item.caption && (
          <p className="text-white/60 text-sm text-center mt-3">
            {item.caption}
          </p>
        )}

        <button
          className="absolute -top-4 -right-4 text-white bg-[#E63946] rounded-full w-9 h-9 flex items-center justify-center text-lg shadow-lg"
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  );
}

// ─── Gallery ────────────────────────────────────────────────────────────────

interface GalleryProps {
  items: GalleryItem[];
}

export default function Gallery({ items }: GalleryProps) {
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const isEmpty = !items || items.length === 0;

  return (
    <section id="galerija" className="py-24 bg-[#0D1B2A]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-[#E63946] text-sm font-medium tracking-widest uppercase mb-3">
            Moji radovi
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white">
            Galerija
          </h2>
        </div>

        {isEmpty ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-[#1D3557]/50 border border-white/10 rounded-xl flex items-center justify-center"
              >
                <div className="text-center text-white/30">
                  <div className="text-4xl mb-2">📷</div>
                  <div className="text-xs">Uskoro</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((item) => (
              <div key={item.type === "single" ? item.public_id : item.id}>
                {item.type === "single" ? (
                  // Klikabilna single slika
                  <button
                    className="w-full aspect-square relative overflow-hidden rounded-xl group cursor-pointer"
                    onClick={() => setSelected(item)}
                  >
                    <Image
                      src={(item as GalleryImage).secure_url}
                      alt={item.caption || "Rad"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                  </button>
                ) : (
                  // Before/after slider direktno u gridu + klik za lightbox
                  <div
                    className="cursor-pointer"
                    onClick={() => setSelected(item)}
                  >
                    <BeforeAfterSlider item={item as BeforeAfterPair} />
                  </div>
                )}

                {item.caption && (
                  <p className="text-white/40 text-xs mt-2 px-1 truncate">
                    {item.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <Lightbox item={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
