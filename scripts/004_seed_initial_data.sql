-- Seed Initial Data for MDRRMO Admin Panel

-- Insert sample evacuation centers
INSERT INTO public.evacuation_centers (name, address, capacity, facilities, contact_person, contact_phone) VALUES
('Central Elementary School', '123 Main Street, City Center', 500, ARRAY['restrooms', 'kitchen', 'medical_station', 'generator'], 'Maria Santos', '+63-912-345-6789'),
('Community Center Hall', '456 Community Ave, Barangay Norte', 300, ARRAY['restrooms', 'kitchen', 'parking'], 'Juan Dela Cruz', '+63-917-234-5678'),
('Sports Complex Gymnasium', '789 Sports Drive, Athletic District', 800, ARRAY['restrooms', 'medical_station', 'generator', 'parking', 'shower_facilities'], 'Ana Rodriguez', '+63-923-456-7890'),
('Parish Church Hall', '321 Church Street, Religious District', 200, ARRAY['restrooms', 'kitchen'], 'Father Miguel', '+63-918-765-4321');

-- Insert sample resources
INSERT INTO public.resources (name, category, type, quantity, available_quantity, unit, location, condition, acquisition_date, cost) VALUES
('Fire Truck Unit 1', 'vehicle', 'Fire Engine', 1, 1, 'unit', 'Fire Station Alpha', 'excellent', '2022-01-15', 2500000.00),
('Ambulance Unit 2', 'vehicle', 'Emergency Ambulance', 1, 1, 'unit', 'Medical Station Beta', 'good', '2021-06-20', 1800000.00),
('Rescue Boat Alpha', 'vehicle', 'Inflatable Rescue Boat', 1, 1, 'unit', 'River Station', 'good', '2023-03-10', 450000.00),
('Portable Generator 5KW', 'equipment', 'Power Generator', 5, 5, 'unit', 'Equipment Warehouse', 'excellent', '2023-08-15', 75000.00),
('Emergency Radio Set', 'communication', 'Two-Way Radio', 20, 18, 'unit', 'Communications Center', 'good', '2022-11-30', 15000.00),
('First Aid Kits', 'medical', 'Medical Supplies', 50, 45, 'kit', 'Medical Supply Room', 'excellent', '2024-01-05', 2500.00),
('Emergency Food Packs', 'food', 'Ready-to-Eat Meals', 1000, 850, 'pack', 'Relief Goods Warehouse', 'good', '2024-02-20', 150.00),
('Water Purification Tablets', 'water', 'Water Treatment', 500, 400, 'bottle', 'Medical Supply Room', 'excellent', '2024-01-15', 25.00);

-- Insert sample training records
INSERT INTO public.training_records (title, description, training_type, participants_count, location, instructor, scheduled_date, status) VALUES
('Basic First Aid Training', 'Comprehensive first aid and CPR training for emergency responders', 'certification', 25, 'Training Center Room A', 'Dr. Sarah Johnson', '2024-03-15 09:00:00+08', 'completed'),
('Fire Safety and Prevention', 'Fire safety protocols and prevention measures workshop', 'workshop', 40, 'Fire Station Alpha', 'Chief Fire Officer Rodriguez', '2024-04-10 14:00:00+08', 'completed'),
('Earthquake Drill Simulation', 'Quarterly earthquake preparedness drill', 'drill', 100, 'City Hall Grounds', 'Emergency Coordinator Santos', '2024-05-20 10:00:00+08', 'scheduled'),
('Flood Response Operations', 'Advanced flood response and rescue operations training', 'seminar', 30, 'Community Center Hall', 'Rescue Team Leader Cruz', '2024-06-05 08:00:00+08', 'scheduled');

-- Insert sample content items
INSERT INTO public.content_items (title, content, content_type, category, status, author_id) VALUES
('Family Emergency Plan Template', 'A comprehensive template for creating family emergency preparedness plans including contact information, meeting points, and emergency supplies checklist.', 'preparedness_guide', 'Family Preparedness', 'published', (SELECT id FROM public.user_profiles LIMIT 1)),
('Earthquake Safety Procedures', 'Step-by-step procedures for earthquake safety including Drop, Cover, and Hold On techniques, evacuation procedures, and post-earthquake safety measures.', 'procedure', 'Natural Disasters', 'published', (SELECT id FROM public.user_profiles LIMIT 1)),
('Emergency Communication Protocol', 'Standard operating procedures for emergency communications including radio protocols, alert dissemination, and inter-agency coordination.', 'procedure', 'Communications', 'published', (SELECT id FROM public.user_profiles LIMIT 1)),
('Community Preparedness Workshop Materials', 'Training materials and presentation slides for community preparedness workshops including hazard identification and risk assessment.', 'training_material', 'Community Education', 'published', (SELECT id FROM public.user_profiles LIMIT 1));
