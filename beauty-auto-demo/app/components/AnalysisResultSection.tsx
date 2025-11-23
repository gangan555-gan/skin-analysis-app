'use client';

import React from 'react';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from 'recharts';
import { PRODUCT_CATALOG } from '../data/products';
import { AnalysisResult } from '../types';
import { getCharacterImage } from '../utils';

interface AnalysisResultSectionProps {
    analysisResult: AnalysisResult;
    onShare: () => void;
    reportRef: React.RefObject<HTMLDivElement | null>;
    pdfReportRef: React.RefObject<HTMLDivElement | null>;
    isPro: boolean;
    onSaveHistory: () => void;
    history: any[];
    onLoadHistory: () => void;
}

export default function AnalysisResultSection({
    analysisResult,
    onShare,
    reportRef,
    pdfReportRef,
    isPro,
    onSaveHistory,
    history,
    onLoadHistory,
}: AnalysisResultSectionProps) {
    const [activeTab, setActiveTab] = React.useState<'result' | 'history'>('result');

    // Transform scores for Recharts
    const chartData = [
        { subject: '水分', A: analysisResult.scores.水分, fullMark: 5 },
        { subject: '弾力', A: analysisResult.scores.弾力, fullMark: 5 },
        { subject: '透明感', A: analysisResult.scores.透明感, fullMark: 5 },
        { subject: 'キメ', A: analysisResult.scores.キメ, fullMark: 5 },
        { subject: '抵抗力', A: analysisResult.scores.抵抗力, fullMark: 5 },
    ];

    const formatSkinType = (name: string) => {
        if (name.includes('型')) {
            const parts = name.split('型');
            if (parts.length >= 2 && parts[1].trim().length > 0) {
                return (
                    <>
                        <span className="block">{parts[0]}型</span>
                        <span className="block">{parts[1]}</span>
                    </>
                );
            }
        }
        return name;
    };

    return (
        <div className="animate-fade-in-up pt-4 border-t border-blue-100">
            {/* Tabs */}
            <div className="flex justify-center space-x-4 mb-8">
                <button
                    onClick={() => setActiveTab('result')}
                    className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'result'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
                        }`}
                >
                    診断結果
                </button>
                <button
                    onClick={() => {
                        if (!isPro) {
                            alert('この機能はProプラン限定です');
                            return;
                        }
                        setActiveTab('history');
                        onLoadHistory();
                    }}
                    className={`px-6 py-2 rounded-full font-bold transition-all flex items-center ${activeTab === 'history'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
                        }`}
                >
                    <span className="mr-2">📅</span>
                    診断履歴
                    {!isPro && <span className="ml-2 text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded border border-gray-200">Pro</span>}
                </button>
            </div>

            {activeTab === 'result' ? (
                <>
                    {/* Ad Space */}
                    <div className="mb-8 p-4 border border-blue-200 bg-blue-50/50 rounded-xl flex flex-col items-center justify-center text-center min-h-[100px]">
                        <span className="text-[10px] text-gray-400 border border-gray-300 px-1 rounded mb-2 self-start ml-2">AD</span>
                        <p className="text-blue-800/60 font-medium text-sm">[美容関連広告枠]</p>
                        <p className="text-blue-800/40 text-xs mt-1">あなたにおすすめの美容液が表示されます</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap justify-end gap-4 mb-6">
                        <button
                            onClick={() => {
                                if (!isPro) {
                                    alert('この機能はProプラン限定です');
                                    return;
                                }
                                onSaveHistory();
                            }}
                            className="flex items-center px-4 py-2 bg-emerald-500 text-white rounded-full text-sm font-bold hover:bg-emerald-600 transition-colors shadow-sm"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                            </svg>
                            履歴に保存 {!isPro && '(Pro)'}
                        </button>
                        <button
                            onClick={onShare}
                            className="flex items-center px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-full text-sm font-bold hover:bg-blue-50 transition-colors"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                            結果を共有
                        </button>
                        <button
                            onClick={() => alert('Proプランに登録して、本格レポートを入手してください。\n\n※現在プレビュー版のため、PDFダウンロード機能は制限されています。')}
                            className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-full text-sm font-bold hover:bg-gray-700 transition-colors shadow-md"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            PDFレポートをダウンロード（Proプラン）
                        </button>
                    </div>

                    {/* Report Container for PDF Capture */}
                    <div ref={reportRef} className="bg-white p-4 sm:p-8 rounded-[40px] shadow-2xl border border-blue-50">

                        {/* Report Header (Visible only in PDF context usually, but fine here) */}
                        <div className="text-center mb-8 border-b border-gray-100 pb-6">
                            <h2 className="text-2xl font-serif font-bold text-blue-900 tracking-wide flex items-center justify-center">
                                <span className="text-3xl mr-2 text-blue-500">✦</span>
                                LUMIÈRE <span className="text-sky-500 ml-2">AI SKIN REPORT</span>
                            </h2>
                            <p className="text-gray-400 text-sm mt-2">Personalized AI Skin Analysis & Cosmetic Optimization</p>
                            <p className="text-xs text-gray-300 mt-1">※本診断はAIによる分析であり、医療行為ではありません。具体的な治療や診断については専門の医療機関にご相談ください。</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">

                            {/* Left Column (Wider: 2/3) */}
                            <div className="md:col-span-2 space-y-8">

                                {/* Spot Diagnosis Section (Redesigned) */}
                                <div className="bg-white p-6 rounded-3xl shadow-sm border border-blue-100">
                                    <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
                                        <span className="text-3xl mr-3">🔎</span>
                                        重点部位別診断
                                    </h3>

                                    <div className="grid grid-cols-1 gap-4">
                                        {analysisResult.spot_diagnosis?.map((spot, index) => {
                                            // Determine badge color based on keywords
                                            let badgeBg = "bg-blue-100";
                                            let badgeText = "text-blue-700";
                                            const concern = spot.concern || "";

                                            if (concern.match(/良好|きれい|安定|なし/)) {
                                                badgeBg = "bg-emerald-100";
                                                badgeText = "text-emerald-700";
                                            } else if (concern.match(/目立つ|深い|多い|過剰|荒れ|ニキビ|シミ|シワ|たるみ|黒ずみ/)) {
                                                badgeBg = "bg-rose-100";
                                                badgeText = "text-rose-700";
                                            }

                                            return (
                                                <div key={index} className="bg-blue-50/70 rounded-2xl p-5 shadow-md border border-blue-100/50">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center">
                                                            <div className="bg-blue-100/50 rounded-full p-2 mr-3 flex-shrink-0">
                                                                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                                </svg>
                                                            </div>
                                                            <span className="text-lg font-semibold text-blue-900">
                                                                {spot.area}
                                                            </span>
                                                        </div>
                                                        <span className={`${badgeBg} ${badgeText} text-xs font-bold px-3 py-1 rounded-full`}>
                                                            {spot.concern}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-700 text-sm leading-relaxed">
                                                        {spot.advice}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Skin Character Section */}
                                <div className="bg-blue-600 p-1 rounded-3xl shadow-lg">
                                    <div className="bg-white rounded-[22px] p-8 text-center relative overflow-hidden">


                                        <div className="relative z-10">
                                            <div className="inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-bold tracking-wider mb-6">
                                                YOUR SKIN TYPE
                                            </div>

                                            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6">
                                                {/* Character Image - Using standard img for PDF compatibility */}
                                                <div
                                                    className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0 bg-blue-50"
                                                    style={{ borderRadius: '50%', overflow: 'hidden' }}
                                                >
                                                    <img
                                                        src={getCharacterImage(analysisResult.skin_character_id)}
                                                        alt={analysisResult.skin_character_name}
                                                        className="w-full h-full object-cover"
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                        crossOrigin="anonymous"
                                                    />
                                                </div>

                                                {/* Character Text */}
                                                <div className="text-center md:text-left max-w-md">
                                                    <h3
                                                        className="text-3xl md:text-4xl font-bold text-blue-900 mb-3 leading-tight"
                                                        style={{ wordBreak: 'normal', overflowWrap: 'break-word', lineBreak: 'strict' }}
                                                    >
                                                        {formatSkinType(analysisResult.skin_character_name)}
                                                    </h3>
                                                    <p
                                                        className="text-lg text-blue-500 font-medium mb-4"
                                                        style={{ wordBreak: 'normal', overflowWrap: 'break-word', lineBreak: 'strict' }}
                                                    >
                                                        {analysisResult.character_description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Summary Section */}
                                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-serif font-bold text-blue-900 mb-4 flex items-center">
                                        <span className="w-1 h-8 bg-blue-500 rounded-full mr-3"></span>
                                        総合診断
                                    </h3>
                                    <p
                                        className="text-gray-600 leading-relaxed text-lg"
                                        style={{ wordBreak: 'normal', overflowWrap: 'break-word', lineBreak: 'strict' }}
                                    >
                                        {analysisResult.summary}
                                    </p>
                                </div>

                                {/* Cosmetic Analysis Section */}
                                <div className="bg-white p-8 rounded-3xl shadow-sm border border-purple-100">
                                    <h3 className="text-xl font-serif font-bold text-purple-900 mb-6 flex items-center">
                                        <span className="text-3xl mr-3">🧴</span>
                                        Cosmetic Analysis
                                    </h3>
                                    <div className="space-y-6">
                                        {analysisResult.cosme_status === 'unrecognized' ? (
                                            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start">
                                                <span className="text-2xl mr-3">⚠️</span>
                                                <div>
                                                    <h4 className="font-bold text-yellow-800 mb-1">認識できませんでした</h4>
                                                    <p className="text-yellow-700 text-sm">
                                                        アップロードされたコスメ画像を認識できませんでした。手動入力をご検討ください。
                                                    </p>
                                                </div>
                                            </div>
                                        ) : analysisResult.cosme_status === 'not_provided' ? (
                                            <div>
                                                <h4 className="text-base font-bold text-purple-700 mb-2">✨ あなたにおすすめの成分</h4>
                                                <p className="text-gray-600 leading-relaxed">
                                                    {analysisResult.cosme_analysis}
                                                </p>
                                            </div>
                                        ) : (
                                            <div>
                                                <h4 className="text-base font-bold text-purple-700 mb-2">成分解析 & 相性</h4>
                                                <p className="text-gray-600 leading-relaxed">
                                                    {analysisResult.cosme_analysis}
                                                </p>
                                            </div>
                                        )}
                                        <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                                            <h4 className="text-base font-bold text-purple-700 mb-2">最適化アドバイス</h4>
                                            <p className="text-gray-700 font-medium leading-relaxed">
                                                {analysisResult.cosme_optimization}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Right Column (Narrower: 1/3) */}
                            <div className="space-y-8">

                                {/* Chart Section - Fixed dimensions for PDF stability */}
                                <div className="bg-white p-6 rounded-3xl shadow-sm border border-blue-100">
                                    <h3 className="text-center text-xs font-bold text-blue-300 uppercase tracking-widest mb-4">Skin Balance</h3>
                                    <div className="h-[250px] w-full relative">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                                                <PolarGrid stroke="#e0f2fe" />
                                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
                                                <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
                                                <Radar
                                                    name="Skin Score"
                                                    dataKey="A"
                                                    stroke="#3b82f6"
                                                    strokeWidth={2}
                                                    fill="#bae6fd"
                                                    fillOpacity={0.6}
                                                    isAnimationActive={false} // Disable animation for capture
                                                />
                                            </RadarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Advice Section */}
                                <div className="bg-slate-800 p-8 rounded-3xl shadow-lg text-white">
                                    <h3 className="text-lg font-serif font-bold text-blue-200 mb-6 flex items-center">
                                        <span className="text-2xl mr-3">✦</span>
                                        Skincare Advice
                                    </h3>
                                    <div className="space-y-4">
                                        <p className="text-gray-300 leading-relaxed whitespace-pre-wrap text-sm">
                                            {analysisResult.skincare_advice}
                                        </p>
                                    </div>
                                </div>

                                {/* Product Suggestions Section (Vertical List) */}
                                <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100">
                                    <h3 className="text-lg font-serif font-bold text-blue-900 mb-6 flex items-center justify-center">
                                        <span className="text-xl mr-2">✨</span>
                                        おすすめ商品
                                    </h3>

                                    <div className="space-y-4">
                                        {analysisResult.product_suggestions.map((productId, index) => {
                                            const product = PRODUCT_CATALOG[productId];
                                            if (!product) return null;
                                            return (
                                                <React.Fragment key={index}>
                                                    <div key={index} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-center space-x-4">
                                                        <div className="w-10 h-10 bg-blue-50 rounded-full flex-shrink-0 flex items-center justify-center text-blue-500 font-bold text-xs">
                                                            {productId}
                                                        </div>

                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wider mb-0.5 line-clamp-1">
                                                                {product.category}
                                                            </p>
                                                            <h4 className="text-gray-800 font-bold text-xs leading-snug line-clamp-2">
                                                                {product.name}
                                                            </h4>
                                                        </div>
                                                    </div>
                                                    {index === 2 && (
                                                        <div className="bg-blue-50/50 rounded-xl border border-blue-200 p-3 shadow-sm flex flex-col items-center justify-center text-center min-h-[80px]">
                                                            <span className="text-[10px] text-gray-400 border border-gray-300 px-1 rounded mb-1 self-start ml-1">AD</span>
                                                            <p className="text-blue-800/60 font-medium text-xs">[美容関連広告枠]</p>
                                                            <p className="text-blue-800/40 text-[10px] mt-0.5">あなたにおすすめの美容液が表示されます</p>
                                                        </div>
                                                    )}
                                                </React.Fragment>
                                            );
                                        })}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-blue-900 text-center mb-6">診断履歴 (過去5件)</h3>
                    {history.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
                            <p className="text-gray-500">保存された履歴はありません</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {history.map((item) => (
                                <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                                {new Date(item.createdAt).toLocaleDateString('ja-JP')}
                                            </div>
                                            <h4 className="text-lg font-bold text-blue-900">
                                                {item.result.skin_character_name}
                                            </h4>
                                        </div>
                                        <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">
                                            詳細を見る
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        {item.result.summary}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Hidden Shadow Report for PDF Generation */}
            <div className="fixed top-0 left-0 -z-50 opacity-0 pointer-events-none">
                <div
                    ref={pdfReportRef}
                    style={{
                        width: '210mm',
                        minHeight: '297mm',
                        padding: '20mm',
                        backgroundColor: '#ffffff',
                        fontFamily: 'serif',
                        display: 'flex',
                        flexDirection: 'column',
                        boxSizing: 'border-box',
                    }}
                >
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '30px', borderBottom: '2px solid #1e3a8a', paddingBottom: '20px' }}>
                        <h1 style={{ fontSize: '28px', color: '#1e3a8a', margin: '0 0 10px 0', fontWeight: 'bold' }}>
                            LUMIÈRE AI SKIN REPORT
                        </h1>
                        <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                            Personalized Skin Analysis & Cosmetic Optimization
                        </p>
                        <p style={{ fontSize: '10px', color: '#94a3b8', marginTop: '5px' }}>
                            ※本診断はAIによる分析であり、医療行為ではありません。
                        </p>
                    </div>

                    {/* Profile & Character */}
                    <div style={{ display: 'flex', marginBottom: '30px', alignItems: 'center', backgroundColor: '#f0f9ff', padding: '20px', borderRadius: '15px' }}>
                        <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', border: '4px solid #ffffff', marginRight: '20px', flexShrink: 0 }}>
                            <img
                                src={getCharacterImage(analysisResult.skin_character_id)}
                                alt="Character"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                crossOrigin="anonymous"
                            />
                        </div>
                        <div>
                            <div style={{ fontSize: '12px', color: '#3b82f6', fontWeight: 'bold', marginBottom: '5px' }}>YOUR SKIN TYPE</div>
                            <h2 style={{ fontSize: '24px', color: '#1e3a8a', margin: '0 0 10px 0', lineHeight: '1.3' }}>
                                {formatSkinType(analysisResult.skin_character_name)}
                            </h2>
                            <p style={{ fontSize: '14px', color: '#334155', margin: 0, lineHeight: '1.5' }}>
                                {analysisResult.character_description}
                            </p>
                        </div>
                    </div>

                    {/* Chart & Scores */}
                    <div style={{ display: 'flex', marginBottom: '30px', gap: '30px' }}>
                        {/* Chart */}
                        <div style={{ flex: 1, height: '250px', position: 'relative' }}>
                            <h3 style={{ fontSize: '16px', color: '#1e3a8a', borderLeft: '4px solid #3b82f6', paddingLeft: '10px', marginBottom: '15px' }}>
                                Skin Balance
                            </h3>
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                                    <PolarGrid stroke="#cbd5e1" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 10 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
                                    <Radar
                                        name="Skin Score"
                                        dataKey="A"
                                        stroke="#2563eb"
                                        strokeWidth={2}
                                        fill="#93c5fd"
                                        fillOpacity={0.5}
                                        isAnimationActive={false}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Scores Table */}
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '16px', color: '#1e3a8a', borderLeft: '4px solid #3b82f6', paddingLeft: '10px', marginBottom: '15px' }}>
                                Score Detail
                            </h3>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                                <tbody>
                                    {Object.entries(analysisResult.scores).map(([key, value]) => (
                                        <tr key={key} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                            <td style={{ padding: '10px 0', color: '#475569', fontWeight: 'bold' }}>{key}</td>
                                            <td style={{ padding: '10px 0', textAlign: 'right', color: '#1e3a8a', fontWeight: 'bold' }}>
                                                {value} <span style={{ fontSize: '10px', color: '#94a3b8' }}>/ 5</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Advice */}
                    <div style={{ marginBottom: '30px' }}>
                        <h3 style={{ fontSize: '16px', color: '#1e3a8a', borderLeft: '4px solid #3b82f6', paddingLeft: '10px', marginBottom: '15px' }}>
                            Skincare Advice
                        </h3>
                        <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                            <p style={{ fontSize: '14px', color: '#334155', lineHeight: '1.8', margin: 0, whiteSpace: 'pre-wrap' }}>
                                {analysisResult.skincare_advice}
                            </p>
                        </div>
                    </div>

                    {/* Cosmetic Analysis */}
                    <div style={{ marginBottom: '30px' }}>
                        <h3 style={{ fontSize: '16px', color: '#7e22ce', borderLeft: '4px solid #d8b4fe', paddingLeft: '10px', marginBottom: '15px' }}>
                            Cosmetic Analysis
                        </h3>
                        <div style={{ border: '1px solid #f3e8ff', borderRadius: '10px', padding: '20px' }}>
                            <div style={{ marginBottom: '15px' }}>
                                <h4 style={{ fontSize: '14px', color: '#6b21a8', margin: '0 0 5px 0' }}>
                                    {analysisResult.cosme_status === 'not_provided' ? '✨ あなたにおすすめの成分' : '成分解析 & 相性'}
                                </h4>
                                <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>
                                    {analysisResult.cosme_analysis}
                                </p>
                            </div>
                            <div style={{ backgroundColor: '#faf5ff', padding: '15px', borderRadius: '8px' }}>
                                <h4 style={{ fontSize: '14px', color: '#6b21a8', margin: '0 0 5px 0' }}>最適化アドバイス</h4>
                                <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>
                                    {analysisResult.cosme_optimization}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Recommended Products */}
                    <div>
                        <h3 style={{ fontSize: '16px', color: '#1e3a8a', borderLeft: '4px solid #3b82f6', paddingLeft: '10px', marginBottom: '15px' }}>
                            Recommended Products
                        </h3>
                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                            {analysisResult.product_suggestions.slice(0, 3).map((productId, index) => {
                                const product = PRODUCT_CATALOG[productId];
                                if (!product) return null;
                                return (
                                    <div key={index} style={{ flex: 1, minWidth: '150px', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '15px', backgroundColor: '#ffffff' }}>
                                        <div style={{ fontSize: '10px', color: '#3b82f6', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '5px' }}>
                                            {product.category}
                                        </div>
                                        <div style={{ fontSize: '12px', color: '#1e293b', fontWeight: 'bold', lineHeight: '1.4' }}>
                                            {product.name}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer */}
                    <div style={{ marginTop: 'auto', textAlign: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
                        <p style={{ fontSize: '10px', color: '#94a3b8' }}>
                            © 2024 LUMIÈRE AI SKIN REPORT
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
