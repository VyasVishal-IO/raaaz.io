'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { MessageCard } from '@/components/MessageCard';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth';
import { Message } from '@/model/User';
import { ApiResponse } from '@/types/ApiResponse';
import {
  Loader2, RefreshCcw, Bell, BellOff,
  Copy, CheckCircle2, Link as LinkIcon
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';

const UserDashboard = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const { toast } = useToast();
  const { data: session } = useSession();
  const form = useForm();
  const { register, watch, setValue } = form;
  const acceptMessages = watch('acceptMessages');

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>('/api/accept-messages');
      setValue('acceptMessages', response.data.isAcceptingMessages);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data.message ?? 'Failed to fetch message settings',
        variant: 'destructive',
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue, toast]);

  const fetchMessages = useCallback(async (refresh: boolean = false) => {
    setIsLoading(true);
    try {
      const response = await axios.get<ApiResponse>('/api/get-messages');
      setMessages(response.data.messages || []);
      if (refresh) {
        toast({
          title: 'Success',
          description: 'Messages refreshed successfully',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data.message ?? 'Failed to fetch messages',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (!session?.user) return;
    fetchMessages();
    fetchAcceptMessages();
  }, [session, fetchMessages, fetchAcceptMessages]);

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>('/api/accept-messages', {
        acceptMessages: !acceptMessages,
      });
      setValue('acceptMessages', !acceptMessages);
      toast({
        title: 'Success',
        description: response.data.message,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data.message ?? 'Failed to update message settings',
        variant: 'destructive',
      });
    }
  };

  if (!session?.user) return null;

  const { username } = session.user as User;
  const baseUrl = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : '';
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    toast({
      title: 'Success',
      description: 'Profile URL copied to clipboard',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-zinc-400 mt-1">Manage your profile and messages</p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => fetchMessages(true)}
            disabled={isLoading}
            className="bg-zinc-800 hover:bg-zinc-700 text-white"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <RefreshCcw className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Settings Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-white">Profile Link</CardTitle>
              <CardDescription className="text-zinc-400">
                Share this link with others to receive messages
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                  <input
                    value={profileUrl}
                    readOnly
                    className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-700 rounded-md text-white"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyToClipboard}
                  className="bg-zinc-900 hover:bg-zinc-800"
                >
                  {copied ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4 text-zinc-400" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle className="text-white">Message Settings</CardTitle>
              <CardDescription className="text-zinc-400">
                Control who can send you messages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-white">Accept Messages</h3>
                  <p className="text-sm text-zinc-400">
                    {acceptMessages ? 'Currently accepting messages' : 'Not accepting messages'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {acceptMessages ? (
                    <Bell className="h-4 w-4 text-green-500" />
                  ) : (
                    <BellOff className="h-4 w-4 text-zinc-400" />
                  )}
                  <Switch
                    {...register('acceptMessages')}
                    checked={acceptMessages}
                    onCheckedChange={handleSwitchChange}
                    disabled={isSwitchLoading}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Messages Section */}
        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Messages</CardTitle>
                <CardDescription className="text-zinc-400">
                  {messages.length} message{messages.length !== 1 ? 's' : ''} received
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {messages.length > 0 ? (
                messages.map((message) => (
                  <MessageCard
                    key={message._id}
                    message={message}
                    onMessageDelete={handleDeleteMessage}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-zinc-500">
                  No messages to display
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;