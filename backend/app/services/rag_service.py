import os
from typing import List, Dict, Any
import chromadb
from chromadb.config import Settings
from sentence_transformers import SentenceTransformer
import PyPDF2
from langchain.text_splitter import RecursiveCharacterTextSplitter
import json

class RAGService:
    def __init__(self):
        self.is_initialized = False
        self.embeddings_model = None
        self.vector_store = None
        self.collection = None
        
    async def initialize(self):
        """Initialize the RAG system with ChromaDB and embeddings"""
        try:
            # Initialize embeddings model (runs locally, no API needed)
            self.embeddings_model = SentenceTransformer('all-MiniLM-L6-v2')
            
            # Initialize ChromaDB (local persistent storage)
            self.vector_store = chromadb.PersistentClient(
                path="./chroma_db",
                settings=Settings(
                    anonymized_telemetry=False,
                    allow_reset=True
                )
            )
            
            # Create or get collection for resume data
            self.collection = self.vector_store.get_or_create_collection(
                name="sarim_resume",
                metadata={"hnsw:space": "cosine"}
            )
            
            self.is_initialized = True
            print("✅ RAG Service initialized with ChromaDB")
            
        except Exception as e:
            print(f"❌ Failed to initialize RAG Service: {e}")
            raise e
    
    async def index_resume(self, file_path: str) -> Dict[str, Any]:
        """Extract and index resume data into vector database"""
        try:
            # Extract text from PDF
            resume_text = self._extract_pdf_text(file_path)
            
            # Also load structured data if available
            structured_data = self._load_structured_resume_data()
            
            # Split text into chunks
            text_splitter = RecursiveCharacterTextSplitter(
                chunk_size=500,
                chunk_overlap=50,
                length_function=len,
            )
            
            chunks = text_splitter.split_text(resume_text)
            
            # Add structured data as additional chunks
            if structured_data:
                chunks.extend(self._create_structured_chunks(structured_data))
            
            # Generate embeddings
            embeddings = self.embeddings_model.encode(chunks).tolist()
            
            # Prepare documents for ChromaDB
            ids = [f"doc_{i}" for i in range(len(chunks))]
            metadatas = [{"source": "resume", "chunk_id": i} for i in range(len(chunks))]
            
            # Clear existing data and add new
            self.collection.delete(where={"source": "resume"})
            self.collection.add(
                embeddings=embeddings,
                documents=chunks,
                metadatas=metadatas,
                ids=ids
            )
            
            return {"status": "success", "count": len(chunks)}
            
        except Exception as e:
            print(f"Error indexing resume: {e}")
            raise e
    
    def _extract_pdf_text(self, file_path: str) -> str:
        """Extract text from PDF file"""
        text = ""
        try:
            with open(file_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                for page_num in range(len(pdf_reader.pages)):
                    page = pdf_reader.pages[page_num]
                    text += page.extract_text()
        except Exception as e:
            print(f"Error extracting PDF: {e}")
            # Fallback to manual data if PDF extraction fails
            text = self._get_fallback_resume_text()
        
        return text
    
    def _load_structured_resume_data(self) -> Dict[str, Any]:
        """Load structured resume data from JSON"""
        try:
            with open('./data/resume_structured.json', 'r') as f:
                return json.load(f)
        except:
            # Return default structured data
            return {
                "name": "Sayed Abdul Karim",
                "nickname": "Abdul",
                "current_role": "Senior Experience Engineer at Publicis Sapient",
                "experience": [
                    {
                        "company": "Publicis Sapient",
                        "role": "Senior Experience Engineer",
                        "duration": "12/2023 - Present",
                        "description": "Leading development of Patient Portal and Timesheet applications"
                    },
                    {
                        "company": "Tavant Technologies",
                        "role": "Software Engineer",
                        "duration": "11/2021 - 10/2023",
                        "description": "Developed Scalable Legal platform and winfieldUnited projects"
                    }
                ],
                "projects": [
                    {
                        "name": "Food Delivery App",
                        "description": "Complete food delivery system with client, admin and server components",
                        "tech": ["React", "Redux Toolkit", "TypeScript", "Node.js", "MongoDB", "JWT"],
                        "highlights": ["Client and Admin portals", "Secure authentication", "Real-time tracking"]
                    },
                    {
                        "name": "Synth AI",
                        "description": "No-Code Application Generator with AI-powered code generation",
                        "tech": ["React", "TypeScript", "Node.js", "Anthropic", "MCP", "Socket.io"],
                        "highlights": ["AI code generation", "Real-time terminal", "Live previews"]
                    }
                ],
                "skills": {
                    "languages": ["JavaScript", "TypeScript", "Python", "Java"],
                    "frontend": ["React", "Next.js", "Redux", "Tailwind CSS"],
                    "backend": ["Node.js", "Express", "FastAPI", "Django"],
                    "databases": ["MongoDB", "PostgreSQL", "Redis"],
                    "cloud": ["AWS", "GCP", "Vercel", "Railway"]
                },
                "education": [
                    {
                        "degree": "Bachelor of Technology in Computer Science",
                        "university": "Your University",
                        "year": "2021"
                    }
                ]
            }
    
    def _create_structured_chunks(self, data: Dict[str, Any]) -> List[str]:
        """Convert structured data into searchable chunks"""
        chunks = []
        
        # Personal info
        chunks.append(f"I am {data['name']}, also known as {data.get('nickname', 'Abdul')}, currently working as {data['current_role']}")
        
        # Experience
        for exp in data.get('experience', []):
            chunks.append(
                f"Work experience: {exp['role']} at {exp['company']} "
                f"from {exp['duration']}. {exp['description']}"
            )
        
        # Projects
        for proj in data.get('projects', []):
            chunks.append(
                f"Project: {proj['name']} - {proj['description']}. "
                f"Built with {', '.join(proj['tech'])}. "
                f"Key features: {', '.join(proj.get('highlights', []))}"
            )
        
        # Skills
        skills = data.get('skills', {})
        for category, items in skills.items():
            chunks.append(f"My {category} skills include: {', '.join(items)}")
        
        # Education
        for edu in data.get('education', []):
            chunks.append(
                f"Education: {edu['degree']} from {edu['university']} in {edu['year']}"
            )
        
        return chunks
    
    def _get_fallback_resume_text(self) -> str:
        """Fallback resume text if PDF extraction fails"""
        return """
        Sayed Abdul Karim (Abdul)
        Senior Experience Engineer at Publicis Sapient
        
        EXPERIENCE:
        - Senior Experience Engineer at Publicis Sapient (12/2023 - Present)
          Leading development of scalable applications, mentoring junior developers
        
        - Software Engineer at Tavant Technologies (11/2021 - 10/2023)
          Developed multiple web applications using React and Node.js
        
        PROJECTS:
        - Food Delivery App: Complete system with client, admin and server
          Technologies: React, Redux Toolkit, TypeScript, Node.js, MongoDB
        
        - Synth AI: No-Code Application Generator
          Technologies: React, TypeScript, Anthropic, MCP, Socket.io
        
        SKILLS:
        - Languages: JavaScript, TypeScript, Python
        - Frontend: React, Next.js, Redux
        - Backend: Node.js, Express, FastAPI
        - Databases: MongoDB, PostgreSQL
        - Cloud: AWS, GCP, Vercel
        
        EDUCATION:
        - B.Tech in Computer Science (2021)
        """
    
    async def search_similar(self, query: str, k: int = 3) -> List[Dict[str, Any]]:
        """Search for similar documents in the vector store"""
        try:
            # Generate embedding for query
            query_embedding = self.embeddings_model.encode(query).tolist()
            
            # Search in ChromaDB
            results = self.collection.query(
                query_embeddings=[query_embedding],
                n_results=k,
                include=['documents', 'metadatas', 'distances']
            )
            
            # Format results
            formatted_results = []
            for i in range(len(results['documents'][0])):
                formatted_results.append({
                    'content': results['documents'][0][i],
                    'metadata': results['metadatas'][0][i],
                    'score': 1 - results['distances'][0][i]  # Convert distance to similarity
                })
            
            return formatted_results
            
        except Exception as e:
            print(f"Error searching similar documents: {e}")
            return []
    
    async def get_document_count(self) -> int:
        """Get total number of documents in vector store"""
        try:
            return self.collection.count()
        except:
            return 0