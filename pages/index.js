import Head from 'next/head'
import { Inter } from 'next/font/google'
import EventList from '@/components/events/EventList';
import { getData, getFeaturedEvents } from '@/helper-firebase-db/helper-fd';
const inter = Inter({ subsets: ['latin'] })

export default function Home({featuredEvent}) {
  return (
    <>
      <Head>
        <title>New Project</title>
        <meta name="description" content="Generated by create next app" />
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
  const allData = await getData();
  console.log(allData)
  const data = await getFeaturedEvents();
  return{
    props:{
      featuredEvent:data
    }
  }
}
