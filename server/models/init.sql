-- SQL Server script to create the database and table
-- Run this in SSMS

-- Create the database (run this first, then switch to it)
-- CREATE DATABASE PortfolioDB;
-- GO
-- USE PortfolioDB;
-- GO

-- Create the contact_submissions table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='contact_submissions' AND xtype='U')
CREATE TABLE contact_submissions (
  id INT IDENTITY(1,1) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  submitted_at DATETIME DEFAULT GETDATE()
);
GO
