import dynamic from "next/dynamic";

const ITCertification = dynamic(
  () => import("../views/it-certification/ITCertification"),
  { ssr: false }
);

export default function Page() {
  return <ITCertification />;
}