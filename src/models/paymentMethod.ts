export interface IpaymentMethodBody {
    payment_method: string;
}

export interface IdataPaymentMethod extends IpaymentMethodBody {
    id: number;
}