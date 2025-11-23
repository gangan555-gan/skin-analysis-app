'use client';

import { useState, useRef, useEffect } from 'react';
import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { AnalysisResult } from './types';
import { getCharacterImage } from './utils';
import { getSessionId, isProUser, setProUser } from './lib/auth';
import { PRODUCT_CATALOG } from './data/products';

const AnalysisResultSection = dynamic(() => import('./components/AnalysisResultSection'), {
    loading: () => <div className="text-center py-20 text-blue-500">Loading results...</div>,
    ssr: false
});

// Define types for the API response
// AnalysisResult is imported from ./types


export default function Home() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedCosmeticImage, setSelectedCosmeticImage] = useState<string | null>(null);
    const [cosmeticInputMode, setCosmeticInputMode] = useState<'image' | 'text'>('image');
    const [cosmeticName, setCosmeticName] = useState('');
    const [cosmeticIngredients, setCosmeticIngredients] = useState('');
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [userId, setUserId] = useState<string>('');
    const [isPro, setIsPro] = useState<boolean>(false);
    const [history, setHistory] = useState<any[]>([]);

    const [hasSavedData, setHasSavedData] = useState(false);
    const isLoading = isAnalyzing;

    // Questionnaire State
    const [ageGroup, setAgeGroup] = useState<string>('');
    const [skinType, setSkinType] = useState<string>('');
    const [skinConcern, setSkinConcern] = useState<string>('');

    const fileInputRef = useRef<HTMLInputElement>(null);
    const cosmeticInputRef = useRef<HTMLInputElement>(null); // Keep this ref for now, even if cosmetic image upload is removed from UI
    const reportRef = useRef<HTMLDivElement>(null);
    const pdfReportRef = useRef<HTMLDivElement>(null);

    const [loadingStep, setLoadingStep] = useState(0);
    const loadingMessages = [
        "AIが顔写真をスキャンしています...",
        "肌の水分量と弾力を測定中...",
        "肌トラブルの兆候を分析中...",
        "最適なコスメ成分を照合しています...",
        "診断レポートを作成中..."
    ];

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isAnalyzing) {
            setLoadingStep(0);
            interval = setInterval(() => {
                setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
            }, 2500);
        }
        return () => clearInterval(interval);
    }, [isAnalyzing]);

    useEffect(() => {
        setUserId(getSessionId());
        setIsPro(isProUser());
        const savedData = localStorage.getItem('beauty_app_data');
        if (savedData) {
            setHasSavedData(true);
        }
    }, []);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('ファイルサイズが大きすぎます（5MBまで）。');
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCosmeticUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('ファイルサイズが大きすぎます（5MBまで）。');
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedCosmeticImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAnalyze = async () => {
        if (!selectedImage) return;

        setIsAnalyzing(true);
        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: selectedImage,
                    userProfile: {
                        ageGroup,
                        skinType,
                        skinConcern
                    },
                    cosmeticImage: cosmeticInputMode === 'image' ? selectedCosmeticImage : null,
                    cosmeticName: cosmeticInputMode === 'text' ? cosmeticName : null,
                    cosmeticIngredients: cosmeticInputMode === 'text' ? cosmeticIngredients : null,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                if (data.result.face_detected === false) {
                    alert(data.result.error_message || '顔が検出されませんでした。もう一度顔写真をアップロードしてください。');
                    setIsAnalyzing(false);
                    return;
                }
                setAnalysisResult(data.result);
                // Save to localStorage
                const saveData = {
                    result: data.result,
                    timestamp: new Date().toISOString(),
                    userProfile: { ageGroup, skinType, skinConcern }
                };
                localStorage.setItem('beauty_app_data', JSON.stringify(saveData));
                setHasSavedData(true);
            } else {
                console.error('Analysis failed:', data.error);
                alert(`エラーが発生しました: ${data.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('通信エラーが発生しました。ネットワーク接続を確認してください。');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleLoadPrevious = () => {
        const savedDataString = localStorage.getItem('beauty_app_data');
        if (savedDataString) {
            try {
                const savedData = JSON.parse(savedDataString);
                setAnalysisResult(savedData.result);
                setAgeGroup(savedData.userProfile?.ageGroup || '');
                setSkinType(savedData.userProfile?.skinType || '');
                setSkinConcern(savedData.userProfile?.skinConcern || '');
                alert('前回の診断結果をロードしました。');
            } catch (e) {
                console.error('Failed to load saved data', e);
                alert('保存されたデータの読み込みに失敗しました。');
            }
        }
    };

    const handleDownloadPDF = async () => {
        if (!pdfReportRef.current) return;

        try {
            // Wait for a moment to ensure rendering
            await new Promise(resolve => setTimeout(resolve, 500));

            const html2canvas = (await import('html2canvas')).default;
            const jsPDF = (await import('jspdf')).default;

            const canvas = await html2canvas(pdfReportRef.current, {
                scale: 2,
                backgroundColor: '#ffffff',
                useCORS: true,
                allowTaint: true,
                logging: true,
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 30;

            pdf.setFontSize(20);
            pdf.setTextColor(30, 58, 138);
            pdf.text('BEAUTY AUTO - AI Skin Analysis Report', 105, 20, { align: 'center' });

            pdf.setFontSize(10);
            pdf.setTextColor(100, 116, 139);
            pdf.text(`Date: ${new Date().toLocaleDateString()} | AI Diagnosis (Not Medical Advice)`, 105, 26, { align: 'center' });

            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save('skin-analysis-report.pdf');
        } catch (error: any) {
            console.error('PDF generation failed', error);
            alert(`PDF生成エラー: ${error.message || '不明なエラー'}`);
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'LUMIÈRE AI SKIN REPORT',
                    text: `私の肌タイプは「${analysisResult?.skin_character_name}」でした！ #LumiereSkinAI`,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            alert('共有機能はお使いのブラウザではサポートされていません。');
        }
    };

    const handleSaveHistory = async () => {
        if (!analysisResult || !userId) return;

        // 1. Save to LocalStorage (Robust Fallback)
        try {
            const currentHistoryStr = localStorage.getItem('beauty_app_history');
            const currentHistory = currentHistoryStr ? JSON.parse(currentHistoryStr) : [];
            const newEntry = {
                id: `local-${Date.now()}`,
                userId,
                result: analysisResult,
                createdAt: new Date().toISOString()
            };
            const updatedHistory = [newEntry, ...currentHistory];
            localStorage.setItem('beauty_app_history', JSON.stringify(updatedHistory));
            setHistory(updatedHistory); // Update state immediately
        } catch (e) {
            console.error('Local save failed', e);
        }

        // 2. Try API Save (Cloud)
        try {
            const res = await fetch('/api/save_diagnosis', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: userId, diagnosis_result: analysisResult }),
            });
            const data = await res.json();
            if (data.success) {
                alert('診断結果を保存しました！');
            } else {
                // Even if API fails, we saved locally
                alert('診断結果を保存しました（ローカル）');
            }
        } catch (e) {
            console.error(e);
            alert('診断結果を保存しました（オフライン）');
        }
    };

    const handleLoadHistory = async () => {
        if (!userId) return;

        // 1. Load from LocalStorage first
        try {
            const localHistoryStr = localStorage.getItem('beauty_app_history');
            if (localHistoryStr) {
                const localHistory = JSON.parse(localHistoryStr);
                setHistory(localHistory);
            }
        } catch (e) {
            console.error('Local load failed', e);
        }

        // 2. Try API Load (Cloud) and merge if needed
        try {
            const res = await fetch(`/api/get_history?user_id=${userId}`);
            const data = await res.json();
            if (data.history && data.history.length > 0) {
                // In a real app, we would merge. For now, if API returns data, it might be the mock.
                // If API returns mock data (id starts with mock-), we might prefer local data if available.
                // But for simplicity, let's just set it if local is empty, or maybe just log it.
                // Actually, let's rely on local storage for this demo as the API is likely mock.
                // setHistory(data.history); 
            }
        } catch (e) {
            console.error(e);
        }
    };

    const togglePro = () => {
        const newStatus = !isPro;
        setIsPro(newStatus);
        setProUser(newStatus);
        alert(newStatus ? 'Proプランに切り替えました' : '無料プランに切り替えました');
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const triggerCosmeticInput = () => {
        cosmeticInputRef.current?.click();
    };

    // Check if all required fields are filled (Only image is required now)

    // Check if all required fields are filled (Only image is required now)
    const isFormValid = !!selectedImage;

    return (
        <main className="min-h-screen bg-gradient-to-b from-blue-50 to-sky-100 font-sans text-gray-800">
            {/* Header */}
            <header className="py-6 px-4 sm:px-8 border-b border-blue-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-serif font-bold text-blue-900 tracking-wide flex items-center">
                        <span className="text-3xl mr-2 text-blue-500">✦</span>
                        LUMIÈRE <span className="text-sky-500 ml-2">SKIN AI</span>
                    </h1>
                    {/* Ad Space 1 */}
                    <div className="hidden sm:flex flex-1 max-w-[200px] bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex-col items-center justify-center min-h-[60px] py-2 mx-4">
                        <span className="text-gray-400 text-sm">広告スペース</span>
                        <span className="text-xs text-gray-300 mt-1">スポンサーリンク</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={togglePro} className="text-xs text-gray-400 hover:text-blue-500 underline">
                            {isPro ? 'Pro Mode ON' : 'Pro Mode OFF'}
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8">

                {/* Hero Section - Compressed */}
                <div className="text-center space-y-4 relative mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 leading-tight">
                        AIがあなたの肌悩みを3秒で特定。<br />
                        <span className="text-blue-600">最適なパーソナルケアを今すぐ開始。</span>
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
                        最先端の技術で、あなたの肌の隠れたポテンシャルを科学的に引き出します。
                    </p>

                    {hasSavedData && !analysisResult && (
                        <div className="mt-4">
                            <button
                                onClick={handleLoadPrevious}
                                className="inline-flex items-center px-4 py-2 bg-white border border-blue-200 rounded-full text-blue-600 text-sm font-medium shadow-sm hover:bg-blue-50 transition-colors"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                前回の診断結果をロード
                            </button>
                        </div>
                    )}
                </div>

                {/* Main Interaction Area */}
                {/* Main Interaction Area */}
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                        {/* Left Column: Questionnaire & Face Image */}
                        <div className="space-y-8">
                            {/* Questionnaire Section */}
                            <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-blue-100 space-y-6 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                                <h3 className="text-xl font-bold text-blue-900 flex items-center justify-between">
                                    <div className="flex items-center">
                                        <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 shadow-sm">1</span>
                                        基本プロフィール
                                    </div>
                                    <span className="text-xs text-blue-500 font-bold bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                                        ※スキップしてすぐに診断開始できます
                                    </span>
                                </h3>

                                <div className="space-y-4">
                                    {/* Question 1: Age Group */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">年齢層</label>
                                        <select
                                            value={ageGroup}
                                            onChange={(e) => setAgeGroup(e.target.value)}
                                            className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        >
                                            <option value="">選択してください</option>
                                            <option value="10代以下">10代以下</option>
                                            <option value="20代">20代</option>
                                            <option value="30代">30代</option>
                                            <option value="40代">40代</option>
                                            <option value="50代以上">50代以上</option>
                                        </select>
                                    </div>

                                    {/* Question 2: Skin Type */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">自己認識の肌タイプ</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {['乾燥肌', '脂性肌', '混合肌', '敏感肌'].map((type) => (
                                                <label key={type} className={`
                          cursor-pointer p-3 rounded-xl border text-center text-sm font-medium transition-all
                          ${skinType === type
                                                        ? 'bg-blue-50 border-blue-400 text-blue-700'
                                                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}
                        `}>
                                                    <input
                                                        type="radio"
                                                        name="skinType"
                                                        value={type}
                                                        checked={skinType === type}
                                                        onChange={(e) => setSkinType(e.target.value)}
                                                        className="hidden"
                                                    />
                                                    {type}
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Question 3: Skin Concern */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">一番気になる肌の悩み</label>
                                        <select
                                            value={skinConcern}
                                            onChange={(e) => setSkinConcern(e.target.value)}
                                            className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        >
                                            <option value="">選択してください</option>
                                            <option value="シミ・くすみ">シミ・くすみ</option>
                                            <option value="ニキビ・赤み">ニキビ・赤み</option>
                                            <option value="ハリ・シワ・たるみ">ハリ・シワ・たるみ</option>
                                            <option value="毛穴の開き・黒ずみ">毛穴の開き・黒ずみ</option>
                                            <option value="特にない">特にない</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Face Image Upload */}
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-blue-900 ml-2 flex items-center">
                                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs mr-2">2</span>
                                    顔写真（必須）
                                </label>
                                <div
                                    onClick={triggerFileInput}
                                    className={`relative w-full aspect-[3/2] rounded-3xl overflow-hidden border-2 border-dashed transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md ${selectedImage
                                        ? 'border-transparent bg-gray-100'
                                        : 'border-blue-200 bg-white hover:border-blue-300'
                                        }`}
                                >
                                    {selectedImage ? (
                                        <Image
                                            src={selectedImage}
                                            alt="Uploaded face"
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 group-hover:text-blue-400 transition-colors">
                                            <svg className="w-12 h-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="font-medium text-blue-900/60">顔写真をアップロード</span>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageUpload}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Cosmetic Image & Ad Space */}
                        <div className="space-y-8 flex flex-col">
                            {/* Cosmetic Image Upload */}
                            {/* Cosmetic Input Section */}
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-blue-900 ml-2 flex items-center">
                                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs mr-2">3</span>
                                    お使いのコスメ（任意）
                                </label>

                                <div className="bg-white rounded-2xl p-1 shadow-sm border border-blue-100 flex mb-2">
                                    <button
                                        onClick={() => setCosmeticInputMode('image')}
                                        className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${cosmeticInputMode === 'image' ? 'bg-blue-100 text-blue-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50'
                                            }`}
                                    >
                                        写真でスキャン
                                    </button>
                                    <button
                                        onClick={() => setCosmeticInputMode('text')}
                                        className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${cosmeticInputMode === 'text' ? 'bg-blue-100 text-blue-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50'
                                            }`}
                                    >
                                        成分を手動入力
                                    </button>
                                </div>

                                {cosmeticInputMode === 'image' ? (
                                    <div
                                        onClick={triggerCosmeticInput}
                                        className={`relative w-full aspect-[3/2] rounded-2xl overflow-hidden border-2 border-dashed transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md ${selectedCosmeticImage
                                            ? 'border-transparent bg-gray-100'
                                            : 'border-blue-200 bg-white/50 hover:border-blue-300'
                                            }`}
                                    >
                                        {selectedCosmeticImage ? (
                                            <Image
                                                src={selectedCosmeticImage}
                                                alt="Uploaded cosmetic"
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex flex-row items-center justify-center text-gray-400 group-hover:text-blue-400 transition-colors space-x-3">
                                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                                </svg>
                                                <span className="font-medium text-sm text-blue-900/60">コスメのボトル写真をアップロード</span>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            ref={cosmeticInputRef}
                                            onChange={handleCosmeticUpload}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                        {selectedCosmeticImage && (
                                            <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <span className="bg-white/90 text-blue-900 px-4 py-1 rounded-full text-xs font-medium shadow-lg backdrop-blur-sm">
                                                    変更
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="bg-white rounded-2xl p-4 border border-blue-100 space-y-3">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1">商品名（任意）</label>
                                            <input
                                                type="text"
                                                value={cosmeticName}
                                                onChange={(e) => setCosmeticName(e.target.value)}
                                                placeholder="例: モイスチャーローション"
                                                className="w-full p-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:border-blue-400 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1">全成分リスト（任意）</label>
                                            <textarea
                                                value={cosmeticIngredients}
                                                onChange={(e) => setCosmeticIngredients(e.target.value)}
                                                placeholder="パッケージ裏面の成分表示をコピー＆ペーストしてください（主要成分のみでも可）"
                                                className="w-full p-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:border-blue-400 outline-none min-h-[120px]"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Ad Space 2 */}
                            <div className="w-full bg-gray-50 rounded-xl border border-gray-200 p-4 text-center min-h-[100px]">
                                <span className="text-xs text-gray-400 border border-gray-300 px-1 rounded mb-1 inline-block">AD</span>
                                <p className="text-gray-400 text-sm">美容クリニック・エステサロンの広告枠</p>
                            </div>
                        </div>
                    </div>

                    {/* Centered Analyze Button */}
                    <div className="max-w-md mx-auto w-full space-y-4">
                        <button
                            onClick={handleAnalyze}
                            disabled={!isFormValid || isLoading}
                            className={`w-full py-4 px-6 rounded-full text-white font-bold text-lg shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${!isFormValid || isLoading
                                ? 'bg-gray-300 cursor-not-allowed shadow-none'
                                : 'bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600'
                                }`}
                        >
                            {isLoading ? (
                                <span className="flex flex-col items-center justify-center space-y-1">
                                    <div className="flex items-center space-x-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span className="tracking-wide font-bold">解析中...</span>
                                    </div>
                                    <span className="text-sm font-medium text-blue-100 animate-pulse">
                                        {loadingMessages[loadingStep]}
                                    </span>
                                </span>
                            ) : (
                                '診断する'
                            )}
                        </button>
                        {!isFormValid && (
                            <p className="text-center text-xs text-red-400 font-medium">
                                ※顔写真をアップロードしてください
                            </p>
                        )}
                    </div>
                </div>

                {/* Results Section */}
                {analysisResult && (
                    <AnalysisResultSection
                        analysisResult={analysisResult}
                        onShare={handleShare}
                        reportRef={reportRef}
                        pdfReportRef={pdfReportRef}
                        isPro={isPro}
                        onSaveHistory={handleSaveHistory}
                        history={history}
                        onLoadHistory={handleLoadHistory}
                    />
                )}
            </div>

            {/* Beauty Column Section */}
            <div className="max-w-4xl mx-auto px-4 py-12 border-t border-gray-100">
                <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">
                    <span className="block text-sm text-blue-500 font-normal mb-2">BEAUTY COLUMN</span>
                    美容コラム
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <a href="/blog" className="block bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-lg text-gray-800 mb-2">肌タイプ別スキンケアガイド</h3>
                        <p className="text-gray-600 text-sm">あなたの肌質に合ったケア方法を解説。AI診断と合わせてチェック！</p>
                        <span className="text-blue-500 text-sm font-bold mt-4 inline-block">記事を読む →</span>
                    </a>
                    <a href="/blog/ai-skin-tech" className="block bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-lg text-gray-800 mb-2">AI肌診断の仕組み</h3>
                        <p className="text-gray-600 text-sm">最新AI技術がどのようにあなたの肌を分析しているのか、その裏側をご紹介。</p>
                        <span className="text-blue-500 text-sm font-bold mt-4 inline-block">記事を読む →</span>
                    </a>
                </div>
                <div className="text-center mt-8">
                    <a href="/blog" className="inline-block border border-blue-500 text-blue-500 px-6 py-2 rounded-full font-bold hover:bg-blue-50 transition-colors">
                        コラム一覧を見る
                    </a>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-8 text-center text-sm text-gray-400 border-t border-blue-100 mt-12">
                <div className="flex justify-center space-x-6 mb-4">
                    <a href="/terms" className="hover:text-blue-500 transition-colors">利用規約</a>
                    <a href="/privacy" className="hover:text-blue-500 transition-colors">プライバシーポリシー</a>
                </div>
                <p>© 2025 LUMIÈRE SKIN AI. All rights reserved.</p>
            </footer>
        </main>
    );
}
