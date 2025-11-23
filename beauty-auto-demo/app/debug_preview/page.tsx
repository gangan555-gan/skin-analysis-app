'use client';

import React from 'react';
import AnalysisResultSection from '../components/AnalysisResultSection';
import { AnalysisResult } from '../types';

const mockBase: AnalysisResult = {
    skin_character_name: '',
    skin_character_id: 'genius_puzzle',
    character_description: 'Description',
    scores: { 水分: 3, 弾力: 3, 透明感: 3, キメ: 3, 抵抗力: 3 },
    spot_diagnosis: [],
    summary: 'Summary',
    skincare_advice: 'Advice',
    cosme_analysis: 'Cosme Analysis',
    cosme_optimization: 'Optimization',
    product_suggestions: ['p001', 'p002', 'p003'],
    cosme_status: 'recognized'
};

const testCases = [
    { name: 'バリア機能低下型混合肌', id: 'genius_puzzle' },
    { name: '水分不足型乾燥肌', id: 'desert_princess' },
    { name: '皮脂過剰型脂性肌', id: 'tsuya_dragon' },
    { name: '外部刺激脆弱型敏感肌', id: 'glass_heart' },
];

export default function DebugPreviewPage() {
    const reportRef = React.useRef(null);
    const pdfReportRef = React.useRef(null);

    return (
        <div className="bg-gray-100 min-h-screen p-8 space-y-12">
            <h1 className="text-3xl font-bold text-center mb-8">Skin Type Display Preview</h1>
            {testCases.map((test, index) => (
                <div key={index} className="border-b-4 border-blue-500 pb-8">
                    <h2 className="text-xl font-bold mb-4 text-center">{test.name}</h2>
                    <AnalysisResultSection
                        analysisResult={{ ...mockBase, skin_character_name: test.name, skin_character_id: test.id }}
                        onShare={() => { }}
                        reportRef={reportRef}
                        pdfReportRef={pdfReportRef}
                        isPro={true}
                        onSaveHistory={() => { }}
                        history={[]}
                        onLoadHistory={() => { }}
                    />
                </div>
            ))}
        </div>
    );
}
