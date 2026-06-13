# Work Space for SCHEN

Work Space for SCHEN 是一個以 HTML 開發、可直接部署到 GitHub Pages 的現代化互動網站。

## 使用技術

- HTML
- Tailwind CSS
- Alpine.js
- GSAP + ScrollTrigger
- Lucide Icons

## 互動功能

- 明暗模式切換
- 命令面板
- 手機版選單
- 頁面閱讀進度
- 工作模組分類篩選
- 任務分頁切換
- 動態時間與狀態面板
- 卡片滑鼠傾斜互動
- GitHub repository 連結複製

## 檔案

- `index.html`：網站首頁
- `assets/css/styles.css`：客製化視覺效果
- `assets/js/app.js`：互動功能
- `assets/data/publications.json`：Google Scholar 文章資料
- `assets/images/hero-academic-workspace.png`：首頁視覺圖

## 更新 Publications

文章清單放在：

```text
assets/data/publications.json
```

可新增或修改文章標題、作者、出版資訊、年份、引用數、主題分類與 Google Scholar 連結。網站會自動讀取這個檔案並產生可搜尋、可依年份與主題篩選的文章區塊。

## GitHub Pages

在 GitHub repository 的 `Settings` -> `Pages` 中，將來源設定為 `main` branch 的 root，即可發布網站。

Repository:

```text
https://github.com/Susanskchen-NYCU/work-space-for-SCHEN
```

## 發布到 GitHub

因為這個工作環境的原始 `.git` 目錄被 Windows 權限鎖住，這次的 step-by-step commits 保存在 `.codex-git`。

在自己的 PowerShell 執行：

```powershell
.\publish.ps1
```

這會使用 `.codex-git` 裡的 commits 推送到 GitHub。

## 本機預覽

在 PowerShell 執行：

```powershell
.\preview.ps1
```

然後開啟：

```text
http://localhost:4173
```
