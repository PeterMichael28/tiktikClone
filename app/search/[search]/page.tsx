import axios from "axios";
import { base_url } from '@/utils/utils/constants';
import { Video } from "@/types";
import SearchComp from "@/components/SearchComp";

export default async function Page({
 params,
}: {
 params: { search: string };
}) {
 const { data } = await axios.get(
  `${base_url}/api/search/${params.search}`
 );

 return (
  <div className="w-full">
   <SearchComp data={data} search={params.search} />
  </div>
 );
}
