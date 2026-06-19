import { cookies } from "next/headers";
import { customerSessionCookieName, getCurrentCustomer } from "@/features/account/auth-service";
import { HerfeelCheckoutPage } from "@/features/checkout/components/playah-checkout-page";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(customerSessionCookieName)?.value;
  const currentCustomer = token ? await getCurrentCustomer(token) : undefined;
  const customer = currentCustomer?.ok ? currentCustomer.user : undefined;

  return <HerfeelCheckoutPage customer={customer} />;
}
