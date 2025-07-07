// Blog Content Management
// Add new articles here and they'll automatically appear on the blog page

export const blogArticles = [
  {
    id: 1,
    title: 'Advanced PostgreSQL Performance Tuning Techniques',
    slug: 'advanced-postgresql-performance-tuning',
    excerpt: 'Learn advanced techniques to optimize PostgreSQL performance including query optimization, index strategies, and configuration tuning.',
    content: `# Advanced PostgreSQL Performance Tuning Techniques

PostgreSQL is one of the most powerful open-source databases, but to truly harness its potential, you need to understand performance optimization at a deep level.

## Query Optimization

The foundation of PostgreSQL performance lies in writing efficient queries:

### Use EXPLAIN ANALYZE
Always start with EXPLAIN ANALYZE to understand your query execution plan.

### Index Strategy
- B-tree indexes: Best for equality and range queries
- Hash indexes: Optimal for equality comparisons
- GIN indexes: Perfect for full-text search and array operations
- BRIN indexes: Excellent for time-series data

## Configuration Tuning

Key parameters to optimize your PostgreSQL instance for better performance.

## Monitoring and Maintenance

Regular maintenance is crucial for optimal performance.`,
    author: 'David Chen',
    date: '2025-01-15',
    readTime: '8 min read',
    category: 'database',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
    featured: true,
    tags: ['PostgreSQL', 'Performance', 'Optimization'],
    published: true,
  },
  {
    id: 2,
    title: 'Implementing Zero-Downtime Database Migrations',
    slug: 'zero-downtime-database-migrations',
    excerpt: 'A comprehensive guide to performing database migrations without service interruption using blue-green deployments and rolling updates.',
    content: `# Implementing Zero-Downtime Database Migrations

Database migrations are critical but risky operations. Learn how to execute them without affecting your users.

## Planning Phase

Proper planning is essential for successful migrations.

## Blue-Green Deployment

The most reliable method for zero-downtime migrations.

## Best Practices

Always test first and have a rollback strategy.`,
    author: 'Sarah Rodriguez',
    date: '2025-01-12',
    readTime: '12 min read',
    category: 'devops',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    featured: true,
    tags: ['Migration', 'DevOps', 'Zero-Downtime'],
    published: true,
  },
  {
    id: 3,
    title: 'Database Security Best Practices for 2025',
    slug: 'database-security-best-practices-2025',
    excerpt: 'Essential security practices to protect your database infrastructure from modern threats and ensure compliance.',
    content: `# Database Security Best Practices for 2025

In 2025, database security is more critical than ever. Here are the essential practices every organization should implement.

## Authentication and Access Control

Implement strong authentication mechanisms.

## Encryption

Protect data at rest and in transit.

## Network Security

Secure your database network access.`,
    author: 'Lisa Wang',
    date: '2025-01-10',
    readTime: '10 min read',
    category: 'security',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop',
    featured: false,
    tags: ['Security', 'Compliance', 'Best Practices'],
    published: true,
  },
];

export const blogCategories = [
  { id: 'all', name: 'All Articles', count: blogArticles.filter(a => a.published).length },
  { id: 'database', name: 'Database', count: blogArticles.filter(a => a.category === 'database' && a.published).length },
  { id: 'devops', name: 'DevOps', count: blogArticles.filter(a => a.category === 'devops' && a.published).length },
  { id: 'performance', name: 'Performance', count: blogArticles.filter(a => a.category === 'performance' && a.published).length },
  { id: 'security', name: 'Security', count: blogArticles.filter(a => a.category === 'security' && a.published).length },
];

// Helper functions
export const getFeaturedArticles = () => 
  blogArticles.filter(article => article.featured && article.published);

export const getArticlesByCategory = (category) => 
  category === 'all' 
    ? blogArticles.filter(article => article.published)
    : blogArticles.filter(article => article.category === category && article.published);

export const searchArticles = (query) => 
  blogArticles.filter(article => 
    article.published && (
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    )
  );

export const getArticleById = (id) => 
  blogArticles.find(article => article.id === parseInt(id));

export const getArticleBySlug = (slug) => 
  blogArticles.find(article => article.slug === slug);