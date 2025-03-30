export interface Order {
  id: string;
  coilName: string;
  orderDate: string;
  reqDate: string;
  quantity: string;
  amount: string;
}

export interface Coil {
  id: string;
  coilName: string;
  ProductCode: string;
  coilDescription: string;
  unitRate: string;
  wireGauge: string;
}

export interface Wire {
  id: string;
  gauge: string;
  boxes: number;
  weight: string;
  deliveredOn: string;
  isUsed: boolean;
}
