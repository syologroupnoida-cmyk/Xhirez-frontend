import dynamic from "next/dynamic";

const Checkout = dynamic(
  () => import("../views/forbusiness/Checkout"),
  { ssr: false }
);

export default function CheckoutPage() {
  return <Checkout />;
}