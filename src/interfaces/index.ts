export interface IProduct {
  id: 1;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

export interface ICategory {
  name: string;
}

export interface ICart {
  quantity: number;
  product: IProduct;
}

export interface IPriceRange {
  id: number;
  lowerBound: number;
  upperBound: number;
  checked: boolean;
}

export interface IFilterCategory {
  checked: boolean;
  category: string;
}

export interface IUser {
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone: string;
}
