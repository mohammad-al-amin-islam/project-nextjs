import Head from 'next/head'
import { Inter } from 'next/font/google'
import EventList from '@/components/events/EventList';
import {  getFeaturedEvents } from '@/helper-firebase-db/helper-fd';
const inter = Inter({ subsets: ['latin'] })

export default function Home({featuredEvent}) {
  return (
    <>
      <Head>
        <title>Event</title>
        <meta name="description" content="Here you can find events" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
       
      </Head>
      
      <div>
        <EventList items={featuredEvent} />
      </div>
      
    </>
  )
}


export async function getStaticProps(){
  const data = await getFeaturedEvents();
  return{
    props:{
      featuredEvent:data
    },
    revalidate:1800
  }
}
