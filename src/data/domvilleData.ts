export interface MenuItem {
  id: string;
  name: string;
  category: 'drinks' | 'cervejas' | 'combos' | 'petiscos' | 'doses' | 'nao-alcoolicos';
  price: number;
  description: string;
  image: string;
  isPopular?: boolean;
  isHouseFavorite?: boolean;
  serves?: string;
  tags?: string[];
}

export interface EventProgram {
  day: string;
  dateBadge: string;
  title: string;
  description: string;
  time: string;
  highlight: string;
  artists: string[];
}

export const DOMVILLE_INFO = {
  name: 'Domville',
  fullName: 'Domville - Casa de Pagode',
  tagline: 'O melhor do pagode, cerveja trincando e os melhores encontros! 🪕🍻✨ | Viva essa experiência.',
  subtitle: 'Casa de Pagode & Entretenimento | Programação da Semana, Reservas e Cardápio 🥁🔥',
  logoUrl: 'https://i.postimg.cc/Z5J5GbJy/IMG-9385.jpg',
  whatsappUrl: 'https://wa.link/avgsz0',
  whatsappRawNumber: '5596991863662',
  whatsappDisplayNumber: '(96) 99186-3662',
  instagramUrl: 'https://www.instagram.com/domvilleap?mdxt=MTRvOWI4M3Y5ZjQ0eA==',
  instagramHandle: '@domvilleap',
  googleMapsUrl: 'https://maps.app.goo.gl/JnpyNoR87gPbEWWM7?g_st=ic',
  address: 'Macapá - AP | Bairro Central',
  operatingHours: 'Sexta a Domingo a partir das 19h30',
  smartposMenuUrl: 'https://wa.link/avgsz0', // Direct link fallback
};

export const MENU_CATEGORIES = [
  { id: 'all', label: 'Tudo' },
  { id: 'drinks', label: 'Drinks & Caipis' },
  { id: 'cervejas', label: 'Cervejas Trincando' },
  { id: 'combos', label: 'Combos VIP' },
  { id: 'petiscos', label: 'Petiscos & Porções' },
  { id: 'doses', label: 'Doses & Garrafas' },
  { id: 'nao-alcoolicos', label: 'Sem Álcool' },
] as const;

