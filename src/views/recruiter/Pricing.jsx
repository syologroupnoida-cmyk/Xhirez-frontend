// components/BuyResumePackages.jsx
// Standalone React Component: Resume Database Access Packages (no header/footer)

import React, { useState } from "react";
import Link from "next/link";
import RecruitHeader from "./RecruitHeader";
import RecruitFooter from "./RecruitFooter";

const BuyResumePackages = () => {
    const [billingCycle, setBillingCycle] = useState("monthly");

    const packages = [
        {
            name: "Starter",
            priceMonthly: 4999,
            priceYearly: 47990,
            credits: 500,
            validity: billingCycle === "monthly" ? "1 month" : "12 months",
            features: ["Full resume access", "Basic filters", "Email support"],
            highlight: false,
        },
        {
            name: "Professional",
            priceMonthly: 12999,
            priceYearly: 124790,
            credits: 1500,
            validity: billingCycle === "monthly" ? "1 month" : "12 months",
            features: ["Advanced AI search", "Contact details", "Priority support", "Bulk export"],
            highlight: true,
        },
        {
            name: "Enterprise",
            priceMonthly: 29999,
            priceYearly: 287990,
            credits: 5000,
            validity: billingCycle === "monthly" ? "1 month" : "12 months",
            features: ["Unlimited filters", "Dedicated account manager", "API access", "Custom reporting"],
            highlight: false,
        },
    ];

    return (
        <div className="xh-recruit-page min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <RecruitHeader />
            {/* Hero Section - Exact copy from the reference URL */}
            <section className="relative overflow-hidden bg-gradient-to-r from-[#0a2b3e] to-[#1f4f6e] pt-16 text-white">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center opacity-10"></div>
                <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                        <span className="block">Find, attract, and hire talent from</span>
                        <span className="block text-[#f05b3b] mt-2">India&apos;s largest talent pool</span>
                    </h1>
                    <div className="mt-8 flex flex-wrap justify-center gap-8 text-lg">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">👥</span>
                            <span>100 Mn+ skilled candidates</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">💰</span>
                            <span>Save on total cost of hire</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">💼</span>
                            <span>Tech & non-tech roles</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Explore Plans Section */}
            <section className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-[#0a2b3e] sm:text-4xl">Explore plans</h2>
                    <p className="mt-3 text-gray-600">Choose the perfect resume database access for your hiring needs</p>
                </div>

                {/* Billing Toggle */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex overflow-hidden rounded bg-gray-100 p-1">
                        <button
                            onClick={() => setBillingCycle("monthly")}
                            className={`rounded-l px-6 py-2 text-sm font-medium transition ${billingCycle === "monthly"
                                ? "bg-[#f05b3b] text-white"
                                : "text-gray-700 hover:text-[#f05b3b]"
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle("yearly")}
                            className={`rounded-r px-6 py-2 text-sm font-medium transition ${billingCycle === "yearly"
                                ? "bg-[#f05b3b] text-white"
                                : "text-gray-700 hover:text-[#f05b3b]"
                                }`}
                        >
                            Yearly <span className="text-xs ml-1 text-green-600">Save 20%</span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {packages.map((pkg, idx) => {
                        const price = billingCycle === "monthly" ? pkg.priceMonthly : pkg.priceYearly;
                        const displayPrice = `₹${price.toLocaleString()}`;
                        return (
                            <div
                                key={idx}
                                className={`rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${pkg.highlight
                                    ? "border-2 border-[#f05b3b] relative bg-white scale-105 z-10"
                                    : "border border-gray-200 bg-white"
                                    }`}
                            >
                                {pkg.highlight && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#f05b3b] text-white text-xs font-bold px-3 py-1 rounded-full">
                                        MOST POPULAR
                                    </div>
                                )}
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-[#0a2b3e]">{pkg.name}</h3>
                                    <div className="mt-4 flex items-baseline">
                                        <span className="text-4xl font-extrabold text-gray-900">{displayPrice}</span>
                                        <span className="ml-2 text-gray-500">/ {billingCycle === "monthly" ? "month" : "year"}</span>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500">
                                        <span className="font-semibold">{pkg.credits.toLocaleString()}</span> resume downloads
                                        <br />
                                        Validity: {pkg.validity}
                                    </p>
                                    <hr className="my-6" />
                                    <ul className="space-y-3">
                                        {pkg.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2 text-gray-600">
                                                <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        href="/employer-login"
                                        className={`mt-8 block w-full rounded px-4 py-3 text-center font-semibold no-underline transition ${pkg.highlight
                                            ? "bg-[#f05b3b] text-white hover:bg-[#d94a2c] shadow-md"
                                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                            }`}
                                    >
                                        Buy Now
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Additional Info Section - exactly matching the reference page stats */}
                <div className="mt-20 text-center border-t pt-12">
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="p-4">
                            <div className="text-3xl mb-3">🔍</div>
                            <h3 className="font-bold text-lg">100 Mn+ skilled candidates</h3>
                            <p className="text-gray-500 text-sm mt-1">with relevant experience</p>
                        </div>
                        <div className="p-4">
                            <div className="text-3xl mb-3">💰</div>
                            <h3 className="font-bold text-lg">Plans to help you save</h3>
                            <p className="text-gray-500 text-sm mt-1">on the total cost of hire</p>
                        </div>
                        <div className="p-4">
                            <div className="text-3xl mb-3">📊</div>
                            <h3 className="font-bold text-lg">Top profiles available</h3>
                            <p className="text-gray-500 text-sm mt-1">across tech and non-tech roles</p>
                        </div>
                    </div>

                    {/* Trust badge */}
                    <div className="mt-12 inline-flex items-center gap-2 bg-gray-50 rounded-full px-6 py-2">
                        <span className="text-sm text-gray-600">✨ Trusted by 50,000+ recruiters</span>
                    </div>
                </div>
            </section>
            <RecruitFooter />
        </div>
    );
};

export default BuyResumePackages;
