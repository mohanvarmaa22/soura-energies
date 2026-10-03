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
  if (!client || !source?.asset) return null;
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

export type Testimonial = { _id: string; quote: string; name: string; city?: string; systemKw?: number };

const testimonialsQuery = `*[_type == "testimonial"] | order(_createdAt desc)[0...6]{ _id, quote, name, city, systemKw }`;

/** Empty when Sanity is not configured or has no testimonials. */
export async function getTestimonials(): Promise<Testimonial[]> {
  if (!client) return [];
  return client.fetch<Testimonial[]>(testimonialsQuery, {}, { next: { revalidate: 60 } });
}
