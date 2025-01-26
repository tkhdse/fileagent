from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from model import GPT, tokenize_input, generate_output

import torch

# Initialize FastAPI app
app = FastAPI()


device = "cpu"
if torch.cuda.is_available():
    device = "cuda"
elif hasattr(torch.backends, "mps") and torch.backends.mps.is_available():
    device = "mps"
print(f"using device: {device}")

model = GPT.from_pretrained("gpt2")
model.eval()
model.to(device)



# Define the allowed origins
origins = [
    "http://localhost:3000",  # React frontend during development
    # Add other origins as needed, e.g., production domain
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of allowed origins
    allow_credentials=True,  # Allow cookies or authentication headers
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Define a request body using Pydantic
class TextRequest(BaseModel):
    prompt: str
    max_length: int = 50

# Define the endpoint for text generation
@app.post("/generate")
async def generate_text(request: TextRequest):
    data, enc = tokenize_input(request.prompt, device)
    output = generate_output(data, enc, request.max_length)
    return {"generated_text": f"{output}"}