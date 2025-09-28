import { Metadata } from "next";
import OrderDetail from "@/components/order-detail";
import { Suspense } from "react";

export const metadata:Metadata ={
    title: "Order Detail",
}

const MyOrderDetail = async ({
    params
}:{
    params: Promise<{id: string}>
}) => {

    const reservationId = (await params).id;

  return (
    <div className='min-h-screen bg-slate-50'>
        <div className="max-w-screen-lg mx-auto mt-10 py-20 px-4">
            {/* Order detail */}
            <Suspense fallback={<p>Loading...</p>}>
                <OrderDetail reservationId={reservationId}/>
            </Suspense>
            
        </div>
    </div>
  )
}

export default MyOrderDetail