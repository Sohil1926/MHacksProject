# Use the official Python image as the base image
FROM python:3.10

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy the application code to the container
COPY . .

# Run the application
CMD exec uvicorn routes.main:app --host 0.0.0.0 --port $PORT