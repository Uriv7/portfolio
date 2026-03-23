import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('dateCreated', { ascending: false });
  return { data, error };
};

export const fetchArticles = async (limit?: number) => {
  let query = supabase
    .from('articles')
    .select('*')
    .order('datePublished', { ascending: false });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  return { data, error };
};

export const fetchTestimonials = async () => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('createdAt', { ascending: false });
  return { data, error };
};

export const submitContactForm = async (submission: any) => {
  const { data, error } = await supabase
    .from('contactSubmissions')
    .insert([submission]);
  return { data, error };
};

export const subscribeNewsletter = async (email: string) => {
  const { data, error } = await supabase
    .from('subscribers')
    .insert([{ email, subscribedAt: new Date().toISOString(), active: true }]);
  return { data, error };
};

export const fetchCertificates = async () => {
  const { data, error } = await supabase
    .from('certificates')
    .select('*')
    .order('issueDate', { ascending: false });
  return { data, error };
};

export const fetchAchievements = async () => {
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .order('date', { ascending: false });
  return { data, error };
};

export const incrementProjectViews = async (projectId: string) => {
  const { data: current } = await supabase
    .from('projects')
    .select('views')
    .eq('id', projectId)
    .maybeSingle();

  const newViews = (current?.views || 0) + 1;

  const { data, error } = await supabase
    .from('projects')
    .update({ views: newViews })
    .eq('id', projectId);
  return { data, error };
};

export const incrementArticleReads = async (articleId: string) => {
  const { data: current } = await supabase
    .from('articles')
    .select('reads')
    .eq('id', articleId)
    .maybeSingle();

  const newReads = (current?.reads || 0) + 1;

  const { data, error } = await supabase
    .from('articles')
    .update({ reads: newReads })
    .eq('id', articleId);
  return { data, error };
};
