import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import { apiVersion, dataset, projectId, sanityConfigured } from "./env";

export type Project = {
  _id: string;
  title: string;
  type: "residential" | "commercial";
  capacityKw: number;
  city: string;
  year?: number;
  annualSavings?: number;
  summary?: string;
  featured?: boolean;
  image?: { alt?: string; asset?: { _ref: string } };
};

const client = sanityConfigured ? createClient({ projectId, dataset, apiVersion, useCdn: true }) : null;

export function imageUrl(source: Project["image"], width: number) {
  if (!client || !source) return null;
  return createImageUrlBuilder({ projectId, dataset }).image(source).width(width).auto("format").url();
}

const projectsQuery = `*[_type == "project"] | order(featured desc, year desc, _createdAt desc){
  _id, title, type, capacityKw, city, year, annualSavings, summary, featured, image
}`;

/** Returns null when Sanity is not configured, so callers can show a fallback. */
export async function getProjects(): Promise<Project[] | null> {
  if (!client) return null;
  return client.fetch<Project[]>(projectsQuery, {}, { next: { revalidate: 60 } });
}
