import React from 'react'
import { Card, CardContent } from './ui/card';
import Image from 'next/image';
import { getCategoryIcon, getCategoryLabel } from '@/lib/data';
import { format } from 'date-fns';
import { MapPin, Trash2, User, Users } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const EventCard = ({
  event, onClick, showActions = false, oneDelete, variant = "grid",  // "grid" or "list"
  className = "",
}) => {
  if (variant === "list") {
    return (
      <Card className={`py-0 group cursor-pointer hover:shadow-lg transition-all hover:border-purple-500/50 ${className}`} onClick={onClick}>
        <CardContent className="p-3 flex gap-3">
          <div className="relative w-24 h-24 rounded-lg overflow-hidden">
            {event.coverImage || event.imageUrl ? (
              <Image
                src={event.coverImage || event.imageUrl}
                alt={event.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0flex items-center flex justify-center text-3xl"
                style={{ backgroundColor: event.themeColor }}
              >
                {getCategoryIcon(event.category)}

              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className='font-semibold tex-sm mb-1 group-hover:text-purple-400 transition-colors line-clamp-2'>
              {event.title}
            </h3>

            <p>
              {format(event.startDate, "EEE, dd MMM, HH:mm")}
            </p>

            <div className='flex items-center gap-1 text-xs text-muted-foreground mb-1'>
              <MapPin className='w-3 h-3' />
              <span className='line-clamp-1'>
                {event.locationType === "online" ? "Online Event" : event.city}
              </span>

            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <User className='w-3 h-3' />
              <span>{event.registrationCount}</span>
            </div>



          </div>

        </CardContent>
      </Card>
    );
  }



  return (
    <Card className={`overflow-hidden group pt-0 ${onClick ? "cursor-pointer hover:shadow-lg transition-all hover:border-purple-500/50" : ""} ${className}`}
      onClick={onClick}
    >

      <div className="relative  h-48 overflow-hidden">
        {event.coverImage || event.imageUrl ? (
          <Image
            src={event.coverImage || event.imageUrl}
            alt={event.title}
            fill
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl"
            style={{ backgroundColor: event.themeColor }}
          >
            {getCategoryIcon(event.category)}

          </div>
        )}

        <div className='absolute top-3 right-3'>
          <Badge variant='secondary'>
            {event.ticketType === "free" ? "Free" : "Paid"}
          </Badge>

        </div>

      </div>
      <CardContent className="space-y-3">

        <div>
          <Badge variant='outline' className="mb-2">
            {getCategoryIcon(event.category)} {getCategoryLabel(event.category)}
          </Badge>

          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-purple-400 transition-colors">
            {event.title}
          </h3>

        </div>
        <div>
          <p className='text-muted-foreground'>
            {format(event.startDate, "EEE, dd MMM, HH:mm")}
          </p>

          <div className='flex items-center gap-1 text-xs text-muted-foreground mb-1'>
            <MapPin className='w-3 h-3' />
            <span className='line-clamp-1'>
              {event.locationType === "online" ? "Online Event" : `${event.city}, ${event.state || event.country}`}
            </span>

          </div>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className='w-3 h-3' />
            <span>{event.registrationCount} / {event.capacity}  registered</span>
          </div>
        </div>


        {showActions && (
          <div>
            <Button
              variant='outline'
              size='sm'
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                onclick?.(e);
              }}
            >
              View
            </Button>
            {oneDelete && (
              <Button
              variant='outline'
              size='sm'
              onclick={(e)=>{
                e.stopPropagation();
                oneDelete(event._id);
              }}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2  className='w-4 h-4'/>
              </Button>
            )

            }


          </div>
        )}







      </CardContent>
    </Card>
  )
}

export default EventCard
