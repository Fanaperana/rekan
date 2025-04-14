// import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Workspace } from "@/components/Workspace";
import { Plus } from "lucide-react";
import Link from "next/link";
import * as React from "react";


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-1">
      <div className="w-full flex flex-row">
        <Workspace></Workspace>
        <Button variant={"outline"} size={"icon"} className="ml-2">
          <Plus size={12} />
        </Button>
        <Link href={"/home"} prefetch={true}>
          <Button variant={"outline"} size={"icon"} className="ml-2">
            <Plus size={12} />
          </Button>
        </Link>
      </div>
      <main className="flex flex-col items-center justify-center w-full h-full">

      </main>
    </div>
  );
}
