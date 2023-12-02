import Image from "next/image";

import RbPhoto from "@/assets/rbPhoto.png";

export default function Home() {
  return (
    <main className="mt-16">
      <div className="grid grid-cols-[1fr_2fr] gap-4">
        <div className="flex items-center justify-center gap-4">
          <Image src={RbPhoto} alt="Ricardo Bizerra" className="rounded-full w-16" />
          <h1 className="text-[32px] font-bold">Ricardo Bizerra</h1>
        </div>
        <div>
          <p className="text-base font-light leading-relaxed">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates autem vitae cupiditate praesentium, ipsa commodi eveniet nihil iste minima dignissimos, aut atque illo quis alias expedita placeat porro necessitatibus nostrum.</p>
        </div>
      </div>
    </main>
  )
}
