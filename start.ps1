# MindEase Quick Start Script
# This script helps you set up and run both backend and frontend

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   MindEase Setup & Start Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Function to check if a command exists
function Test-Command {
    param($Command)
    try {
        if (Get-Command $Command -ErrorAction Stop) {
            return $true
        }
    }
    catch {
        return $false
    }
}

# Check prerequisites
Write-Host "Checking prerequisites..." -ForegroundColor Yellow

if (-not (Test-Command "node")) {
    Write-Host "❌ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}
else {
    $nodeVersion = node --version
    Write-Host "✅ Node.js installed: $nodeVersion" -ForegroundColor Green
}

if (-not (Test-Command "npm")) {
    Write-Host "❌ npm is not installed!" -ForegroundColor Red
    exit 1
}
else {
    $npmVersion = npm --version
    Write-Host "✅ npm installed: $npmVersion" -ForegroundColor Green
}

Write-Host ""

# Ask what to do
Write-Host "What would you like to do?" -ForegroundColor Cyan
Write-Host "1. Install dependencies (first time setup)"
Write-Host "2. Start backend server"
Write-Host "3. Start frontend app"
Write-Host "4. Start both (backend + frontend)"
Write-Host "5. Exit"
Write-Host ""

$choice = Read-Host "Enter your choice (1-5)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "Installing dependencies..." -ForegroundColor Yellow
        Write-Host ""
        
        # Install backend dependencies
        Write-Host "📦 Installing backend dependencies..." -ForegroundColor Cyan
        Set-Location backend
        npm install
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Backend dependencies installed successfully!" -ForegroundColor Green
        }
        else {
            Write-Host "❌ Backend installation failed!" -ForegroundColor Red
            Set-Location ..
            exit 1
        }
        Set-Location ..
        
        Write-Host ""
        
        # Install frontend dependencies
        Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Cyan
        Set-Location frontend
        npm install
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Frontend dependencies installed successfully!" -ForegroundColor Green
        }
        else {
            Write-Host "❌ Frontend installation failed!" -ForegroundColor Red
            Set-Location ..
            exit 1
        }
        Set-Location ..
        
        Write-Host ""
        Write-Host "🎉 All dependencies installed successfully!" -ForegroundColor Green
        Write-Host "You can now run the application using option 4" -ForegroundColor Yellow
    }
    
    "2" {
        Write-Host ""
        Write-Host "🚀 Starting backend server..." -ForegroundColor Cyan
        Set-Location backend
        npm start
    }
    
    "3" {
        Write-Host ""
        Write-Host "📱 Starting frontend app..." -ForegroundColor Cyan
        Write-Host "Make sure backend is running on port 5000!" -ForegroundColor Yellow
        Set-Location frontend
        npm start
    }
    
    "4" {
        Write-Host ""
        Write-Host "🚀 Starting both backend and frontend..." -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Backend will start in this window." -ForegroundColor Yellow
        Write-Host "Frontend will open in a new window." -ForegroundColor Yellow
        Write-Host ""
        
        # Start frontend in new window
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; Write-Host '📱 Starting Frontend...' -ForegroundColor Cyan; npm start"
        
        # Start backend in current window
        Write-Host "🔧 Starting Backend..." -ForegroundColor Cyan
        Set-Location backend
        npm start
    }
    
    "5" {
        Write-Host "Goodbye! 👋" -ForegroundColor Cyan
        exit 0
    }
    
    default {
        Write-Host "Invalid choice. Please run the script again." -ForegroundColor Red
        exit 1
    }
}
