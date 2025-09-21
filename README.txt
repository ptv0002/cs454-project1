CS454 Project 1 - EC2 REST Converter

Creates a REST web service that converts weights from pounds to kilograms

I initalized the instance on AWS console and connected to it through Git Bash.

The ip address I used for running curl and other commands is below:
IP4V Ip - 3.21.28.63

For connecting to the EC2 Instance I used the following format:
ssh -i "your-key.pem" ec2-user@IP

I used my personal .pem file and the ip4v address shown above.

To install Node.js I ran the following commands:
sudo yum update -y
sudo yum install -y nodejs npm

For creating the project in the instance I ran the following commands:
mkdir ~/project1
cd ~/project1
npm init -y
npm install express morgan

To create the service I ran the following command and then added a configuration for it.
sudo nano /etc/systemd/system/p1.service

To run the service I ran the following commands:
sudo systemctl enable --now p1
sudo systemctl status p1

The commands I ran for testing with curl:
curl "http://3.21.28.63:8080/convert?lbs=0" 
curl "http://3.21.28.63:8080/convert?lbs=150"
curl "http://3.21.28.63:8080/convert?lbs=0.1"
curl -v "http://3.21.28.63:8080/convert"
curl -v "http://3.21.28.63:8080/convert?lbs=-5"
curl -v "http://3.21.28.63:8080/convert?lbs=NaN"

Cleanup
I followed the 4 rules listed in the assignment:
1 Limit SSH to your IP in the Security Group; consider changing the key after the project.
2 Don’t run as root; keep service under a non-privileged user.
3 Rotate logs or cap size (e.g., logrotate or pm2 if used).
4 Stop or terminate the instance when finished; delete orphaned EBS volumes and Key Pairs
