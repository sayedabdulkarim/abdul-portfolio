import React, { useRef, useState } from "react";
import WorkExperience from "../../components/WorkExperience";
import Projects from "../../components/Projects";
import NavigationTabs from "../../components/NavigationTabs";
import Blog from "../../components/Blog";
import Contact from "../../components/Contact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons"; // Import LinkedIn icon from brands package
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  //misc
  const endOfPageRef = useRef(null);
  const [activeTab, setActiveTab] = useState('about');

  //func
  const scrollToBottom = () => {
    endOfPageRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // For now, just set the active tab
    // Later we'll add smooth scrolling to sections
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return <WorkExperience />;
      case 'projects':
        return <Projects />;
      case 'blog':
        return <Blog />;
      case 'contact':
        return <Contact />;
      default:
        return <WorkExperience />;
    }
  };

  return (
    <main className="main">
      {/* Navigation Tabs - positioned absolutely below header */}
      <NavigationTabs activeTab={activeTab} onTabChange={handleTabChange} />
      
      {/* Home banner - Hidden/Commented out */}
      {/* <section className="home section" id="home" style={{ display: 'none' }}>
        ...banner content...
      </section> */}

      {/* Dynamic Content Section */}
      <section id="content" className="section" style={{ minHeight: 'auto', overflow: 'visible', paddingTop: '10rem' }}>
        {renderContent()}
      </section>

      {/* This is the last element on your page */}
      <div ref={endOfPageRef}></div>
    </main>
  );
};

export default Home;
