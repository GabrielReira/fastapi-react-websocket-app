# fastapi-react-websocket-app
A simple WebApp made with FastAPI, React and Websocket. This project was created to consolidate my learning in these technologies and gain confidence in using them for more complex software.

## Getting started
### Prerequisites
- Git
- Python 3.9+
- Docker (if running with Docker)

### Clone this repo
```bash
git clone https://github.com/GabrielReira/fastapi-react-websocket-app.git
cd fastapi-react-websocket-app
```

### Running backend locally (without Docker)
1. Create a virtual environment
```bash
python -m venv venv
```

1. Activate your virtual environment
```bash
source venv/bin/activate  # for Mac/Linux
venv\Scripts\activate  # for Windows
```

1. Install the required dependencies
```bash
pip install -r requirements.txt
```

1. Start the server
```bash
uvicorn main:app --reload
```

### Running backend with Docker
1. Build the Docker image
```bash
docker build -t app-backend-image .
```

1. Start the server
```bash
docker run -dp 8000:8000 app-backend-image
```

Running with a Docker volume:
```bash
docker volume create app-db-volume
docker build -t app-backend-image .
docker run -dp 8000:8000 -v app-db-volume:/app/data app-backend-image
```

### How to reach the server
Your FastAPI backend app will be running on http://localhost:8000. Take a look at the API documentation at http://localhost:8000/docs.
