import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

export default function Home() {
  return (
    <div className='w-full h-full'>
        <div>
        Home
        </div>
        <Link href={"/"} prefetch={true}>
          <Button variant={"outline"} size={"icon"} className="ml-2">
            <ArrowLeft />
          </Button>
        </Link>
    </div>
  )
}
