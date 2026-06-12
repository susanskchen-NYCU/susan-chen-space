$ErrorActionPreference = "Stop"

$repoUrl = "https://github.com/Susanskchen-NYCU/work-space-for-SCHEN.git"

git --git-dir=.codex-git --work-tree=. remote set-url origin $repoUrl
git --git-dir=.codex-git --work-tree=. status --short --branch
git --git-dir=.codex-git --work-tree=. log --oneline --max-count=6
git --git-dir=.codex-git --work-tree=. push -u origin main

Write-Host ""
Write-Host "Published Work Space for SCHEN to GitHub."
