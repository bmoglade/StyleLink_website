-- ============================================
-- StyleLink Database Schema Update
-- Migration 002: Add product images + social handles
-- ============================================
-- Run this in Supabase Dashboard → SQL Editor

-- Add product image column
ALTER TABLE products ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Add Facebook and Pinterest handles to creators
ALTER TABLE creators ADD COLUMN IF NOT EXISTS facebook_handle TEXT;
ALTER TABLE creators ADD COLUMN IF NOT EXISTS pinterest_handle TEXT;
