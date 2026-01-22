import api from "./api";
import { PaymentMethod } from "types/paymentMethod.interface";

const url = "/payment-method"

const paymentMethodService = {

  async getAll(): Promise<PaymentMethod[]> {
    const res = await api.get(`${url}/get-all-payment-methods`);
    return res.data.datas;
  },
};

export default paymentMethodService;
