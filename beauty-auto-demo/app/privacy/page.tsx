import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-800">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
                <h1 className="text-3xl font-bold text-blue-900 mb-8 border-b pb-4">プライバシーポリシー</h1>

                <div className="space-y-6">
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">1. 個人情報の収集と利用</h2>
                        <p className="text-gray-600 leading-relaxed">
                            当アプリ「LUMIÈRE SKIN AI」は、ユーザーがアップロードした顔写真データを、AIによる肌診断の目的のみに使用します。
                            アップロードされた画像データは一時的に解析のために使用されますが、サーバーに恒久的に保存されることはありません。
                            診断プロセスが完了した後、データは適切に破棄されます。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">2. 広告配信について</h2>
                        <p className="text-gray-600 leading-relaxed">
                            当アプリは、Google AdSenseなどの第三者配信事業者による広告サービスを利用しています。
                            これらの事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、当サイトや他サイトへのアクセスに関する情報「Cookie」（氏名、住所、メール アドレス、電話番号は含まれません）を使用することがあります。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">3. Amazonアソシエイトについて</h2>
                        <p className="text-gray-600 leading-relaxed">
                            当アプリは、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">4. アクセス解析ツールについて</h2>
                        <p className="text-gray-600 leading-relaxed">
                            当アプリでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
                            このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。
                            このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">5. 免責事項</h2>
                        <p className="text-gray-600 leading-relaxed">
                            当アプリの診断結果は、AI技術を用いた推定であり、医師による診断に代わるものではありません。
                            診断結果に基づいて生じた損害等について、当方は一切の責任を負いかねます。
                        </p>
                    </section>

                    <div className="mt-8 pt-6 border-t">
                        <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">
                            ← トップページに戻る
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
