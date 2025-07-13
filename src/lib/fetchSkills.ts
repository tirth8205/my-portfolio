import { groq } from "next-sanity";
import { sanityClient } from "./sanity";
import { Skill } from "../types";

const query = groq`
    *[_type == "skill"]
`;

export const fetchSkills = async () => {
    const skills: Skill[] = await sanityClient.fetch(query);
    return skills;
};