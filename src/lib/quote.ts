import { z } from "zod";

export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s-]/g, "").replace(/^(\+91|91|0)(?=\d{10}$)/, ""))
    .pipe(z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")),
  email: z.union([z.literal(""), z.string().trim().email("Enter a valid email")]).optional(),
  city: z.string().trim().min(2, "Enter your city or area").max(80),
  customerType: z.enum(["home", "business"]),
  monthlyBill: z.string().trim().max(10).optional(),
  message: z.string().trim().max(500).optional(),
  consent: z.literal(true, { message: "Please agree so we can contact you" }),
  website: z.string().max(0).optional(), // honeypot, must stay empty
});

export type QuoteInput = z.infer<typeof quoteSchema>;
