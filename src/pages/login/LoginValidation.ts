import z from 'zod';

export const FormSchema = z.object({
  email: z.string().min(1,{message: "поле обязательно для заполнения"}).email({message: "неверный адресс почты"}),
  password: z.string().min(1,{message: "поле обязательно для заполнения"})
})