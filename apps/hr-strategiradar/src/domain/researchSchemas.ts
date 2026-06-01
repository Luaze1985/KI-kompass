import { z } from 'zod'

export const ResearchSourceTypeSchema = z.enum([
  'official',
  'agreement',
  'research',
  'review',
  'secondary',
  'local_required',
])

export const ResearchIndicatorSchema = z.enum([
  'malklarhet',
  'separabilitet',
  'kontrollkrav',
  'risiko',
  'lokal_forankring',
])

export const ResearchReviewStatusSchema = z.enum(['draft', 'approved', 'rejected'])

export const ResearchFindingSchema = z.object({
  source_id: z.string().min(1),
  source_type: ResearchSourceTypeSchema,
  title: z.string().min(1),
  url: z.string().url(),
  published_date: z.string().optional(),
  retrieved_at: z.string().min(1),
  claim: z.string().min(1),
  evidence_strength: z.number().int().min(1).max(5),
  relevant_case_field: z.array(z.string().min(1)),
  affected_indicator: z.array(ResearchIndicatorSchema),
  possible_risk_flag: z.array(z.string()),
  possible_stop_rule: z.array(z.string()),
  required_local_verification: z.array(z.string()),
  short_excerpt: z.string().optional(),
  review_status: ResearchReviewStatusSchema,
})

export const ResearchSourceSchema = z.object({
  source_id: z.string().min(1),
  source_type: ResearchSourceTypeSchema,
  title: z.string().min(1),
  url: z.string().url(),
  publisher: z.string().min(1),
  retrieved_at: z.string().min(1),
  review_status: ResearchReviewStatusSchema,
})

export const ResearchFindingListSchema = z.array(ResearchFindingSchema)
export const ResearchSourceListSchema = z.array(ResearchSourceSchema)

export type ResearchSourceType = z.infer<typeof ResearchSourceTypeSchema>
export type ResearchIndicator = z.infer<typeof ResearchIndicatorSchema>
export type ResearchReviewStatus = z.infer<typeof ResearchReviewStatusSchema>
export type ResearchFinding = z.infer<typeof ResearchFindingSchema>
export type ResearchSource = z.infer<typeof ResearchSourceSchema>
