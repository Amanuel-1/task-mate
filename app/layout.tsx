
'use client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@radix-ui/themes/styles.css';
import SideNav from './components/SideNav'
import { Button, Theme } from '@radix-ui/themes'
import SessionProvide from './components/sessionProvide';
import { getServerAuthSession } from './lib/auth';
import { redirect, useRouter } from 'next/navigation';
import AuthLayout from './(auth)/layout';
import Link from 'next/link';

import router from 'next/navigation'
import { useEffect } from 'react';


// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  // const session = await getServerAuthSession()
  // console.log("this session is from the server", session)

  // if(!session?.user){
  //   redirect("/login")
  // }


  const router = useRouter()
  if (!localStorage.getItem('userId')) {
    router.push('/login')
  }

  useEffect(() => {
    const fun = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/getUser?uid=${localStorage.getItem('userId')}`);

        if (response.ok) {
          const data = await response.json();
          console.log("Logged in as ", data.name);
        } else {
          console.error('Error getting user name');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fun();
  })

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>TaskMate</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <script src="https://kit.fontawesome.com/bb488c4407.js" async></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Agbalumo&family=Comfortaa&family=Gasoek+One&family=Inter&family=Lilita+One&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;1,100;1,200;1,300;1,400;1,500&family=Mooli&family=Open+Sans&family=Play:wght@400;700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,800;1,100;1,200;1,300;1,400&family=Quicksand&family=Raleway&family=Rubik&display=swap" rel="stylesheet" />
      </head>
      <body>
        <SessionProvide>
          <Theme>
            {
              <section className='flex fixed h-screen w-full'>
                <SideNav />
                <main className='flex-grow h-screen overflow-y-scroll w-full px-16 py-10'>{children}</main>
              </section>
            }
          </Theme>
        </SessionProvide>
      </body>
    </html>
  )
}
