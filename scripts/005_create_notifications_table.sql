-- Create notifications table for real-time alerts
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL CHECK (type IN ('incident', 'resource', 'alert', 'system')),
  priority VARCHAR(20) NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);
CREATE INDEX IF NOT EXISTS idx_notifications_priority ON notifications(priority);

-- Enable RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Allow system to create notifications for all users
CREATE POLICY "System can create notifications" ON notifications
  FOR INSERT WITH CHECK (true);

-- Create function to automatically create notifications for incidents
CREATE OR REPLACE FUNCTION create_incident_notification()
RETURNS TRIGGER AS $$
BEGIN
  -- Create notification for all emergency managers and super admins
  INSERT INTO notifications (user_id, type, priority, title, message, data)
  SELECT 
    up.user_id,
    'incident',
    CASE 
      WHEN NEW.severity = 'critical' THEN 'critical'
      WHEN NEW.severity = 'high' THEN 'high'
      ELSE 'medium'
    END,
    'New Emergency Incident: ' || NEW.title,
    'A new ' || NEW.severity || ' severity incident has been reported at ' || NEW.location,
    jsonb_build_object('incident_id', NEW.id, 'severity', NEW.severity, 'location', NEW.location)
  FROM user_profiles up
  WHERE up.role IN ('super_admin', 'emergency_manager')
    AND up.is_active = true;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for incident notifications
DROP TRIGGER IF EXISTS trigger_incident_notification ON emergency_incidents;
CREATE TRIGGER trigger_incident_notification
  AFTER INSERT ON emergency_incidents
  FOR EACH ROW
  EXECUTE FUNCTION create_incident_notification();

-- Create function to create resource alerts
CREATE OR REPLACE FUNCTION create_resource_alert()
RETURNS TRIGGER AS $$
BEGIN
  -- Create notification when resource quantity is low
  IF NEW.quantity <= NEW.minimum_quantity AND OLD.quantity > OLD.minimum_quantity THEN
    INSERT INTO notifications (user_id, type, priority, title, message, data)
    SELECT 
      up.user_id,
      'resource',
      'medium',
      'Low Resource Alert: ' || NEW.name,
      'Resource ' || NEW.name || ' is running low. Current quantity: ' || NEW.quantity || ', Minimum: ' || NEW.minimum_quantity,
      jsonb_build_object('resource_id', NEW.id, 'current_quantity', NEW.quantity, 'minimum_quantity', NEW.minimum_quantity)
    FROM user_profiles up
    WHERE up.role IN ('super_admin', 'emergency_manager')
      AND up.is_active = true;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for resource alerts
DROP TRIGGER IF EXISTS trigger_resource_alert ON resources;
CREATE TRIGGER trigger_resource_alert
  AFTER UPDATE ON resources
  FOR EACH ROW
  EXECUTE FUNCTION create_resource_alert();
