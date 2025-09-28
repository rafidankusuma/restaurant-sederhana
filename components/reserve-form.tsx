"use client";
import { useState, useActionState } from "react";
import { addDays } from "date-fns";
import { createReserve } from "@/lib/actions";
import { FoodDetailProps } from "@/types/food";
import clsx from "clsx";
 
const ReserveForm = ({ food }: { food: FoodDetailProps }) => {
    const StartDate = new Date();
    const EndDate = addDays(StartDate, 1);

    const [startDate, setStartDate] = useState(StartDate);
    const [endDate, setEntDate] = useState(EndDate);

    const handleDateChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;
        setStartDate(start ?? StartDate);
    }

    const [state, formAction, isPending] = useActionState(createReserve.bind(null, food.id,
        food.price,), null)

    return (
        <div>
            <form action={formAction}>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Your Name</label>
                    <input
                        type="text"
                        name="name"
                        className="py-2 px-4 rounded-md border border-gray-300 w-full"
                        placeholder="Full Name..." />
                    <div aria-live="polite" aria-atomic="true">
                        <p className="text-sm text-red-500 mt-2"
                        >
                            {state?.error?.name}
                        </p>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Phone Number
                    </label>
                    <input
                        type="text"
                        name="phone"
                        className="py-2 px-4 rounded-md border border-gray-300 w-full"
                        placeholder="Phone Number..." />
                    <div aria-live="polite" aria-atomic="true">
                        <p className="text-sm text-red-500 mt-2">{state?.error?.phone}</p>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Address
                    </label>
                    <textarea
                        name="address"
                        rows={5}
                        className="py-2 px-4 rounded-md border border-gray-300 w-full resize-none"
                        placeholder="Your Full Address..."
                    ></textarea>
                    <div aria-live="polite" aria-atomic="true">
                        <p className="text-sm text-red-500 mt-2">{state?.error?.address}</p>
                    </div>
                </div>

                <input type="hidden" name="night" value={1} />

                <button
                    type="submit"
                    className={clsx("px-10 py-3 text-center font-semibold text-white w-full bg-orange-400 rounded-sm cursor-pointer hover:bg-orange-500", {
                        "opacity-50 cursor-progress": isPending
                    })}
                    disabled={isPending}
                >
                    {isPending ? "Loading..." : "Order"}
                </button>
            </form>
        </div>
    )
}

export default ReserveForm