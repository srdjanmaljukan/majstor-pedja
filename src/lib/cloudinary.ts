// ============================================================
// Cloudinary helper funkcije
// Čita single slike i before/after parove
// ============================================================

export interface GalleryImage {
  type: 'single'
  public_id: string
  secure_url: string
  width: number
  height: number
  caption?: string
}

export interface BeforeAfterPair {
  type: 'before-after'
  id: string
  beforeUrl: string
  afterUrl: string
  width: number
  height: number
  caption?: string
}

export type GalleryItem = GalleryImage | BeforeAfterPair

interface CloudinaryResource {
  public_id: string
  secure_url: string
  width: number
  height: number
  context?: { custom?: { caption?: string } }
}

async function fetchResources(
  folder: string,
  credentials: string
): Promise<CloudinaryResource[]> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        expression: `folder:${folder}`,
        sort_by: [{ created_at: 'desc' }],
        max_results: 100,
        with_field: 'context',
      }),
      next: { revalidate: 0 },
    }
  )

  if (!response.ok) return []
  const data = await response.json()
  return data.resources || []
}

export async function getGalleryItems(folder: string): Promise<GalleryItem[]> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    console.warn('Cloudinary credentials nisu postavljeni.')
    return []
  }

  const credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')

  try {
    const [singleResources, beforeAfterResources] = await Promise.all([
      fetchResources(folder, credentials),
      fetchResources(`${folder}/before-after`, credentials),
    ])

    const singles: GalleryImage[] = singleResources.map((r) => ({
      type: 'single' as const,
      public_id: r.public_id,
      secure_url: r.secure_url,
      width: r.width,
      height: r.height,
      caption: r.context?.custom?.caption,
    }))

    const pairsMap = new Map<string, { beforeRes?: CloudinaryResource; afterRes?: CloudinaryResource }>()

    for (const r of beforeAfterResources) {
      const name = r.public_id.split('/').pop() || ''
      if (name.endsWith('_before')) {
        const id = name.replace('_before', '')
        const existing = pairsMap.get(id) || {}
        pairsMap.set(id, { ...existing, beforeRes: r })
      } else if (name.endsWith('_after')) {
        const id = name.replace('_after', '')
        const existing = pairsMap.get(id) || {}
        pairsMap.set(id, { ...existing, afterRes: r })
      }
    }

    const pairs: BeforeAfterPair[] = []
    for (const [id, { beforeRes, afterRes }] of pairsMap) {
      if (beforeRes && afterRes) {
        pairs.push({
          type: 'before-after' as const,
          id,
          beforeUrl: beforeRes.secure_url,
          afterUrl: afterRes.secure_url,
          width: beforeRes.width,
          height: beforeRes.height,
          caption: beforeRes.context?.custom?.caption,
        })
      }
    }

    return [...singles, ...pairs]
  } catch (e) {
    console.error('Cloudinary greška:', e)
    return []
  }
}
