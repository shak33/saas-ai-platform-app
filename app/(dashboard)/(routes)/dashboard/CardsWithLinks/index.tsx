import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Card } from '@/components/ui/card';

import { cn } from '@/lib/utils';

import { tools } from '../constants';

const CardsWithLinks = () => {
  const router = useRouter();

  const onCardClick = (url: string) => {
    router.push(url);
  }

  return (
    <div className="px-4 md:px-20 lg:px-32 space-y-4">
      {tools.map(({label, Icon, color, bgColor, href}) => (
        <Card
          onClick={() => onCardClick(href)}
          key={href}
          className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
        >
          <div className="flex items-center gap-x-4">
            <div className={cn("p-4 w-fit rounded-md", bgColor)}>
              <Icon className={cn("w-8 h-8", color)} />
            </div>
            <div className="font-semibold">
              {label}
            </div>
          </div>
          <ArrowRight className="w-5 h-5" />
        </Card>
      ))}
    </div>
  )
}

export default CardsWithLinks;