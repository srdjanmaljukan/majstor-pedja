// ============================================================
// OVDJE MIJENJATE SADRŽAJ SAJTA
// ============================================================

export const siteConfig = {
  // Osnovne informacije
  name: 'Predrag Lazović',
  title: 'Majstor Peđa',
  tagline: 'Kućne popravke koje traju',
  subtitle: 'Brzo, uredno i po dogovoru. Vršimo usluge svih vrsta sitnih kućnih popravki u Beogradu i okolini.',
  location: 'Beograd i okolina',
  phone: '+381642139739',
  email: 'majstorpedja85@gmail.com',
  experience: 'Provjeren majstor',

  // O meni sekcija
  about: `Zanatlija sam sa dugogodišnjim iskustvom u sitnim i krupnijim kućnim popravkama. 
Radim brzo, čisto i uz dogovorenu cenu — bez iznenađenja na kraju. 
Dostupan sam na području Beograda i okoline. 
Svaki posao završim kako bih i za svoju kuću uradio.`,

  // Usluge (možete dodati ili ukloniti)
  services: [
    {
      icon: '⚡',
      name: 'Električne popravke',
      description: 'Zamena osigurača, utičnica i prekidača, zamena fasunga, montaža lustera i plafonjera, zamena grejača bojlera i čišćenje kamenca, zamena grejača veš mašina.',
    },
    {
      icon: '🔧',
      name: 'Vodovodne popravke',
      description: 'Zamena slavina i tuš baterija, popravka vodokotlića, zamena ventila i creva vodokotlića, montaža/demontaža vodokotlića, zamena creva i sigurnosnog ventila bojlera, zamena sifona sudopere, lavaboa i kade.',
    },
    {
      icon: '🌿',
      name: 'Baštenski radovi',
      description: 'Košenje trave, orezivanje žive ograde, održavanje dvorišta.',
    },
    {
      icon: '𖣘',
      name: 'Klima uređaji',
      description: 'Ugradnja, montiranje, popravka i servis klima uređaja.',
    },
  ],

  // Recenzije
  reviews: [
    {
      name: 'Ana P.',
      location: 'Zemun',
      text: 'Odličan posao, sve gotovo za jedan dan. Uredno i tačno kako smo dogovorili. Preporučujem svima!',
      rating: 5,
    },
    {
      name: 'Dragan M.',
      location: 'Novi Beograd',
      text: 'Profesionalac od prvog poziva do završetka. Cijena poštena, rad bez zamjerke.',
      rating: 5,
    },
    {
      name: 'Milica T.',
      location: 'Voždovac',
      text: 'Zvala sam zbog curenja vode — stigao je isti dan i riješio problem za sat vremena.',
      rating: 5,
    },
    {
      name: 'Igor S.',
      location: 'Čukarica',
      text: 'Postavio je pločice u kupatilu, rezultat je fantastičan. Pedantan i tačan.',
      rating: 5,
    },
  ],

  // Cloudinary folder gdje se nalaze slike (podesite u Cloudinary dashboardu)
  cloudinaryFolder: 'majstor-radovi',
}
