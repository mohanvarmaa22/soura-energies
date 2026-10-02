import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", description: "e.g. 5 kW rooftop, Kondapur", validation: (r) => r.required() }),
    defineField({
      name: "type",
      type: "string",
      options: { list: [{ title: "Residential", value: "residential" }, { title: "Commercial", value: "commercial" }], layout: "radio" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "capacityKw", title: "Capacity (kW)", type: "number", validation: (r) => r.required().min(0.5) }),
    defineField({ name: "city", type: "string", validation: (r) => r.required() }),
    defineField({ name: "year", title: "Year completed", type: "number" }),
    defineField({ name: "annualSavings", title: "Yearly bill saving (₹)", type: "number" }),
    defineField({ name: "summary", type: "text", rows: 3, description: "One or two plain sentences." }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Describe the photo", validation: (r) => r.required() })],
      validation: (r) => r.required().assetRequired(),
    }),
    defineField({ name: "featured", type: "boolean", initialValue: false, description: "Shown larger at the top of the page." }),
  ],
  orderings: [{ title: "Newest first", name: "yearDesc", by: [{ field: "year", direction: "desc" }] }],
  preview: {
    select: { title: "title", subtitle: "city", media: "image" },
  },
});
