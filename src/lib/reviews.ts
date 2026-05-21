export interface Review {
  id: string
  name: string
  location: string
  text: string
  rating: number
  approved: boolean
  createdAt: string
}

export async function getApprovedReviews(): Promise<Review[]> {
  try {
    const { kv } = await import('@vercel/kv')
    const reviews = await kv.get<Review[]>('reviews') ?? []
    return reviews.filter((r) => r.approved)
  } catch {
    return []
  }
}

export async function getAllReviews(): Promise<Review[]> {
  try {
    const { kv } = await import('@vercel/kv')
    return await kv.get<Review[]>('reviews') ?? []
  } catch {
    return []
  }
}

export async function addReview(data: Omit<Review, 'id' | 'approved' | 'createdAt'>): Promise<Review> {
  try {
    const { kv } = await import('@vercel/kv')
    const reviews = await kv.get<Review[]>('reviews') ?? []
    const newReview: Review = {
      ...data,
      id: `${Date.now()}`,
      approved: false,
      createdAt: new Date().toISOString(),
    }
    await kv.set('reviews', [newReview, ...reviews])
    return newReview
  } catch {
    throw new Error('Baza nije dostupna')
  }
}

export async function approveReview(id: string): Promise<void> {
  try {
    const { kv } = await import('@vercel/kv')
    const reviews = await kv.get<Review[]>('reviews') ?? []
    await kv.set('reviews', reviews.map((r) => r.id === id ? { ...r, approved: true } : r))
  } catch {
    throw new Error('Baza nije dostupna')
  }
}

export async function deleteReview(id: string): Promise<void> {
  try {
    const { kv } = await import('@vercel/kv')
    const reviews = await kv.get<Review[]>('reviews') ?? []
    await kv.set('reviews', reviews.filter((r) => r.id !== id))
  } catch {
    throw new Error('Baza nije dostupna')
  }
}