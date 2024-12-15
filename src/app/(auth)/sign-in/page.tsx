'use client';

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { Lock, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// Define the schema and its type
const signInSchema = z.object({
  identifier: z.string().min(1, 'Email or username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Create a type from the schema
type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const router = useRouter();

  const form = useForm<SignInFormValues>({
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const { toast } = useToast();

  const onSubmit = async (data: SignInFormValues) => {
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (result?.error) {
      if (result.error === 'CredentialsSignin') {
        toast({
          title: 'Login Failed',
          description: 'Incorrect username or password',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      }
    }

    if (result?.url) {
      router.replace('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white relative overflow-hidden flex items-center justify-center px-4">
      {/* Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-[120px]" />
        <div className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-[120px]" />
      </div>

      <Card className="w-full max-w-md bg-[#12121A] border-white/5 relative z-10">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Welcome back to{' '}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Raaaz.io
            </span>
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Sign in to continue your secret conversations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="identifier"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-200">Email</FormLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                      <Input
                        {...field}
                        className="pl-10 bg-[#1A1A23] border-white/5 focus:border-blue-500 focus:ring-blue-500 placeholder-zinc-400 text-white"
                        placeholder="Enter your email "
                      />
                    </div>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-200">Password</FormLabel>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                      <Input
                        {...field}
                        type="password"
                        className="pl-10 bg-[#1A1A23] border-white/5 focus:border-blue-500 focus:ring-blue-500 placeholder-zinc-400 text-white"
                        placeholder="Enter your password"
                      />
                    </div>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Sign In
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center space-y-4">
            <p className="text-zinc-400">
              Not a member yet?{' '}
              <Link 
                href="/sign-up" 
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Sign up
              </Link>
            </p>
            {/* <Link 
              href="/forgot-password" 
              className="block text-zinc-400 hover:text-zinc-300 transition-colors text-sm"
            >
              Forgot your password?
            </Link> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}