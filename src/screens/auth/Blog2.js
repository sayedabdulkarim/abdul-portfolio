import React from "react";
import { useTranslation } from "react-i18next";
import "./Blog2.scss";

const Blog2 = () => {
  const { t } = useTranslation();

  const blogPosts = [
    {
      title: "Fine-Tuning Llama 3.2 for a Personal Portfolio Chatbot: A Complete Guide",
      desc: "Learn how to fine-tune Llama 3.2 to create a personalized AI chatbot for your portfolio that can answer questions about your skills, projects, and experience.",
      author: "SAYED ABDUL KARIM",
      readTime: "8 min read",
      tags: ["AI", "Llama", "Fine-Tuning", "Chatbot"],
      image: "/assets/blog_fine_tune_llama.webp",
      url: "https://medium.com/@sakarim9124/fine-tuning-llama-3-2-for-a-personal-portfolio-chatbot-a-complete-guide-6abd218fe262",
    },
    {
      title: "React Fiber: Reconciliation Revolution — From Synchronous Stack to Asynchronous Architecture",
      desc: "Deep dive into React Fiber architecture, exploring how React evolved from a synchronous stack-based reconciliation to an asynchronous, prioritized rendering system.",
      author: "SAYED ABDUL KARIM",
      readTime: "4 min read",
      tags: ["React", "React Fiber", "JavaScript", "Web Development"],
      image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*e6GcBTeXk3bkRsb5qUl2vg.png",
      url: "https://medium.com/@sakarim9124/react-fiber-reconciliation-revolution-from-synchronous-stack-to-asynchronous-architecture-b229ed1bf31d",
    },
    {
      title: "MCP: The Bridge Between AI and Your Codebase — How Model Context Protocol Revolutionizes...",
      desc: "Discover how Model Context Protocol (MCP) creates a seamless bridge between AI models and your development environment, enabling powerful code generation and analysis.",
      author: "SAYED ABDUL KARIM",
      readTime: "6 min read",
      tags: ["AI", "MCP", "Development Tools", "LLM"],
      image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*UtBO2gcq7Sh9MpG6YZJDOg.png",
      url: "https://medium.com/@sakarim9124/mcp-the-bridge-between-ai-and-your-codebase-how-model-context-protocol-revolutionizes-0ab7c2a68921",
    },
  ];

  return (
    <div className="blog2-page">
      <div className="blog2-container">
        <h1 className="blog2-main-title">{t("blog.technicalArticles")}</h1>
        <p className="blog2-subtitle">
          {t("blog.articlesSubtitle")}
        </p>

        <div className="blog2-grid">
          {blogPosts.map((post, index) => (
            <a
              key={index}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="blog2-card"
              style={{ backgroundImage: `url(${post.image})` }}
            >
              <div className="blog2-card-overlay">
                <div className="blog2-meta">
                  <span className="blog2-author">{post.author}</span>
                  <span className="blog2-dot">•</span>
                  <span className="blog2-read-time">{post.readTime}</span>
                </div>
                <h3 className="blog2-title">{post.title}</h3>
                <p className="blog2-desc">{post.desc}</p>
                <div className="blog2-tags">
                  {post.tags.map((tag, i) => (
                    <span key={i} className="blog2-tag">{tag}</span>
                  ))}
                </div>
                <span className="blog2-read-link">
                  {t("blog.readOnMedium")}
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="blog2-footer">
          <a
            href="https://medium.com/@sakarim9124"
            target="_blank"
            rel="noopener noreferrer"
            className="view-all-btn"
          >
            {t("blog.viewAllArticles")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Blog2;
