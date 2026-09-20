export interface Dealer {
  id: string
  corporateName: string
  cnpj: string
  zipCode: string
  address: string
  number: string
}

export interface CreateDealerRequest {
  corporateName: string
  cnpj: string
  zipCode: string
  number: string
}

export interface UpdateDealerRequest {
  corporateName: string
  cnpj: string
  zipCode: string
  number: string
}