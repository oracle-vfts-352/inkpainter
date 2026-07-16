🇯🇵 日本語 | 🇺🇸 [English](README.md)
# InkPainter

> AIを活用して写真を日本の伝統的な水墨画（墨絵）風アートへ変換するフルスタックWebアプリケーションです。

InkPainterは、AI画像生成、非同期ジョブ処理、クラウドストレージ、ユーザー認証、Dockerによるコンテナ化など、モダンなWeb技術を組み合わせて開発したポートフォリオプロジェクトです。

---

# ✨ 主な機能

- 🎨 AIによる画像変換（Replicate FLUX Kontext Pro）
- 🖌️ 日本の伝統的な水墨画風スタイルへの変換
- 👤 ログイン不要のゲストモード
- 🔐 Google OAuthによる認証
- 🔄 ログイン後のゲスト作品移行
- 🖼️ 個人ギャラリー
- 📥 生成画像のダウンロード
- ☁️ Cloudflare R2による画像保存
- ⚡ BullMQ + Redisによる非同期画像処理
- 🌐 日本語・英語対応
- 📱 レスポンシブデザイン

---

# 🛠 使用技術

## フロントエンド

- React
- Vite
- CSS3
- Context API

## バックエンド

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- BullMQ
- Redis

## AI

- Replicate API
- FLUX Kontext Pro

## クラウド

- Cloudflare R2

## 認証

- Passport.js
- Google OAuth 2.0
- Express Session
- Redis Session Store

## インフラ

- Docker
- Docker Compose
- Nginx
- GitHub Actions (CI)

---

# 🏗 システム構成

```
React (Vite)
      │
      ▼
    Nginx
      │
      ▼
Express.js API
      │
      ├───────────────┐
      ▼               ▼
 PostgreSQL       BullMQ Queue
                      │
                      ▼
                 Image Worker
                      │
                      ▼
               Replicate AI API
                      │
                      ▼
              Cloudflare R2 Storage
```

---

# 📂 ディレクトリ構成

```
InkPainter
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
│
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── queues/
│   │   ├── routes/
│   │   ├── services/
│   │   └── workers/
│   └── ...
│
├── nginx/
├── .github/
│   └── workflows/
│
└── docker-compose.yml
```

---

# 🚀 セットアップ

## リポジトリを取得

```bash
git clone https://github.com/oracle-vfts-352/inkpainter.git

cd inkpainter
```

---

## 依存パッケージをインストール

### Frontend

```bash
cd frontend
npm install
```

### Backend

```bash
cd ../backend
npm install
```

---

## 環境変数

`backend/.env` を作成します。

```env
DATABASE_URL=

SESSION_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

REDIS_HOST=
REDIS_PORT=

R2_ENDPOINT=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=

REPLICATE_API_TOKEN=
```

---

## アプリケーション起動

### Dockerを利用する場合

```bash
docker compose up --build
```

---

### 開発環境

Frontend

```bash
npm run dev
```

Backend

```bash
npm run dev
```

Worker

```bash
node src/workers/imageWorker.js
```

---

# 🔄 CI

GitHub Actionsを利用して以下を自動実行しています。

- ソースコードのチェックアウト
- Node.js環境構築
- 依存パッケージのインストール
- Prisma Client生成
- バックエンド構文チェック
- フロントエンドビルド

---

# 📚 学習内容

このプロジェクトでは以下の技術・設計を学習しました。

- ReactによるSPA開発
- Express.jsを用いたREST API設計
- PostgreSQLとPrisma ORM
- Redisを利用したセッション管理
- BullMQによる非同期ジョブ処理
- Cloudflare R2によるオブジェクトストレージ
- Docker / Docker Composeによるコンテナ化
- Nginxによるリバースプロキシ
- GitHub Actionsを利用したCI構築
- Google OAuth認証
- AI画像生成APIとの連携

---

# 👨‍💻 制作者

**oracle-vfts-352**

このプロジェクトは、モダンなフルスタックWeb開発、クラウド技術、およびAI画像生成技術の学習を目的として制作したポートフォリオ作品です。

GitHub:
https://github.com/oracle-vfts-352

---

# 📄 ライセンス

本プロジェクトは、学習およびポートフォリオ用途を目的として公開しています。

# 📌 プロジェクトの開発状況

✅ 開発完了

InkPainterはポートフォリオ作品として完成しており、現在は積極的な機能追加や開発は行っていません。

本プロジェクトでは、以下の技術・設計を実践しています。

- フルスタックWebアプリケーション開発
- AI画像生成との連携
- クラウドストレージ（Cloudflare R2）
- Docker / Docker Compose
- Nginxによるリバースプロキシ
- Redis・BullMQによる非同期処理
- GitHub Actionsを利用したCI
- Google OAuth認証
- Prisma ORM と PostgreSQL