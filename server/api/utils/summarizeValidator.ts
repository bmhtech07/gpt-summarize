import { z } from 'zod'
import { prompts } from '../../../config/prompts';

export const validateSummarize = z.object({
  report: z.string().max(40000).min(1000),
  prompt: z.number().nonnegative().lte(prompts.length -1) // Means only have to update prompt config
})