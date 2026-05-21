# Majstor Sajt — Uputstvo za postavljanje

Kompletan sajt napravljen u Next.js 14 + Tailwind CSS.

---

## Brzi start (5 minuta)

### 1. Instalirajte dependencies

```bash
npm install
```

### 2. Pokrenite lokalno

```bash
npm run dev
```

Otvorite http://localhost:3000 — sajt je živ!

---

## Prilagođavanje sadržaja

Sve što treba mijenjati nalazi se u **jednom fajlu**:

```
src/lib/config.ts
```

Otvorite taj fajl i promijenite:
- Ime, telefon, email
- Tekst usluga
- "O meni" paragraf
- Recenzije klijenata
- Statistike u hero sekciji

---

## Postavljanje slika (Cloudinary)

### Korak 1 — Napravite besplatan nalog
Idite na https://cloudinary.com i registrujte se besplatno.

### Korak 2 — Pronađite Cloud Name
Nakon registracije, na dashboardu vidite **Cloud Name** (npr. `moj-cloud-123`).

### Korak 3 — Napravite folder
U Cloudinary Media Library napravite folder koji se zove `majstor-radovi`
(ili promijenite ime u `config.ts` pod `cloudinaryFolder`).

### Korak 4 — Uploadujte slike
Jednostavno prevucite slike u folder. To je sve!

### Korak 5 — API ključevi (za automatsko učitavanje)
U Cloudinary Settings → Access Keys pronađite:
- API Key
- API Secret

Napravite fajl `.env.local` (kopirajte iz `.env.local.example`):

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=vas_cloud_name
CLOUDINARY_API_KEY=vas_api_key
CLOUDINARY_API_SECRET=vas_api_secret
```

---

## Kontakt forma (Formspree)

### Korak 1 — Napravite besplatan nalog
Idite na https://formspree.io i registrujte se (besplatno do 50 poruka/mj).

### Korak 2 — Napravite novi form
Kliknite "New Form", unesite email na koji želite da dobijate poruke.

### Korak 3 — Kopirajte Form ID
Dobijate ID oblika `xpwzabcd`. Dodajte u `.env.local`:

```
NEXT_PUBLIC_FORMSPREE_ID=xpwzabcd
```

---

## Deployment na Vercel (besplatno, zauvijek)

### Korak 1 — GitHub
Uploadujte projekt na GitHub (novi repozitorijum).

```bash
git init
git add .
git commit -m "Inicijalni commit"
git remote add origin https://github.com/vaskorisnickoime/majstor-sajt.git
git push -u origin main
```

### Korak 2 — Vercel
1. Idite na https://vercel.com
2. Prijavite se sa GitHub nalogom
3. Kliknite "New Project" → izaberite vaš repozitorijum
4. Kliknite "Deploy" — gotovo!

### Korak 3 — Environment varijable na Vercel
U Vercel projektu idite na Settings → Environment Variables i dodajte sve 4 varijable iz `.env.local`.

### Korak 4 — Vlastiti domen (opciono)
U Vercel → Settings → Domains dodajte vaš domen (npr. `markonikolijc.rs`).
Vercel vam tačno kaže koje DNS zapise treba podesiti kod registrara.

---

## Ažuriranje sadržaja

Svaki put kada promijenite tekst u `config.ts`:

```bash
git add .
git commit -m "Ažuriran sadržaj"
git push
```

Vercel automatski rebuilda sajt za ~30 sekundi. ✓

Svaki put kada dodate slike u Cloudinary — sajt automatski prikazuje nove slike (cache se osvježava svakih sat vremena ili na svakom deployu).

---

## Struktura projekta

```
src/
├── app/
│   ├── layout.tsx      ← Metadata, SEO naslov
│   ├── page.tsx        ← Glavna stranica
│   └── globals.css     ← Globalni stilovi, fontovi
├── components/
│   ├── Navbar.tsx      ← Navigacija (sticky, mobilna)
│   ├── Hero.tsx        ← Hero banner
│   ├── Services.tsx    ← Lista usluga
│   ├── Gallery.tsx     ← Galerija sa lightboxom
│   ├── About.tsx       ← O meni sekcija
│   ├── Reviews.tsx     ← Recenzije
│   ├── Contact.tsx     ← Kontakt forma
│   └── Footer.tsx      ← Footer
└── lib/
    ├── config.ts       ← ← ← JEDINO MJESTO ZA IZMJENE
    └── cloudinary.ts   ← Cloudinary API helper
```

---

## Tehnologije

| Tehnologija | Svrha | Cijena |
|---|---|---|
| Next.js 14 | Framework | Besplatno |
| Tailwind CSS | Stilovi | Besplatno |
| Vercel | Hosting | Besplatno |
| Cloudinary | Slike | Besplatno (25GB) |
| Formspree | Kontakt forma | Besplatno (50/mj) |
| Google Fonts | Playfair + DM Sans | Besplatno |

**Ukupno: 0€/mjesečno** ✓
