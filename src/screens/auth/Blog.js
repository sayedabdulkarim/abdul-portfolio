import React from "react";
import { useTranslation } from "react-i18next";
import "./Blog.scss";

const Blog = () => {
  const { t } = useTranslation();

  const blogPosts = [
    {
      title: "Building Scalable React Applications",
      desc: "Best practices for structuring large-scale React projects with proper state management and component architecture.",
      date: "Jan 2024",
      tags: ["React", "Architecture"],
    },
    {
      title: "Understanding Node.js Event Loop",
      desc: "Deep dive into how Node.js handles asynchronous operations and the event loop mechanism.",
      date: "Dec 2023",
      tags: ["Node.js", "Backend"],
    },
    {
      title: "CSS Grid vs Flexbox: When to Use What",
      desc: "A comprehensive guide to choosing between CSS Grid and Flexbox for different layout scenarios.",
      date: "Nov 2023",
      tags: ["CSS", "Frontend"],
    },
    {
      title: "TypeScript Best Practices in 2024",
      desc: "Modern TypeScript patterns and practices for writing type-safe and maintainable code.",
      date: "Oct 2023",
      tags: ["TypeScript", "JavaScript"],
    },
    {
      title: "Building REST APIs with Express.js",
      desc: "Step-by-step guide to creating robust REST APIs using Express.js with authentication and validation.",
      date: "Sep 2023",
      tags: ["Express", "API"],
    },
    {
      title: "React Native Performance Optimization",
      desc: "Tips and tricks to improve the performance of your React Native applications.",
      date: "Aug 2023",
      tags: ["React Native", "Mobile"],
    },
  ];

  return (
    <div className="blog-page">
      <div className="blog-container">
        <h1 className="blog-main-title">{t("blog.title")}</h1>
        <p className="blog-subtitle">
          {t("blog.subtitle")}
        </p>

        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <a
              key={index}
              href="#"
              className="blog-card"
              onClick={(e) => e.preventDefault()}
            >
              <div className="blog-meta">
                <span className="blog-date">{post.date}</span>
                <div className="blog-tags">
                  {post.tags.map((tag, i) => (
                    <span key={i} className="blog-tag">{tag}</span>
                  ))}
                </div>
              </div>
              <h3 className="blog-title">{post.title}</h3>
              <p className="blog-desc">{post.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
