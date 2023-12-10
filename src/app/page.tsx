import Image from "next/image";

import RbPhoto from "@/assets/rbPhoto.png";
import BrazilFlag from "@/assets/flags/bra.png";
import PernambucoFlag from "@/assets/flags/pe.png";
import EducationExperience from "@/components/EducationExperience";
import WorkExperience from "@/components/WorkExperience";

export default function Home() {
  return (
    <main className="mt-16">
      <div className="grid grid-cols-[1fr_2fr] gap-4 lg:grid-cols-[2fr_3fr] md:flex md:flex-col">
        <div className="flex items-center justify-center gap-4 md:flex-col md:gap-2">
          <Image src={RbPhoto} alt="Ricardo Bizerra" className="rounded-full w-16" />
          <div>
            <h1 className="text-[32px] font-bold lg:text-[26px]">Ricardo Bizerra</h1>
            <div className="flex gap-2 items-center justify-start ml-[1px] md:justify-center md:m-0">
              <Image src={BrazilFlag} alt="Brazil Flag" className="w-8 rounded" />
              <Image src={PernambucoFlag} alt="Pernambuco Flag" className="w-8 rounded" />
            </div>
          </div>
        </div>
        <div>
          <p className="text-base font-light leading-relaxed md:text-center phone:text-sm phone:leading-relaxed">
            Olá! Sou Ricardo, brasileiro e pernambucano, entusiasta da Tecnologia da Informação e do Desenvolvimento de Software. Constantemente em busca de novos desafios, estou dedicado a aprimorar continuamente meus conhecimentos, transformando cada um deles em uma oportunidade de crescimento. Fique à vontade para navegar pelo meu site e conhecer um pouco mais sobre mim!
          </p>
        </div>
      </div>

      <EducationExperience />

      <WorkExperience />
    </main>
  )
}