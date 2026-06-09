export interface User {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  image?: string
  token: string
  refreshToken?: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

// dummyjson Product shape
export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

// Internal cart/selection types
export interface SelectedProduct {
  product: Product
  quantity: number
  deduction: number
}

export interface CartState {
  items: SelectedProduct[]
  totalDeduction: number
}

// Farmer details entered by agro-dealer during transaction
export interface FarmerDetails {
  farmerName:  string
  farmerId:    string
  farmerPhone: string
}

// Transaction Receipt — built from real user + cart + farmer data
export interface TransactionReceipt {
  referenceNumber: string
  date:            string
  walletName:      string
  farmerName:      string
  farmerId:        string
  farmerPhone:     string
  agroDealerName:  string
  merchantId:      string
  phoneNumber:     string
  items: {
    productCode: string
    quantity:    number
    price:       number
    totalAmount: number
    deduction:   number
  }[]
  total: number
}