export const MENU_ITEMS: MenuItem[] = [
  // --- COMBOS VIP (Mais pedidos e lucrativos em casas de show) ---
  {
    id: 'combo-red-label',
    name: 'Combo Red Label + 4 Red Bull',
    category: 'combos',
    price: 289.0,
    description: '1 Garrafa de Whisky Johnnie Walker Red Label (1L) acompanhada de 4 latas de Red Bull Energy Drink e balde com gelo de coco aromatizado.',
    image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    isHouseFavorite: true,
    serves: 'Até 4 a 6 pessoas',
    tags: ['Mais Vendido', 'Whisky Escocês', 'Gelo de Coco'],
  },
  {
    id: 'combo-black-label',
    name: 'Combo Black Label 12 Anos + 5 Red Bull',
    category: 'combos',
    price: 389.0,
    description: '1 Garrafa de Johnnie Walker Black Label 12 Anos (1L), 5 energéticos Red Bull à sua escolha e balde de gelo especial de coco.',
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    serves: 'Até 6 pessoas',
    tags: ['Premium 12 Anos', 'Camarote VIP'],
  },
  {
    id: 'combo-gin-tanqueray',
    name: 'Combo Gin Tanqueray London Dry + 4 Tônicas',
    category: 'combos',
    price: 279.0,
    description: '1 Garrafa de Gin Tanqueray London Dry (750ml), 4 Águas Tônicas Antarctica, taças oficiais acrílicas e especiarias (zimbro, hibisco e alecrim).',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    isHouseFavorite: true,
    serves: 'Até 4 pessoas',
    tags: ['Refrescante', 'Especiarias Inclusas'],
  },
  {
    id: 'combo-vodka-absolut',
    name: 'Combo Vodka Absolut + 4 Energéticos Tropical',
    category: 'combos',
    price: 269.0,
    description: '1 Garrafa de Vodka Sueca Absolut (1L) com 4 energéticos Red Bull Tropical e frutas cítricas em fatias.',
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80',
    serves: 'Até 5 pessoas',
    tags: ['Vodka Importada', 'Tropical Edition'],
  },

  // --- DRINKS & CAIPIRINHAS ---
  {
    id: 'drink-caipirinha-tropical',
    name: 'Caipirinha Domville da Casa',
    category: 'drinks',
    price: 26.0,
    description: 'A autêntica caipirinha brasileira com cachaça artesanal selecionada, limão tahiti macerado, toque de maracujá e xarope de cana.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    isHouseFavorite: true,
    serves: 'Individual (400ml)',
    tags: ['Carro Chefe', 'Cachaça Artesanal'],
  },
  {
    id: 'drink-gin-tropical',
    name: 'Gin Tropical Sunset',
    category: 'drinks',
    price: 32.0,
    description: 'Gin premium infusionado, Red Bull Tropical Edition, fatias de laranja bahia, maracujá fresco e ramo de alecrim maçaricado.',
    image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    isHouseFavorite: true,
    serves: 'Taça Balloon (500ml)',
    tags: ['Mais Pedido', 'Sucesso nas Fotos'],
  },
  {
    id: 'drink-moscow-mule',
    name: 'Moscow Mule do Pagode',
    category: 'drinks',
    price: 30.0,
    description: 'Vodka selecionada, suco de limão fresco, xarope de gengibre caseiro e a famosa e aveludada espuma artesanal de gengibre com raspas de limão.',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    serves: 'Caneca de Cobre (450ml)',
    tags: ['Espuma Cremosa', 'Refrescante'],
  },
  {
    id: 'drink-caipirosca-morango',
    name: 'Caipirosca de Morango & Kiwi',
    category: 'drinks',
    price: 28.0,
    description: 'Vodka Smirnoff, morangos frescos batidos na coqueteleira, cubos de kiwi e açúcar orgânico no ponto exato.',
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80',
    serves: 'Copo Highball (400ml)',
    tags: ['Frutas Frescas'],
  },
  {
    id: 'drink-aperol-spritz',
    name: 'Aperol Spritz Clássico',
    category: 'drinks',
    price: 34.0,
    description: 'Aperol italiano, espumante brut geladíssimo, dash de club soda e rodela generosa de laranja.',
    image: 'https://images.unsplash.com/photo-1575023782549-62ca0d244b39?auto=format&fit=crop&w=800&q=80',
    serves: 'Taça de Vinho (450ml)',
    tags: ['Clássico Italiano'],
  },

  // --- CERVEJAS TRINCANDO & BALDES ---
  {
    id: 'balde-heineken',
    name: 'Balde Heineken Long Neck (6 un)',
    category: 'cervejas',
    price: 78.0,
    description: '6 garrafas Heineken Long Neck (330ml) servidas no balde de alumínio forrado com gelo triturado e sal grosso para trincar.',
    image: 'https://images.unsplash.com/photo-1608270116812-32b0593f668f?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    isHouseFavorite: true,
    serves: 'Para a mesa',
    tags: ['Trincando de Gelada', 'Balde com 6'],
  },
  {
    id: 'balde-corona',
    name: 'Balde Corona Extra c/ Fatias de Limão (6 un)',
    category: 'cervejas',
    price: 84.0,
    description: '6 garrafas Corona Extra (330ml) com fatias frescas de limão tahiti servidas no balde de gelo.',
    image: 'https://images.unsplash.com/photo-1584225064785-c62a8b43d148?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    serves: 'Para a mesa',
    tags: ['Limão Tahiti', 'Balde Especial'],
  },
  {
    id: 'balde-eisenbahn',
    name: 'Balde Eisenbahn Pilsen (6 un)',
    category: 'cervejas',
    price: 66.0,
    description: '6 unidades de Eisenbahn Pilsen puro malte (355ml) no balde de gelo no ponto exato da refrescância.',
    image: 'https://images.unsplash.com/photo-1518176258769-f227c798150e?auto=format&fit=crop&w=800&q=80',
    serves: 'Para a mesa',
    tags: ['Puro Malte'],
  },
  {
    id: 'cerveja-amstel-long',
    name: 'Amstel Puro Malte Long Neck',
    category: 'cervejas',
    price: 11.0,
    description: 'Cerveja Amstel Puro Malte 355ml estupidamente gelada, sabor leve e marcante.',
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=800&q=80',
    serves: 'Individual (355ml)',
    tags: ['Gelada'],
  },

  // --- PETISCOS DE BOTECO & PORÇÕES ---
  {
    id: 'petisco-picanha-chapa',
    name: 'Picanha na Chapa c/ Macaxeira na Manteiga',
    category: 'petiscos',
    price: 89.0,
    description: '500g de tiras suculentas de picanha grelhadas com cebola roxa, acompanhadas de macaxeira cozida e dourada na manteiga de garrafa e farofa crocante da casa.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    isHouseFavorite: true,
    serves: 'Serve 3 a 4 pessoas',
    tags: ['Carro Chefe', 'Manteiga de Garrafa', 'Porção Família'],
  },
  {
    id: 'petisco-frango-passarinho',
    name: 'Frango a Passarinho Crocante Especial',
    category: 'petiscos',
    price: 52.0,
    description: 'Pedaços crocantes de frango frito marinados com temperos do norte, alho dourado crocante em lascas e molho tártaro artesanal.',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    serves: 'Serve 2 a 3 pessoas',
    tags: ['Super Crocante', 'Alho Dourado'],
  },
  {
    id: 'petisco-calabresa-fritas',
    name: 'Calabresa Defumada Acebolada c/ Batata Frita',
    category: 'petiscos',
    price: 48.0,
    description: 'Linguiça calabresa fatiada acebolada na chapa fervente, coberta com cheiro-verde e servida com porção de batatas fritas crocantes com cheddar e bacon.',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
    serves: 'Serve 2 a 3 pessoas',
    tags: ['Cheddar & Bacon', 'Boteco Raiz'],
  },
  {
    id: 'petisco-bolinho-costela',
    name: 'Bolinhos de Costela Desfiada (8 unidades)',
    category: 'petiscos',
    price: 44.0,
    description: '8 bolinhos empanados na farinha panko com recheio cremoso de costela bovina cozida lentamente por 12 horas e queijo derretido. Acompanha geleia de pimenta.',
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
    isHouseFavorite: true,
    serves: '8 unidades',
    tags: ['Geleia de Pimenta', 'Crocante por Fora'],
  },
  {
    id: 'petisco-isca-peixe',
    name: 'Iscas de Peixe Crocante com Molho Tártaro',
    category: 'petiscos',
    price: 56.0,
    description: 'Tiras de filé de peixe regional empanadas e fritas na hora, acompanhadas de limão galego e molho tártaro especial.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    serves: 'Serve 2 pessoas',
    tags: ['Peixe Fresco', 'Molho Tártaro'],
  },

  // --- DOSES & GARRAFAS ---
  {
    id: 'dose-tequila',
    name: 'Shot de Tequila Jose Cuervo Gold',
    category: 'doses',
    price: 20.0,
    description: 'Dose servida no shot tradicional com rodela de limão e sal.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    serves: 'Dose 50ml',
    tags: ['Shot para Brindar'],
  },
  {
    id: 'dose-jack-daniels',
    name: 'Dose Jack Daniel’s Old No. 7',
    category: 'doses',
    price: 24.0,
    description: 'Whiskey americano Tennessee servido puro ou com gelo cristalino.',
    image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=800&q=80',
    serves: 'Dose 50ml',
    tags: ['Tennessee Whiskey'],
  },
  {
    id: 'garrafa-chandon-brut',
    name: 'Espumante Chandon Réserve Brut 750ml',
    category: 'doses',
    price: 170.0,
    description: 'Garrafa de espumante Chandon Brut servida no balde de acrílico com gelo para comemorações e aniversários especiais.',
    image: 'https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?auto=format&fit=crop&w=800&q=80',
    serves: 'Garrafa 750ml',
    tags: ['Para Comemorar', 'Aniversários'],
  },

  // --- SEM ÁLCOOL & ENERGÉTICOS ---
  {
    id: 'red-bull-energetico',
    name: 'Red Bull Energy Drink (Tradicional / Tropical / Melancia)',
    category: 'nao-alcoolicos',
    price: 18.0,
    description: 'Lata 250ml estupidamente gelada nos sabores Tradicional, Tropical ou Melancia.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    serves: 'Lata 250ml',
    tags: ['Energia'],
  },
  {
    id: 'agua-sem-gas',
    name: 'Água Mineral c/ Gás ou s/ Gás',
    category: 'nao-alcoolicos',
    price: 6.0,
    description: 'Garrafa 500ml servida gelada.',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
    serves: '500ml',
    tags: ['Hidratação'],
  },
  {
    id: 'refrigerante-lata',
    name: 'Refrigerante Lata (Coca-Cola / Guaraná Antarctica)',
    category: 'nao-alcoolicos',
    price: 8.0,
    description: 'Lata 350ml gelada com copo e gelo e limão opcionais.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
    serves: 'Lata 350ml',
    tags: ['Refrescante'],
  },
];

