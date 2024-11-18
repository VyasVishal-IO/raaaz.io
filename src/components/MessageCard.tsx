import React from 'react';
import { X, Trash2, Clock, MessageSquare } from 'lucide-react';
import dayjs from 'dayjs';
import axios from 'axios';
import { Message } from '@/model/User';
import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

export function MessageCard({ message, onMessageDelete }: MessageCardProps) {
  const { toast } = useToast();

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`/api/delete-message/${message._id}`);
      toast({
        title: "Success",
        description: response.data.message,
      });
      onMessageDelete(message._id);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg bg-zinc-800/50 border border-zinc-700 backdrop-blur-sm">
      <CardHeader className="space-y-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <MessageSquare className="w-4 h-4 text-zinc-400" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-base font-medium text-white line-clamp-1">
                Message
              </CardTitle>
              <p className="text-xs text-zinc-400">
                Received {dayjs(message.createdAt).format('MMM D, YYYY')}
              </p>
            </div>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-red-500/10 hover:text-red-500 text-zinc-400"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-zinc-900 border-zinc-800">
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2 text-red-500">
                  <X className="w-5 h-5" />
                  Delete Message
                </AlertDialogTitle>
                <AlertDialogDescription className="text-zinc-400">
                  This action cannot be undone. This will permanently delete this
                  message from the system.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteConfirm}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
      <CardContent className="text-zinc-300 text-sm">
        {message.content}
      </CardContent>
      <CardFooter className="pt-4 border-t border-zinc-700/50">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Clock className="w-3 h-3" />
          <span>{dayjs(message.createdAt).format('h:mm A')}</span>
        </div>
      </CardFooter>
    </Card>
  );
}

export default MessageCard;