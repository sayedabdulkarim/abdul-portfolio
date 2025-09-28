import React from 'react';
import './Blog.scss';

const Blog = () => {
  const articles = [
    {
      id: 1,
      title: '⚡ React Fiber: Reconciliation Revolution — From Synchronous Stack to Asynchronous Architecture 🚀',
      excerpt: 'Deep dive into React Fiber architecture, exploring how React evolved from a synchronous stack-based reconciliation to an asynchronous, prioritized rendering system.',
      author: 'SAYED ABDUL KARIM',
      readTime: '4 min read',
      url: 'https://medium.com/@sakarim9124/react-fiber-reconciliation-revolution-from-synchronous-stack-to-asynchronous-architecture-b229ed1bf31d',
      image: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*e6GcBTeXk3bkRsb5qUl2vg.png',
      tags: ['React', 'React Fiber', 'JavaScript', 'Web Development']
    },
    {
      id: 2,
      title: '🚀 MCP: The Bridge Between AI and Your Codebase — How Model Context Protocol Revolutionizes...',
      excerpt: 'Discover how Model Context Protocol (MCP) creates a seamless bridge between AI models and your development environment, enabling powerful code generation and analysis.',
      author: 'SAYED ABDUL KARIM',
      readTime: '6 min read',
      url: 'https://medium.com/@sakarim9124/mcp-the-bridge-between-ai-and-your-codebase-how-model-context-protocol-revolutionizes-3c3e3e3e3e3e',
      image: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*UtBO2gcq7Sh9MpG6YZJDOg.png',
      tags: ['AI', 'MCP', 'Development Tools', 'LLM']
    }
  ];

  return (
    <div className="blog">
      <div className="container">
        <div className="blog-header">
          <h2 className="blog-title">Technical Articles</h2>
          <p className="blog-subtitle">Exploring web development, architecture patterns, and modern technologies</p>
        </div>
        
        <div className="articles-grid">
          {articles.map((article) => (
            <article key={article.id} className="article-card">
              <div className="article-image">
                <img src={article.image} alt={article.title} />
              </div>
              
              <div className="article-content">
                <div className="article-meta">
                  <span className="article-author">{article.author}</span>
                  <span className="article-dot">•</span>
                  <span className="article-read-time">{article.readTime}</span>
                </div>
                
                <h3 className="article-title">{article.title}</h3>
                <p className="article-excerpt">{article.excerpt}</p>
                
                <div className="article-tags">
                  {article.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
                
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="article-link"
                >
                  Read on Medium
                  <svg className="arrow-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
        
        <div className="blog-footer">
          <a 
            href="https://medium.com/@sakarim9124" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="view-all-link"
          >
            View all articles on Medium
            <svg className="arrow-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Blog;