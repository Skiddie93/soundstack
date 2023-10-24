"use client";
import { useSearchParams } from "next/navigation";
interface PageProps {
  params: { id: string };
}
const Page = ({ params }: PageProps) => {
  const par = useSearchParams().get("data");

  console.log(params, par);

  return <h1>{params.id}</h1>;
};

export default Page;
