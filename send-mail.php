<?php
// XServer等のPHP対応サーバー用です。
// 必ず下記2項目を実際のドメインのメールアドレスに変更してください。
const ADMIN_EMAIL = 'info@example.jp';
const FROM_EMAIL  = 'no-reply@example.jp';

mb_language('Japanese');
mb_internal_encoding('UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit('Method Not Allowed'); }
if (!empty($_POST['website'] ?? '')) { header('Location: thanks.html'); exit; } // honeypot

function clean($value): string {
  $value = trim((string)$value);
  return str_replace(["\r", "\0"], '', $value);
}

$name = clean($_POST['name'] ?? '');
$kana = clean($_POST['kana'] ?? '');
$tel = clean($_POST['tel'] ?? '');
$birth = clean($_POST['birth'] ?? '');
$email = clean($_POST['email'] ?? '');
$message = clean($_POST['message'] ?? '');
$source = clean($_POST['source'] ?? 'direct');
$privacy = clean($_POST['privacy'] ?? '');

if ($name === '' || $kana === '' || $tel === '' || $birth === '' || $privacy === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  exit('入力内容をご確認ください。');
}

$subject = '【工場JOB】無料相談のお申し込み';
$body = "無料相談のお申し込みがありました。\n\n"
      . "お名前：{$name}\nフリガナ：{$kana}\n電話番号：{$tel}\n生年月日：{$birth}\nメール：{$email}\n流入元：{$source}\n\n"
      . "相談内容：\n{$message}\n";

$headers = "From: " . FROM_EMAIL . "\n";
$headers .= "Reply-To: " . $email . "\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\n";

if (!mb_send_mail(ADMIN_EMAIL, $subject, $body, $headers)) {
  http_response_code(500);
  exit('送信に失敗しました。時間をおいてお試しください。');
}
header('Location: thanks.html');
exit;
