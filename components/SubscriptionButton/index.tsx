"use client";

interface SubscriptionButtonProps {
  isPro: boolean;
}

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import { Zap } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const SubscriptionButton = ({
  isPro,
} : SubscriptionButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/stripe');

      window.location.href = response.data.url;
    } catch (error: any) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Button disabled={isLoading} variant={isPro ? "default" : "premium"} onClick={onClick}>
      {isPro ? 'Manage Subscription' : 'Upgrade to Genius'}
      {!isPro && <Zap className="w-4 h-4 ml-2 fillw-hite" />}
    </Button>
  )
}