-- RFP Platform Database Schema
-- Initial setup for buyers, suppliers, RFPs, bids, and agent tracking

-- Users table for both buyers and suppliers
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('buyer', 'supplier')),
  company_name VARCHAR(255) NOT NULL,
  contact_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- RFPs created by buyers
CREATE TABLE rfps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID NOT NULL REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  program_start_date DATE NOT NULL,
  program_end_date DATE NOT NULL,
  rate_type VARCHAR(10) NOT NULL CHECK (rate_type IN ('LRA', 'NLRA')),
  max_negotiation_rounds INTEGER NOT NULL DEFAULT 3,
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'closed', 'cancelled')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Room types and expected rates for each RFP (hidden from suppliers)
CREATE TABLE rfp_room_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rfp_id UUID NOT NULL REFERENCES rfps(id) ON DELETE CASCADE,
  room_type VARCHAR(100) NOT NULL,
  expected_rate DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Supplier bids/submissions
CREATE TABLE bids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rfp_id UUID NOT NULL REFERENCES rfps(id),
  supplier_id UUID NOT NULL REFERENCES users(id),
  submission_round INTEGER NOT NULL DEFAULT 0,
  status VARCHAR(20) NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'accepted', 'rejected', 'negotiating')),
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  processed_at TIMESTAMP,
  UNIQUE(rfp_id, supplier_id, submission_round)
);

-- Room rates submitted by suppliers
CREATE TABLE bid_room_rates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bid_id UUID NOT NULL REFERENCES bids(id) ON DELETE CASCADE,
  room_type VARCHAR(100) NOT NULL,
  offered_rate DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Agent activity log for audit trail
CREATE TABLE agent_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bid_id UUID NOT NULL REFERENCES bids(id),
  agent_type VARCHAR(50) NOT NULL CHECK (agent_type IN ('rate_comparison', 'negotiation', 'bid_disposition')),
  action VARCHAR(100) NOT NULL,
  details JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Negotiation tracking
CREATE TABLE negotiations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rfp_id UUID NOT NULL REFERENCES rfps(id),
  supplier_id UUID NOT NULL REFERENCES users(id),
  current_round INTEGER NOT NULL DEFAULT 0,
  max_rounds INTEGER NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'failed')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(rfp_id, supplier_id)
);

-- Email notifications log
CREATE TABLE email_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id UUID NOT NULL REFERENCES users(id),
  email_type VARCHAR(50) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) NOT NULL DEFAULT 'sent' CHECK (status IN ('sent', 'failed', 'pending'))
);

-- Indexes for performance
CREATE INDEX idx_rfps_buyer_id ON rfps(buyer_id);
CREATE INDEX idx_rfps_status ON rfps(status);
CREATE INDEX idx_bids_rfp_id ON bids(rfp_id);
CREATE INDEX idx_bids_supplier_id ON bids(supplier_id);
CREATE INDEX idx_bids_status ON bids(status);
CREATE INDEX idx_agent_activities_bid_id ON agent_activities(bid_id);
CREATE INDEX idx_negotiations_rfp_supplier ON negotiations(rfp_id, supplier_id);
