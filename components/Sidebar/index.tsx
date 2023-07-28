"use client";

interface SidebarProps {
  apiLimitCount: number;
}

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";

import { cn } from '@/lib/utils';

import FreeCounter from '@/components/FreeCounter';

import MainMenu from './MainMenu';

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] })

const Sidebar = ({
  apiLimitCount = 0,
} : SidebarProps) => {
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image
              fill
              alt="Logo"
              src="/logo.png"
            />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            Genius
          </h1>
        </Link>
        <MainMenu />
      </div>
      <FreeCounter
        apiLimitCount={apiLimitCount}
      />
    </div>
  )
}

export default Sidebar;