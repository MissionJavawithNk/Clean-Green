Set-Location -Path "backend"
Write-Host "🚀 Starting Clean & Green Backend..." -ForegroundColor Green

# Check if Java is installed
if (!(Get-Command java -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Error: Java is not installed! Please install JDK 17." -ForegroundColor Red
    exit
}

# Run the app directly using Java and the classpath (bypassing Maven for now since it's giving us trouble)
# But we need the dependencies... so let's try to find where Maven is.

$mvnPath = Get-Command mvn -ErrorAction SilentlyContinue
if ($mvnPath) {
    mvn spring-boot:run
} else {
    Write-Host "⚠️ Maven not found in Path. Attempting to use the local wrapper..." -ForegroundColor Yellow
    if (Test-Path "mvnw.cmd") {
        .\mvnw.cmd spring-boot:run
    } else {
        Write-Host "❌ Could not find Maven or the Wrapper. Please follow the Path setup instructions!" -ForegroundColor Red
    }
}
