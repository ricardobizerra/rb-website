import Image from 'next/image';
import Link from 'next/link';

import RbIcon from '@/assets/rbIcon.svg'
import GithubIcon from '@/assets/socialMedia/github.svg'
import LinkedinIcon from '@/assets/socialMedia/linkedIn.svg'
import MailIcon from '@/assets/socialMedia/mail.svg'
import TabNewsIcon from '@/assets/socialMedia/tabNews.svg'

interface SocialMedia {
    image: any; // Use any to avoid conflicts with @svgr/webpack plugin or babel-plugin-inline-react-svg plugin
    url: string;
    alt: string;
}

function Navbar () {
    const socialMedia: SocialMedia[] = [
        {
            image: LinkedinIcon,
            url: 'https://www.linkedin.com/in/ricardobizerra',
            alt: 'Linkedin'
        },
        {
            image: GithubIcon,
            url: 'https://github.com/ricardobizerra',
            alt: 'Github'
        },
        {
            image: MailIcon,
            url: 'mailto:ricardo.bizerra19@gmail.com',
            alt: 'E-mail'
        },
        {
            image: TabNewsIcon,
            url: 'https://tabnews.com.br/ricardobizerra',
            alt: 'TabNews'
        }
    ]

    return (
        <div className='flex items-center justify-between font-medium mb-8'>
            <Image src={RbIcon} alt="Logo" />

            <div className='flex items-center gap-4'>
                <Link href="#projetos" className='text-lg hover:opacity-70 hover:ease-in-out hover:duration-200'>
                    Projetos
                </Link>

                <Link href="#blog" className='text-lg hover:opacity-70 hover:ease-in-out hover:duration-200'>
                    Blog
                </Link>

                {
                    socialMedia.map((socialMedia, index) => (
                        <Link href={socialMedia.url} target="_blank" rel="noopener noreferrer" key={index}>
                            <Image src={socialMedia.image} alt={socialMedia.alt} className='hover:opacity-70 hover:ease-in-out hover:duration-200' />
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Navbar;