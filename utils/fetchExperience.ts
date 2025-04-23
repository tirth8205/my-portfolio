import { groq } from "next-sanity";
import { sanityClient } from "../sanity";
import { Experience } from "../typings";

const query = groq`
    *[_type == "experience"] | order(_createdAt desc)
`;

export const fetchExperiences = async () => {
    const experiences: Experience[] = await sanityClient.fetch(query);
    return experiences;
};