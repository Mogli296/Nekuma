import { Product, Coupon } from './types';

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'prod-1',
    name: 'Pack de Adesivos Stray Kids - Run It Edition',
    description: 'Decore seus pertences com estilo rebelde e fofo! Pack de adesivos premium temático da era Run It do Stray Kids. Contém 12 adesivos de vinil laminado de altíssima qualidade, resistentes à água e poeira.',
    originalPrice: 29.90,
    promoPrice: 19.90,
    pixPrice: 18.90,
    image: 'https://i.pinimg.com/736x/cc/87/57/cc875787707709fa04dd2aa6ed316df7.jpg',
    category: 'Papelaria',
    stock: 25,
    isNew: true,
    rating: 4.9,
    details: [
      'Tamanho aproximado de cada adesivo: 5 a 7 cm',
      'Vinil premium resistente à água com acabamento brilhante',
      'Fácil aplicação e remoção sem resíduos',
      'Recorte eletrônico perfeito (die-cut)',
      'Design exclusivo fofo e punk'
    ]
  },
  {
    id: 'prod-2',
    name: 'Toploader Decorado Stray Kids - Run It Edition',
    description: 'Proteja seu photocard mais raro com o toploader mais estiloso! Toploader rígido de alta durabilidade decorado com adesivos exclusivos e acabamento premium holográfico temático do Stray Kids Run It.',
    originalPrice: 24.90,
    promoPrice: 19.90,
    pixPrice: 18.90,
    image: 'https://i.pinimg.com/736x/1c/41/8a/1c418a0e09166cd0fa1f5c6ada93f12c.jpg',
    category: 'Photocards',
    stock: 15,
    rating: 4.8,
    details: [
      'Tamanho padrão para photocard: 3" x 4" (7,6 x 10,1 cm)',
      'PVC rígido ultra transparente livre de ácidos (acid-free)',
      'Película protetora integrada contra arranhões',
      'Decoração manual exclusiva feita por artistas locais',
      'Abertura superior de fácil acesso'
    ]
  },
  {
    id: 'prod-3',
    name: 'Pack Photocard Misterioso (Nekura Mystery Pack)',
    description: 'A dose perfeita de adrenalina e surpresa para sua coleção! Cada pack surpresa lacrado contém 5 photocards fanmade premium aleatórios de alta qualidade de grupos de K-Pop selecionados a dedo.',
    originalPrice: 25.00,
    promoPrice: 18.00,
    pixPrice: 17.10,
    image: 'https://i.pinimg.com/736x/d5/56/70/d55670c1f473230db4c5180de760d159.jpg',
    category: 'Photocards',
    stock: 40,
    isPromo: true,
    rating: 4.9,
    details: [
      'Contém 5 photocards fanmade aleatórios por pacote',
      'Papel fotográfico premium 300g de alta espessura',
      'Bordas arredondadas idênticas ao padrão oficial',
      'Embalagem metalizada rosa choque linda e selada',
      'Chance de ganhar photocards raros com laminação especial'
    ]
  },
  {
    id: 'prod-4',
    name: 'Planner Semanal Colecionador K-Pop - Nekura Shop',
    description: 'Organize suas rotinas de votações, comebacks, estudos e coleções! Planner A5 com capa dura de toque aveludado, acabamento em verniz localizado e estampa super fofa. 80 folhas pautadas em papel pólen 90g.',
    originalPrice: 49.90,
    promoPrice: 39.90,
    pixPrice: 37.90,
    image: 'https://i.pinimg.com/736x/85/fd/57/85fd570a514f5a0782a6930e5b9af095.jpg',
    category: 'Papelaria',
    stock: 12,
    isNew: true,
    rating: 4.9,
    details: [
      'Tamanho A5 (14,8 x 21 cm)',
      'Capa dura com laminação fosca soft-touch',
      'Verniz localizado de alta definição',
      '80 folhas pautadas papel pólen 90g',
      'Bolsinha interna de papel resistente',
      'Fechamento com elástico rosa bubble'
    ]
  },
  {
    id: 'prod-5',
    name: 'Mini Deco Sticker Sheet (Estrelas & Confetes)',
    description: 'Cartela de mini adesivos holográficos brilhantes, perfeitos para decorar toploaders, binders, sleeves e diários. Adicione um efeito de brilho mágico e estrelado nas fotos dos seus idols favoritos!',
    originalPrice: 15.90,
    promoPrice: 12.90,
    pixPrice: 12.25,
    image: 'https://i.pinimg.com/736x/93/c1/34/93c13463ffc93253cfd4fea91813ae8d.jpg',
    category: 'Papelaria',
    stock: 50,
    rating: 4.7,
    details: [
      'Tamanho da cartela: 9 x 14 cm',
      'Material: Adesivo vinílico de alta aderência',
      'Efeito: Brilho estelar holográfico furta-cor',
      'Mais de 40 mini adesivos de estrelinhas e confetes por cartela',
      'À prova de água e com proteção UV'
    ]
  },
  {
    id: 'prod-6',
    name: 'Assinatura Mensal Photocard Club - Nekura Box',
    description: 'O clube de assinatura perfeito para colecionadores apaixonados! Receba mensalmente no conforto da sua casa um kit exclusivo contendo 15 photocards premium de K-Pop com acabamento holográfico, além de mimos e cupons.',
    originalPrice: 45.00,
    promoPrice: 34.90,
    pixPrice: 33.15,
    image: 'https://i.pinimg.com/736x/cf/f5/e8/cff5e87bccb68c19534538d7552d3467.jpg',
    category: 'Photocards',
    stock: 100,
    isNew: true,
    rating: 5.0,
    details: [
      'Envio mensal garantido todo dia 10',
      '15 photocards exclusivos (frente e verso com laminação especial)',
      '1 brinde colecionável surpresa por mês (chaveiros, adesivos, etc)',
      'Frete fixo reduzido ou grátis dependendo do plano',
      'Sem fidelidade: cancele quando quiser'
    ]
  },
  {
    id: 'prod-7',
    name: 'Kit Personalizado K-Pop Colecionador (Sleeves + Chaveiro)',
    description: 'O kit inicial definitivo para quem ama colecionar K-Pop! Inclui um pacote de sleeves protetores holográficos, chaveiro Phone Strap exclusivo feito à mão pela Nekura Shop e adesivos de brinde em uma embalagem linda.',
    originalPrice: 39.90,
    promoPrice: 29.90,
    pixPrice: 28.40,
    image: 'https://i.pinimg.com/736x/5e/3d/ad/5e3dad403ba0f89c1af932a602384112.jpg',
    category: 'Acessórios',
    stock: 20,
    isPromo: true,
    rating: 4.9,
    details: [
      'Inclui 1 Phone Strap candy-colors regulável',
      'Inclui 20 sleeves protetores individuais holográficos de corações',
      'Acompanha cartela mini de adesivos deco de brinde',
      'Embalado para presente em caixinha personalizada rosa e preta',
      'Edição limitada com estoque reduzido'
    ]
  },
  {
    id: 'prod-8',
    name: 'Tote Bag Algodão Colecionadora "Cute & Dark"',
    description: 'Sacola ecológica super estilosa feita de algodão cru preto ultra resistente de 180g, com estampa serigráfica manual do mascote Neku e a frase "Cute enough for k-pop, dark enough for metalcore". Espaçosa e durável.',
    originalPrice: 39.90,
    promoPrice: 32.90,
    pixPrice: 31.25,
    image: 'https://i.pinimg.com/736x/e8/5f/06/e85f064f782eb3996e7934cd6eb49c6f.jpg',
    category: 'Acessórios',
    stock: 8,
    rating: 4.8,
    details: [
      'Tamanho: 38 x 42 cm (ideal para carregar binders, pastas e notebooks)',
      'Alça de ombro confortável de 60 cm reforçada',
      'Algodão 100% sustentável pré-encolhido de gramatura pesada',
      'Estampa de alta durabilidade em Silk Screen'
    ]
  }
];

export const SHIPPINGS_MOCK = [
  {
    id: 'expresso',
    name: 'Neku Jato (Expresso)',
    price: 18.90,
    time: '1 a 3 dias úteis',
    description: 'Mais rápido que uma bat-asa! Ideal para ansiosos.'
  },
  {
    id: 'normal',
    name: 'Normal (PAC)',
    price: 9.90,
    time: '4 a 8 dias úteis',
    description: 'Entrega econômica e garantida em todo o Brasil.'
  },
  {
    id: 'gratis',
    name: 'Normal Grátis (Promoção)',
    price: 0,
    time: '4 a 8 dias úteis',
    description: 'Disponível para compras acima de R$ 150!'
  }
];

export const COUPONS_MOCK: Coupon[] = [
  { code: 'HELLONEKU', discountType: 'percentage', value: 10, minPurchase: 0 }, // 10% off
  { code: 'BIBOTOLOVE', discountType: 'fixed', value: 15, minPurchase: 80 },  // R$ 15 off for min R$ 80
  { code: 'PIXLOVE', discountType: 'percentage', value: 5, minPurchase: 0 }      // extra 5%
];
