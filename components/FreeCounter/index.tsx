"use client";

import React, { useState, useEffect } from 'react';

interface FreeCounterProps {
  apiLimitCount: number;
  isPro: boolean;
}

import { Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

import { useProModal } from '@/hooks/useProModal';

import { MAX_FREE_COUNTS } from '@/constants';

const FreeCounter = ({
  apiLimitCount = 0, isPro,
} : FreeCounterProps) => {
  const proModal = useProModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isPro) {
    return null;
  }

  return <div className="px-3">
    <Card className="bg-white/10 border-0">
      <CardContent className="py-6">
        <div className="text-center text-sm text-white mb-4 space-y-2">
          <p>
            {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
          </p>
          <Progress
            className="h-3"
            value={apiLimitCount / MAX_FREE_COUNTS * 100}
          />
          <Button
            className="w-full"
            variant="premium"
            onClick={proModal.onOpen}
          >
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
};

export default FreeCounter;