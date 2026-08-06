"use client";

import { useEffect, useState } from "react";

const LINE_URL = "https://lin.ee/xo4sCJy";

const lifeSupport = [
  ["宿泊・寮", "入寮までの住まい"],
  ["食事支援", "初任給までの食事相談"],
  ["交通費", "面接・赴任の移動支援"],
  ["携帯サポート", "携帯がなくても相談OK"],
];

const support = [
  { no: "01", title: "食事支援", text: "生活が不安な方へ、食料面の相談も可能です。", image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=900&q=84" },
  { no: "02", title: "携帯がなくてもOK", text: "必要な連絡をすぐに進められるよう相談できます。", image: "/support-phone.png" },
  { no: "03", title: "移動費用サポート", text: "面接や入社の際の交通費をサポートします。", image: "/support-travel.png" },
  { no: "04", title: "住む場所を用意", text: "家具家電付きなど、寮付きのお仕事を多数ご用意。", image: "/support-room.png" },
  { no: "05", title: "日払い・週払いOK", text: "急な出費も安心。対応求人をご案内できます。", image: "/support-pay.png" },
  { no: "06", title: "ずっと無料相談", text: "専任スタッフが仕事探しから入寮までサポート。", image: "/support-advisor.png" },
];

const jobs = [
  { area: "愛知県", title: "製造スタッフ", pay: "38", shift: "2交替制・土日休み", image: "/job-manufacturing.png" },
  { area: "大阪府", title: "組立・検査", pay: "34", shift: "日勤・土日休み", image: "/job-inspection.png" },
  { area: "福岡県", title: "機械オペレーター", pay: "40", shift: "3交替制・シフト制", image: "/job-operator.png" },
  { area: "神奈川県", title: "フォークリフト作業", pay: "36", shift: "日勤・土日休み", image: "/job-forklift.png" },
];

const steps = [
  ["01", "まずはLINE登録", "ボタンを押して友だち追加。相談は30秒で始められます。"],
  ["02", "専任スタッフに相談", "所持金・住まい・希望条件など、そのままお話しください。"],
  ["03", "求人をご紹介", "寮付き・未経験OKなど、条件に合う求人をご案内します。"],
  ["04", "面接・入寮準備", "面接日程や住まい、移動についても一緒に準備します。"],
  ["05", "お仕事スタート", "勤務開始後も、困ったことがあれば相談できます。"],
];

const faqs = [
  ["所持金がほとんどなくても大丈夫ですか？", "大丈夫です。生活支援や日払い・週払い対応の求人もあります。まずは今の状況をご相談ください。"],
  ["寮にはすぐ入れますか？", "求人や空室状況によりますが、最短即日で入寮相談が可能な案件があります。"],
  ["サービスの費用はかかりますか？", "ご相談からお仕事紹介まで完全無料です。"],
  ["未経験でも応募できますか？", "はい。未経験歓迎の製造・軽作業求人を多数ご用意しています。"],
  ["相談だけでも大丈夫ですか？", "もちろんです。無理な応募をお願いすることはありません。"],
];

function LineButton({ small = "24時間受付", label = "LINEで無料相談" }: { small?: string; label?: string }) {
  return <a className="lineButton" href={LINE_URL} target="_blank" rel="noopener noreferrer"><img className="lineIcon" src="/line-logo.png" alt="LINE" /><span className="lineButtonText"><small>＼ {small} ／</small><b>{label}</b></span><i>›</i></a>;
}

function SectionHead({ sub, children }: { sub: string; children: React.ReactNode }) {
  return <div className="sectionHead"><small>{sub}</small><h2>{children}</h2><i /></div>;
}

export default function Home() {
  const [showLinePopup, setShowLinePopup] = useState(false);
  const [linePopupDismissed, setLinePopupDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (!linePopupDismissed && scrollable > 0 && window.scrollY / scrollable >= 0.7) {
        setShowLinePopup(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [linePopupDismissed]);

  useEffect(() => {
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowLinePopup(false);
        setLinePopupDismissed(true);
      }
    };
    if (showLinePopup) window.addEventListener("keydown", closeWithEscape);
    return () => window.removeEventListener("keydown", closeWithEscape);
  }, [showLinePopup]);

  const closeLinePopup = () => {
    setShowLinePopup(false);
    setLinePopupDismissed(true);
  };

  return <main>
    <header className="siteHeader">
      <a className="brand" href="#top" aria-label="ページ上部へ">
        <span className="brandMark">N!</span>
        <span><small>仕事と住まいの相談窓口</small><strong>はたらくナビ <b>すぐワーク</b></strong></span>
      </a>
      <p>相談・紹介は<span>完全無料</span></p>
      <a className="headerLine" href={LINE_URL} target="_blank" rel="noopener noreferrer"><img src="/line-logo.png" alt="LINE" /><span><small>30秒で完了</small><b>LINEで相談</b></span></a>
    </header>

    <div className="lpShell">
      <aside className="pcSide pcLeft">
        <div className="sideSticky">
          <p className="sideCatch">仕事も、住まいも。<br /><b>最短ルートで解決。</b></p>
          <nav><a href="#dorm">寮について</a><a href="#jobs">求人情報</a><a href="#support">サポート</a><a href="#flow">入社までの流れ</a><a href="#faq">よくある質問</a></nav>
          <p className="sideMini">寮付き求人・未経験歓迎<br />全国のお仕事をご紹介</p>
        </div>
      </aside>

      <div className="mobileCanvas">
        <section className="hero" id="top">
          <img className="heroImage" src="/hero-reference-blue.png" alt="仕事探しを応援する若い日本人女性スタッフ" />
          <div className="heroShade" />
          <div className="heroOffer">
            <span>生活支援金</span>
            <strong>10<small>万円</small></strong>
            <b>もらえる!</b>
            <i>※支給条件あり・当社規定による</i>
          </div>
          <div className="guarantorRibbon"><strong>保証人不要!</strong></div>
          <div className="blackRibbon">携帯ブラックでも <strong>大丈夫!</strong></div>
          <div className="zeroRibbon">所持金 <strong>0</strong>円でも大丈夫!</div>
          <div className="heroCopy"><p>寮付き求人・生活サポート</p><h1>住まいも仕事も<br /><span>すぐ見つかる!</span></h1></div>
          <div className="heroTags"><span>最短即日</span><span>生活サポート</span><span>未経験OK</span></div>
        </section>

        <section className="quickCta"><p>お仕事紹介も生活サポートも<br /><b>すべてお任せください!</b></p><LineButton small="30秒で応募完了" /></section>

        <section className="lifeSection" id="support">
          <SectionHead sub="初任給までの生活を応援">生活まるごと<br /><span>サポート!</span></SectionHead>
          <div className="lifeGrid">{lifeSupport.map((s, i) => <article key={s[0]}><span>0{i + 1}</span><div><h3>{s[0]}</h3><p>{s[1]}</p></div></article>)}</div>
          <p className="boldMessage">お金がなくても、携帯がなくても。<br /><span>いま困っていることから相談OK!</span></p>
        </section>

        <section className="dormSection" id="dorm">
          <div className="angledTitle"><small>寮費の負担が少ない求人も</small><h2>家具・家電つき<br /><b>個室寮</b>をご紹介!</h2></div>
          <div className="dormPhoto"><img src="/support-room.png" alt="家具家電付きの個室寮" /><span>すぐに新生活!</span></div>
          <div className="dormPoints"><span>保証人<br /><b>相談OK</b></span><span>敷金・礼金<br /><b>0円案件あり</b></span><span>家具・家電<br /><b>つき</b></span></div>
          <p>仕事が決まるまでの住まいや、赴任後の寮についてもまとめて相談できます。</p>
        </section>

        <section className="jobsSection" id="jobs">
          <SectionHead sub="全国から厳選">寮付き・高収入の<br /><span>求人に特化</span></SectionHead>
          <div className="jobStats"><div><small>お仕事件数</small><strong>3,000<em>件以上</em></strong></div><div><small>採用率</small><strong>90<em>%以上</em></strong></div></div>
          <p className="jobsIntro">たとえば、こんなお仕事があります!</p>
          <div className="jobTypes"><span>クルマづくり</span><span>部品の組立</span><span>製品チェック</span><span>機械操作</span><span>食品づくり</span><span>仕分け・梱包</span></div>
          <h3 className="pickupTitle">人気求人をピックアップ</h3>
          <div className="jobList">{jobs.map(j => <article key={j.title}><img src={j.image} alt={j.title} /><div><span>{j.area}</span><h3>{j.title}</h3><p>月収例 <strong>{j.pay}</strong>万円以上</p><small>{j.shift}</small><b>寮付き求人</b></div></article>)}</div>
          <p className="note">※掲載内容は求人例です。募集状況や条件は時期・配属先により異なります。</p>
        </section>

        <section className="worrySection">
          <p className="worryEyebrow">こんな不安を抱えていませんか？</p>
          <ul><li>所持金が少なくなってしまった</li><li>携帯が止まり連絡が取りづらい</li><li>住む場所をすぐに見つけたい</li><li>未経験で面接が不安</li></ul>
          <div className="solveTitle"><small>そんな不安を</small><strong>今すぐ解決!</strong></div>
        </section>

        <section className="mangaSection">
          <SectionHead sub="マンガでわかる">仕事と住まいの<br /><span>相談サポート</span></SectionHead>
          <div className="mangaWrap"><img src="/manga.png" alt="仕事と住まいの相談から生活支援金の案内までを描いたマンガ" /></div>
        </section>

        <section className="detailSupport">
          <SectionHead sub="働く前も、働いた後も">あなたを支える<br /><span>6つの支援</span></SectionHead>
          <div className="supportList">{support.map(s => <article key={s.no}><img src={s.image} alt={s.title} /><div><small>SUPPORT {s.no}</small><h3>{s.title}</h3><p>{s.text}</p></div></article>)}</div>
        </section>

        <section className="trustSection">
          <p>はたらくナビ すぐワークは</p><h2>仕事も、住まいも。<br /><span>トータルサポート!</span></h2>
          <div><article><b>01</b><h3>最短で求人紹介</h3><p>希望を聞いたうえで、すぐに働ける求人をご案内。</p></article><article><b>02</b><h3>寮付き求人が豊富</h3><p>家具家電付きなど、すぐに生活できる求人も。</p></article><article><b>03</b><h3>完全無料で相談</h3><p>相談から仕事紹介まで費用はかかりません。</p></article></div>
        </section>

        <section className="middleCta"><p>仕事も、住む場所も。<br /><b>まとめて相談しよう!</b></p><LineButton small="30秒で応募完了" /></section>

        <section className="flowSection" id="flow">
          <SectionHead sub="カンタン5STEP">相談から入寮・<br /><span>お仕事開始まで</span></SectionHead>
          <ol>{steps.map(s => <li key={s[0]}><span>STEP<br /><b>{s[0]}</b></span><div><h3>{s[1]}</h3><p>{s[2]}</p></div></li>)}</ol>
        </section>

        <section className="faqSection" id="faq">
          <SectionHead sub="疑問をスッキリ解消">よくある<br /><span>ご質問</span></SectionHead>
          <div>{faqs.map((f, i) => <details key={f[0]} open={i === 0}><summary><b>Q</b>{f[0]}<i /></summary><p><b>A</b>{f[1]}</p></details>)}</div>
        </section>

        <section className="finalCta"><small>今日の相談が、明日のスタートになる。</small><h2>仕事も住まいも<br /><span>最短ルートで決めよう!</span></h2><LineButton small="30秒で応募完了" /><a href="tel:0926003558">電話で無料相談 <b>092-600-3558</b></a></section>

        <footer><div className="brand footerBrand"><span className="brandMark">N!</span><span><small>仕事と住まいの相談窓口</small><strong>はたらくナビ <b>すぐワーク</b></strong></span></div><p><b>所在地</b><br />〒810-0001<br />福岡県福岡市中央区天神4丁目9-10<br />第二正友ビル4階</p><p><b>電話番号</b><br /><a href="tel:0926003558">092-600-3558</a></p><small>© はたらくナビすぐワーク All Rights Reserved.</small></footer>
      </div>

      <aside className="pcSide pcRight">
        <div className="sideSticky">
          <div className="sideOffer"><small>今だけの生活支援金</small><strong>10<em>万円</em></strong><b>もらえる!</b><i>※支給条件あり</i></div>
          <p>住まいも仕事も、<br /><b>いま一緒に探せます。</b></p>
          <LineButton small="30秒で応募完了" />
          <a className="sidePhone" href="tel:0926003558"><small>電話で無料相談</small><b>092-600-3558</b></a>
        </div>
      </aside>
    </div>

    <div className="mobileFixed"><a href="tel:0926003558"><small>電話で</small>相談する</a><a href={LINE_URL} target="_blank" rel="noopener noreferrer"><img src="/line-logo.png" alt="LINE" /><span><small>＼ 30秒で応募完了 ／</small><b>LINEで無料相談</b></span></a></div>

    {showLinePopup && <div className="linePopupBackdrop" role="presentation" onClick={closeLinePopup}>
      <div className="linePopup" role="dialog" aria-modal="true" aria-labelledby="line-popup-title" onClick={(event) => event.stopPropagation()}>
        <button className="linePopupClose" type="button" aria-label="閉じる" onClick={closeLinePopup}>×</button>
        <img src="/line-logo.png" alt="LINE" />
        <small>＼ 相談・求人紹介は完全無料 ／</small>
        <h2 id="line-popup-title">今の悩みを<br /><span>LINEで相談しませんか？</span></h2>
        <p>所持金・携帯・住まいのことも<br />そのままご相談ください。</p>
        <a href={LINE_URL} target="_blank" rel="noopener noreferrer">LINEで問い合わせる <b>›</b></a>
      </div>
    </div>}
  </main>;
}
