"use client";

import Banner from "@/components/Banner";
import OrdersReport from "@/components/OrdersReport";
import { CSSProperties, useState } from "react";
import LoadingOverlay from "@/components/LoadingOverlay";
import { PuffLoader } from "react-spinners";

export default function Home() {

  // ---------------------------- event handlers
  const showOrders = (e:any) => setAppState(2);

  // ---------------------------- state variables
  // 1 - no orders loaded
  // 2 - orders loading
  // 3 - orders have been loaded
  const [appState, setAppState] = useState(1);

  // ---------------------------- rendering to DOM
  return (
    <main className="grid grid-rows-1 grid-cols-1 gap-0 text-content">

      {/* <LoadingOverlay show={(appState == 2) ? true : false } bgColor="#b82308" /> */}

      <Banner />

      <aside className="flex flex-nowrap items-center justify-between p-5 flex-col md:flex-row">
        <div className="mb-5 md:hidden text-center">
          <>1234 Cheesy Drive | Tastyville, NS | 902-123-4567</>
        </div>
        <div>
          <div className="text-accent text-3xl font-bold mb-2.5">Welcome loyal pizza dispatcher....</div>Click the &quot;Get Orders&quot; button below to view all current orders that need to be delivered.
          <div>
              <button onClick={showOrders} disabled={appState == 2}
                className="bg-accent border-none rounded-md p-2.5 text-white enabled:hover:bg-greyContent mt-5 disabled:bg-gray-300">Get Orders
              </button>
          </div>
        </div>
        <div className="shrink-0 text-lg text-right text-greyContent hidden md:block">
          <div>Antonio&apos;s Pizzaria</div>
          <div>1234 Cheesy Drive</div>
          <div>Tastyville, NS</div>
          <div>902-123-4567</div>
        </div>
      </aside>

      <div className="bg-greyAccent p-10">
      <div className={`flex items-center gap-2 ${appState == 2 ? "block" : "hidden" }`}>
            <PuffLoader /> Loading...
          </div>

        <div id="output" className="divide-dashed divide-y-2 divide-accent text-[0.9rem]">
          <OrdersReport setAppState={setAppState} appState={appState} />

        </div>
      </div>
    </main>
  );
}