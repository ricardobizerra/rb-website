import { JSX } from 'react';

import CITiIcon from '../assets/work/citi.svg';
import TrackingTradeIcon from '../assets/work/tracking-trade.svg';

import UfpeIcon from '../assets/education/ufpe.svg';
import SenacIcon from '../assets/education/senac.svg';

import ShadcnIcon from '../assets/tools/shadcn.svg';

import RBIcon from '../assets/rblf-icon.svg';

import JavascriptPlain from 'devicons-react/icons/JavascriptPlain';
import TypescriptPlain from 'devicons-react/icons/TypescriptPlain';
import PythonPlain from 'devicons-react/icons/PythonPlain';
import GoOriginalWordmark from 'devicons-react/icons/GoOriginalWordmark';
import ReactOriginal from 'devicons-react/icons/ReactOriginal';
import NextjsPlain from 'devicons-react/icons/NextjsPlain';
import NodejsPlain from 'devicons-react/icons/NodejsPlain';
import ExpressOriginal from 'devicons-react/icons/ExpressOriginal';
import NestjsOriginal from 'devicons-react/icons/NestjsOriginal';
import RailsPlainWordmark from 'devicons-react/icons/RailsPlainWordmark';
import ReactnativeOriginal from 'devicons-react/icons/ReactnativeOriginal';
import PostgresqlPlain from 'devicons-react/icons/PostgresqlPlain';
import TailwindcssOriginal from 'devicons-react/icons/TailwindcssOriginal';
import RedisPlain from 'devicons-react/icons/RedisPlain';
import PrismaOriginal from 'devicons-react/icons/PrismaOriginal';
import DockerPlain from 'devicons-react/icons/DockerPlain';
import KubernetesPlain from 'devicons-react/icons/KubernetesPlain';
import TerraformPlain from 'devicons-react/icons/TerraformPlain';
import VitestPlain from 'devicons-react/icons/VitestPlain';
import GraphqlPlain from 'devicons-react/icons/GraphqlPlain';
import ExpoOriginal from 'devicons-react/icons/ExpoOriginal';
import GithubOriginal from 'devicons-react/icons/GithubOriginal';
import LinkedinPlain from 'devicons-react/icons/LinkedinPlain';
import CppIcon from 'devicons-react/icons/CplusplusOriginal';
import NumPyIcon from 'devicons-react/icons/NumpyOriginal';
import PyTorchIcon from 'devicons-react/icons/PytorchOriginal';
import PandasIcon from 'devicons-react/icons/PandasOriginal';
import MatplotlibIcon from 'devicons-react/icons/MatplotlibOriginal';
import TensorflowIcon from 'devicons-react/icons/TensorflowOriginal';
import MongoDBIcon from 'devicons-react/icons/MongodbOriginal';

import { FileIcon, MoonIcon, SunIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const rawIcons = {
  // custom
  rblf: RBIcon,
  citi: CITiIcon,
  trackingTrade: TrackingTradeIcon,
  ufpe: UfpeIcon,
  senac: SenacIcon,
  // lucide-react
  file: FileIcon,
  moon: MoonIcon,
  sun: SunIcon,
  // devicons-react
  linkedin: LinkedinPlain,
  github: GithubOriginal,
  javascript: JavascriptPlain,
  typescript: TypescriptPlain,
  python: PythonPlain,
  go: GoOriginalWordmark,
  react: ReactOriginal,
  nextjs: NextjsPlain,
  nodejs: NodejsPlain,
  express: ExpressOriginal,
  nestjs: NestjsOriginal,
  rails: RailsPlainWordmark,
  reactnative: ReactnativeOriginal,
  postgresql: PostgresqlPlain,
  tailwindcss: TailwindcssOriginal,
  redis: RedisPlain,
  prisma: PrismaOriginal,
  docker: DockerPlain,
  kubernetes: KubernetesPlain,
  terraform: TerraformPlain,
  vitest: VitestPlain,
  graphql: GraphqlPlain,
  expo: ExpoOriginal,
  shadcn: ShadcnIcon,
  cpp: CppIcon,
  numpy: NumPyIcon,
  pytorch: PyTorchIcon,
  pandas: PandasIcon,
  matplotlib: MatplotlibIcon,
  tensorflow: TensorflowIcon,
  mongodb: MongoDBIcon,
} as const;

type IconKey = keyof typeof rawIcons;
type IconProps = React.SVGProps<SVGSVGElement>;

export const Icons = Object.fromEntries(
  Object.entries(rawIcons).map(([key, Icon]) => [
    key as IconKey,
    wrappedIcon(Icon),
  ]),
) as Record<IconKey, (props: IconProps) => JSX.Element>;

function wrappedIcon(
  Icon: any, // eslint-disable-line @typescript-eslint/no-explicit-any
) {
  return function WrappedIcon(props: IconProps) {
    return (
      <Icon
        {...props}
        className={cn(
          '[&:not(.lucide)>path]:fill-foreground [&:not(.lucide)>g]:fill-foreground',
          props.className,
        )}
      />
    );
  };
}
