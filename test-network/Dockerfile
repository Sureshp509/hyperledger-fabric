# Use the official Node.js image as the base image
FROM node:20.10.0

# Install necessary dependencies for Hyperledger Fabric
# RUN apt-get update && apt-get install -y \
#     curl \
#     gnupg \
#     && curl -sSL https://bit.ly/2ysbOFE | bash -s -- 2.2.0


# Set the working directory inside the container
WORKDIR /test-network

# Copy the contents of the local directory to the working directory in the container
COPY . .

# Grant execution permissions for the network script
# RUN chmod +x ./network.sh

# Start the Fabric network
CMD ["bash", "-c", "./network.sh up"]
