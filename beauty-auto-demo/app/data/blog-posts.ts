export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  content: string;
  imageUrl?: string;
}

export const BLOG_POSTS: Record<string, BlogPost> = {
  'glass-heart-diagnosis': {
    slug: 'glass-heart-diagnosis',
    title: '【外部刺激脆弱型敏感肌】ガラスのハートちゃん診断！ AIが教える敏感肌向けパーソナルケア',
    excerpt: '「ちょっとした刺激で赤くなる…」それはガラスのハート肌かも？AI診断で自分の肌タイプを知り、最適なケアを見つけましょう。',
    date: '2024-11-21',
    imageUrl: '/images/characters/glass_heart.png',
    content: `
      <h2>あなたの肌は「ガラスのハート」タイプかも？</h2>
      <p>季節の変わり目や、新しいコスメを使った時に肌がピリピリすることはありませんか？それは、バリア機能が低下した「外部刺激脆弱型敏感肌（ガラスのハート）」のサインかもしれません。</p>
      
      <h3>ガラスのハート肌の特徴</h3>
      <ul>
        <li>環境の変化に弱い</li>
        <li>乾燥しやすい</li>
        <li>赤みが出やすい</li>
      </ul>

      <h3>AI診断で正確な肌タイプをチェック</h3>
      <p>LUMIÈRE AI SKIN REPORTでは、最新のAI技術を使ってあなたの肌状態を分析します。たった3秒で、水分・油分のバランスから、あなたにぴったりの「スキンキャラクター」を判定します。</p>

      <div class="bg-blue-50 p-6 rounded-xl my-8 text-center">
        <p class="font-bold text-blue-900 mb-4">あなたの肌キャラクターは何？</p>
        <a href="/" class="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors">
          今すぐ無料で診断する
        </a>
      </div>

      <h3>敏感肌におすすめのケア</h3>
      <p>敏感肌の方は、まずは「守りのケア」が大切。セラミドやヒアルロン酸など、保湿成分がたっぷり入ったアイテムを選びましょう。</p>
    `
  },
  'desert-princess-diagnosis': {
    slug: 'desert-princess-diagnosis',
    title: '【水分不足型乾燥肌】砂漠のプリンセスタイプ必見！ 潤いを逃さない鉄壁保湿術',
    excerpt: 'カサつきや粉吹きが気になるあなたは「砂漠のプリンセス」かも。砂漠のような乾燥から肌を守る、オアシス保湿ケアとは？',
    date: '2024-11-22',
    imageUrl: '/images/characters/desert_princess.png',
    content: `
      <h2>あなたの肌は「砂漠のプリンセス」タイプ？</h2>
      <p>夕方になると肌がつっぱる、メイクのノリが悪い…。そんな悩みを持つあなたは、水分保持力が低下した「水分不足型乾燥肌（砂漠のプリンセス）」の可能性があります。</p>
      
      <h3>砂漠のプリンセス肌の特徴</h3>
      <ul>
        <li>肌のキメが乱れやすい</li>
        <li>洗顔後にすぐつっぱる</li>
        <li>小ジワが目立ちやすい</li>
      </ul>

      <h3>AI診断で水分量をチェック</h3>
      <p>自分の肌がどれくらい乾燥しているか、感覚だけで判断していませんか？AI診断なら、画像から肌の水分感やハリを客観的に分析できます。</p>

      <div class="bg-blue-50 p-6 rounded-xl my-8 text-center">
        <p class="font-bold text-blue-900 mb-4">あなたの肌キャラクターは何？</p>
        <a href="/" class="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors">
          今すぐ無料で診断する
        </a>
      </div>

      <h3>乾燥肌におすすめのケア</h3>
      <p>水分を与えるだけでなく、「油分で蓋をする」ことが重要です。化粧水の後は、こっくりとしたクリームやオイルでしっかり潤いを閉じ込めましょう。</p>
    `
  },
  'tsuya-dragon-diagnosis': {
    slug: 'tsuya-dragon-diagnosis',
    title: '【皮脂過剰型脂性肌】ツヤツヤドラゴンタイプ！ テカリを味方につけるバランスケア',
    excerpt: 'Tゾーンのテカリや毛穴の開きが悩み…。エネルギー溢れる「ツヤツヤドラゴン」タイプのための、さっぱり＆しっかり保湿ケア。',
    date: '2024-11-23',
    imageUrl: '/images/characters/tsuya_dragon.png',
    content: `
      <h2>あなたの肌は「ツヤツヤドラゴン」タイプ？</h2>
      <p>朝起きると顔がベタついている、あぶらとり紙が手放せない。そんなあなたは、皮脂分泌が活発な「皮脂過剰型脂性肌（ツヤツヤドラゴン）」かもしれません。</p>
      
      <h3>ツヤツヤドラゴン肌の特徴</h3>
      <ul>
        <li>毛穴が開きやすい</li>
        <li>ニキビができやすい</li>
        <li>肌に厚みがあり、弾力がある</li>
      </ul>

      <h3>AI診断で皮脂バランスをチェック</h3>
      <p>脂性肌だと思っていても、実は乾燥からくる過剰皮脂（インナードライ）の可能性も。AI診断で本当の肌状態を見極めましょう。</p>

      <div class="bg-blue-50 p-6 rounded-xl my-8 text-center">
        <p class="font-bold text-blue-900 mb-4">あなたの肌キャラクターは何？</p>
        <a href="/" class="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors">
          今すぐ無料で診断する
        </a>
      </div>

      <h3>脂性肌におすすめのケア</h3>
      <p>皮脂を取りすぎるのはNG。洗顔は優しく行い、ビタミンC誘導体配合の化粧水などで皮脂バランスを整えるケアがおすすめです。</p>
    `
  },
  'genius-puzzle-diagnosis': {
    slug: 'genius-puzzle-diagnosis',
    title: '【バリア機能低下型混合肌】天才パズルタイプ！ 部位ごとの使い分けが鍵となる戦略的ケア',
    excerpt: 'Tゾーンはテカるのに頬はカサつく…。複雑な「天才パズル」肌を攻略するには？部位別ケアで理想のバランス肌へ。',
    date: '2024-11-23',
    imageUrl: '/images/characters/genius_puzzle.png',
    content: `
      <h2>あなたの肌は「天才パズル」タイプ？</h2>
      <p>おでこはベタベタするのに、口周りは粉を吹く。そんな矛盾した肌悩みを持つあなたは、部位によって性質が異なる「バリア機能低下型混合肌（天才パズル）」です。</p>
      
      <h3>天才パズル肌の特徴</h3>
      <ul>
        <li>Tゾーン（額・鼻）は脂っぽい</li>
        <li>Uゾーン（頬・顎）は乾燥する</li>
        <li>季節や体調で肌質が変わりやすい</li>
      </ul>

      <h3>AI診断で部位別状態をチェック</h3>
      <p>混合肌のケアは難しいと思われがちですが、AI診断なら顔全体のバランスを一目で把握できます。</p>

      <div class="bg-blue-50 p-6 rounded-xl my-8 text-center">
        <p class="font-bold text-blue-900 mb-4">あなたの肌キャラクターは何？</p>
        <a href="/" class="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors">
          今すぐ無料で診断する
        </a>
      </div>

      <h3>混合肌におすすめのケア</h3>
      <p>「パズル」のようにケアを組み合わせましょう。全体には保湿力の高い化粧水を使い、乾燥する部分にはクリームを重ね付け、テカる部分は乳液を薄めにするなど、調整が必要です。</p>
    `
  },
  'ai-skin-tech': {
    slug: 'ai-skin-tech',
    title: 'AI肌診断の仕組みとは？写真からコスメ成分と相性を解析する技術',
    excerpt: 'LUMIÈRE AI SKIN REPORTの裏側にある技術を解説。画像解析と成分データベースを組み合わせた、科学的なアプローチとは。',
    date: '2024-11-20',
    content: `
      <h2>AIが肌を見る仕組み</h2>
      <p>LUMIÈRE AI SKIN REPORTは、最新のAIモデルを活用しています。アップロードされた顔写真をピクセルレベルで解析し、キメの細かさ、毛穴の状態、水分量などを推定します。</p>

      <h3>成分解析のロジック</h3>
      <p>単に肌を見るだけではありません。お使いのコスメの成分表（画像）を読み取り、その成分があなたの現在の肌状態に合っているかを判定します。</p>
      
      <ul>
        <li><strong>成分データベース照合:</strong> 数万種類の化粧品成分データと照合</li>
        <li><strong>相性マッチング:</strong> 肌質データと成分の特性をクロス分析</li>
      </ul>

      <h3>科学的根拠に基づくアドバイス</h3>
      <p>「なんとなく良さそう」ではなく、データに基づいた客観的なアドバイスを提供することで、スキンケアの迷子からあなたを救います。</p>

      <div class="bg-gray-100 p-6 rounded-xl my-8">
        <h4 class="font-bold mb-2">技術の信頼性について</h4>
        <p class="text-sm text-gray-600">本サービスはAIによる分析結果を提供するものであり、医療診断ではありませんが、皮膚科学の一般的な知見に基づいたアルゴリズムを採用しています。</p>
      </div>
    `
  }
};

export const getBlogPost = (slug: string): BlogPost | undefined => {
  return BLOG_POSTS[slug];
};

export const getAllPosts = (): BlogPost[] => {
  return Object.values(BLOG_POSTS);
};
