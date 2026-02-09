# Azure Deployment Guide for ConstitutionVerse

## Overview
This project is ready to be deployed to Azure Container Apps with full infrastructure-as-code support using Bicep.

## Prerequisites
- Azure Subscription
- Azure CLI installed
- Azure Developer CLI (AZD) installed (optional but recommended)
- GitHub account with access to the repository

## Deployment Methods

### Method 1: Automated GitHub Actions (Recommended)

The repository includes a GitHub Actions workflow that automatically builds and deploys the application.

**Setup:**
1. Add Azure credentials to GitHub Secrets:
   - Go to Settings → Secrets and variables → Actions
   - Add `AZURE_CREDENTIALS` with your service principal credentials

2. The workflow will automatically trigger on:
   - Push to main branch
   - Manual trigger via Actions tab

**Workflow Steps:**
- Builds the Node.js application
- Creates Docker image
- Pushes to GitHub Container Registry
- Deploys to Azure Container Apps

### Method 2: Manual Deployment with AZD

```bash
# 1. Initialize AZD environment
azd env new

# 2. Set required environment variables
azd env set AZURE_SUBSCRIPTION_ID <your-subscription-id>
azd env set AZURE_LOCATION eastus  # or your preferred region

# 3. Provision Azure infrastructure
azd provision

# 4. Deploy the application
azd up
```

### Method 3: Azure CLI Direct Deployment

```bash
# 1. Create resource group
az group create \
  --name constitutionverse-rg \
  --location eastus

# 2. Deploy Bicep template
az deployment group create \
  --resource-group constitutionverse-rg \
  --template-file infra/main.bicep \
  --parameters infra/main.parameters.json \
  --parameters environmentName=prod location=eastus

# 3. Build and push Docker image to ACR
az acr build --registry <registry-name> --image constitutionverse:latest .

# 4. Deploy to Container Apps
az containerapp create \
  --name constitutionverse-app \
  --resource-group constitutionverse-rg \
  --image <registry-url>/constitutionverse:latest \
  --target-port 3000 \
  --ingress external \
  --cpu 0.5 --memory 1Gi
```

## Infrastructure Components

### Resources Created:
- **Azure Container Apps** - Hosts the application
- **Container Registry** - Stores Docker images
- **Log Analytics Workspace** - Logs and diagnostics
- **Application Insights** - Performance monitoring
- **User-Assigned Managed Identity** - Secure authentication
- **Container App Environment** - Runtime environment

### Configuration:
- **Port**: 3000
- **Min Replicas**: 1
- **Max Replicas**: 3 (auto-scaling)
- **Resource Allocation**: 0.5 CPU, 1 GB memory
- **Build System**: npm with Vite
- **Runtime**: Node.js 18-alpine

## Monitoring

After deployment, monitor your application:

```bash
# View Container App status
az containerapp show --name constitutionverse-app --resource-group constitutionverse-rg

# View logs
az containerapp logs show --name constitutionverse-app --resource-group constitutionverse-rg --follow

# View metrics
# Use Azure Portal → Container Apps → Metrics
```

## Post-Deployment

1. **Access Application**: The URL will be provided after deployment
   - Format: `https://<unique-id>.eastus.azurecontainerapps.io`

2. **Monitor Performance**: Check Application Insights dashboard

3. **View Logs**: Access logs via Log Analytics Workspace

4. **Scale Application**: Adjust min/max replicas as needed

## Troubleshooting

### Common Issues:

1. **Container fails to start**
   - Check logs: `az containerapp logs show --name <app-name> --resource-group <rg-name>`
   - Verify port 3000 is exposed in Dockerfile

2. **Image push fails**
   - Verify ACR credentials
   - Check Docker image size
   - Ensure ACR login is successful

3. **Deployment timeout**
   - Check resource quota
   - Verify subnet has available IPs
   - Check network security group rules

## Cost Optimization

- Container Apps Consumption plan charges only for actual usage
- Scale down replicas during off-peak hours
- Use appropriate resource allocation (0.5 CPU is typically sufficient)
- Monitor Application Insights for cost optimization opportunities

## Clean Up

To remove all resources:

```bash
# Delete resource group (removes all resources)
az group delete --name constitutionverse-rg --yes

# Or with AZD
azd down
```

## Additional Resources

- [Azure Container Apps Documentation](https://learn.microsoft.com/en-us/azure/container-apps/)
- [Bicep Documentation](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/)
- [Azure Developer CLI Documentation](https://learn.microsoft.com/en-us/azure/developer/azure-developer-cli/)
