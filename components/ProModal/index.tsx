"use client";

import { Check, Zap } from 'lucide-react';

import { useProModal } from '@/hooks/useProModal';

import { cn } from '@/lib/utils';

import { tools } from '@/app/(dashboard)/(routes)/dashboard/constants';

import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const ProModal = () => {
  const proModal = useProModal();
  return (
    <Dialog
      open={proModal.isOpen}
      onOpenChange={proModal.onClose}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle
            className="flex justify-center items-center flex-col gap-y-4 pb-2"
          >
            <div className="flex items-center gap-x-2 font-bold py-1">
              Upgrade to Genius
              <Badge
                className="uppercase text-sm py-1"
                variant="premium"
              >
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {tools.map(({label, href, bgColor, Icon, color}) => (
              <Card
                key={href}
                className="p-3 border-black/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn('p-2 w-fit rounded-md', bgColor)}>
                    <Icon className={cn('w-6 h-6', color)} />
                  </div>
                  <div className="font-semibold text-sm">
                    {label}
                  </div>
                </div>
                <Check className="text-primary w-5 h-5" />
              </Card>
            ))}
          </DialogDescription>
          <DialogFooter
            className="pt-2"
          >
            <Button
              size="lg"
              variant="premium"
              className="w-full"
            >
              Upgrade
              <Zap className="w-4 h-4 ml-2 fill-white" />
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};