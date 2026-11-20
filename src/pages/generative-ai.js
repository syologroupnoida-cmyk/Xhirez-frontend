import dynamic from "next/dynamic";

const GenerativeAI = dynamic(() => import("../views/generative-ai/GenerativeAI"), { ssr: false });

export default function Page() {
  return <GenerativeAI />;
}