import { auth } from "@/auth";
import { Metadata } from "next";
import MyOrderList from "@/components/my-order-list";
import { redirect } from "next/navigation";

export const metadata:Metadata ={
  title: "My Order"
}

const MyOrderPage = async () => {
  const session = await auth();
if (!session || !session.user) redirect("/signin");

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-screen-lg mx-auto mt-10 py-20 px-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl text-gray-800 mt-2">Hi, {session.user.name}</h3>
            <p className="mt-1 font-medium mb-4">Here&apos;s your order history ;</p>
          </div>
        </div>
        <div className="rounded-sm">
          <MyOrderList/>
        </div>
      </div>
    </div>
  )
};

export default MyOrderPage