export const WEEKLY_EVENTS: EventProgram[] = [
  {
    day: 'Sexta-feira',
    dateBadge: 'SEXTA VIP',
    title: 'Sexta do Pagode & Amigos',
    description: 'Abertura do fim de semana com o melhor do samba e pagode 90, convidados especiais e rodada de caipirinha em dobro até as 22h.',
    time: 'Abertura às 20h00',
    highlight: 'Caipirinha em Dobro até 22h',
    artists: ['Grupo Puro Pagode', 'Banda Resenha VIP', 'DJ nos intervalos'],
  },
  {
    day: 'Sábado',
    dateBadge: 'NOITE DE GALA',
    title: 'Sábado Premium Domville',
    description: 'A noite mais disputada da cidade! Camarotes com vista exclusiva, cerveja trincando, atrações consagradas e energia contagiante.',
    time: 'Abertura às 20h00',
    highlight: 'Camarotes com atendimento exclusivo',
    artists: ['Banda Domville Ao Vivo', 'Participação Especial', 'DJ Residente'],
  },
  {
    day: 'Domingo',
    dateBadge: 'TARDEZINHA',
    title: 'Tardezinha de Samba & Resenha',
    description: 'Roda de samba 360° no centro da casa, ambiente descontraído, petiscos no capricho e balde de cerveja na promoção.',
    time: 'Abertura às 17h00',
    highlight: 'Roda 360° & Balde Promocional',
    artists: ['Roda dos Mestres', 'Batuque de Raiz'],
  },
];

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  timeAgo: string;
  type: 'image' | 'reel';
  location: string;
}

