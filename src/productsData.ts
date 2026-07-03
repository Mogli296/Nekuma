import { Product, Coupon } from './types';

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'prod-1',
    name: 'Planner Semanal Colecionador K-Pop - Nekura Shop',
    description: 'Organize suas rotinas de votações, comebacks, estudos e coleções! Planner A5 com capa dura de toque aveludado, acabamento em verniz localizado e estampa super fofa. 80 folhas pautadas em papel pólen 90g (um sonho para escrever!).',
    originalPrice: 49.90,
    promoPrice: 39.90,
    pixPrice: 37.90, // ~5% disc over promo Price
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
    id: 'prod-2',
    name: 'Glitter Binder Photocard Organizer (Nekura Vault)',
    description: 'O guardião supremo de seus tesouros de K-Pop! Fichário porta-photocards translúcido com brilho holográfico e fecho magnético de patinha. Acompanha 25 páginas ultra transparentes acid-free.',
    originalPrice: 89.90,
    promoPrice: 69.90,
    pixPrice: 66.40,
    image: 'https://i.pinimg.com/736x/cf/f5/e8/cff5e87bccb68c19534538d7552d3467.jpg',
    category: 'Photocards',
    stock: 8,
    isPromo: true,
    rating: 5.0,
    details: [
      'Tamanho A5 de 6 argolas metálicas pretas',
      'Capa em PVC macio e durável com glitter flutuante',
      'Inclui 25 sleeves de página de alta qualidade (comportam até 200 photocards)',
      'Totalmente livre de ácidos e PVC (não danifica seus photocards)',
      'Fecho magnético rosa choque com design exclusivo'
    ]
  },
  {
    id: 'prod-3',
    name: 'Pack Adesivos Deco Holográficos - Estrelas & Confetes',
    description: 'Cartela de adesivos vinílicos premium com efeito holográfico caótico de estrelas e confetes fofos. Impermeáveis e perfeitos para personalizar seu notebook, garrafinha de água ou decorar seus sleeves de photocard.',
    originalPrice: 19.90,
    promoPrice: 14.90,
    pixPrice: 14.15,
    image: 'https://i.pinimg.com/736x/5e/3d/ad/5e3dad403ba0f89c1af932a602384112.jpg',
    category: 'Papelaria',
    stock: 45,
    isNew: true,
    rating: 4.8,
    details: [
      'Tamanho da cartela: 12 x 18 cm',
      'Material: Vinil de alta resistência',
      'Efeito: Brilho holográfico caótico estrelado',
      '15 adesivos individuais recortados eletronicamente',
      'À prova d’água (não desbota e não rasga)'
    ]
  },
  {
    id: 'prod-4',
    name: 'Photocard Fanmade Personalizado - Pack 10 unidades',
    description: 'Crie o seu próprio photocard personalizado! Você envia as imagens de K-pop, Dorama, anime ou fotos pessoais e nós produzimos com o maior carinho do mundo. Perfeito para coleções, freebies ou decoração.',
    originalPrice: 25.00,
    promoPrice: 20.00,
    pixPrice: 19.00,
    image: 'https://i.pinimg.com/736x/93/c1/34/93c13463ffc93253cfd4fea91813ae8d.jpg',
    category: 'Photocards',
    stock: 50,
    rating: 4.9,
    details: [
      'Contém 10 unidades personalizadas frente e verso',
      'Papel fotográfico profissional premium 300g de alta espessura',
      'Laminação brilhante protetora contra riscos e marcas de dedos',
      'Cantos arredondados padrão oficial de K-Pop',
      'Tamanho padrão de mercado: 8,5 x 5,5 cm'
    ]
  },
  {
    id: 'prod-5',
    name: 'Chaveiro Phone Strap Candy Beads - Nekura Shop',
    description: 'Phone strap fofíssimo feito à mão com miçangas premium em tons pastel (candy colors), pérolas artificiais e pingente de estrelinha. O acessório perfeito para prender no celular ou no fecho do seu binder.',
    originalPrice: 24.90,
    promoPrice: 19.90,
    pixPrice: 18.90,
    image: 'https://i.pinimg.com/736x/e8/5f/06/e85f064f782eb3996e7934cd6eb49c6f.jpg',
    category: 'Acessórios',
    stock: 18,
    rating: 4.9,
    details: [
      'Comprimento aproximado: 15 cm',
      'Material: Fio de alta resistência, contas acrílicas e miçangas selecionadas',
      'Fácil aplicação em capinhas de celular ou argolas de pastas',
      'Design exclusivo e colorido feito artesanalmente'
    ]
  },
  {
    id: 'prod-6',
    name: 'Tote Bag Algodão Colecionadora "Cute & Dark"',
    description: 'Sacola ecológica feita de algodão cru preto ultra resistente de 180g, com estampa serigráfica manual do mascote Neku e a frase "Cute enough for k-pop, dark enough for metalcore". Espaçosa e estilosa.',
    originalPrice: 39.90,
    promoPrice: 32.90,
    pixPrice: 31.25,
    image: 'https://cdn.shopify.com/s/files/1/0080/8124/4217/products/tote-bag-cute-dark_1024x1024.jpg?v=1584000000',
    category: 'Acessórios',
    stock: 5,
    rating: 4.6,
    details: [
      'Tamanho: 38 x 42 cm (ideal para carregar cadernos, binders e notebooks)',
      'Alça de ombro confortável de 60 cm',
      'Algodão 100% sustentável pré-encolhido',
      'Estampa durável em Silk Screen de alta cobertura'
    ]
  },
  {
    id: 'prod-7',
    name: 'Sleeves Holográficos Starry Heart (Pack 50 un)',
    description: 'Protetores individuais para photocards com acabamento de coração estrelado holográfico de alta densidade. Dão um efeito mágico para os cards favoritos da sua coleção.',
    originalPrice: 29.90,
    promoPrice: 19.90,
    pixPrice: 18.90,
    image: 'https://cdn.shopify.com/s/files/1/0469/3927/5428/files/Screenshot_2024-08-19_at_14.36.56.png?v=1724071042',
    category: 'Photocards',
    stock: 30,
    isNew: true,
    rating: 4.9,
    details: [
      'Tamanho: 58 x 89 mm (ideal para photocards padrão)',
      'Quantidade: 50 sleeves por pacote',
      'Efeito: Corações e estrelas holográficos na parte frontal',
      'Fundo ultra transparente para não ofuscar o verso do card',
      'Material de alta densidade 100% livre de ácido'
    ]
  },
  {
    id: 'prod-8',
    name: 'KIT COMBO: Super Box Fanmade Neku Star',
    description: 'O combo supremo dos sonhos de papelaria e mimos! Inclui: 1 Planner Semanal, 1 Chaveiro Candy Beads, 2 Cartelas de Adesivos Holográficos e 1 Pack de Photocards Personalizados, tudo em uma linda caixa temática colecionável.',
    originalPrice: 154.60,
    promoPrice: 119.90,
    pixPrice: 113.90,
    image: 'https://cdn.shopify.com/s/files/1/0247/7401/7101/products/stationery-super-box_1024x1024.jpg?v=1599999999',
    category: 'Combos & Kits',
    stock: 6,
    isCombo: true,
    rating: 5.0,
    details: [
      '1x Planner Semanal Colecionador K-Pop (R$ 39,90 individual)',
      '1x Chaveiro Phone Strap Candy Beads (R$ 19,90 individual)',
      '2x Cartelas de Adesivos Holográficos (R$ 29,80 individual)',
      '1x Pack de Photocards Personalizados 10 un (R$ 20,00 individual)',
      'Brinde: Caixa Temática colecionável Nekura Box',
      'Super economia de mais de R$ 34,00!'
    ]
  },
  {
    id: 'prod-9',
    name: 'KIT COMBO: Photocard Collector Starter Pack',
    description: 'Kit ideal para quem quer começar a organizar sua coleção com estilo e segurança. Contém o Glitter Binder Nekura Vault e dois pacotes de Sleeves Holográficos Starry Heart (100 sleeves).',
    originalPrice: 149.70,
    promoPrice: 99.90,
    pixPrice: 94.90,
    image: 'https://cdn.shopify.com/s/files/1/0438/4113/3733/products/binder-set-holographic_1024x1024.jpg?v=1602345679',
    category: 'Combos & Kits',
    stock: 10,
    isCombo: true,
    isPromo: true,
    rating: 5.0,
    details: [
      '1x Glitter Binder Photocard Organizer Nekura Vault',
      '2x Pacotes de Sleeves Holográficos Starry Heart (100 sleeves no total)',
      'Brinde: 1 Card colecionável holográfico exclusivo do mascote Neku',
      'Super desconto: economize R$ 49,80 no combo!'
    ]
  },
  {
    id: 'prod-10',
    name: 'Kit Polaroids Personalizadas - Pack 10 unidades',
    description: 'Lindo pack de fotos estilo revelação polaroid instantânea de alta fidelidade! Você escolhe as imagens (doramas, kpop, viagens, fotos de casal) e nós imprimimos em formato retrô clássico.',
    originalPrice: 34.90,
    promoPrice: 25.00,
    pixPrice: 23.65,
    image: 'https://cdn.shopify.com/s/files/1/0511/4275/4488/products/polaroids-set-retro_1024x1024.jpg?v=1621111111',
    category: 'Photocards',
    stock: 25,
    rating: 4.8,
    details: [
      'Contém 10 polaroids de alta definição',
      'Papel fotográfico profissional brilhoso premium',
      'Borda branca clássica com excelente área de legenda',
      'Tamanho do item: 9,0 x 7,0 cm',
      'Processo de proteção térmica UV contra desbotamento precoce'
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
