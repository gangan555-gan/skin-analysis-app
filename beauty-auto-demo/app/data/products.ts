export interface Product {
    name: string;
    feature: string;
    category: string;
}

export const PRODUCT_CATALOG: Record<string, Product> = {
    // 保湿・バリア強化
    "P01": { name: "【LUMIÈRE】セラミドディープローション", feature: "ヒト型セラミド高配合でバリア機能を徹底強化", category: "保湿・バリア強化" },
    "P02": { name: "【AquaRich】モイスチャーリペアクリーム", feature: "3種のヒアルロン酸が長時間うるおいをキープ", category: "保湿・バリア強化" },
    "P03": { name: "【Sensitive】マイルドバリア乳液", feature: "敏感肌専用処方で優しく肌を守る", category: "保湿・バリア強化" },
    "P04": { name: "【Booster】導入ハイドレーター", feature: "化粧水の浸透を助けるブースター美容液", category: "保湿・バリア強化" },
    "P05": { name: "【InnerCare】セラミドプラスサプリ", feature: "内側から潤いをサポートする飲むスキンケア", category: "保湿・バリア強化" },
    "P06": { name: "【Mist】温泉水マイクロミスト", feature: "メイクの上からでも使える24時間保湿ミスト", category: "保湿・バリア強化" },
    "P07": { name: "【Rescue】CICAインテンスマスク", feature: "乾燥による肌荒れを集中鎮静ケア", category: "保湿・バリア強化" },
    "P08": { name: "【Balm】高精製ワセリンバーム", feature: "外部刺激から肌を守る強力な保護膜", category: "保湿・バリア強化" },
    "P09": { name: "【Oil】スクワランピュアオイル", feature: "天然由来100%でベタつかずに保湿", category: "保湿・バリア強化" },
    "P10": { name: "【Wash】アミノモイスト洗顔フォーム", feature: "洗い上がりしっとり、つっぱらない", category: "保湿・バリア強化" },

    // 美白・くすみ対策
    "P11": { name: "【Bright】ビタミンC25セラム", feature: "高濃度ピュアビタミンCが毛穴とくすみにアプローチ", category: "美白・くすみ対策" },
    "P12": { name: "【White】トラネキサム酸ローション", feature: "メラニンの生成を抑え、シミ・そばかすを防ぐ", category: "美白・くすみ対策" },
    "P13": { name: "【Spot】ハイドロキノンナイトクリーム", feature: "気になるスポットを寝ている間に集中ケア", category: "美白・くすみ対策" },
    "P14": { name: "【Mask】透明感アップマスク", feature: "即効ブライトニングで輝くような肌へ", category: "美白・くすみ対策" },
    "P15": { name: "【UV】UVプロテクトスプレー", feature: "SPF50+ PA++++で強力に紫外線をカット", category: "美白・くすみ対策" },
    "P16": { name: "【Supplement】ホワイトニングサプリ", feature: "内側から輝く透明感をサポート", category: "美白・くすみ対策" },
    "P17": { name: "【Clear】クレイウォッシュ", feature: "くすみの原因となる古い角質を吸着除去", category: "美白・くすみ対策" },
    "P18": { name: "【Cover】薬用コンシーラー", feature: "シミを隠しながら美白ケア", category: "美白・くすみ対策" },
    "P19": { name: "【Essence】アルブチンホワイトエッセンス", feature: "植物由来成分で優しく美白ケア", category: "美白・くすみ対策" },
    "P20": { name: "【Device】LED美顔器ホワイトモード", feature: "光フォトケアで肌のトーンアップを目指す", category: "美白・くすみ対策" },

    // ニキビ・皮脂対策
    "P21": { name: "【TeaTree】薬用コントロールローション", feature: "ティーツリー配合で殺菌・抗炎症", category: "ニキビ・皮脂対策" },
    "P22": { name: "【Peel】AHAマイルドピーリング", feature: "古い角質を除去し、毛穴詰まりを解消", category: "ニキビ・皮脂対策" },
    "P23": { name: "【Clay】死海泥ミネラルパック", feature: "余分な皮脂を強力吸着し、テカリを防止", category: "ニキビ・皮脂対策" },
    "P24": { name: "【Powder】オイルブロックパウダー", feature: "日中のテカリを抑え、サラサラ肌をキープ", category: "ニキビ・皮脂対策" },
    "P25": { name: "【Base】ノンコメドファンデーション", feature: "肌呼吸を妨げず、ニキビになりにくい処方", category: "ニキビ・皮脂対策" },
    "P26": { name: "【Patch】ナイトケアニキビパッチ", feature: "寝ている間にニキビを集中ケア＆保護", category: "ニキビ・皮脂対策" },
    "P27": { name: "【Soap】サリチル酸薬用ソープ", feature: "アクネ菌を殺菌し、ニキビを予防", category: "ニキビ・皮脂対策" },
    "P28": { name: "【Vitamin】ビタミンBミックス", feature: "皮脂バランスを整え、肌荒れを防ぐ", category: "ニキビ・皮脂対策" },
    "P29": { name: "【Milk】オイルフリーモイスチャライザー", feature: "油分ゼロでさっぱり保湿", category: "ニキビ・皮脂対策" },
    "P30": { name: "【Calm】CICAスージングジェル", feature: "ニキビ跡や赤みを鎮静ケア", category: "ニキビ・皮脂対策" },

    // エイジングケア・ハリ
    "P31": { name: "【Retinol】レチノールナイトリペア", feature: "シワ改善とハリ弾力アップに効果的", category: "エイジングケア・ハリ" },
    "P32": { name: "【Drink】高吸収コラーゲン10000", feature: "内側から弾むようなハリを与える", category: "エイジングケア・ハリ" },
    "P33": { name: "【StemCell】ヒト幹細胞培養液セラム", feature: "細胞レベルで肌の再生をサポート", category: "エイジングケア・ハリ" },
    "P34": { name: "【Eye】マイクロニードルアイパッチ", feature: "ヒアルロン酸針で目元に直接注入", category: "エイジングケア・ハリ" },
    "P35": { name: "【Cream】リンクルショットクリーム", feature: "深いシワにアプローチする集中クリーム", category: "エイジングケア・ハリ" },
    "P36": { name: "【EMS】リフトアップ美顔器", feature: "表情筋を鍛えてリフトアップ", category: "エイジングケア・ハリ" },
    "P37": { name: "【Bakuchiol】次世代レチノールオイル", feature: "低刺激で敏感肌でも使えるエイジングケア", category: "エイジングケア・ハリ" },
    "P38": { name: "【Placenta】生プラセンタ原液", feature: "濃厚な栄養で肌に活力を与える", category: "エイジングケア・ハリ" },
    "P39": { name: "【EGF】EGFリペアエッセンス", feature: "ターンオーバーを促進し、若々しい肌へ", category: "エイジングケア・ハリ" },
    "P40": { name: "【Q10】還元型コエンザイムQ10", feature: "抗酸化作用で老化サインにアプローチ", category: "エイジングケア・ハリ" },

    // 毛穴・インナーケア
    "P41": { name: "【Enzyme】酵素パウダーウォッシュ", feature: "毛穴の黒ずみや角栓を分解除去", category: "毛穴・インナーケア" },
    "P42": { name: "【Hot】温感クレンジングゲル", feature: "温感効果で毛穴を開いて汚れを落とす", category: "毛穴・インナーケア" },
    "P43": { name: "【Suction】毛穴吸引スポットクリーナー", feature: "頑固な角栓を吸引して除去", category: "毛穴・インナーケア" },
    "P44": { name: "【VitaminE】天然ビタミンEサプリ", feature: "血行を促進し、くすみのない肌へ", category: "毛穴・インナーケア" },
    "P45": { name: "【Mud】モロッコ溶岩クレイマスク", feature: "ミネラル豊富な泥が汚れを吸着", category: "毛穴・インナーケア" },
    "P46": { name: "【Soda】高濃度炭酸パック", feature: "炭酸効果で肌の代謝をアップ", category: "毛穴・インナーケア" },
    "P47": { name: "【NMN】NMNプレミアムサプリ", feature: "話題の若返り成分で全身ケア", category: "毛穴・インナーケア" },
    "P48": { name: "【Protein】ビューティーソイプロテイン", feature: "髪や肌の材料となるタンパク質を補給", category: "毛穴・インナーケア" },
    "P49": { name: "【Sleep】グリシン睡眠サポート", feature: "良質な睡眠で成長ホルモンの分泌を促す", category: "毛穴・インナーケア" },
    "P50": { name: "【Brush】毛穴消しメイクブラシ", feature: "毛穴をカバーして陶器肌に仕上げる", category: "毛穴・インナーケア" },
};
