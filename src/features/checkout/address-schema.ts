import { z } from "zod";

export const addressBaseSchema = z.object({
  firstName: z.string().min(1, "Bắt buộc"),
  lastName: z.string().min(1, "Bắt buộc"),
  company: z.string().optional(),
  address1: z.string().min(1, "Bắt buộc"),
  address2: z.string().optional(),
  city: z.string().min(1, "Bắt buộc"),
  state: z.string().min(1, "Bắt buộc"),
  postcode: z.string().min(4, "Bắt buộc"),
  country: z.string().min(2, "Bắt buộc"),
  phone: z.string().min(8, "Bắt buộc"),
});

export const shippingAddressSchema = addressBaseSchema.extend({
  deliveryNotes: z.string().optional(),
});

export const billingAddressSchema = addressBaseSchema.extend({
  email: z.string().email("Nhập email hợp lệ"),
});

export const checkoutFormSchema = z.object({
  email: z.string().email("Nhập email hợp lệ"),
  firstName: z.string().min(1, "Bắt buộc"),
  lastName: z.string().min(1, "Bắt buộc"),
  address: z.string().min(1, "Bắt buộc"),
  city: z.string().min(1, "Bắt buộc"),
  state: z.string().min(1, "Bắt buộc"),
  zip: z.string().min(4, "Bắt buộc"),
  phone: z.string().min(8, "Bắt buộc"),
  country: z.string().min(1),
  company: z.string().optional(),
  apartment: z.string().optional(),
  marketingEmail: z.boolean().optional(),
  saveInfo: z.boolean().optional(),
  marketingText: z.boolean().optional(),
  billingSame: z.boolean().optional(),
});

export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
export type BillingAddress = z.infer<typeof billingAddressSchema>;
export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export function mapCheckoutFormToAddresses(values: CheckoutFormValues) {
  const shippingAddress: ShippingAddress = {
    firstName: values.firstName,
    lastName: values.lastName,
    company: values.company,
    address1: values.address,
    address2: values.apartment,
    city: values.city,
    state: values.state,
    postcode: values.zip,
    country: values.country,
    phone: values.phone,
  };

  const billingAddress: BillingAddress = {
    ...shippingAddress,
    email: values.email,
  };

  return { shippingAddress, billingAddress };
}
