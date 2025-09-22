import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import z from 'zod';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/ui';

import { FormSchema } from './LoginValidation';

const Login = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const navigate = useNavigate();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    navigate('/');
  }

  return (
    <div className="flex h-screen w-screen bg-neutral-100 flex-col items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6 bg-white p-5 rounded-[12px] max-w-[500px]"
        >
          <h1 className="font-bold text-2xl text-neutral-700 text-center">
            Вход
          </h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-600">Почта</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-600">Пароль</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-center items-center">
            <Button className="w-full max-w-full" type="submit">
              Войти
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Login;
