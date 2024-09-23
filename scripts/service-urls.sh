#!/bin/bash

# Retrieve LoadBalancer URLs for each service
USER_SERVICE_URL=$(kubectl get svc user-service -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')
TASK_SERVICE_URL=$(kubectl get svc task-service -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')
HTML_SERVICE_URL=$(kubectl get svc html-service -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')

# Create a file with environment variable definitions
cat <<EOF > service-urls.sh
export USER_SERVICE_URL="http://$USER_SERVICE_URL:3000"
export TASK_SERVICE_URL="http://$TASK_SERVICE_URL:3001"
export HTML_SERVICE_URL="http://$HTML_SERVICE_URL:8080"
EOF

# Log to verify the URLs
echo "User Service URL: $USER_SERVICE_URL"
echo "Task Service URL: $TASK_SERVICE_URL"
echo "Html Service URL: $HTML_SERVICE_URL"
