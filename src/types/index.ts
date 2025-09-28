export interface Price {
  value: number;
  symbol: string;
  isDefault: number;
}

export interface Guarantee {
  start: Date;
  end: Date;
}

export interface Product {
  id: number;
  serialNumber: number;
  isNew: boolean;
  photo: string | null;
  title: string;
  type: string;
  specification: string | null;
  guaranteeStart: Date;
  guaranteeEnd: Date;
  priceUSD: number;
  priceUAH: number;
  orderId: number;
  date: Date;
}

export interface Order {
  id: number;
  title: string;
  description?: string | null;
  date: Date;
  products: Product[];
}

export interface ProductWithOrder extends Product {
  order?: {
    id: number;
    title: string;
    description?: string | null;
    date: Date;
  };
}

export interface ProductState {
  id: number;
  serialNumber: number;
  isNew: boolean;
  photo: string | null;
  title: string;
  type: string;
  specification: string | null
  guaranteeStart: string; 
  guaranteeEnd: string; 
  priceUSD: number;
  priceUAH: number;
  orderId: number;
  date: string;          
}

export interface OrderState {
  id: number;
  title: string;
  description?: string | null;
  date: string;           
  products: ProductState[];
}
