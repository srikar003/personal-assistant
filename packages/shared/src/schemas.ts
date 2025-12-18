import { z } from "zod";

/**
 * Assistant message sent from client -> API
 */
export const AssistantMessageSchema = z.object({
  conversationId: z.string().uuid().optional(),
  text: z.string().min(1),
  mode: z.enum(["text", "voice"]),
  metadata: z.record(z.any()).optional(),
});
export type AssistantMessage = z.infer<typeof AssistantMessageSchema>;

/**
 * Action decision sent from client -> API
 */
export const ActionDecisionSchema = z.object({
  note: z.string().min(1).optional(),
});
export type ActionDecision = z.infer<typeof ActionDecisionSchema>;

/**
 * Calendar list query
 */
export const CalendarEventsQuerySchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
});
export type CalendarEventsQuery = z.infer<typeof CalendarEventsQuerySchema>;
