import {
    IconBrandDiscord,
    IconBrandDocker,
    IconBrandFigma,
    IconBrandGithub,
    IconBrandGitlab,
    IconBrandGmail,
    IconBrandMedium,
    IconBrandNotion,
    IconBrandSkype,
    IconBrandSlack,
    IconBrandStripe,
    IconBrandTelegram,
    IconBrandTrello,
    IconBrandWhatsapp,
    IconBrandZoom,
  } from '@tabler/icons-react'

import {
    Dog,
    Cat,
    Bird,
    Rabbit,
    Snail
} from 'lucide-react'

  export const apps = [
    {
      name: 'Telegram',
      logo: <Dog />,
      connected: false,
      desc: 'Connect with Telegram for real-time communication.',
    },
    {
      name: 'Notion',
      logo: <Cat />,
      connected: true,
      desc: 'Effortlessly sync Notion pages for seamless collaboration.',
    },
    {
      name: 'Figma',
      logo: <Snail />,
      connected: true,
      desc: 'View and collaborate on Figma designs in one place.',
    },
    {
      name: 'Trello',
      logo: <Bird />,
      connected: false,
      desc: 'Sync Trello cards for streamlined project management.',
    },
    {
      name: 'Slack',
      logo: <Rabbit />,
      connected: false,
      desc: 'Integrate Slack for efficient team communication',
    },
    {
      name: 'Zoom',
      logo: <Rabbit />,
      connected: true,
      desc: 'Host Zoom meetings directly from the dashboard.',
    },
    {
      name: 'Stripe',
      logo: <Snail />,
      connected: false,
      desc: 'Easily manage Stripe transactions and payments.',
    },
    {
      name: 'Gmail',
      logo: <Dog />,
      connected: true,
      desc: 'Access and manage Gmail messages effortlessly.',
    },
    {
      name: 'Medium',
      logo: <Cat />,
      connected: false,
      desc: 'Explore and share Medium stories on your dashboard.',
    },
    {
      name: 'Skype',
      logo: <Bird />,
      connected: false,
      desc: 'Connect with Skype contacts seamlessly.',
    },
    {
      name: 'Docker',
      logo: <Bird />,
      connected: false,
      desc: 'Effortlessly manage Docker containers on your dashboard.',
    },
    {
      name: 'GitHub',
      logo: <Dog />,
      connected: false,
      desc: 'Streamline code management with GitHub integration.',
    },
    {
      name: 'GitLab',
      logo: <Cat />,
      connected: false,
      desc: 'Efficiently manage code projects with GitLab integration.',
    },
    {
      name: 'Discord',
      logo: <Snail />,
      connected: false,
      desc: 'Connect with Discord for seamless team communication.',
    },
    {
      name: 'WhatsApp',
      logo: <Rabbit />,
      connected: false,
      desc: 'Easily integrate WhatsApp for direct messaging.',
    },
  ]
  