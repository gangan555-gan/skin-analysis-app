import React from 'react';

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-800">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
                <h1 className="text-3xl font-bold text-blue-900 mb-8 border-b pb-4">利用規約</h1>

                <div className="space-y-6">
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">1. 本サービスについて</h2>
                        <p className="text-gray-600 leading-relaxed">
                            「LUMIÈRE SKIN AI」（以下、本アプリ）は、AI技術を用いてユーザーの肌状態を分析し、一般的なスキンケアアドバイスを提供するサービスです。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">2. 医療アドバイスではありません</h2>
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-2">
                            <p className="text-yellow-800 font-bold">
                                重要: 本アプリによる診断結果は医療行為ではありません。
                            </p>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            本アプリが提供する情報は、一般的な美容情報であり、医師による診断、治療、助言に代わるものではありません。
                            肌のトラブルや疾患に関する懸念がある場合は、必ず専門の医療機関を受診してください。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">3. AIの精度について</h2>
                        <p className="text-gray-600 leading-relaxed">
                            本アプリの回答はAI（人工知能）によって生成されています。
                            最新の技術を使用していますが、その正確性、完全性、有用性を保証するものではありません。
                            光の当たり具合や画像の質によって、分析結果が変動する可能性があります。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">4. 禁止事項</h2>
                        <p className="text-gray-600 leading-relaxed">
                            ユーザーは、本アプリの利用にあたり、以下の行為を行ってはなりません。
                        </p>
                        <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
                            <li>法令または公序良俗に違反する行為</li>
                            <li>他人の肖像権やプライバシーを侵害する画像をアップロードする行為</li>
                            <li>本アプリのサーバーに過度な負担をかける行為</li>
                            <li>リバースエンジニアリング等の解析行為</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">5. 免責事項</h2>
                        <p className="text-gray-600 leading-relaxed">
                            運営者は、本アプリの利用によりユーザーに生じた損害について、一切の責任を負わないものとします。
                            本アプリは予告なくサービスの内容を変更、停止、または終了することがあります。
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
