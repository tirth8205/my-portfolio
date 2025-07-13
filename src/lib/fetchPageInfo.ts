import { groq } from "next-sanity";
import { sanityClient } from "./sanity";
import { PageInfo } from "../types";

const query = groq`
    *[_type == 'pageInfo'][0]
`;

export const fetchPageInfo = async () => {
    const pageInfo: PageInfo = await sanityClient.fetch(query);
    return pageInfo;
}