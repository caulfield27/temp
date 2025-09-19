import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import z from 'zod'
import { FormSchema } from "./LoginValidation";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";

const Login = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });
  const navigate = useNavigate();

  function onSubmit(data: z.infer<typeof FormSchema>){
    console.log(data);
    navigate("/");
  }



    return <div className="flex h-screen w-screen bg-neutral-100 flex-col items-center justify-center">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 bg-white p-5 rounded-[12px] max-w-[500px]">
                <h1 className="font-bold text-2xl text-neutral-700">Вход</h1>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-neutral-600">Почта</FormLabel>
                            <FormControl>
                                <Input type="email" {...field} />
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
                <Button type="submit">Войти</Button>
            </form>
        </Form>
    </div>;
}

export default Login;