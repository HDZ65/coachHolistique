'use client'
import page2 from './../../../../assets/2eme page.png';
import page3 from './../../../../assets/3eme page.png';
import sommaire from './../../../../assets/sommaire.png';
import ebook from './../../../../assets/couvertureEbook.png';
import page4 from './../../../../assets/4eme page.png';



import * as React from "react"
import Image from "next/image"; // Assurez-vous d'importer Image de 'next/image'

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

export function CarouselEbook() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const images = [
    {
      id: 1,
      src: ebook,
      alt: 'Couverture ebook'
    },
    {
      id: 2,
      src: sommaire,
      alt: 'sommaire ebook'
    },
    {
      id: 3,
      src: page2,
      alt: 'page2 ebook'
    },
    {
      id: 4,
      src: page3,
      alt: 'page3 ebook'
    },
    {
      id: 5,
      src: page4,
      alt: 'page4 ebook'
    },
  ]

  return (
    <div className='w-full'>
      <Carousel setApi={setApi} className=" max-md:min-w-full flex justify-center items-center gap-6 max-sm:w-3/4 max-md:w-10/12 mx-auto z-50 md:w-full h-full max-w-md">
        <CarouselPrevious />
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.id}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center md:p-6 p-2">
                  <Image src={image.src} alt={image.alt} width={500} height={500} />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Extraits page {current} sur 29
      </div>
    </div>
  )
}