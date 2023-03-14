import Layout from "@/components/layout/layout";
import { NotificationProvider } from "@/store/notificationContext";
import "@/styles/globals.css";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  return (
    <NotificationProvider>
      <Layout>
        <Head>
          <title>Next event</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
        <ToastContainer />
        
      </Layout>
    </NotificationProvider>
  );
}
