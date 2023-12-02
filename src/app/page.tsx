import Image from "next/image";

import RbPhoto from "@/assets/rbPhoto.png";

export default function Home() {
  return (
    <main className="mt-16">
      <div className="grid grid-cols-[1fr_2fr] gap-4 lg:grid-cols-[2fr_3fr] md:flex md:flex-col">
        <div className="flex items-center justify-center gap-4 md:flex-col md:gap-2">
          <Image src={RbPhoto} alt="Ricardo Bizerra" className="rounded-full w-16" />
          <h1 className="text-[32px] font-bold lg:text-[26px]">Ricardo Bizerra</h1>
        </div>
        <div>
          <p className="text-base font-light leading-relaxed md:text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates autem vitae cupiditate praesentium, ipsa commodi eveniet nihil iste minima dignissimos, aut atque illo quis alias expedita placeat porro necessitatibus nostrum.</p>
        </div>
      </div>
    </main>
  )
}
