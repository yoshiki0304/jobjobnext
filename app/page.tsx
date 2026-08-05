const support = [
  { no: "01", title: "住まいのサポート", lead: "寮付き求人を多数ご用意", text: "すぐに新生活を始めたい方へ、個室寮や家具・家電付きなど、希望に合わせてご案内します。", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=82" },
  { no: "02", title: "赴任のサポート", lead: "全国のお仕事へスムーズに", text: "赴任交通費が支給される求人もあります。移動手段や入寮日についても担当者が一緒に確認します。", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=82" },
  { no: "03", title: "生活のサポート", lead: "働き始めるまでの不安を相談", text: "所持金や当面の生活に不安がある場合も、まずは現在の状況をそのままお聞かせください。", image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1000&q=82" },
  { no: "04", title: "仕事探しのサポート", lead: "未経験から始められる求人も", text: "製造・工場を中心に、経験を問わない求人をご案内。給与、休日、勤務地の希望も伺います。", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1000&q=82" },
  { no: "05", title: "入社後のサポート", lead: "新しい職場でも安心", text: "入社・入寮して終わりではありません。新しい生活が落ち着くまで継続してフォローします。", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=82" },
];

const jobs = [
  { area: "福岡・愛知ほか", title: "自動車部品の組立・検査", pay: "36", tags: ["寮費無料", "未経験OK", "土日休み"], image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=900&q=82" },
  { area: "熊本・大分ほか", title: "半導体製品の製造補助", pay: "32", tags: ["即入寮相談", "交通費支給", "研修あり"], image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=82" },
  { area: "全国各地", title: "食品工場の製造スタッフ", pay: "29", tags: ["男女活躍中", "日払い相談", "履歴書不要"], image: "https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&w=900&q=82" },
];

const Headline = ({ en, children }: { en: string; children: React.ReactNode }) => <div className="headline"><p>{en}</p><h2>{children}</h2><span /></div>;

export default function Home() {
  return <main>
    <div className="topBar"><span>寮付き求人・住まいの相談なら</span><a href="tel:0926003558">TEL. 092-600-3558</a></div>
    <header>
      <a className="logo" href="#top"><span className="logoSymbol"><i /><i /><i /></span><span><small>仕事と住まいの相談窓口</small><b>はたらくナビ<span>すぐワーク</span></b></span></a>
      <nav><a href="#service">サポート内容</a><a href="#jobs">求人情報</a><a href="#voice">利用者の声</a><a href="#flow">ご利用の流れ</a><a href="#faq">よくある質問</a></nav>
      <a className="headerCta" href="#contact"><small>30秒で完了</small><b>無料相談する</b></a>
    </header>

    <section className="hero" id="top">
      <div className="heroVisual"><img src="/hero-japanese-workers.png" alt="工場で働く日本人の男女スタッフ" /><div className="heroShape" /></div>
      <div className="heroContent">
        <p className="heroCatch"><span>仕事</span>も<span>住まい</span>も、<br />ひとつの窓口で。</p>
        <h1>今日から変わる。<br /><strong>ここから始める。</strong></h1>
        <p className="heroText">所持金や経歴に不安があっても大丈夫。<br />仕事探しから入寮まで、専任スタッフが支えます。</p>
        <div className="heroPoints"><div><b>最短</b><strong>即日</strong><span>面談対応</span></div><div><b>全国</b><strong>寮付き</strong><span>求人に対応</span></div><div><b>相談・紹介</b><strong>0円</strong><span>完全無料</span></div></div>
        <a className="primaryCta" href="#contact"><small>＼ かんたん30秒 ／</small><b>仕事と住まいを無料で相談</b><i>→</i></a>
        <p className="fine">※求人・寮の状況や選考結果により、ご希望に沿えない場合があります。</p>
      </div>
      <div className="heroRibbon"><span>未経験OK</span><span>履歴書不要の求人あり</span><span>赴任交通費支給の求人あり</span><span>個室寮の求人あり</span></div>
    </section>

    <section className="intro">
      <p className="introEn">YOUR NEW START</p>
      <h2>「働きたい」を止めている不安、<br /><em>私たちに聞かせてください。</em></h2>
      <p>仕事がない、住む場所がない、移動するお金が心配。<br className="pc" />いま何も決まっていなくても、相談するところから始められます。</p>
      <div className="troubleList"><article><span>01</span><i className="iconWallet" /><b>所持金が不安</b><p>生活面も相談可能</p></article><article><span>02</span><i className="iconHome" /><b>住む場所がない</b><p>寮付き求人をご紹介</p></article><article><span>03</span><i className="iconRoute" /><b>移動手段がない</b><p>赴任交通費支給求人あり</p></article><article><span>04</span><i className="iconWork" /><b>経験に自信がない</b><p>未経験歓迎求人が多数</p></article></div>
    </section>

    <section className="promise">
      <div className="promisePhoto"><img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1300&q=82" alt="相談をするスタッフのイメージ" /></div>
      <div className="promisePanel"><p className="miniEn">OUR PROMISE</p><h2>新しいスタートに、<br />3つの安心を。</h2><ol><li><b>01</b><div><h3>返事が早い</h3><p>お問い合わせ後、担当者がスピーディーにご連絡します。</p></div></li><li><b>02</b><div><h3>提案が具体的</h3><p>今の状況と希望を伺い、応募できる求人をご案内します。</p></div></li><li><b>03</b><div><h3>入社後も支援</h3><p>新しい生活が落ち着くまで、継続してフォローします。</p></div></li></ol></div>
    </section>

    <section className="service" id="service">
      <Headline en="OUR SUPPORT">仕事を始めるまでの<br /><em>5つのサポート</em></Headline>
      <p className="sectionIntro">一人ひとり違う不安に合わせて、必要なことを一緒に整理します。</p>
      <div className="supportList">{support.map((s,i)=><article className={i%2?"even":""} key={s.no}><div className="supportImage"><img src={s.image} alt="" /><span>{s.no}</span></div><div className="supportText"><small>SUPPORT {s.no}</small><h3>{s.title}</h3><b>{s.lead}</b><p>{s.text}</p></div></article>)}</div>
    </section>

    <section className="jobs" id="jobs"><div className="jobsInner"><Headline en="JOB INFORMATION">ご紹介できる<br /><em>寮付き求人の一例</em></Headline><p className="sectionIntro">製造・工場を中心に、全国のお仕事をご案内しています。</p><div className="jobGrid">{jobs.map(j=><article key={j.title}><div className="jobPhoto"><img src={j.image} alt="" /><span>{j.area}</span></div><div className="jobBody"><h3>{j.title}</h3><p className="salary">月収例 <b>{j.pay}</b>万円</p><ul>{j.tags.map(t=><li key={t}>{t}</li>)}</ul><a href="#contact">この求人について相談する <i>→</i></a></div></article>)}</div><p className="caption">※掲載内容は求人例です。募集状況や条件は時期・配属先により異なります。</p></div></section>

    <section className="ctaBand" id="contact"><div><p>相談・紹介はすべて無料</p><h2>仕事と住まいの悩み、<br />一人で抱えなくて大丈夫です。</h2><div className="ctaChoices"><a href="tel:0926003558"><small>お電話で相談</small><b>092-600-3558</b><span>受付 9:00〜18:00</span></a><a href="#top"><small>かんたん30秒</small><b>無料相談はこちら</b><i>→</i></a></div></div><img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1000&q=82" alt="相談のイメージ" /></section>

    <section className="voice" id="voice"><Headline en="USER VOICE">利用した方の声</Headline><div className="voiceGrid"><article><div className="voiceProfile"><span>20<small>代</small></span><p>福岡県・男性<br />前職：アルバイト</p></div><div><b>応募からすぐに仕事が決まりました</b><p>手持ちが少なく不安でしたが、担当の方が入寮までの流れを丁寧に説明してくれました。新しい土地でも安心してスタートできました。</p></div></article><article><div className="voiceProfile"><span>30<small>代</small></span><p>熊本県・女性<br />前職：飲食業</p></div><div><b>希望に近い働き方を提案してもらえた</b><p>寮費と休日を重視して相談。複数の求人を比較しながら決められたので、納得して働き始めることができました。</p></div></article></div><p className="caption">※個人の感想をもとにしたイメージです。結果を保証するものではありません。</p></section>

    <section className="dorm"><div className="dormGallery"><img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1100&q=82" alt="ワンルームの寮イメージ" /><img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=82" alt="家具付きの部屋イメージ" /></div><div className="dormContent"><p className="miniEn">DORMITORY</p><h2>仕事と一緒に、<br /><em>新しい暮らしも。</em></h2><p>個室寮、家具・家電付き、寮費無料など、求人ごとにさまざまな寮があります。現在地からの赴任についてもご相談ください。</p><ul><li>個室寮の求人あり</li><li>家具・家電付き求人あり</li><li>赴任交通費支給求人あり</li></ul><small>※物件設備・費用・入寮日は求人により異なります。</small></div></section>

    <section className="flow" id="flow"><Headline en="HOW TO START">お仕事開始までの流れ</Headline><div className="flowSteps">{[["01","無料相談","今の状況とご希望をお聞かせください。"],["02","求人をご提案","条件に合う求人と寮をご案内します。"],["03","面接・選考","日程調整や面接準備も支援します。"],["04","入社・入寮","流れを確認して新生活をスタート。"]].map(f=><article key={f[0]}><span>STEP <b>{f[0]}</b></span><div className="stepIcon" /><h3>{f[1]}</h3><p>{f[2]}</p></article>)}</div></section>

    <section className="faq" id="faq"><div className="faqHead"><p className="miniEn">FAQ</p><h2>よくあるご質問</h2><p>不安なことは、相談時にそのままお聞かせください。</p></div><div className="faqList"><details><summary>相談や求人紹介に費用はかかりますか？</summary><p>いいえ。求人のご紹介や相談に費用はかかりません。</p></details><details><summary>所持金が少なくても相談できますか？</summary><p>ご相談いただけます。現在の状況を伺い、利用できる支援を確認します。</p></details><details><summary>すぐに寮へ入れますか？</summary><p>空室や選考状況により異なります。最短で案内できる求人をお探しします。</p></details><details><summary>未経験でも応募できますか？</summary><p>未経験歓迎の製造・工場求人を多数扱っています。</p></details></div></section>

    <section className="final"><p>一人で悩む前に、まずはご相談ください。</p><h2>あなたの再スタートを、<br />今日から一緒に。</h2><a href="tel:0926003558"><small>無料電話相談</small><b>092-600-3558</b><i>→</i></a></section>
    <footer><div className="logo footerLogo"><span className="logoSymbol"><i /><i /><i /></span><span><small>仕事と住まいの相談窓口</small><b>はたらくナビ<span>すぐワーク</span></b></span></div><div className="company"><p><b>所在地</b>〒810-0001<br />福岡県福岡市中央区天神4丁目9-10<br />第二正友ビル4階</p><p><b>電話番号</b><a href="tel:0926003558">092-600-3558</a></p></div><small className="copy">© はたらくナビすぐワーク All Rights Reserved.</small></footer>
    <div className="spFixed"><a href="tel:0926003558">電話で相談</a><a href="#contact">無料相談する</a></div>
  </main>
}
