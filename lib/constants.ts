// Demo credentials: username = emilys | password = emilyspass
export const API_BASE_URL = 'https://dummyjson.com'
export const PRODUCTS_URL = `${API_BASE_URL}/products`
export const AUTH_URL     = `${API_BASE_URL}/auth/login`

export const WALLET_BALANCE = 2400

export const SUBSIDY_DEDUCTIONS: Record<string, number> = {
  default: 50,
}

export function getSubsidyDeduction(price: number): number {
  // 10% subsidy deduction, minimum 20 KES, max 200 KES
  const deduction = Math.floor(price * 0.10)
  return Math.min(Math.max(deduction, 20), 200)
}

export const MOCK_RECEIPT = {
  referenceNumber: 'Abakfah3913af',
  date:            '16 March 2024',
  walletName:      'Inua Mkulima',
  farmerName:      'Gladys Kivuva',
  farmerId:        '12345678',
  farmerPhone:     '0722345678',
  agroDealerName:  'Kimathi Agrovet',
  merchantId:      'MKT-0091',
  phoneNumber:     '0711234567',
}
