import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { PRODUCT_CATALOG } from '../../data/products';

export async function POST(request: Request) {
    try {
        const { image, cosmeticImage, cosmeticName, cosmeticIngredients, userProfile } = await request.json();

        if (!image) {
            return NextResponse.json(
                { error: 'Image data is required' },
                { status: 400 }
            );
        }

        // Extract base64 data for face image
        const faceMatches = image.match(/^data:(.+);base64,(.+)$/);
        if (!faceMatches || faceMatches.length !== 3) {
            return NextResponse.json(
                { error: 'Invalid face image data' },
                { status: 400 }
            );
        }
        const faceMimeType = faceMatches[1];
        const faceBase64 = faceMatches[2];

        // Extract base64 data for cosmetic image if provided
        let cosmeticMimeType = '';
        let cosmeticBase64 = '';
        if (cosmeticImage) {
            const cosmeticMatches = cosmeticImage.match(/^data:(.+);base64,(.+)$/);
            if (cosmeticMatches && cosmeticMatches.length === 3) {
                cosmeticMimeType = cosmeticMatches[1];
                cosmeticBase64 = cosmeticMatches[2];
            }
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error('API Key is missing');
            return NextResponse.json(
                { error: 'サーバー設定エラー: APIキーが設定されていません。管理者にお問い合わせください。' },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash-preview-09-2025',
            generationConfig: {
                responseMimeType: "application/json",
            }
        });

        // Generate product list string dynamically
        const productListString = Object.entries(PRODUCT_CATALOG)
            .map(([id, product]) => `${id}: ${product.name} (${product.feature})`)
            .join('\n    ');


        let cosmeticPromptPart = "";
        if (cosmeticIngredients) {
            cosmeticPromptPart = `
            ユーザーは以下のコスメを使用しています。
            商品名: ${cosmeticName || '不明'}
            全成分: ${cosmeticIngredients}
            
            この成分リストを解析し、ユーザーの肌質や悩みとの相性を評価してください。
            "cosme_status": "recognized" とし、"cosme_analysis" に詳細な解析結果を含めてください。
            `;
        } else if (cosmeticImage) {
            cosmeticPromptPart = `
            また、コスメ画像が提供されている場合は、そのパッケージや特徴から製品を特定・認識できるか判断してください。
            認識できない、またはコスメ画像ではない場合は "cosme_status": "unrecognized" としてください。
            `;
        } else {
            cosmeticPromptPart = `
            コスメ成分のデータは提供されていません。肌診断の結果と一般論に基づいた最適なコスメアドバイスを提供してください。
            "cosme_status": "not_provided" としてください。
            `;
        }
        const prompt = `
        あなたはプロの美容皮膚科医兼コスメコンシェルジュです。
        まず、アップロードされた画像に「人間の顔」が明確に含まれているかを確認してください。
        顔が検出されない、または顔以外の物体（風景、動物、イラストなど）である場合は、
        "face_detected": false とし、診断を行わずに終了してください。

        顔が検出された場合は、"face_detected": true とし、
        ユーザーの顔写真、年齢層、肌タイプ、悩み、使用コスメ（任意）を分析し、
        以下のJSON形式で診断結果とアドバイスを出力してください。

        【重要】倫理的配慮とバイアス排除:
        性別、人種、年齢、出身地などの属性に依存せず、写真に写っている肌の状態（キメ、毛穴、色ムラ、水分量など）、シワ、シミなどの客観的な視覚データのみに基づいて公平に分析を行ってください。

        特に、顔写真から「右頬」「Tゾーン」「目元」などの具体的な部位ごとの肌悩み（シミ、シワ、毛穴など）を分析し、
        "spot_diagnosis" として出力してください。座標情報は不要です。
        
        "spot_diagnosis" として出力してください。座標情報は不要です。
        
        ${cosmeticPromptPart}

        Temperatureは0に設定し、常に一貫性のあるJSONを返してください。
        Markdown記法は使用せず、生のJSONのみを返してください。

    User Profile:
        - Age Group: ${userProfile.ageGroup || '不明 (画像から推定)'}
        - Self-Identified Skin Type: ${userProfile.skinType || '不明 (画像から推定)'}
        - Main Concern: ${userProfile.skinConcern || '不明 (画像から分析)'}

    ※ユーザープロファイルが不明な場合は、画像のみに基づいて分析を行ってください。

    Product Catalog for Suggestions(Choose 3 best matches IDs):
    ${productListString}

    JSON Output Format:
        {
            "face_detected": boolean,
            "error_message": string | null,
            "skin_character_id": "sensitive" | "oily" | "dry" | "mixed" | null,
            "skin_character_name": "キャッチーな肌タイプ名（必ず「〇〇型〇〇肌」の形式で出力すること。例：水分不足型乾燥肌、バリア機能低下型混合肌、皮脂過剰型脂性肌、外部刺激脆弱型敏感肌）" | null,
            "character_description": "その肌タイプの特徴を1行で表現" | null,
            "summary": "全体的な肌の状態と傾向の要約" | null,
            "scores": {
                "水分": 1-5,
                "弾力": 1-5,
                "透明感": 1-5,
                "キメ": 1-5,
                "抵抗力": 1-5
            } | null,
            "skincare_advice": "具体的なスキンケア手順と注意点" | null,
            "cosme_status": "recognized" | "unrecognized" | "not_provided",
            "cosme_analysis": "コスメの成分解析と肌との相性 (unrecognizedの場合は「認識できませんでした」等のメッセージ)" | null,
            "cosme_optimization": "現在のケアにプラスすべき成分やアイテムの提案" | null,
            "product_suggestions": ["ID1", "ID2", "ID3"] | null,
            "spot_diagnosis": [
                {
                    "area": "部位名",
                    "concern": "悩み",
                    "advice": "具体的なアドバイス"
                }
            ] | null
        }
        `;

        const contentParts: any[] = [
            { text: prompt },
            {
                inlineData: {
                    data: faceBase64,
                    mimeType: faceMimeType
                }
            }
        ];

        if (cosmeticBase64) {
            contentParts.push({
                inlineData: {
                    data: cosmeticBase64,
                    mimeType: cosmeticMimeType
                }
            });
        }

        const result = await model.generateContent(contentParts);

        const response = await result.response;
        const text = response.text();

        try {
            const jsonResponse = JSON.parse(text);
            return NextResponse.json({ result: jsonResponse });
        } catch (e) {
            console.error('Failed to parse JSON:', text);
            return NextResponse.json(
                { error: 'AIからの応答の解析に失敗しました。もう一度お試しください。' },
                { status: 500 }
            );
        }

    } catch (error: any) {
        console.error('Error processing request:', error);

        // API Key related errors often come with 400 or 403 status
        if (error.status === 400 || error.status === 403 || (error.message && error.message.includes('API key'))) {
            return NextResponse.json(
                { error: '現在、サービスが一時的に停止しています。管理者にお問い合わせください。' },
                { status: 500 } // Return 500 to client to hide details, or 503
            );
        }

        return NextResponse.json(
            { error: 'サーバー内部エラーが発生しました。しばらく待ってから再試行してください。' },
            { status: 500 }
        );
    }
}
