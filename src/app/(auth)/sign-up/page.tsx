'use client';

import { useForm } from 'react-hook-form';
import { Mail, Lock, User, Loader2 } from 'lucide-react';
import Link from 'next/link';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { useDebounce } from 'usehooks-ts';
import { useEffect, useState } from 'react';
import * as z from 'zod';

// Define the form schema
const signUpSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Create a type from the schema
type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debouncedUsername = useDebounce(username, 300);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<SignUpFormValues>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (debouncedUsername) {
        setIsCheckingUsername(true);
        setUsernameMessage('');
        try {
          const response = await fetch(`/api/check-username-unique?username=${debouncedUsername}`);
          const data = await response.json();
          setUsernameMessage(data.message);
        } catch (error) {
          setUsernameMessage('Error checking username');
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [debouncedUsername]);

  // const onSubmit = async (data: SignUpFormValues) => {
  //   setIsSubmitting(true);
  //   try {
  //     const response = await fetch('/api/sign-up', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(data),
  //     });
      
  //     if (response.ok) {
  //       toast({
  //         title: 'Success',
  //         description: 'Account created successfully!',
  //       });
  //       router.replace(`/verify/${username}`);
  //       // router.replace('/sign-in');

  //     } else {
  //       throw new Error('Signup failed');
  //     }
  //   } catch (error) {
  //     toast({
  //       title: 'Sign Up Failed',
  //       description: 'There was a problem with your sign-up. Please try again.',
  //       variant: 'destructive',
  //     });
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const onSubmit = async (data: SignUpFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Account created successfully!',
        });
        // Directly navigate to the sign-in page after successful signup
        router.replace('/sign-in');
      } else {
        throw new Error('Signup failed');
      }
    } catch (error) {
      toast({
        title: 'Sign Up Failed',
        description: 'There was a problem with your sign-up. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
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
            Join{' '}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Raaaz.io
            </span>
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Sign up to start your anonymous adventure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-200">Username</FormLabel>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                      <Input
                        {...field}
                        className="pl-10 bg-[#1A1A23] border-white/5 focus:border-blue-500 focus:ring-blue-500 placeholder-zinc-400 text-white"
                        placeholder="Choose your username"
                        onChange={(e) => {
                          field.onChange(e);
                          setUsername(e.target.value);
                        }}
                      />
                    </div>
                    {isCheckingUsername ? (
                      <div className="flex items-center mt-2">
                        <Loader2 className="h-4 w-4 animate-spin mr-2 text-zinc-400" />
                        <span className="text-sm text-zinc-400">Checking username...</span>
                      </div>
                    ) : usernameMessage && (
                      <p className={`text-sm mt-2 ${
                        usernameMessage === 'Username is unique' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {usernameMessage}
                      </p>
                    )}
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-200">Email</FormLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                      <Input
                        {...field}
                        className="pl-10 bg-[#1A1A23] border-white/5 focus:border-blue-500 focus:ring-blue-500 placeholder-zinc-400 text-white"
                        placeholder="Enter your email"
                      />
                    </div>
                    <p className="text-sm text-zinc-400 mt-2">you can do Two Step vedification afthe login for more security</p>
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
                        placeholder="Create a password"
                      />
                    </div>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Sign Up'
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-zinc-400">
              Already a member?{' '}
              <Link 
                href="/sign-in" 
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}