import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import LoginPagePhoto from "@/assets/login-page-photo.jpg"
import LoginPagePhoto2 from "@/assets/login-page-photo-2.jpg"
import LoginPagePhoto3 from "@/assets/login-page-photo-3.jpg"

import { Layout, LayoutBody} from '@/components/custom/layout'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, FormValues } from './components/schema';
import { useNavigate } from '@tanstack/react-router'

export default function LoginPage() {
  const navigate = useNavigate()

  const images = [LoginPagePhoto, LoginPagePhoto2, LoginPagePhoto3]

  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
    navigate({ to: '/' });
  };

  return (
    <Layout>
      <LayoutBody className="space-y-4 mt-16">
        <div className="w-full border rounded-xl lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
          <div className="flex items-center justify-center py-12">
            <div className="mx-auto grid w-[350px] gap-6">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your email below to login to your account
                </p>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <FormControl>
                              <Input
                                id="email"
                                type="email"
                                placeholder="email@example.com"
                                required
                                {...field}
                              />
                            </FormControl>
                            <FormMessage/>
                          </FormItem>
                        )}
                      />
                      <div className="grid space-y-2 gap-2 pt-2">
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor="password">Password</FormLabel>
                              <FormControl>
                                <Input
                                  id="password"
                                  type="password"
                                  placeholder="Password"
                                  required
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage/>
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full">
                          Login
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
              <div className="text-center text-muted-foreground text-sm">
                Forgot your account details?{" "}
                <br />
                <span className=" text-ellipsis font-bold underline">Ask your administrator for help.</span>
              </div>
            </div>
          </div>
          <div className="hidden bg-muted lg:block h-full">
          <Carousel
            plugins={[
              Autoplay({
                  delay: 5000,
                  stopOnUserInteraction: false,
                })
            ]}
            opts={{
                loop: true,
              }}
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index} className="h-[800px]">
                  <img
                    src={image}
                    alt={`Carousel item ${index + 1}`}
                    width="1920"
                    height="1080"
                    className="h-full w-full rounded-r-xl object-cover dark:brightness-[0.5]"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          </div>
        </div>
      </LayoutBody>
    </Layout>
  )
}
