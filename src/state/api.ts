import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export interface Product {
    productId: number,
    name: string,
    price: number,
    rating?: number,
    stockQuantity: number,
}

export interface SalesSummary {
    salesSummaryId: number;
    totalValue:number;
    changePercentage?:number;
    date:string;
}

export interface PurchaseSummary {
    purchaseSummaryId:string;
    totalPurchased:number;
    changePercentage:number;
    date:string;
}

export interface ExpenseSummary {
    expenseSummaryId: string;
    totalExpenses:number;
    date:string;
}

export interface ExpenseByCategory {
    expenseByCategorySummaryId:string;
    category:string;
    amount:string;
    date:string;
}

export interface DashboardMetrics{
    popularProducts: Product[],
    salesSummary: SalesSummary[],
    purchaseSummary: PurchaseSummary[],
    expenseSummary: ExpenseSummary[],
    expenseByCategory: ExpenseByCategory[]

}

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    reducerPath:"api",
    tagTypes: ["DashboardMetrics"],
    endpoints: (build) => ({
        getDashboardMetrics: build.query<DashboardMetrics,void>({
            query:()=> "/dashboard",
            providesTags:["DashboardMetrics"]
        })
    })
});

export const {
    useGetDashboardMetricsQuery
} = api;