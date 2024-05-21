import { Layout, LayoutBody } from '@/components/custom/layout';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { homeCards } from '@/data/homeCards';

import { Link } from '@tanstack/react-router';

export default function HomePage() {
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
                {homeCards.map((card, index) => (
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
          </LayoutBody>
        </Layout>
      );
    }
    