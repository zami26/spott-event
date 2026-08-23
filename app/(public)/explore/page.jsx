"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, Card, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { api } from '@/convex/_generated/api';
import { useConvexQuery } from '@/hooks/use-convex-query';
import { format } from 'date-fns';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowRight, Calendar, Loader2, MapPin, Users } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';

import { createLocationSlug } from '@/lib/location-utils';


const ExplorePage = () => {

  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);
  const plugins = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));


  const { data: featuredEvents, isLoading: loadingFeatured } = useConvexQuery(api.explore.getFeaturedEvents, { limit: 3 });
  // console.log("featuredEvents", featuredEvents);
  const { data: localEvents, isLoading: loadingLocal } = useConvexQuery(api.explore.getEventsByLocation,
    {
      city: currentUser?.city || "Gurugram",
      state: currentUser?.state || "Haryana",
      limit: 4,
    });

  const router = useRouter();


  const { data: popularEvents, isLoading: loadingPopular } = useConvexQuery(api.explore.getPopularEvents, { limit: 6 });

  const { data: categoryCounts } = useConvexQuery(api.explore.getCategoryCounts);

  const handleEventClick = (slug) => {
    router.push(`/events/${slug}`);
  }

  const handleLocationEvents = () => {
    const city = currentUser?.location?.city || "Gurugram";
    const state = currentUser?.location?.state || "Haryana";

    const slug = createLocationSlug(city, state);
    router.push(`/explore/${slug}`);
  }

  //loading state

  const isLoading = loadingFeatured || loadingLocal || loadingPopular;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-purple-500" />
      </div>
    );
  }

  return (
    <>

      <div className="pb-12 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Discover Events</h1>
        <p className="text-lg text-muted-foreground mx-w-3xl mx-auto"> Explore featured events, find what&apos; happening locally, or browse events across the world.</p>
      </div>





      {/* featured events carousel */}

      {featuredEvents && featuredEvents.length > 0 && (
        <div className='mb-16'>
          <Carousel className="w-full "
            plugins={[plugins.current]}
            onMouseEnter={plugins.current.stop}
            onMouseLeave={plugins.current.reset}
          >
            <CarouselContent>
              {featuredEvents.map((event) => (
                <CarouselItem key={event._id}>
                  <div onClick={() => handleEventClick(event.slug)}
                    className="relative h-[400px] rounded-xl overflow-hidden cursor-pointer "
                  >
                    {event.coverImage || event.imageUrl ? (<Image
                      src={event.coverImage || event.imageUrl}
                      alt={event.title}
                      fill
                      className="object-cover"
                      priority
                    />)
                      :
                      (<div className="absolute inset-0"
                        style={{ backgroundColor: event.themeColor }}
                      />
                      )}



                    <div className="absolute inset-0 bg-linear-to-r from-black/60 to-black/30" />



                    <div className='relative h-full flex flex-col justify-end p-8 md:p-12'>
                      <Badge className="w-fit mb-4" variant="secondary">
                        {event.city}, {event.state || event.country}
                      </Badge>
                      <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">{event.title}</h2>
                      <p className="text-lg text-white/80 mb-4 max-w-2xl line-clamp-2">{event.description}</p>

                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-white/70">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">
                            {format(event.startDate, "dd MMM yyyy")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">
                            {event.city}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">
                            {event.registrationCount}
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
      )}

      {/* local events section */}

      {localEvents && localEvents.length > 0 && (
        <div className="mb-16">
          <div className="font-bold mb-6 flex items-center justify-between">
            <div>
              <h2 className='text-3xl font-bold mb-1'>Events Near You</h2>
              <p className="text-muted-foreground" >
                Happening in {currentUser?.location?.city || "your area"}
              </p>
            </div>

            <Button variant="outline" className="gap-2" onClick={handleLocationEvents}
            >View All <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

      )}


      {/* Browse by category section */}



      {/* popular events across the country section */}



      {/* popular events across the country section */}


      {/* empty state */}



    </>
  );
};
export default ExplorePage