export interface InstagramStory {
  id: string;
  title: string;
  coverImage: string;
  storyImage: string;
  tagline: string;
}

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'post-1',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=900&q=80',
    caption: 'Que energia linda Macapá! Aquele pagode que a gente não quer que acabe nunca. Sextou com casa cheia e cerveja trincando! Quem tá presente hoje comenta aí! 🥁🔥✨ #Domville #PagodeMacapá #CasaDePagode #Sextou',
    likes: 1420,
    comments: 87,
    timeAgo: 'Há 2 horas',
    type: 'image',
    location: 'Domville - Casa de Pagode',
  },
  {
    id: 'post-2',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80',
    caption: 'Camarotes VIP daquele jeito que vocês amam: visão privilegiada do palco, garçom exclusivo e combo no gelo! Restam poucos camarotes para este sábado. Garanta no link da bio! 🥂🍾 #CamaroteDomville #VipNight #Pagode',
    likes: 980,
    comments: 54,
    timeAgo: 'Ontem',
    type: 'image',
    location: 'Camarotes VIP Domville',
  },
  {
    id: 'post-3',
    imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=80',
    caption: 'Nosso Gin Tropical Sunset passando no seu feed pra avisar: o bar já tá funcionando a todo vapor! Qual o seu drink favorito da nossa nova carta? 🍹🥭🍓 #DrinksDomville #Coquetelaria #GinTropical',
    likes: 1150,
    comments: 42,
    timeAgo: 'Há 1 dia',
    type: 'image',
    location: 'Bar & Coquetelaria Domville',
  },
  {
    id: 'post-4',
    imageUrl: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?auto=format&fit=crop&w=900&q=80',
    caption: 'Banda afinada, cavaquinho chorando e o pandeiro estalando! Aqui o pagode é de verdade e a resenha dura a noite toda. Vem viver essa vibe! 🪕🎶 #RodaDeSamba #PagodeAoVivo #MusicaBoa',
    likes: 1680,
    comments: 112,
    timeAgo: 'Há 2 dias',
    type: 'reel',
    location: 'Palco Principal Domville',
  },
  {
    id: 'post-5',
    imageUrl: 'https://images.unsplash.com/photo-1608270116812-32b0593f668f?auto=format&fit=crop&w=900&q=80',
    caption: 'Cerveja na temperatura que você merece: estupidamente gelada, com aquele gelo cristalino no balde! Marca os amigos que vão rachar esse balde com você hoje! 🍻❄️ #CervejaTrincando #BaldeDeCerveja #Macapá',
    likes: 890,
    comments: 63,
    timeAgo: 'Há 3 dias',
    type: 'image',
    location: 'Domville - Casa de Pagode',
  },
  {
    id: 'post-6',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
    caption: 'Aquela Picanha na Chapa com Macaxeira na Manteiga de Garrafa que é patrimônio das noites da Domville! O cardápio digital tá novinho, corre pra conferir! 🥩🧈 #PetiscosDeBoteco #ComidaDeButeco #Delicia',
    likes: 1340,
    comments: 79,
    timeAgo: 'Há 4 dias',
    type: 'image',
    location: 'Cozinha Gourmet Domville',
  },
];

