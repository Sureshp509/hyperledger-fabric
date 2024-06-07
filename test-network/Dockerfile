# Use a base image with Docker installed
FROM docker:20.10.7

# Install necessary packages
RUN apk add --no-cache git bash curl

# Install Docker Compose
RUN curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose \
    && chmod +x /usr/local/bin/docker-compose

# Set the working directory
WORKDIR /test-network

# Copy the fabric samples to the container
COPY . .

# Start the Fabric network
CMD ["bash", "-c", "./network.sh up createChannel -ca"]
