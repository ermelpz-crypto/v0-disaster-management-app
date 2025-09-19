-- Functions and Triggers for MDRRMO Admin Panel

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data ->> 'role', 'viewer')
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
END;
$$;

-- Trigger to create user profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Add updated_at triggers to all relevant tables
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_emergency_incidents_updated_at
  BEFORE UPDATE ON public.emergency_incidents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_resources_updated_at
  BEFORE UPDATE ON public.resources
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_evacuation_centers_updated_at
  BEFORE UPDATE ON public.evacuation_centers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_alerts_updated_at
  BEFORE UPDATE ON public.alerts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_content_items_updated_at
  BEFORE UPDATE ON public.content_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_training_records_updated_at
  BEFORE UPDATE ON public.training_records
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to log activities
CREATE OR REPLACE FUNCTION public.log_activity(
  p_action TEXT,
  p_resource_type TEXT,
  p_resource_id UUID DEFAULT NULL,
  p_details JSONB DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  log_id UUID;
BEGIN
  INSERT INTO public.activity_logs (
    user_id,
    action,
    resource_type,
    resource_id,
    details
  ) VALUES (
    auth.uid(),
    p_action,
    p_resource_type,
    p_resource_id,
    p_details
  )
  RETURNING id INTO log_id;
  
  RETURN log_id;
END;
$$;

-- Function to generate incident numbers
CREATE OR REPLACE FUNCTION public.generate_incident_number()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  year_part TEXT;
  sequence_num INTEGER;
  incident_num TEXT;
BEGIN
  year_part := EXTRACT(YEAR FROM NOW())::TEXT;
  
  SELECT COALESCE(MAX(
    CASE 
      WHEN incident_number ~ ('^' || year_part || '-\d+$') 
      THEN CAST(SPLIT_PART(incident_number, '-', 2) AS INTEGER)
      ELSE 0
    END
  ), 0) + 1
  INTO sequence_num
  FROM public.emergency_incidents;
  
  incident_num := year_part || '-' || LPAD(sequence_num::TEXT, 4, '0');
  
  RETURN incident_num;
END;
$$;

-- Function to update resource availability
CREATE OR REPLACE FUNCTION public.update_resource_availability()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Decrease available quantity when deploying
    UPDATE public.resources 
    SET available_quantity = available_quantity - NEW.quantity_deployed
    WHERE id = NEW.resource_id;
    
  ELSIF TG_OP = 'UPDATE' THEN
    -- Handle status changes
    IF OLD.status = 'deployed' AND NEW.status = 'returned' THEN
      -- Increase available quantity when returning
      UPDATE public.resources 
      SET available_quantity = available_quantity + NEW.quantity_deployed
      WHERE id = NEW.resource_id;
    END IF;
    
  ELSIF TG_OP = 'DELETE' THEN
    -- Restore quantity if deployment is deleted
    UPDATE public.resources 
    SET available_quantity = available_quantity + OLD.quantity_deployed
    WHERE id = OLD.resource_id;
    
    RETURN OLD;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Trigger to update resource availability
CREATE TRIGGER update_resource_availability_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.resource_deployments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_resource_availability();
