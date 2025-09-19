-- Insert sample notifications for testing
INSERT INTO notifications (user_id, type, priority, title, message, data) VALUES
-- Get a sample user ID (you may need to adjust this based on your actual user IDs)
((SELECT user_id FROM user_profiles WHERE role = 'super_admin' LIMIT 1), 'system', 'medium', 'System Maintenance', 'Scheduled maintenance will occur tonight from 2-4 AM', '{"maintenance_window": "2024-01-15T02:00:00Z"}'),
((SELECT user_id FROM user_profiles WHERE role = 'super_admin' LIMIT 1), 'alert', 'high', 'Weather Alert', 'Severe thunderstorm warning issued for the area', '{"alert_type": "weather", "severity": "high"}'),
((SELECT user_id FROM user_profiles WHERE role = 'emergency_manager' LIMIT 1), 'incident', 'critical', 'Critical Incident', 'Major flooding reported in downtown area', '{"incident_type": "flood", "location": "downtown"}');
