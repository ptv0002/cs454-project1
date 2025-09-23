# CS454 Project 1 - EC2 REST Converter

Creates a REST web service that converts weights from pounds to kilograms

I initalized the instance on AWS console and connected to it through Git Bash.

The ip address I used for running curl and other commands is below:
* IP4V Ip - 3.21.28.63

For connecting to the EC2 Instance I used the following format:
* ssh -i "your-key.pem" ec2-user@IP

I used my personal .pem file and the ip4v address shown above.

## Installation and Creation
To install Node.js I ran the following commands:
* sudo yum update -y
* sudo yum install -y nodejs npm

For creating the project in the instance I ran the following commands:
* mkdir ~/project1
* cd ~/project1
* npm init -y
* npm install express morgan

## Service
To create the service I ran the following command and then added a configuration for it.
* sudo nano /etc/systemd/system/p1.service

To run the service I ran the following commands:
* sudo systemctl enable --now p1
* sudo systemctl status p1

### cURL Commands
The commands I ran for testing with curl:
* curl "http://3.21.28.63:8080/convert?lbs=0" 
* curl "http://3.21.28.63:8080/convert?lbs=150"
* curl "http://3.21.28.63:8080/convert?lbs=0.1"
* curl -v "http://3.21.28.63:8080/convert"
* curl -v "http://3.21.28.63:8080/convert?lbs=-5"
* curl -v "http://3.21.28.63:8080/convert?lbs=NaN"

## Security & Cost Hygiene
* SSH Access: Limited to my IP address in Security Group rules
* Non-root Execution: Service runs under non-privileged ec2-user account
* Log Management: Service logs managed through systemd journaling
* Cost Control: Instance will be terminated after grading; key pair will be deleted

### Security Rules
For this project, the EC2 instance was launched with the following Security Group configuration:
* Port 22 (SSH) – allowed only from my personal IP address for secure remote administration.
* Port 80 (HTTP) – open to the public for testing the REST service.
* All other ports remain blocked by default.

## Note on Public IPs
The public IP address of the EC2 instance may differ between screenshots and logs.
This is expected behavior, since AWS assigns a new IP each time an instance is stopped and restarted (unless an Elastic IP is attached).
All screenshots, curl examples, and logs in this submission were generated from the same deployed service running the provided code.

## Cleanup
* Instance will be terminated via AWS Console after project evaluation
* Associated EBS volumes will be automatically deleted upon termination
* Key pair will be deleted from AWS account
