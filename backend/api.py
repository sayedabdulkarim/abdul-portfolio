from http.server import BaseHTTPRequestHandler
import json
import requests
import os

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        response = {"status": "Abdul's Portfolio Chatbot API is running!"}
        self.wfile.write(json.dumps(response).encode())
        
    def do_POST(self):
        if self.path == '/api/chat':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                data = json.loads(post_data.decode('utf-8'))
                message = data.get('message', '')
                
                HF_TOKEN = os.environ.get("HF_TOKEN")
                API_URL = "https://api-inference.huggingface.co/models/Abdul8008/abdul-portfolio-chatbot"
                
                headers = {"Authorization": f"Bearer {HF_TOKEN}"}
                prompt = f"User: {message}\nAssistant:"
                
                payload = {
                    "inputs": prompt,
                    "parameters": {
                        "max_new_tokens": 150,
                        "temperature": 0.7,
                        "do_sample": True
                    }
                }
                
                response = requests.post(API_URL, headers=headers, json=payload)
                
                if response.status_code == 200:
                    result = response.json()
                    if isinstance(result, list):
                        generated_text = result[0].get("generated_text", "")
                    else:
                        generated_text = result.get("generated_text", "")
                    
                    if "Assistant:" in generated_text:
                        answer = generated_text.split("Assistant:")[-1].strip()
                    else:
                        answer = generated_text.replace(prompt, "").strip()
                    
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(json.dumps({"response": answer}).encode())
                    
                elif response.status_code == 503:
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(json.dumps({"response": "Model is loading, please try again in 10 seconds..."}).encode())
                else:
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(json.dumps({"response": f"Sorry, I couldn't process your request. Status: {response.status_code}"}).encode())
                    
            except Exception as e:
                print(f"Error: {str(e)}")
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({"response": "Sorry, something went wrong. Please try again."}).encode())
        else:
            self.send_response(404)
            self.end_headers()