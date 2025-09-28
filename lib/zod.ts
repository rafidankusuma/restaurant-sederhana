import { object, string, coerce, array } from "zod";
import { z } from "zod";

export const FoodSchema = object({
    name: string().min(1),
    description: string().min(50),
    capacity: coerce.number().gt(0),
    price: coerce.number().gt(0),
    amenities: array(string()).nonempty(), 
})

export const ReserveSchema = object({
    name: string().min(1),
    phone: string().min(10),
    address: string().min(10),
})

export const ContactSchema = z.object({
  name: z.string().min(6, "Name at least 6 characters"),
  email: z.string()
    .min(6, "Email at least 6 characters")
    .email("Please enter a valid email"),
  subject: z.string().min(6, "Subject at least 6 characters"),
  message: z.string()
    .min(50, "Message at least 50 characters")
    .max(200, "Message maximum 200 characters"),
});
