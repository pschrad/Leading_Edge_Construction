import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
		}),
});

const services = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			order: z.number().optional(),
			excerpt: z.string().optional(),
			heroEyebrow: z.string().optional(),
			heroHeading: z.string().optional(),
			heroDescription: z.string().optional(),
			heroImage: image().optional(),
			heroCard: z
				.object({
					title: z.string(),
					description: z.string(),
					items: z.array(z.string()).optional(),
					image: image().optional(),
				})
				.optional(),
			ctaPrimary: z
				.object({
					label: z.string(),
					href: z.string(),
				})
				.optional(),
			ctaSecondary: z
				.object({
					label: z.string(),
					href: z.string(),
				})
				.optional(),
			metrics: z
				.array(z.object({ value: z.string(), label: z.string() }))
				.optional(),
			serviceAreas: z.array(z.string()).optional(),
			serviceHighlights: z
				.array(
					z.object({
						title: z.string(),
						description: z.string(),
						linkLabel: z.string().optional(),
						linkHref: z.string().optional(),
					}),
				)
				.optional(),
			featuredProject: z
				.object({
					title: z.string(),
					description: z.string(),
					image: image().optional(),
					stats: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
					ctaLabel: z.string().optional(),
					ctaHref: z.string().optional(),
				})
				.optional(),
			processSteps: z
				.array(z.object({ title: z.string(), description: z.string() }))
				.optional(),
			testimonials: z
				.array(z.object({ quote: z.string(), author: z.string() }))
				.optional(),
			closingCta: z
				.object({
					eyebrow: z.string().optional(),
					title: z.string(),
					description: z.string().optional(),
					buttonLabel: z.string(),
					buttonHref: z.string(),
				})
				.optional(),
		}),
});

const portfolio = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date().optional(),
    location: z.string().optional(),
    coverImage: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    summary: z.string().optional(),
  }),
});

const resources = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    category: z.enum(["Financing","Process","FAQ","Guide"]).optional(),
  }),
});

export const collections = { blog, services, portfolio, resources };
