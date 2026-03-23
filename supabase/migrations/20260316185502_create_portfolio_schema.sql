/*
  # Create Portfolio Management Schema

  1. New Tables
    - `projects` - Portfolio projects with metadata
    - `articles` - Blog articles and technical posts
    - `testimonials` - Client/colleague testimonials
    - `contactSubmissions` - Contact form submissions
    - `subscribers` - Newsletter subscribers
    - `certificates` - Professional certifications
    - `achievements` - Awards and achievements
    - `experiences` - Work experience history
    - `skills` - Technical skills inventory
    - `analytics` - Page views and interactions
    - `userProfiles` - Extended user information
    - `pageVisits` - Visitor tracking

  2. Security
    - Enable RLS on all tables
    - Public read access for non-sensitive data
    - Admin-only write access for content

  3. Indexes
    - Added for frequently queried columns
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  tech text[] DEFAULT '{}',
  link text,
  image text,
  featured boolean DEFAULT false,
  category text,
  stars integer DEFAULT 0,
  views integer DEFAULT 0,
  dateCreated timestamptz DEFAULT now(),
  updatedAt timestamptz DEFAULT now()
);

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text,
  category text,
  tags text[] DEFAULT '{}',
  author text DEFAULT 'Uriv',
  datePublished timestamptz DEFAULT now(),
  reads integer DEFAULT 0,
  featured boolean DEFAULT false,
  thumbnail text,
  updatedAt timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  company text NOT NULL,
  content text NOT NULL,
  image text,
  rating integer DEFAULT 5,
  createdAt timestamptz DEFAULT now(),
  verified boolean DEFAULT false
);

-- Create contact submissions table
CREATE TABLE IF NOT EXISTS contactSubmissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  createdAt timestamptz DEFAULT now(),
  "read" boolean DEFAULT false,
  responded boolean DEFAULT false
);

-- Create subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  subscribedAt timestamptz DEFAULT now(),
  active boolean DEFAULT true,
  unsubscribedAt timestamptz
);

-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  issuer text NOT NULL,
  issueDate date,
  expiryDate date,
  credentialId text,
  credentialUrl text,
  createdAt timestamptz DEFAULT now()
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  "date" date,
  category text,
  icon text,
  createdAt timestamptz DEFAULT now()
);

-- Create experiences table
CREATE TABLE IF NOT EXISTS experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  startDate date,
  endDate date,
  description text,
  skills text[] DEFAULT '{}',
  current boolean DEFAULT false,
  createdAt timestamptz DEFAULT now()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text,
  proficiency integer DEFAULT 3,
  endorsements integer DEFAULT 0,
  createdAt timestamptz DEFAULT now()
);

-- Create analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  eventType text NOT NULL,
  eventData jsonb,
  timestamp timestamptz DEFAULT now(),
  userAgent text,
  ipAddress text
);

-- Create page visits table
CREATE TABLE IF NOT EXISTS pageVisits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text NOT NULL,
  visitorId text,
  timestamp timestamptz DEFAULT now(),
  referrer text,
  duration integer
);

-- Create user profiles table
CREATE TABLE IF NOT EXISTS userProfiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  email text UNIQUE,
  bio text,
  avatar text,
  location text,
  website text,
  socialLinks jsonb DEFAULT '{}',
  createdAt timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contactSubmissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE pageVisits ENABLE ROW LEVEL SECURITY;
ALTER TABLE userProfiles ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Anyone can read projects"
  ON projects FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can read published articles"
  ON articles FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can read testimonials"
  ON testimonials FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can read certificates"
  ON certificates FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can read achievements"
  ON achievements FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can read experiences"
  ON experiences FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can read skills"
  ON skills FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can read user profiles"
  ON userProfiles FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can submit contact forms"
  ON contactSubmissions FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can subscribe to newsletter"
  ON subscribers FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can view analytics"
  ON analytics FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can track page visits"
  ON pageVisits FOR INSERT
  TO public
  WITH CHECK (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_dateCreated ON projects(dateCreated);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(featured);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_datePublished ON articles(datePublished);
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_contactSubmissions_createdAt ON contactSubmissions(createdAt);
CREATE INDEX IF NOT EXISTS idx_pageVisits_page ON pageVisits(page);
CREATE INDEX IF NOT EXISTS idx_pageVisits_timestamp ON pageVisits(timestamp);