export const INSTAGRAM_STORIES: InstagramStory[] = [
  {
    id: 'story-1',
    title: 'Ao Vivo',
    tagline: 'O pagode já começou!',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=300&q=80',
    storyImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1080&q=80',
  },
  {
    id: 'story-2',
    title: 'Camarotes',
    tagline: 'Vista exclusiva e conforto',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80',
    storyImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1080&q=80',
  },
  {
    id: 'story-3',
    title: 'Galera',
    tagline: 'Melhor energia da cidade',
    coverImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=300&q=80',
    storyImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1080&q=80',
  },
  {
    id: 'story-4',
    title: 'Drinks',
    tagline: 'Coquetéis exclusivos',
    coverImage: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=300&q=80',
    storyImage: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1080&q=80',
  },
  {
    id: 'story-5',
    title: 'B-Day VIP',
    tagline: 'Comemore seu aniversário',
    coverImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=300&q=80',
    storyImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1080&q=80',
  },
];

export const GUEST_LIST_BENEFITS = [
  'Desconto especial no valor do ingresso na portaria até as 22h30',
  'Acesso pela fila expressa e prioritária da lista amiga',
  'Entrada VIP gratuita para o titular que trouxer 5 ou mais amigos cadastrados',
  'Validação rápida na recepção com documento oficial com foto',
];

export const BIRTHDAY_BENEFITS = [
  {
    title: 'Entrada VIP Gratuita',
    description: 'O aniversariante da semana não paga entrada apresentando documento com foto.',
  },
  {
    title: 'Mesa Personalizada Reservada',
    description: 'Garantia de mesa para seus convidados com decoração especial da casa.',
  },
  {
    title: 'Brinde Especial da Casa',
    description: 'A partir de 10 convidados presentes, ganhe 1 balde de cerveja ou espumante cortesia!',
  },
  {
    title: 'Link de Lista de Presença',
    description: 'Lista exclusiva de desconto na portaria para todos os seus amigos convidados.',
  },
];

export const GALLERY_HIGHLIGHTS = [
  {
    id: 1,
    title: 'Clima do Pagode',
    subtitle: 'Energia surreal em todas as edições',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Camarotes VIP',
    subtitle: 'Conforto e vista privilegiada do palco',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Drinks & Coquetelaria',
    subtitle: 'Apresentação refinada e ingredientes frescos',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Cerveja Trincando',
    subtitle: 'Baldes servidos no gelo para não esquentar',
    image: 'https://images.unsplash.com/photo-1608270116812-32b0593f668f?auto=format&fit=crop&w=800&q=80',
  },
];


