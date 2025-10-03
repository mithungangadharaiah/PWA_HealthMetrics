# Test Anything LLM API Connection
# ===================================

Write-Host "`n🔍 Testing Anything LLM API..." -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

# Test 1: Ping
Write-Host "1️⃣  Testing API Ping..." -ForegroundColor Yellow
try {
    $ping = Invoke-RestMethod -Uri "http://127.0.0.1:3001/api/ping" -Method GET
    Write-Host "   ✅ API is online: $($ping.online)" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Ping failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test 2: Get Workspaces
Write-Host "`n2️⃣  Fetching Workspaces..." -ForegroundColor Yellow
try {
    $workspaces = Invoke-RestMethod -Uri "http://127.0.0.1:3001/api/workspaces" -Method GET
    Write-Host "   ✅ Found $($workspaces.workspaces.Count) workspace(s):" -ForegroundColor Green
    foreach ($ws in $workspaces.workspaces) {
        Write-Host "      📁 Name: $($ws.name)" -ForegroundColor White
        Write-Host "      🔗 Slug: $($ws.slug)" -ForegroundColor White
        Write-Host "      💬 Chat Mode: $($ws.chatMode)" -ForegroundColor White
        Write-Host ""
    }
    
    # Use first workspace for testing
    $testWorkspace = $workspaces.workspaces[0].slug
    Write-Host "   🎯 Will use workspace: $testWorkspace" -ForegroundColor Cyan
    
} catch {
    Write-Host "   ❌ Failed to get workspaces: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test 3: Send Test Message
Write-Host "`n3️⃣  Testing Chat Endpoint..." -ForegroundColor Yellow
try {
    $headers = @{
        "Content-Type" = "application/json"
    }
    
    $body = @{
        message = "Analyze this health data: Heart Rate 75 BPM, Blood Pressure 120/80 mmHg. Provide brief health recommendations."
        mode = "chat"
    } | ConvertTo-Json
    
    Write-Host "   📤 Sending test message to workspace '$testWorkspace'..." -ForegroundColor White
    
    $chatResponse = Invoke-RestMethod -Uri "http://127.0.0.1:3001/api/v1/workspace/$testWorkspace/chat" `
        -Method POST `
        -Headers $headers `
        -Body $body `
        -TimeoutSec 30
    
    Write-Host "   ✅ Chat API responded!" -ForegroundColor Green
    Write-Host "`n   🤖 AI Response:" -ForegroundColor Cyan
    Write-Host "   ─────────────────────────────────────────" -ForegroundColor DarkGray
    Write-Host "   $($chatResponse.textResponse)" -ForegroundColor White
    Write-Host "   ─────────────────────────────────────────" -ForegroundColor DarkGray
    
    if ($chatResponse.sources) {
        Write-Host "`n   📚 Sources: $($chatResponse.sources.Count)" -ForegroundColor Yellow
    }
    
} catch {
    $errorMsg = $_.Exception.Message
    $errorResponse = $_.ErrorDetails.Message
    
    Write-Host "   ⚠️  Chat request failed" -ForegroundColor Yellow
    Write-Host "   Error: $errorMsg" -ForegroundColor Red
    
    if ($errorResponse) {
        Write-Host "   Response: $errorResponse" -ForegroundColor Red
    }
    
    if ($errorMsg -match "Unauthorized|401|403") {
        Write-Host "`n   💡 TIP: You may need to configure API authentication" -ForegroundColor Cyan
        Write-Host "   Check Anything LLM settings for API keys" -ForegroundColor Cyan
    }
}

Write-Host "`n✅ Testing Complete!" -ForegroundColor Green
Write-Host "================================`n" -ForegroundColor Cyan

# Display integration info
Write-Host "📋 Integration Details for Your Health App:" -ForegroundColor Yellow
Write-Host "─────────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host "API Endpoint: http://127.0.0.1:3001" -ForegroundColor White
Write-Host "Workspace Slug: $testWorkspace" -ForegroundColor White
Write-Host "Chat Endpoint: http://127.0.0.1:3001/api/v1/workspace/$testWorkspace/chat" -ForegroundColor White
Write-Host "─────────────────────────────────────────────`n" -ForegroundColor DarkGray
