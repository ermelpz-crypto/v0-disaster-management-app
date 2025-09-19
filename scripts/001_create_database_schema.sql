-- MDRRMO Admin Panel Database Schema
-- This script creates all necessary tables for the disaster management system

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Profiles Table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'emergency_manager', 'content_admin', 'field_responder', 'viewer')),
  department TEXT,
  phone TEXT,
  position TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Emergency Incidents Table
CREATE TABLE IF NOT EXISTS public.emergency_incidents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  incident_number TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  incident_type TEXT NOT NULL CHECK (incident_type IN ('fire', 'flood', 'earthquake', 'typhoon', 'landslide', 'accident', 'medical', 'other')),
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  status TEXT NOT NULL CHECK (status IN ('reported', 'responding', 'resolved', 'closed')) DEFAULT 'reported',
  location TEXT NOT NULL,
  coordinates JSONB, -- {lat: number, lng: number}
  reported_by UUID REFERENCES public.user_profiles(id),
  assigned_to UUID REFERENCES public.user_profiles(id),
  casualties INTEGER DEFAULT 0,
  damages_estimated DECIMAL(15,2),
  response_time_minutes INTEGER,
  resolution_time_minutes INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Resources Table
CREATE TABLE IF NOT EXISTS public.resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('vehicle', 'equipment', 'personnel', 'medical', 'communication', 'shelter', 'food', 'water', 'other')),
  type TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  available_quantity INTEGER NOT NULL DEFAULT 1,
  unit TEXT NOT NULL DEFAULT 'unit',
  location TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('available', 'deployed', 'maintenance', 'damaged', 'retired')) DEFAULT 'available',
  condition TEXT CHECK (condition IN ('excellent', 'good', 'fair', 'poor')),
  acquisition_date DATE,
  last_maintenance DATE,
  next_maintenance DATE,
  cost DECIMAL(15,2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resource Deployments Table
CREATE TABLE IF NOT EXISTS public.resource_deployments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resource_id UUID NOT NULL REFERENCES public.resources(id) ON DELETE CASCADE,
  incident_id UUID REFERENCES public.emergency_incidents(id) ON DELETE SET NULL,
  deployed_by UUID NOT NULL REFERENCES public.user_profiles(id),
  quantity_deployed INTEGER NOT NULL,
  deployment_location TEXT NOT NULL,
  deployed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expected_return TIMESTAMP WITH TIME ZONE,
  returned_at TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL CHECK (status IN ('deployed', 'returned', 'lost', 'damaged')) DEFAULT 'deployed',
  notes TEXT
);

-- Evacuation Centers Table
CREATE TABLE IF NOT EXISTS public.evacuation_centers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  coordinates JSONB, -- {lat: number, lng: number}
  capacity INTEGER NOT NULL,
  current_occupancy INTEGER DEFAULT 0,
  status TEXT NOT NULL CHECK (status IN ('active', 'inactive', 'full', 'maintenance')) DEFAULT 'inactive',
  facilities TEXT[], -- Array of facility types
  contact_person TEXT,
  contact_phone TEXT,
  manager_id UUID REFERENCES public.user_profiles(id),
  opened_at TIMESTAMP WITH TIME ZONE,
  closed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Alerts Table
CREATE TABLE IF NOT EXISTS public.alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('weather', 'emergency', 'advisory', 'suspension', 'evacuation')),
  severity TEXT NOT NULL CHECK (severity IN ('info', 'warning', 'critical', 'urgent')),
  status TEXT NOT NULL CHECK (status IN ('draft', 'active', 'expired', 'cancelled')) DEFAULT 'draft',
  target_areas TEXT[], -- Array of affected areas
  issued_by UUID NOT NULL REFERENCES public.user_profiles(id),
  valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  valid_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content Management Table
CREATE TABLE IF NOT EXISTS public.content_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT,
  content_type TEXT NOT NULL CHECK (content_type IN ('preparedness_guide', 'training_material', 'procedure', 'announcement', 'resource_document')),
  category TEXT NOT NULL,
  file_url TEXT,
  file_type TEXT,
  file_size INTEGER,
  status TEXT NOT NULL CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
  author_id UUID NOT NULL REFERENCES public.user_profiles(id),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activity Logs Table
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.user_profiles(id),
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL, -- 'incident', 'resource', 'alert', etc.
  resource_id UUID,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Training Records Table
CREATE TABLE IF NOT EXISTS public.training_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  training_type TEXT NOT NULL CHECK (training_type IN ('drill', 'seminar', 'workshop', 'certification', 'orientation')),
  participants_count INTEGER DEFAULT 0,
  location TEXT,
  instructor TEXT,
  conducted_by UUID REFERENCES public.user_profiles(id),
  scheduled_date TIMESTAMP WITH TIME ZONE,
  completed_date TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL CHECK (status IN ('scheduled', 'ongoing', 'completed', 'cancelled')) DEFAULT 'scheduled',
  materials_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_deployments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evacuation_centers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_records ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_emergency_incidents_status ON public.emergency_incidents(status);
CREATE INDEX IF NOT EXISTS idx_emergency_incidents_severity ON public.emergency_incidents(severity);
CREATE INDEX IF NOT EXISTS idx_emergency_incidents_created_at ON public.emergency_incidents(created_at);
CREATE INDEX IF NOT EXISTS idx_resources_status ON public.resources(status);
CREATE INDEX IF NOT EXISTS idx_resources_category ON public.resources(category);
CREATE INDEX IF NOT EXISTS idx_alerts_status ON public.alerts(status);
CREATE INDEX IF NOT EXISTS idx_alerts_severity ON public.alerts(severity);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON public.activity_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON public.user_profiles(role);
