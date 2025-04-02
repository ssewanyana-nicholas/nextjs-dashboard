import CardWrapper from "@/app/ui/dashboard/cards";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { lusitana } from "@/app/ui/fonts";
import { fetchCardData } from "@/app/lib/data";
import { Suspense } from "react";
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from "@/app/ui/skeletons";

export default async function Page() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      {/* Display the fetched values */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 border rounded-md shadow-sm">
          <h2 className="text-lg font-semibold">Invoices</h2>
          <p>{numberOfInvoices}</p>
        </div>
        <div className="p-4 border rounded-md shadow-sm">
          <h2 className="text-lg font-semibold">Customers</h2>
          <p>{numberOfCustomers}</p>
        </div>
        <div className="p-4 border rounded-md shadow-sm">
          <h2 className="text-lg font-semibold">Paid Invoices</h2>
          <p>{totalPaidInvoices}</p>
        </div>
        <div className="p-4 border rounded-md shadow-sm">
          <h2 className="text-lg font-semibold">Pending Invoices</h2>
          <p>{totalPendingInvoices}</p>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
