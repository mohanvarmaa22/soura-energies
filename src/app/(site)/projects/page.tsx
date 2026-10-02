import type { Metadata } from "next";
import { ProjectGallery, type GalleryProject } from "@/components/ProjectGallery";
import { Button } from "@/components/Button";
import { getProjects, imageUrl } from "@/sanity/client";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Projects",
  description: `Solar installations by ${site.name} across Telangana, with capacity, location and yearly savings.`,
};

// Shown in development only, while Sanity is not configured. Never shipped to production.
const samples: GalleryProject[] = [
  { id: "s1", title: "5 kW rooftop, Kondapur", type: "residential", capacityKw: 5, city: "Hyderabad", year: 2026, annualSavings: 52000, summary: "Sample entry. Replace via the CMS.", imageSrc: null, imageAlt: "" },
  { id: "s2", title: "2 kW rooftop, Warangal", type: "residential", capacityKw: 2, city: "Warangal", year: 2026, annualSavings: 21000, summary: "Sample entry. Replace via the CMS.", imageSrc: null, imageAlt: "" },
  { id: "s3", title: "25 kW factory roof, Medchal", type: "commercial", capacityKw: 25, city: "Medchal", year: 2025, annualSavings: 260000, summary: "Sample entry. Replace via the CMS.", imageSrc: null, imageAlt: "" },
];

export default async function ProjectsPage() {
  const fromCms = await getProjects();
  const projects: GalleryProject[] | null =
    fromCms?.map((p) => ({
      id: p._id,
      title: p.title,
      type: p.type,
      capacityKw: p.capacityKw,
      city: p.city,
      year: p.year,
      annualSavings: p.annualSavings,
      summary: p.summary,
      imageSrc: imageUrl(p.image, 900),
      imageAlt: p.image?.alt ?? p.title,
    })) ?? (process.env.NODE_ENV === "development" ? samples : null);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20">
      <h1 className="max-w-[20ch] text-4xl font-bold leading-[1.05] tracking-tighter md:text-5xl">Installed across Telangana.</h1>
      <p className="mt-4 max-w-[55ch] text-lg text-muted">Real homes and businesses, with capacity, location and what each saves.</p>

      <div className="mt-10">
        {projects && projects.length > 0 ? (
          <ProjectGallery projects={projects} />
        ) : (
          <div className="rounded-2xl border border-dashed border-line p-10 text-center">
            <p className="font-semibold">Projects are being added.</p>
            <p className="mt-2 text-muted">Want to see what we can do for your roof?</p>
            <div className="mt-6 flex justify-center">
              <Button href="/quote">{site.cta}</Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
