# Application run locally
1. cd my-app, run yarn install && yarn build
2. cd my-app, run yarn statr (pure UI)
3. cd api, yarn install, yarn dev, run application with server side rendering

# Docker image creation
1. cd to BLACK-JACK, run docker build -t <your_aws_accountId>.dkr.ecr.us-east-1.amazonaws.com/<ecr-repo-name>:<tag-id> .
2. run docker image in local: docker run -t -i -p <EXPOSE PORT(Dockerfile)>:<EXPOSE PORT(Dockerfile)> <your_aws_accountId>.dkr.ecr.us-east-1.amazonaws.com/<ecr-repo-name>:<tag-id>
3. aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <your_aws_accountId>.dkr.ecr.us-east-1.amazonaws.com
4. docker push <your_aws_accountId>.dkr.ecr.us-east-1.amazonaws.com/<ecr-repo-name>:<tag-id>

# Docker cmds help for development
1. docker images: show all images
2. docker system prune -a: remove all images created in local docker

# EKS Cluster creation
1. eksctl create cluster -f eks-cluster.yaml
2. kubectl get svc
3. kubectl create -f deployment.yaml
4. kubectl create -f service.yaml
5. kubectl get service: get the external service IP
6. kubectl get pods: check all pods healthy status
7. kubectl get nodes: check all nodes healthy status