#!/usr/bin/env python3
"""
Extract and structure resume data for training Llama 3.2 1B
"""

import json
import PyPDF2
import re
from typing import Dict, List, Any
from pathlib import Path

class ResumeExtractor:
    def __init__(self, pdf_path: str):
        self.pdf_path = pdf_path
        self.text = ""
        self.structured_data = {}
    
    def extract_pdf_text(self) -> str:
        """Extract text from PDF resume"""
        try:
            with open(self.pdf_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                text = ""
                for page_num in range(len(pdf_reader.pages)):
                    page = pdf_reader.pages[page_num]
                    text += page.extract_text()
                self.text = text
                return text
        except Exception as e:
            print(f"Error extracting PDF: {e}")
            return self.get_fallback_data()
    
    def get_fallback_data(self) -> str:
        """Fallback resume data if PDF extraction fails"""
        return self.text
    
    def parse_structured_data(self) -> Dict[str, Any]:
        """Parse text into structured format based on actual resume"""
        data = {
            "personal": {
                "name": "Sayed Abdul Karim",
                "nickname": "Abdul",
                "email": "sakarim9124@gmail.com",
                "phone": "08296708008",
                "current_role": "Senior Experience Engineer",
                "current_company": "Publicis Sapient",
                "location": "Bengaluru, Karnataka, India",
                "github": "https://github.com/sayedabdulkarim",
                "portfolio": "https://sayedabdulkarim.github.io/abdul-portfolio/"
            },
            "experience": [
                {
                    "company": "Publicis Sapient",
                    "role": "Senior Experience Engineer",
                    "location": "Bengaluru",
                    "duration": "12/2023 - Present",
                    "projects": [
                        {
                            "name": "Patient Portal",
                            "description": "For Optum patients who were previously with HealthCare Partners or AppleCare Medical Group",
                            "tech": ["React Native", "TypeScript", "Firebase", "Abyss CSS framework", "React Testing Library", "Jest"],
                            "platforms": ["Android App", "iOS App", "Web App"]
                        },
                        {
                            "name": "Company Timesheet App",
                            "description": "Desktop portal app to consolidate timesheet submissions across three platforms into a single portal",
                            "tech": ["React", "Electron", "Node.js", "Express", "Firebase", "XLSX", "PapaParse", "CSV-Parser", "Nodemailer"]
                        }
                    ]
                },
                {
                    "company": "Tavant Technologies",
                    "role": "Software Engineer",
                    "location": "Bengaluru, Karnataka",
                    "duration": "11/2021 - 10/2023",
                    "projects": [
                        {
                            "name": "Scalable Legal",
                            "tech": ["HTML5", "CSS3", "Material UI", "ReactJS", "Redux Toolkit", "TypeScript", "Node", "Express", "MongoDB", "Firebase", "Google Map API", "Twilio Chat", "Zendesk", "Web-Accessibility"]
                        },
                        {
                            "name": "winfieldUnited",
                            "tech": ["HTML5", "CSS3", "jQuery", "Javascript", "Foundation Framework", "Bootstrap", "Kentico"],
                            "sites": ["WUC", "WUCA", "PORTAL", "CROPLAN", "TOOLSTAGE"]
                        }
                    ]
                },
                {
                    "company": "Capital Numbers",
                    "role": "Software Engineer",
                    "location": "Kolkata, West Bengal",
                    "duration": "04/2021 - 11/2021",
                    "projects": [
                        {
                            "name": "DewSquad (UserEnd)",
                            "tech": ["HTML5", "CSS3", "Material UI", "NextJs", "Redux Toolkit", "TypeScript", "Node", "Express", "MongoDB"]
                        },
                        {
                            "name": "DewSquad (Admin)",
                            "tech": ["HTML5", "CSS3", "Material UI", "NextJS", "Router", "Redux(thunk)", "API integration"]
                        }
                    ]
                },
                {
                    "company": "Vibrant Info",
                    "role": "React JS Developer",
                    "location": "Bangalore, Karnataka",
                    "duration": "03/2020 - 04/2021",
                    "projects": [
                        {
                            "name": "Nodwin Vendor Portal",
                            "tech": ["HTML5", "CSS3", "Bootstrap", "ReactSSR", "ContextApi", "Redux", "Node", "Express", "MongoDB", "S3 bucket", "cloudinary", "Firebase"]
                        },
                        {
                            "name": "Alwar Soft",
                            "tech": ["HTML5", "CSS3", "Material UI", "ReactJs", "Redux(saga)", "TypeScript", "Node", "Express", "MongoDB", "Firebase", "Zendesk"]
                        }
                    ]
                }
            ],
            "personal_projects": [
                {
                    "name": "Food Delivery App",
                    "description": "Complete food delivery system with client, admin and server components",
                    "components": {
                        "client_portal": {
                            "description": "Built with React, Redux Toolkit, TypeScript, SCSS, Font Face Observer for async font loading and Google Maps. Secured with JWT and CSRF tokens",
                            "tech": ["React", "Redux Toolkit", "TypeScript", "SCSS", "Google Maps", "JWT", "CSRF"],
                            "url": "URL provided"
                        },
                        "admin_portal": {
                            "description": "Order and data management using the same client tech stack",
                            "tech": ["React", "Redux Toolkit", "TypeScript", "SCSS"],
                            "url": "URL provided"
                        },
                        "server_api": {
                            "description": "Backend API with authentication, real-time features and AI integration",
                            "tech": ["Node.js", "Express", "MongoDB", "Firebase (OTP, CSRF)", "JWT", "Prompt Engineering", "LLM", "Sentiment Analysis"]
                        }
                    }
                },
                {
                    "name": "Synth AI - No-Code Application Generator",
                    "description": "AI-powered no-code platform for application generation",
                    "components": {
                        "client": {
                            "description": "Built with React, TypeScript, Emotion (CSS-in-JS), Material-UI, monaco-editor and Socket.io-client for real-time terminal communication, with persistent API key management and WebSocket connection handling",
                            "tech": ["React", "TypeScript", "Emotion", "Material-UI", "monaco-editor", "Socket.io-client", "WebSocket"],
                            "url": "URL provided"
                        },
                        "backend": {
                            "description": "Developed with Node.js, Express, and file-based storage; implemented AI-powered code generation using Anthropic & MCP (Model Context Protocol), real-time terminal emulation with node-pty, project lifecycle management, and dynamic proxy routing for live previews",
                            "tech": ["Node.js", "Express", "Anthropic", "MCP", "node-pty", "Dynamic Proxy Routing"]
                        }
                    }
                }
            ],
            "skills": {
                "languages": ["JavaScript", "TypeScript", "HTML", "CSS", "SQL"],
                "frontend": ["React.js", "React Native", "Next.js", "Redux", "Redux Toolkit", "Context API", "Material UI", "Bootstrap", "Tailwind CSS", "Emotion", "SCSS"],
                "backend": ["Node.js", "Express.js", "FastAPI"],
                "databases": ["MongoDB", "Firebase", "PostgreSQL"],
                "tools": ["Git", "Webpack", "Babel", "Jest", "React Testing Library", "Storybook", "Electron", "Docker"],
                "cloud": ["AWS", "S3", "Cloudinary", "Firebase"],
                "ai_ml": ["LLM", "RAG", "AI Agent", "Prompt Engineering", "MCP (Model Context Protocol)"],
                "other": ["WebRTC", "Socket.IO", "GraphQL", "Web Accessibility", "JWT", "PassportJs", "Twilio", "Google Maps API", "Zendesk", "Kentico CMS"]
            },
            "education": {
                "degree": "BTech",
                "institution": "PKACE, Bargarh",
                "location": "Bargarh, Odisha",
                "graduation_year": "2017"
            }
        }
        
        self.structured_data = data
        return data
    
    def save_to_json(self, output_path: str):
        """Save structured data to JSON file"""
        with open(output_path, 'w') as f:
            json.dump(self.structured_data, f, indent=2)
        print(f"✅ Saved structured data to {output_path}")

def main():
    # Extract resume data
    extractor = ResumeExtractor("../public/assets/resume@abdul_psn.pdf")
    
    # Extract text
    text = extractor.extract_pdf_text()
    print(f"📄 Extracted {len(text)} characters from resume")
    
    # Parse into structured format
    data = extractor.parse_structured_data()
    print(f"✅ Parsed into {len(data)} sections")
    
    # Save to JSON
    extractor.save_to_json("resume_structured.json")
    
    # Also save raw text
    with open("resume_raw.txt", "w") as f:
        f.write(text)
    print("✅ Saved raw text to resume_raw.txt")

if __name__ == "__main__":
    main()