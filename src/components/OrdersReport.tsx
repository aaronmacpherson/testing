"use client";
import { useEffect, useState } from 'react';
import { getJSONData } from '@/tools/Toolkit';
import { Orders, Order, Topping, Note } from '@/tools/orders.model';

export default function OrdersReport({setAppState, appState} : {setAppState:Function, appState:number}) {
    // retrieve server sided script
    const RETRIEVE_SCRIPT:string = "https://www.seanmorrow.ca/_lessons/retrieveOrder.php";

    // ---------------------------------- private methods
    const getOrders = async () => {
        const data:Orders = await getJSONData(RETRIEVE_SCRIPT, false, true);
        console.log(data);

        // save it in a state variable - because it is used in JSX and needs to persist
        setOrders(data.orders);
        // data all loaded! Change app state of web app
        setAppState(3);
    }

    // ---------------------------------- use effects
    useEffect(() => {
        if (appState == 2) getOrders();
    }, [appState]);

    // ---------------------------------- state variables
    const [orders, setOrders] = useState<Order[]>([]);
  
    if (appState == 1) {
        return (<>No orders retrieved...</>);
    } else if (appState == 3) {
        return (
            <>
                {orders.map(
                    (order:Order, i:number) =>
                        <div key={`Order ${i}`} className='pb-3'>
                            <div className='text-[#b82308] font-bold text-2xl mb-[10px]'>Order #{order.id}</div>
                            <div className='mb-[10px]'>
                                <div className='font-bold'><i className="fas fa-info-circle"></i> Customer Information</div>
                                <div>{order.name}</div>
                                <div>{order.address}</div>
                                <div>{order.city}</div>
                            </div>
                            <div key={`Size ${i}`} className='mb-[10px]'>
                                <div className='font-bold'><i className="fas fa-pizza-slice"></i> Pizza Size</div>
                                <div>{order.size}</div>
                            </div>
                            <div key={`Details ${i}`} className='mb-[10px]'>
                                <div className='font-bold'><i className="fas fa-list-ul"></i> Order Details</div>
                                <div>
                                    {order.toppings.map(
                                        (topping:Topping, i:number) =>
                                            <div key={i}>{topping.topping}</div>
                                    )}
                            </div>
                            </div>
                            <div className='mb-[10px]'>
                                <div className='font-bold'><i className="fas fa-sticky-note"></i> Order Notes</div>
                                <div>
                                    {order.notes.map(
                                        (note:Note, i:number) =>
                                            <div key={i}>{note.note}</div>
                                    )}
                            </div>
                            </div>
                        </div>
                )}
            </>
        )
    }
}
