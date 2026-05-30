import { neon } from '@neondatabase/serverless'

export interface Review {
  id: string
  name: string
  location: string
  text: string
  rating: number
  approved: boolean
  createdAt: string
}

function getDb() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL nije postavljen')
  return neon(url)
}

async function ensureTable() {
  const sql = getDb()
  await sql`
    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      location TEXT,
      text TEXT NOT NULL,
      rating INTEGER NOT NULL,
      approved BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `
}

export async function getApprovedReviews(): Promise<Review[]> {
  try {
    await ensureTable()
    const sql = getDb()
    const rows = await sql`
      SELECT * FROM reviews WHERE approved = TRUE ORDER BY created_at DESC
    `
    return rows.map(rowToReview)
  } catch {
    return []
  }
}

export async function getAllReviews(): Promise<Review[]> {
  try {
    await ensureTable()
    const sql = getDb()
    const rows = await sql`
      SELECT * FROM reviews ORDER BY created_at DESC
    `
    return rows.map(rowToReview)
  } catch {
    return []
  }
}

export async function addReview(
  data: Omit<Review, 'id' | 'approved' | 'createdAt'>
): Promise<Review> {
  await ensureTable()
  const sql = getDb()
  const id = `${Date.now()}`
  await sql`
    INSERT INTO reviews (id, name, location, text, rating)
    VALUES (${id}, ${data.name}, ${data.location}, ${data.text}, ${data.rating})
  `
  return { ...data, id, approved: false, createdAt: new Date().toISOString() }
}

export async function approveReview(id: string): Promise<void> {
  const sql = getDb()
  await sql`UPDATE reviews SET approved = TRUE WHERE id = ${id}`
}

export async function deleteReview(id: string): Promise<void> {
  const sql = getDb()
  await sql`DELETE FROM reviews WHERE id = ${id}`
}

function rowToReview(row: Record<string, unknown>): Review {
  return {
    id: row.id as string,
    name: row.name as string,
    location: (row.location as string) || '',
    text: row.text as string,
    rating: row.rating as number,
    approved: row.approved as boolean,
    createdAt: row.created_at as string,
  }
}