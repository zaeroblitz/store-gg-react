export interface CategoryTypes {
  _id: string;
  name: string;
}

export interface GameItemTypes {
  _id: string;
  name: string;
  thumbnail: string;
  status: string;
  category: CategoryTypes;
}

export interface BankTypes {
  _id: string;
  name: string;
  bankName: string;
  noRekering: string;
}

export interface PaymentTypes {
  _id: string;
  type: string;
  status: string;
  banks: BankTypes[];
}

export interface NominalTypes {
  _id: string;
  coinName: string;
  coinQuantity: number;
  price: number;
}

export interface SignInTypes {
  email: string;
  password: string;
}

export interface UserPayloadTypes {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
}

export interface JWTPayloadTypes {
  player: UserPayloadTypes;
  iat: number;
}
export interface CheckoutTypes {
  accountUser: string;
  name: string;
  nominal: string;
  voucher: string;
  payment: string;
  bank: string;
}
