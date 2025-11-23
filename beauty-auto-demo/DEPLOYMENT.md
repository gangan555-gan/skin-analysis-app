# デプロイ手順書 (Vercel)

このアプリケーション「LUMIÈRE AI SKIN REPORT」をVercelにデプロイするための手順です。

## 前提条件
- GitHubアカウント
- Vercelアカウント
- Google Gemini APIキー

## 手順

### 1. GitHubリポジトリの準備
1. このプロジェクトをGitHubにプッシュします。
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   # GitHubで新しいリポジトリを作成し、そのURLを設定
   git remote add origin <YOUR_REPO_URL>
   git push -u origin main
   ```

### 2. Vercelでのプロジェクト作成
1. [Vercel Dashboard](https://vercel.com/dashboard) にアクセスします。
2. **"Add New..."** > **"Project"** をクリックします。
3. GitHubリポジトリ一覧から、先ほどプッシュしたリポジトリの **"Import"** ボタンをクリックします。

### 3. 環境変数の設定
デプロイ設定画面（Configure Project）で、**Environment Variables** セクションを開き、以下の変数を追加します。

- **Key**: `GEMINI_API_KEY`
- **Value**: (あなたのGoogle Gemini APIキー)

※ `.env.local` ファイルはセキュリティ上Gitに含まれないため、ここで手動設定する必要があります。

### 4. デプロイの実行
1. **"Deploy"** ボタンをクリックします。
2. ビルドが完了するまで待ちます（通常1〜2分）。
3. 完了画面が表示されたら、**"Continue to Dashboard"** をクリックします。
4. **"Visit"** ボタンで公開されたアプリを確認できます。

## 注意事項
- **画像アセット**: キャラクター画像は `public/images/characters/` に配置されています。これらは自動的にデプロイされます。
- **API制限**: Gemini APIの無料枠を使用している場合、リクエスト制限に注意してください。
- **ブログ**: ブログ記事を追加・編集する場合は、`app/data/blog-posts.ts` を編集して再度プッシュしてください。
