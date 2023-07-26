import {Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

const routes = [
  {
    label: 'Dashboard',
    Icon: LayoutDashboard,
    href: '/dashboard',
    color: 'text-sky-500',
  },
  {
    label: 'Conversation',
    Icon: MessageSquare,
    href: '/conversation',
    color: 'text-violet-500',
  },
  {
    label: 'Image Generation',
    Icon: ImageIcon,
    href: '/image',
    color: 'text-pink-700',
  },
  {
    label: 'Video Generation',
    Icon: VideoIcon,
    href: '/video',
    color: 'text-orange-500',
  },
  {
    label: 'Music Generation',
    Icon: Music,
    href: '/music',
    color: 'text-emerald-500',
  },
  {
    label: 'Code Generation',
    Icon: Code,
    href: '/code',
    color: 'text-green-700',
  },
  {
    label: 'Settings',
    Icon: Settings,
    href: '/settings',
  },
];

const MainMenu = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-1">
      {routes.map(({href, label, Icon, color}) => (
        <Link
          href={href}
          key={href}
          className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:-text-white hover:bg-white/10 rounded-lg transition", pathname === href ? "text-white bg-white/10" : "text-zinc-400")}
        >
          <div className="flex items-center flex-1">
            <Icon className={cn("h-5 w-5 mr-3", color)} />
            {label}
          </div>
        </Link>
      ))}
    </div>
  )
}

export default MainMenu;