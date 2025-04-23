import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../sanity";
import { PageInfo } from "../../typings";

const query = groq`
    *[_type == 'pageInfo'][0]
`;

type Data = {
    pageInfo?: PageInfo; // Make pageInfo optional
    error?: string;      // Add error field for failure cases
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        const pageInfo: PageInfo = await sanityClient.fetch(query);
        if (!pageInfo) {
            return res.status(404).json({ error: "Page info not found" });
        }
        res.status(200).json({ pageInfo });
    } catch (error) {
        console.error("Error fetching page info:", error);
        res.status(500).json({ error: "Failed to fetch page info" });
    }
}