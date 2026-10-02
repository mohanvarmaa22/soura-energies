import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "quote", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "city", type: "string" }),
    defineField({ name: "systemKw", title: "System size (kW)", type: "number" }),
  ],
  preview: { select: { title: "name", subtitle: "city" } },
});
