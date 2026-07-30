"use client";

import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { BarLoader } from 'react-spinners'
import { useStoreUser } from '@/hooks/use-store-user'
import { Building, Plus, Ticket } from 'lucide-react';

const Header = () => {


    const { isLoading } = useStoreUser();

    const [showUpgradeModal, setShowUpgradeModal] = useState(false)

    return (
        <>
            <nav className='fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-xl z-20 border-b'>
                <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
                    {/* logo */}
                    <Link href={"/"} className='flex items-center'>
                        <Image
                            src="/spott.png"
                            alt="Spott logo"
                            width={500}
                            height={500}
                            className='w-full h-11'
                            priority
                        />
                    </Link>


                    {/* Search & location for desktop */}


                    {/* Right side actions */}
                    <div className='flex items-center'>

                        <Button variant={'ghost'} size='small' className={"me-4"} onClick=
                            {()=>setShowUpgradeModal(true)}>
                            Pricing
                        </Button>

                        <Button variant={'ghost'} size='sm' className={"mr-2"}>
                            <Link href="explore" >Explore</Link>
                        </Button>

                        <Show when="signed-out">
                            <SignInButton mode='modal'>
                                <Button size='sm'>Sign In</Button>
                            </SignInButton>

                            <SignUpButton mode='modal' className="ms-4">
                                <Button size='sm'>Sign Up</Button>
                            </SignUpButton>

                        </Show>
                        <Show when="signed-in">

                            <Button size='sm' className=" gap-2 mr-4">
                                <Link href="/create-event" className='flex'>
                                    <Plus className='w-4 h-4' />
                                    <span className='hidden sm:inline'>Create Event</span>
                                </Link>
                            </Button>

                            <UserButton>
                                <UserButton.MenuItems>

                                    <UserButton.Link
                                    label='My Tickets'
                                    labelIcon={<Ticket size={16}/>}
                                    href='/my-tickets'
                                    />

                                    <UserButton.Link
                                    label='My Events'
                                    labelIcon={<Building size={16}/>}
                                    href='/my-events'
                                    />


                                  <UserButton.Action label='manageAccount'/> 
                                </UserButton.MenuItems>


                            </UserButton>
                        </Show>
                    </div>
                </div>

                {/* mobile search & location - below header  */}

                {/* loader */}
                {isLoading && (<div className='absolute bottom-0 left-0 w-full'>
                    <BarLoader width={"100%"} color='#a855f7' />
                </div>)}

            </nav>
            {/* modal */}
        </>
    )
}

export default Header
