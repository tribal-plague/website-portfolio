import { defineType, defineField, defineArrayMember } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",

  // Preview in the studio list — shows thumbnail + title
  preview: {
    select: {
      title: "title",
      company: "company",
      year: "year",
      media: "thumb",
    },
    prepare({ title, company, year, media }) {
      return {
        title: title ?? "Untitled project",
        subtitle: [company, year].filter(Boolean).join(" · "),
        media,
      };
    },
  },

  fields: [
    // ── Identity ──────────────────────────────────────────────────────────────

    defineField({
      name: "numericId",
      title: "Numeric ID",
      type: "number",
      description: "Unique number used in the portfolio URL (/portfolio/:id). Auto-set on create.",
      readOnly: true,
      validation: (Rule) => Rule.required().integer().positive(),
    }),

    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "company",
      title: "Company / Client",
      type: "string",
    }),

    defineField({
      name: "role",
      title: "Your Role",
      type: "string",
      placeholder: "Designer & Developer",
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "UI Design", value: "UI Design" },
          { title: "Branding", value: "Branding" },
          { title: "Campaign", value: "Campaign" },
          { title: "Motion", value: "Motion" },
          { title: "Illustration", value: "Illustration" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "year",
      title: "Year",
      type: "string",
      placeholder: "2024",
    }),

    defineField({
      name: "uploadDate",
      title: "Upload Date",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
    }),

    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Featured projects appear on the Home page.",
      initialValue: false,
    }),

    // ── Description ───────────────────────────────────────────────────────────

    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      description: "Shown on the portfolio card and at the top of the project page.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "longDescription",
      title: "Long Description",
      type: "array",
      description: "Each item becomes one paragraph on the project detail page.",
      of: [
        defineArrayMember({
          type: "text",
          rows: 4,
        }),
      ],
    }),

    // ── Outcomes / Metrics ────────────────────────────────────────────────────

    defineField({
      name: "outcomes",
      title: "Numericals / Outcomes",
      type: "array",
      description: "Up to 4 key metrics shown as big numbers (e.g. '25%' / 'Increase in click rates').",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "value", title: "Value", type: "string", placeholder: "25%" }),
            defineField({ name: "label", title: "Label", type: "string", placeholder: "Increase in click rates" }),
          ],
          preview: {
            select: { value: "value", label: "label" },
            prepare: ({ value, label }) => ({ title: `${value} — ${label}` }),
          },
        }),
      ],
      validation: (Rule) => Rule.max(4),
    }),

    // ── Skills & Tools ────────────────────────────────────────────────────────

    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),

    defineField({
      name: "tools",
      title: "Tools",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),

    // ── Media ─────────────────────────────────────────────────────────────────

    defineField({
      name: "thumbUrl",
      title: "Thumbnail URL",
      type: "url",
      description: "Card image — 4:3 ratio recommended. Paste a URL (Unsplash, Cloudinary, etc.).",
      validation: (Rule) => Rule.uri({ allowRelative: false }),
    }),

    defineField({
      name: "imageUrls",
      title: "Project Image URLs",
      type: "array",
      description: "Gallery images shown on the project detail page — like a Behance case study.",
      of: [
        defineArrayMember({
          type: "url",
          validation: (Rule) => Rule.uri({ allowRelative: false }),
        }),
      ],
    }),
  ],

  // Order fields logically in the studio form
  groups: [
    { name: "identity", title: "Identity", default: true },
    { name: "description", title: "Description" },
    { name: "media", title: "Media" },
    { name: "metrics", title: "Metrics" },
    { name: "skills", title: "Skills & Tools" },
  ],
});
