'use client';

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { Loader2, Send, MessageCircle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const MESSAGE_SUGGESTIONS = [
  "What's your favorite movie?",
  "Do you have any pets?",
  "What's your dream job?",
  "What's the best advice you've ever received?",
  "If you could travel anywhere right now, where would you go?",
  "What's your favorite way to spend a weekend?",
  "What's a skill you'd love to master?",
  "What's your favorite memory from childhood?",
];

const SendMessage = () => {
  const params = useParams<{ username: string }>();
  const username = params.username;
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm({
    defaultValues: {
      content: '',
    },
  });

  const handleMessageSelect = (message: string) => {
    form.setValue('content', message);
  };

  const onSubmit = async (data: { content: string }) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/send-message', {
        ...data,
        username,
      });

      toast({
        title: 'Success!',
        description: response.data.message,
      });
      form.reset();
    } catch (error) {
      const axiosError = error as AxiosError;
      toast({
        title: 'Error',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950 px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Top navigation with sign up button */}
        <div className="flex justify-end mb-4">
          <Link href="/sign-up">
            <Button className="bg-zinc-800/50 hover:bg-zinc-700/50 text-white border-zinc-700 gap-2">
              <Plus className="w-4 h-4" />
              Create Account
            </Button>
          </Link>
        </div>

        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <MessageCircle className="w-5 h-5" />
              Send Anonymous Message to @{username}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Write your anonymous message here..."
                          className="resize-none bg-zinc-700/50 border-zinc-600 text-white min-h-[120px] focus:ring-2 focus:ring-white/20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full text-white border-white hover:bg-zinc-700 border-2 transition-colors duration-200" 
                  disabled={isLoading || !form.watch('content')}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4 text-white" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800/50 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-white">Message Ideas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {MESSAGE_SUGGESTIONS.map((message, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full bg-zinc-800/50 border-zinc-700 hover:bg-zinc-700/50 hover:text-white text-white justify-start h-auto py-3 px-4 transition-colors duration-200"
                onClick={() => handleMessageSelect(message)}
              >
                {message}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Bottom sign up card with improved styling */}
        <Card className="bg-zinc-800/50 border-zinc-700 text-center hover:bg-zinc-700/30 transition-colors duration-200">
          <CardContent className="pt-6">
            <p className="text-white mb-4 text-lg">Want to receive anonymous messages?</p>
            <Link href="/sign-up" className="block">
              <Button className="w-full text-white border-white border-2 hover:bg-zinc-700 transition-colors duration-200 gap-2">
                <Plus className="w-4 h-4" />
                Create Your Anonymous Message Board
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SendMessage;