export interface Dealer {
    id: string
    corporateName: string
    cnpj: string
    zipCode: string
    address: string
}

export interface CreateDealerRequest {
    corporateName: string
    cnpj: string
    zipCode: string
}

export interface UpdateDealerRequest {
    corporateName: string
    cnpj: string
    zipCode: string
}