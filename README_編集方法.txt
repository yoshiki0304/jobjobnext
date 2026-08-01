【オタスケ工場JOB LP：編集・公開ガイド】

■ 1. 文章・電話番号・LINEリンク・求人・FAQを変更する
assets/js/content.js をテキストエディタで開いて編集してください。
編集箇所はすべて日本語でまとまっています。

特に最初に変更する項目：
- brand.phone / brand.phoneHref
- brand.lineUrl
- brand.email
- hero内の見出し・キャンペーン表記
- jobs内の求人内容

■ 2. 画像を変更する
assets/img フォルダへ画像を入れ、content.js内の image のファイル名を変更します。
例：image:"assets/img/new-photo.webp"
推奨形式：WebP / JPG / PNG

■ 3. お問い合わせフォームを実際に受信できるようにする
send-mail.php の先頭にある以下2項目を変更してください。
ADMIN_EMAIL：受信したいメールアドレス
FROM_EMAIL：公開ドメインで作成した送信元メールアドレス

例：
const ADMIN_EMAIL = 'support@your-domain.jp';
const FROM_EMAIL  = 'no-reply@your-domain.jp';

※PHP対応サーバーが必要です。GitHub PagesではPHPフォームは動きません。
※XServerの場合は、そのままpublic_html配下へアップロードできます。

■ 4. 公開方法（XServer）
このフォルダ内のファイルをすべて、対象ドメインのpublic_html直下へアップロードします。
index.html が直下にある状態にしてください。

■ 5. GitHub Pagesで先に確認する場合
フォーム以外の表示は動きます。
フォームはGoogleフォーム等へ変更する必要があります。

■ 6. 色・余白・文字サイズを変更する
assets/css/style.css を編集します。
冒頭の :root に主要カラーがあります。
--navy：濃い青
--blue：青
--cyan：水色
--pink：ピンク
--yellow：黄色

■ 7. LINEポップアップ
ページを60%ほどスクロールすると表示されます。
表示条件を変える場合は assets/js/app.js の ratio>.60 を変更します。

【注意】
求人条件、支援金、寮費、交通費等の表記は、実際の求人条件と一致するように必ず調整してください。
