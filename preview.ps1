$ErrorActionPreference = "Stop"

$port = 4173
$url = "http://localhost:$port"

Write-Host "Starting local preview at $url"
Write-Host "Press Ctrl+C to stop."

python -m http.server $port
