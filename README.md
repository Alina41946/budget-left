# 還可以花多少

極簡的每月預算工具。資料只儲存在使用者自己的瀏覽器 LocalStorage，不需要資料庫、登入、API 或付費服務。

## 本機執行

需要 Node.js 18.17 以上。

```bash
npm install
npm run dev
```

開啟 http://localhost:3000

## 功能

- 設定每月預算
- 新增支出
- 刪除支出
- 自動計算剩餘預算
- 每月自動分開紀錄
- Responsive Mobile / Desktop
- PWA manifest，可加入手機主畫面

## 免費部署

推送到 GitHub 後可直接匯入 Vercel。此版本沒有資料庫，因此不需要設定環境變數。

## 注意

資料存在瀏覽器 LocalStorage，因此不同裝置或不同瀏覽器不會同步。若未來需要跨裝置同步，再加入 Supabase 等雲端資料庫即可。
