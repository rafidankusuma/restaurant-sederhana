import { Metadata } from "next";
import { Suspense } from "react";
import ChechkoutDetail from "@/components/chechkout-detail"
import Script from "next/script";

export const metadata: Metadata = {
  title: "Order Makanan",
}

const CheckoutPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const reservationId = (await params).id;

  return (
    <div className="max-w-screen-xl px-4 mx-auto py-20 mt-12">
      <h1 className="text-2xl font-semibold mb-8">Order Makanan</h1>  
      <Suspense fallback={<p>Loading...</p>}>
        <ChechkoutDetail reservationId={reservationId} />
      </Suspense>
      <Script src="https://app.sandbox.midtrans.com/snap/snap.js" data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}/>
    </div>
  )
}

export default CheckoutPage