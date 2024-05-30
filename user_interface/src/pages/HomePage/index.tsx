import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import CarouselImage1 from '@/assets/carousel/carousel-image-1.jpg';
import CarouselImage2 from '@/assets/carousel/carousel-image-2.jpg';
import CarouselImage3 from '@/assets/carousel/carousel-image-3.jpg';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const slides = [
    {
        image: CarouselImage1,
        title: 'Your Local Pet Friendly Practice',
        subtitle: 'A Veterinary Team Dedicated To Pet Care. Give Us a Call Today!',
        buttonText: 'BOOK APPOINTMENT',
    },
    {
        image: CarouselImage2,
        title: 'Quality Care for Your Pets',
        subtitle: 'We Offer Comprehensive Services for All Your Pet Needs.',
        buttonText: 'VIEW SERVICES',
    },
    {
        image: CarouselImage3,
        title: 'Experienced Veterinary Team',
        subtitle: 'Providing Exceptional Care for Your Beloved Pets.',
        buttonText: 'CONTACT US',
    },
];

export default function HomePage() {
    return (
        <div className="flex flex-col items-center h-screen">
            <div className="relative w-full h-full">
                <Carousel
                    className="w-full"
                    plugins={[
                        Autoplay({
                            delay: 5000,
                            stopOnInteraction: false,
                            stopOnMouseEnter: true,
                        }),
                    ]}
                    opts={{
                        loop: true,
                    }}
                >
                    <CarouselContent className="h-screen">
                        {slides.map((slide, index) => (
                            <CarouselItem key={index} className="relative h-full">
                                <div
                                    className="absolute inset-0 brightness-35 bg-cover bg-center z-0"
                                    style={{
                                        backgroundImage: `url(${slide.image})`,
                                    }}
                                ></div>
                                <div className="h-full w-full flex items-center justify-center">
                                    <Card className="bg-transparent z-10 border-none text-center">
                                        <CardContent className="flex flex-col items-center justify-center text-white">
                                            <h1 className="text-5xl font-bold mb-4">{slide.title}</h1>
                                            <Separator className='mb-2'/>
                                            <p className="text-lg mb-6">{slide.subtitle}</p>
                                            <Button className="bg-primary w-full text-white font-semibold px-6 py-3 rounded-lg">
                                                {slide.buttonText}
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute hidden md:block bg-transparent border-transparent text-white left-4 top-1/2 -translate-y-1/2" />
                    <CarouselNext className="absolute hidden md:block bg-transparent border-transparent text-white right-4 top-1/2 -translate-y-1/2" />
                </Carousel>
            </div>
        </div>
    );
}
