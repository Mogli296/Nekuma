export interface Product {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  promoPrice: number;
  pixPrice: number; // usually 5% discount over promoPrice
  image: string;
  category: string;
  stock: number;
  isNew?: boolean;
  isCombo?: boolean;
  isPromo?: boolean;
  rating: number;
  details?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: 'PIX' | 'CREDIT_CARD' | 'BOLETO';
  status: 'PENDING_PAYMENT' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED';
  date: string;
  address: {
    cep: string;
    street: string;
    city: string;
    state: string;
    number: string;
  };
}

export interface Coupon {
  code: string;
  discountType: 'fixed' | 'percentage';
  value: number;
  minPurchase: number;
}
