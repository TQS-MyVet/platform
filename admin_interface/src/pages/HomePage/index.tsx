import { Layout, LayoutBody } from '@/components/custom/layout';
import { Separator } from '@/components/ui/separator';
import {
  Card,
} from "@/components/ui/card";
import { homeCardsReceptionist, homeCardsDoctor } from '@/data/homeCards';

import { Link } from '@tanstack/react-router';

interface HomePageProps {
    userRole: 'doctor' | 'receptionist';
}

export default function HomePage({ userRole }: HomePageProps) {

    userRole = 'doctor';

    const homeCards = userRole === 'receptionist' ? homeCardsReceptionist : homeCardsDoctor;

    return (
        <Layout>
          <LayoutBody className='space-y-4'>
            <div className='flex items-center justify-between space-y-2'>
              <div className='space-y-1'>
                <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
                  Home Page
                </h1>
                <p className='text-sm text-muted-foreground'>
                    Welcome to the Home Page. Choose and option from the cards below.
                </p>
              </div>
            </div>
            <Separator />
            <div className='grid gap-4 pt-4 md:grid-cols-1 xl:grid-cols-2'>
                {homeCards.slice(0, 2).map((card, index) => (
                    <Link key={index} to={card.link}>
                    <Card className='rounded-lg transition duration-500 ease-in-out transform hover:shadow-lg hover:brightness-75'>
                        <div className="relative flex w-full h-[355px] justify-center items-center">
                        <img
                            src={card.image}
                            alt={card.alt}
                            className="absolute inset-0 w-full rounded-lg brightness-50 border h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="xs:text-5xl text-4xl lg:text-6xl font-bold text-white">
                            {card.title}
                            </span>
                        </div>
                        </div>
                    </Card>
                    </Link>
                ))}
            </div>
            {userRole === 'doctor' && (
                <div className='grid gap-4 grid-cols-1'>
                    <Link to={homeCardsDoctor[2].link}>
                        <Card className='rounded-lg transition duration-300 ease-in-out transform hover:shadow-lg hover:brightness-75'>
                            <div className="relative flex w-full h-[355px] justify-center items-center">
                                <img
                                    src={homeCardsDoctor[2].image}
                                    alt="Record Appointment Results Background"
                                    className="absolute inset-0 w-full rounded-lg brightness-50 border h-full object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="xs:text-5xl text-4xl lg:text-6xl font-bold text-white">
                                      {homeCardsDoctor[2].title}
                                    </span>
                                </div>
                            </div>
                        </Card>
                    </Link>
                </div>
            )}
          </LayoutBody>
        </Layout>
      );
    }
    