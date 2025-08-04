'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Lock, Send } from 'lucide-react';

interface SubscriptionButtonProps {
  courseId: string;
}

export function SubscriptionButton({ courseId }: SubscriptionButtonProps) {
  // This state is a placeholder for a real authentication check.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubscribe = () => {
    if (!isLoggedIn) {
      const currentPath = `/courses/${courseId}`;
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
    } else {
      toast({
        title: 'Subscription Request Sent',
        description: 'Your request is pending approval from an administrator.',
        variant: 'default',
      });
    }
  };

  return (
    <Button onClick={handleSubscribe} className="w-full" size="lg">
      {isLoggedIn ? (
        <>
        <Send className="mr-2 h-4 w-4" />
        Request Subscription
        </>
      ) : (
        <>
        <Lock className="mr-2 h-4 w-4" />
        Login to Subscribe
        </>
      )}
    </Button>
  );
}
