
DROP POLICY "newsletter_insert_any" ON public.newsletter_subscribers;
CREATE POLICY "newsletter_insert_valid" ON public.newsletter_subscribers
  FOR INSERT
  WITH CHECK (
    email IS NOT NULL
    AND char_length(email) BETWEEN 5 AND 255
    AND email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
    AND status = 'pending'
  );

DROP POLICY "clicks_insert_any" ON public.affiliate_clicks;
CREATE POLICY "clicks_insert_valid" ON public.affiliate_clicks
  FOR INSERT
  WITH CHECK (tool_id IS NOT NULL);
