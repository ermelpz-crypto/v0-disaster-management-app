-- Row Level Security Policies for MDRRMO Admin Panel

-- User Profiles Policies
CREATE POLICY "Users can view all profiles" ON public.user_profiles
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Super admins can manage all profiles" ON public.user_profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- Emergency Incidents Policies
CREATE POLICY "All authenticated users can view incidents" ON public.emergency_incidents
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Emergency managers and above can create incidents" ON public.emergency_incidents
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() 
      AND role IN ('super_admin', 'emergency_manager', 'field_responder')
    )
  );

CREATE POLICY "Emergency managers and above can update incidents" ON public.emergency_incidents
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() 
      AND role IN ('super_admin', 'emergency_manager', 'field_responder')
    )
  );

-- Resources Policies
CREATE POLICY "All authenticated users can view resources" ON public.resources
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Emergency managers and above can manage resources" ON public.resources
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() 
      AND role IN ('super_admin', 'emergency_manager')
    )
  );

-- Resource Deployments Policies
CREATE POLICY "All authenticated users can view deployments" ON public.resource_deployments
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Emergency managers and field responders can manage deployments" ON public.resource_deployments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() 
      AND role IN ('super_admin', 'emergency_manager', 'field_responder')
    )
  );

-- Evacuation Centers Policies
CREATE POLICY "All authenticated users can view evacuation centers" ON public.evacuation_centers
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Emergency managers and above can manage evacuation centers" ON public.evacuation_centers
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() 
      AND role IN ('super_admin', 'emergency_manager')
    )
  );

-- Alerts Policies
CREATE POLICY "All authenticated users can view alerts" ON public.alerts
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Emergency managers and above can manage alerts" ON public.alerts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() 
      AND role IN ('super_admin', 'emergency_manager')
    )
  );

-- Content Items Policies
CREATE POLICY "All authenticated users can view published content" ON public.content_items
  FOR SELECT USING (
    auth.uid() IS NOT NULL AND 
    (status = 'published' OR author_id = auth.uid() OR 
     EXISTS (
       SELECT 1 FROM public.user_profiles 
       WHERE id = auth.uid() 
       AND role IN ('super_admin', 'content_admin', 'emergency_manager')
     )
    )
  );

CREATE POLICY "Content admins and above can manage content" ON public.content_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() 
      AND role IN ('super_admin', 'content_admin', 'emergency_manager')
    )
  );

-- Activity Logs Policies
CREATE POLICY "Users can view their own activity logs" ON public.activity_logs
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Super admins can view all activity logs" ON public.activity_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

CREATE POLICY "All authenticated users can insert activity logs" ON public.activity_logs
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Training Records Policies
CREATE POLICY "All authenticated users can view training records" ON public.training_records
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Emergency managers and above can manage training records" ON public.training_records
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() 
      AND role IN ('super_admin', 'emergency_manager')
    )
  );
