import Image from 'next/image';

import RbPhoto from '@/assets/rbPhoto.png';
import BrazilFlag from '@/assets/flags/bra.png';
import PernambucoFlag from '@/assets/flags/pe.png';
import EducationExperience from '@/components/EducationExperience';
import WorkExperience from '@/components/WorkExperience';

export default function Home() {
  return (
    <main className="mt-16">
      <div className="grid grid-cols-[1fr_2fr] gap-4 md:flex md:flex-col lg:grid-cols-[2fr_3fr]">
        <div className="flex items-center justify-center gap-4 md:flex-col md:gap-2">
          <Image
            src={RbPhoto}
            alt="Ricardo Bizerra"
            className="w-16 rounded-full"
          />
          <div>
            <h1 className="text-[32px] font-bold lg:text-[26px]">
              Ricardo Bizerra
            </h1>
            <div className="ml-px flex items-center justify-start gap-2 md:m-0 md:justify-center">
              <Image
                src={BrazilFlag}
                alt="Brazil Flag"
                className="w-8 rounded"
              />
              <Image
                src={PernambucoFlag}
                alt="Pernambuco Flag"
                className="w-8 rounded"
              />
            </div>
          </div>
        </div>
        <div>
          <p className="phone:text-sm phone:leading-relaxed text-base leading-relaxed font-light md:text-center">
            Olá! Sou Ricardo, brasileiro e pernambucano, entusiasta da
            Tecnologia da Informação e do Desenvolvimento de Software.
            Constantemente em busca de novos desafios, estou dedicado a
            aprimorar continuamente meus conhecimentos, transformando cada um
            deles em uma oportunidade de crescimento. Fique à vontade para
            navegar pelo meu site e conhecer um pouco mais sobre mim!
          </p>
        </div>
      </div>

      <EducationExperience />

      <WorkExperience />
    </main>
  );
}
