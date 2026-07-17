import { getMyCart } from "@/action/cart.action";
import CheckoutPage from "@/components/modules/order/CheckoutPage";

export default async function cartPage() {
  const { data } = await getMyCart();
  const cartInfo = data?.data[0]?.items ?? [];
  return <CheckoutPage cartInfo={cartInfo}/>;
}
