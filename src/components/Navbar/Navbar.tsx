import Image from 'next/image';
import Link from 'next/link';

import RbIcon from '@/assets/rbIcon.svg';
import GithubIcon from '@/assets/socialMedia/github.svg';
import LinkedinIcon from '@/assets/socialMedia/linkedIn.svg';
import MailIcon from '@/assets/socialMedia/mail.svg';
import TabNewsIcon from '@/assets/socialMedia/tabNews.svg';

interface SocialMedia {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any; // Use any to avoid conflicts with @svgr/webpack plugin or babel-plugin-inline-react-svg plugin
  url: string;
  alt: string;
}

function Navbar() {
  const socialMedia: SocialMedia[] = [
    {
      image: LinkedinIcon,
      url: 'https://www.linkedin.com/in/ricardobizerra',
      alt: 'Linkedin',
    },
    {
      image: GithubIcon,
      url: 'https://github.com/ricardobizerra',
      alt: 'Github',
    },
    {
      image: MailIcon,
      url: 'mailto:ricardo.bizerra19@gmail.com',
      alt: 'E-mail',
    },
    {
      image: TabNewsIcon,
      url: 'https://tabnews.com.br/ricardobizerra',
      alt: 'TabNews',
    },
  ];

  return (
    <div className="phone:flex-col phone:gap-4 mb-8 flex items-center justify-between font-medium">
      <Image src={RbIcon} alt="Logo" />

      <div className="phone:gap-3 flex items-center gap-4">
        <Link
          href="#projetos"
          className="phone:text-base text-lg hover:opacity-80 hover:duration-200 hover:ease-in-out"
        >
          Projetos
        </Link>

        <Link
          href="#blog"
          className="phone:text-base text-lg hover:opacity-80 hover:duration-200 hover:ease-in-out"
        >
          Blog
        </Link>

        {socialMedia.map((socialMedia, index) => (
          <Link
            href={socialMedia.url}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
          >
            <Image
              src={socialMedia.image}
              alt={socialMedia.alt}
              className="hover:opacity-80 hover:duration-200 hover:ease-in-out"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
