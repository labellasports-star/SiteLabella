export type Category = 'camisas' | 'feminino' | 'regatas' | 'manga-longa' | 'calcoes' | 'acessorios';
export type ProductFamily = 'camisa' | 'calcao' | 'meiao' | 'acessorio';

export type Product = {
  id: string;
  name: string;
  categoryLabel: string;
  categories: Category[];
  family: ProductFamily;
  price: number;
  priceDisplay: string;
  sizes?: string;
  specifications?: string[];
  badge?: string;
  shield?: string;
  note?: string;
  conditions?: string[];
  image?: string;
};

export const products: Product[] = [
  {
    id: 'classic', name: 'Classic', categoryLabel: 'Camisas', categories: ['camisas'], family: 'camisa', price: 42.9, priceDisplay: 'R$ 42,90 cada', sizes: 'P ao X4', image: '/images/products/classic.jpg',
    specifications: ['Tecido dry fit', 'Gola redonda', 'Escudo sublimado'], shield: 'Sublimado, bordado e TPU 3D', note: 'Bordado e patch TPU 3D aumentam o valor.'
  },
  {
    id: 'prime', name: 'Prime', categoryLabel: 'Camisas', categories: ['camisas'], family: 'camisa', price: 42.9, priceDisplay: 'R$ 42,90 cada', sizes: 'P ao X4', image: '/images/products/prime.png',
    specifications: ['Tecido dry fit', 'Gola em V', 'Escudo sublimado'], shield: 'Sublimado, bordado e TPU 3D', note: 'Bordado e patch TPU 3D aumentam o valor.'
  },
  {
    id: 'raglan-gola-v', name: 'Raglan Gola V', categoryLabel: 'Camisas', categories: ['camisas'], family: 'camisa', price: 52.9, priceDisplay: 'R$ 52,90 cada', sizes: 'P ao X4', image: '/images/products/raglan-gola-v.jpg',
    specifications: ['Tecido dry texturizado', 'Gola V', 'Gola e punho em ribana', 'Escudo sublimado'], shield: 'Sublimado, bordado e TPU 3D', note: 'Bordado e patch TPU 3D aumentam o valor.'
  },
  {
    id: 'vintage', name: 'Vintage', categoryLabel: 'Camisas', categories: ['camisas'], family: 'camisa', price: 93.9, priceDisplay: 'R$ 93,90 cada', sizes: 'P ao X4', image: '/images/products/vintage.jpg',
    specifications: ['Tecido dry texturizado', 'Acabamento de gola e punho em ribana'], shield: 'Sublimado, bordado e TPU 3D', note: 'Bordado e patch TPU 3D não aumentam o valor.'
  },
  {
    id: 'polo', name: 'Polo', categoryLabel: 'Camisas', categories: ['camisas'], family: 'camisa', price: 57.9, priceDisplay: 'R$ 57,90 cada', sizes: 'P ao X4', image: '/images/products/polo.jpg',
    specifications: ['Tecido dry sport favo', 'Abertura com vista embutida e botões', 'Gola e punho em ribana', 'Conforto e estilo para o dia a dia', 'Escudo sublimado'], shield: 'Sublimado, bordado e TPU 3D', note: 'Bordado e patch TPU 3D aumentam o valor.'
  },
  {
    id: 'polo-feminina', name: 'Polo Feminina', categoryLabel: 'Feminino', categories: ['camisas', 'feminino'], family: 'camisa', price: 57.9, priceDisplay: 'R$ 57,90 cada', sizes: 'P ao X4', image: '/images/products/polo-feminina.jpg',
    specifications: ['Tecido dry sport favo', 'Abertura com vista embutida e botões', 'Gola e punho em ribana', 'Conforto e estilo para o dia a dia', 'Escudo sublimado'], shield: 'Sublimado, bordado e TPU 3D', note: 'Bordado e patch TPU 3D aumentam o valor.'
  },
  {
    id: 'regata-confort', name: 'Regata Confort', categoryLabel: 'Regatas', categories: ['regatas'], family: 'camisa', price: 47.9, priceDisplay: 'R$ 47,90 cada', sizes: 'P ao X4', image: '/images/products/regata-confort.jpg',
    specifications: ['Tecido dry fit', 'Viés na cava e gola'], shield: 'Sublimado, bordado e TPU 3D', note: 'Bordado e patch TPU 3D aumentam o valor.'
  },
  {
    id: 'varsity', name: 'Varsity', categoryLabel: 'Regatas', categories: ['regatas'], family: 'camisa', price: 56.9, priceDisplay: 'R$ 56,90 cada', sizes: 'P ao X4', image: '/images/products/varsity.jpg',
    specifications: ['Tecido dry texturizado', 'Colmeia ribana na cava e gola'], shield: 'Sublimado, bordado e TPU 3D', note: 'Bordado e patch TPU 3D aumentam o valor.'
  },
  {
    id: 'raglan-manga-longa', name: 'Raglan Manga Longa', categoryLabel: 'Manga longa', categories: ['camisas', 'manga-longa'], family: 'camisa', price: 82.9, priceDisplay: 'R$ 82,90 cada', sizes: 'P ao X4', image: '/images/products/manga-longa.jpg',
    specifications: ['Gola dry', 'Logo sublimado', 'Tecido dry UV com proteção contra raios UVA e UVB']
  },
  {
    id: 'regata-confort-feminina', name: 'Regata Confort Feminina', categoryLabel: 'Feminino', categories: ['regatas', 'feminino'], family: 'camisa', price: 47.9, priceDisplay: 'R$ 47,90 cada', sizes: 'P ao X4', image: '/images/products/regata-confort-feminina.jpg',
    specifications: ['Tecido dry fit', 'Viés na cava e gola'], shield: 'Sublimado, bordado e TPU 3D', note: 'Bordado e patch TPU 3D aumentam o valor.'
  },
  {
    id: 'baby-look', name: 'Baby Look', categoryLabel: 'Feminino', categories: ['camisas', 'feminino'], family: 'camisa', price: 47.9, priceDisplay: 'R$ 47,90 cada', sizes: 'P ao X4', image: '/images/products/baby-look.jpg',
    specifications: ['Tecido dry', 'Gola em DRY', 'Escudo sublimado'], shield: 'Sublimado, bordado e TPU 3D', note: 'Bordado e patch TPU 3D aumentam o valor.'
  },
  {
    id: 'camisa-algodao', name: 'Camisa de Algodão', categoryLabel: 'Camisas', categories: ['camisas'], family: 'camisa', price: 49.9, priceDisplay: 'R$ 49,90 cada', sizes: 'P ao XG', image: '/images/products/camisa-de-algodao.jpg',
    specifications: ['Tecido algodão penteado', 'Gola redonda', 'Estampas digitais (DTF)'], shield: 'Sublimado, bordado e TPU 3D', conditions: ['R$ 57,90 cada — tamanhos X1 ao X3.'], note: 'Bordado e patch TPU 3D aumentam o valor.'
  },
  {
    id: 'calcao-jogo', name: 'Calção de Jogo', categoryLabel: 'Calções', categories: ['calcoes'], family: 'calcao', price: 37.9, priceDisplay: 'R$ 37,90 cada', sizes: 'P ao X4', image: '/images/products/calcao-de-jogo.jpg',
    specifications: ['Tecido DRY', 'Ultra leve', 'Secagem rápida', 'Elástico e cordão de regulagem interno'], shield: 'Sublimado, bordado e TPU 3D', note: 'Bordado e patch TPU 3D aumentam o valor.'
  },
  {
    id: 'calcao-jogo-feminino', name: 'Calção de Jogo Feminino', categoryLabel: 'Feminino', categories: ['calcoes', 'feminino'], family: 'calcao', price: 31.9, priceDisplay: 'R$ 31,90 cada', sizes: 'P ao X4', image: '/images/products/calcao-de-jogo-feminino.jpg',
    shield: 'Sublimado, bordado e TPU 3D', note: 'Bordado e patch TPU 3D aumentam o valor.'
  },
  {
    id: 'meiao', name: 'Meião', categoryLabel: 'Acessórios', categories: ['acessorios'], family: 'meiao', price: 26.9, priceDisplay: 'R$ 26,90', image: '/images/products/meiao.jpg',
    specifications: ['Par de meiões.']
  },
  {
    id: 'meia', name: 'Meia', categoryLabel: 'Acessórios', categories: ['acessorios'], family: 'acessorio', price: 9.99, priceDisplay: 'R$ 9,99', image: '/images/products/meia.jpg',
    specifications: ['Par de meias.']
  },
  {
    id: 'bones', name: 'Bonés', categoryLabel: 'Acessórios', categories: ['acessorios'], family: 'acessorio', price: 44, priceDisplay: 'R$ 44,00 cada', image: '/images/products/bones.jpg',
    conditions: ['Até 3 bordados na frente, lado ou traseira.', 'Preço válido para compras a partir de 12 unidades.', 'Trabalhar em múltiplos de 6 unidades: 12, 18, 24, 30 etc.']
  }
];

export const filterLabels: Record<'todos' | Category, string> = {
  todos: 'Todos', camisas: 'Camisas', feminino: 'Feminino', regatas: 'Regatas', 'manga-longa': 'Manga longa', calcoes: 'Calções', acessorios: 'Acessórios'
};

export const formatPrice = (price: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);

export const findProduct = (id: string) => products.find((product) => product.id === id);
