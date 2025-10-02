# Quick Push to GitHub Script
# Run this after creating your GitHub repository

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  GitHub Push Helper for HealthMetrics PWA" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Get GitHub username
$username = Read-Host "Enter your GitHub username"

# Get repository name
Write-Host ""
Write-Host "Suggested repository name: HealthMetricsPWA"
$repoName = Read-Host "Enter repository name (or press Enter for default)"
if ([string]::IsNullOrWhiteSpace($repoName)) {
    $repoName = "HealthMetricsPWA"
}

# Construct URL
$repoUrl = "https://github.com/$username/$repoName.git"

Write-Host ""
Write-Host "Will add remote: $repoUrl" -ForegroundColor Yellow
Write-Host ""

# Confirm
$confirm = Read-Host "Have you created this repository on GitHub? (y/n)"
if ($confirm -ne 'y') {
    Write-Host ""
    Write-Host "Please create the repository first:" -ForegroundColor Red
    Write-Host "1. Go to: https://github.com/new" -ForegroundColor Yellow
    Write-Host "2. Name: $repoName" -ForegroundColor Yellow
    Write-Host "3. Set to Private (recommended)" -ForegroundColor Yellow
    Write-Host "4. Do NOT initialize with README" -ForegroundColor Yellow
    Write-Host "5. Click 'Create repository'" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Then run this script again!" -ForegroundColor Green
    exit
}

# Navigate to project directory
$projectPath = "C:\Users\mithun.gangadharaiah\OneDrive - Dynatrace\Documents\GitHub\BluetoothDashboard"
Set-Location $projectPath

Write-Host ""
Write-Host "Adding remote..." -ForegroundColor Green
git remote add origin $repoUrl

Write-Host "Renaming branch to main..." -ForegroundColor Green
git branch -M main

Write-Host "Pushing to GitHub..." -ForegroundColor Green
git push -u origin main

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "  ✅ Successfully pushed to GitHub!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Repository URL: https://github.com/$username/$repoName" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Set repository to Private (Settings > Danger Zone)" -ForegroundColor White
Write-Host "2. Add collaborators if needed" -ForegroundColor White
Write-Host "3. Enable GitHub Pages for demo (Settings > Pages)" -ForegroundColor White
Write-Host "4. Start working on AI feature!" -ForegroundColor White
Write-Host ""
