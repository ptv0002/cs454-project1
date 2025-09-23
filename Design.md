# CS454 Project 1 - Design Rationale

## System Architecture Overview

This project implements a RESTful web service for weight conversion following a microservices architecture pattern. The system is designed as a single-purpose API endpoint that converts pounds to kilograms, deployed on AWS EC2 infrastructure. The architecture follows a three-tier model: client layer (HTTP requests), application layer (Node.js/Express service), and infrastructure layer (AWS EC2, Security Groups).

## Technology Selection Justification

### Runtime Environment: Node.js
Node.js was selected for its event-driven architecture that efficiently handles concurrent API requests. The lightweight nature of Node.js makes it ideal for simple REST services. The built-in HTTP module provides sufficient functionality for our basic requirements, while the npm ecosystem offers reliable middleware packages.

### Web Framework: Express.js
Express.js was chosen over alternatives like Koa or Fastify due to its simplicity, extensive documentation, and middleware support. For this project, we specifically utilize:
- **Routing:** Simple GET endpoint handling
- **Middleware:** Morgan for request logging
- **JSON parsing:** Built-in Express JSON middleware

### Cloud Platform: AWS EC2
AWS EC2 provides the infrastructure-as-a-service foundation for this project. The t3.micro instance type was selected specifically for its free tier eligibility, providing cost-effective computing resources while meeting the performance requirements of a lightweight conversion service.

### Operating System: Amazon Linux 2023
Amazon Linux 2023 offers several advantages for this deployment:
- Optimized for AWS EC2 infrastructure
- Long-term support and security updates
- Pre-configured with AWS CLI and cloud utilities
- Familiar yum/dnf package management

## Security Implementation Details

### Access Control Strategy
The implementation follows the principle of least privilege throughout the stack:

**Network Security:**
- SSH access restricted to a single IP address via Security Group rules
- HTTP service exposed only on port 8080 to avoid privileged port requirements
- No unnecessary ports open to the public internet

**Service Execution:**
- Application runs under non-privileged `ec2-user` account
- Systemd service configuration specifies user context explicitly
- No root privileges required for normal operation

**Authentication:**
- Key-pair authentication for SSH access instead of password-based login
- 2048-bit RSA encryption for key security

## Service Management and Reliability

### Process Supervision with Systemd
The service is managed by systemd for enterprise-grade process supervision:

**Service Configuration:**
- Automatic restart on failure (`Restart=always`)
- Dependency management (`After=network.target`)
- Proper working directory specification
- User context enforcement

**Operational Benefits:**
- Automatic startup on system boot
- Process monitoring and recovery
- Integrated logging via journald
- Standardized service management interface

### Logging Strategy
- **Morgan middleware:** Provides HTTP request logging with combined format
- **Systemd journal:** Captures standard output and error streams
- **No persistent log files:** Utilizes cloud instance ephemeral storage appropriately

## API Design Decisions

### RESTful Endpoint Design
The API follows REST principles with a single resource-oriented endpoint:

**URL Structure:**
- `GET /convert?lbs={value}` - Clear, predictable resource naming
- Query parameter approach for simple input requirements
- No path parameters needed for single-function service

**Response Format:**
- Consistent JSON structure across all responses
- Inclusion of conversion formula for transparency
- Three-decimal precision for practical weight conversion accuracy

### Error Handling Approach
Comprehensive error handling implemented with appropriate HTTP status codes:

**Client Errors (4xx):**
- `400 Bad Request`: Missing or malformed parameters
- `422 Unprocessable Entity`: Semantically invalid values (negative weights)

**Error Response Standardization:**
- JSON error messages with descriptive text
- Consistent error object structure
- Maintenance of same content-type across success and error responses

## Deployment and Operations

### Infrastructure as Code Approach
While primarily using AWS Console for this project, the design follows infrastructure-as-code principles:

**Reproducible Deployment:**
- Documented step-by-step provisioning process
- Version-controlled service configuration files
- Environment-agnostic application code

### Cost Optimization Strategy
- t3.micro instance type for free tier utilization
- Automatic instance stopping when not in use
- Clear termination procedures to prevent ongoing charges
