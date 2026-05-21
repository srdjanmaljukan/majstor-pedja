// ============================================================
// Tipovi i helper funkcije za galeriju
// Koristi Vercel Blob za slike i KV za metadata
// ============================================================

export type GalleryItemType = 'single' | 'before-after'

export interface SingleImage {
  type: 'single'
  id: string
  url: string
  caption?: string
  createdAt: string
}

export interface BeforeAfterImage {
  type: 'before-after'
  id: string
  beforeUrl: string
  afterUrl: string
  caption?: string
  createdAt: string
}

export type GalleryItem = SingleImage | BeforeAfterImage

// Dohvata sve stavke galerije iz Vercel KV
// Čuva se kao JSON lista u ključu "gallery:items"
export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    // Dinamički import da ne puca u dev bez KV
    const { kv } = await import('@vercel/kv')
    const items = await kv.get<GalleryItem[]>('gallery:items')
    return items ?? []
  } catch {
    return []
  }
}

export async function saveGalleryItems(items: GalleryItem[]): Promise<void> {
  const { kv } = await import('@vercel/kv')
  await kv.set('gallery:items', items)
}

export async function addGalleryItem(item: GalleryItem): Promise<void> {
  const items = await getGalleryItems()
  // Novi ide na početak (najnoviji prvi)
  await saveGalleryItems([item, ...items])
}

export async function deleteGalleryItem(id: string): Promise<void> {
  const { del } = await import('@vercel/blob')
  const items = await getGalleryItems()
  const item = items.find(i => i.id === id)

  if (item) {
    // Briši slike iz Blob storage
    if (item.type === 'single') {
      await del(