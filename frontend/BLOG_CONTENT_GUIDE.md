// HOW TO ADD NEW BLOG CONTENT TO AZELLAR WEBSITE

## Method 1: Direct File Editing (Recommended for Developers)

### Step 1: Open the blog data file
Navigate to: `/app/frontend/src/data/blogData.js`

### Step 2: Add new article to the blogArticles array
```javascript
{
  id: 4, // Increment the ID
  title: 'Your Article Title',
  slug: 'your-article-slug', // URL-friendly version
  excerpt: 'Brief description that appears in article previews',
  content: `# Full Article Content in Markdown

Write your full article content here using Markdown syntax.

## Subheadings
- Bullet points
- **Bold text**
- *Italic text*
- [Links](https://example.com)

### Code blocks
\`\`\`sql
SELECT * FROM users;
\`\`\`

Your content will be displayed beautifully formatted.`,
  author: 'Author Name',
  date: '2025-01-20', // YYYY-MM-DD format
  readTime: '5 min read',
  category: 'database', // database, devops, performance, security
  image: 'https://images.unsplash.com/photo-xxxxx', // Header image URL
  featured: false, // true for featured articles
  tags: ['Tag1', 'Tag2', 'Tag3'], // Array of tags
  published: true, // false for drafts
}
```

### Step 3: Save and restart
The article will automatically appear on the blog page.

## Method 2: Using the Blog Data Structure

### Article Properties Explained:
- **id**: Unique number for each article
- **title**: Main article title
- **slug**: URL-friendly version (used in /blog/article-slug)
- **excerpt**: Brief description for previews
- **content**: Full article in Markdown format
- **author**: Author name
- **date**: Publication date (YYYY-MM-DD)
- **readTime**: Estimated reading time
- **category**: One of: database, devops, performance, security
- **image**: Header image URL (recommend Unsplash)
- **featured**: Boolean - appears in featured section
- **tags**: Array of relevant tags
- **published**: Boolean - false for drafts

### Categories Available:
1. **database** - Database-related content
2. **devops** - DevOps and automation topics
3. **performance** - Performance optimization
4. **security** - Security and compliance

## Method 3: Content Management Features

### Featured Articles
Set `featured: true` to show articles in the featured section on the blog homepage.

### Draft System
Set `published: false` to keep articles as drafts (won't show on site).

### Search & Filtering
Articles are automatically searchable by:
- Title
- Excerpt
- Tags
- Category filtering

## Method 4: Adding Images

### Recommended Image Sources:
1. **Unsplash**: https://unsplash.com (free, high-quality)
2. **Pexels**: https://pexels.com (free)
3. **Custom images**: Upload to your hosting service

### Image Requirements:
- **Size**: 800x400px recommended
- **Format**: JPG or PNG
- **Subject**: Tech/database related imagery

### Example Image URLs:
```javascript
// Database/tech imagery
image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop'

// DevOps/automation
image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop'

// Security
image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop'
```

## Method 5: Advanced Content Features

### Markdown Support
The content field supports full Markdown:

```markdown
# Main Heading
## Sub Heading
### Smaller Heading

**Bold text**
*Italic text*
[Link text](https://example.com)

- Bullet point 1
- Bullet point 2

1. Numbered list
2. Second item

> Blockquote for important information

\`\`\`sql
-- Code blocks with syntax highlighting
SELECT * FROM users WHERE active = true;
\`\`\`

\`\`\`python
# Python code example
def hello_world():
    print("Hello, World!")
\`\`\`
```

### SEO Optimization
Each article automatically gets:
- SEO-friendly URLs (/blog/article-slug)
- Meta descriptions from excerpts
- Structured data for search engines
- Social media preview cards

## Quick Start Template

Copy this template for new articles:

```javascript
{
  id: NEW_ID,
  title: 'Your Title Here',
  slug: 'your-title-here',
  excerpt: 'Brief description of your article that will appear in previews and search results.',
  content: `# Your Title Here

Write your introduction here.

## Main Section

Your content goes here.

### Subsection

More detailed information.

## Conclusion

Wrap up your article.`,
  author: 'Your Name',
  date: '2025-01-20',
  readTime: '5 min read',
  category: 'database',
  image: 'https://images.unsplash.com/photo-xxxxx',
  featured: false,
  tags: ['Relevant', 'Tags'],
  published: true,
}
```

## Pro Tips:

1. **Keep excerpts under 160 characters** for best SEO
2. **Use relevant tags** for better discoverability
3. **Include code examples** when appropriate
4. **Add featured articles sparingly** (2-3 max)
5. **Use high-quality images** that relate to your content
6. **Write engaging titles** that include key terms
7. **Structure content with headings** for better readability

The blog system will handle:
- ✅ Automatic categorization
- ✅ Search functionality
- ✅ Mobile responsive display
- ✅ Social sharing
- ✅ SEO optimization
- ✅ Related articles
- ✅ Author attribution
- ✅ Reading time calculation