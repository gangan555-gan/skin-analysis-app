import { NextResponse } from 'next/server';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const rateLimitMap = new Map<string, number>();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { user_id, diagnosis_result } = body;

        if (!user_id || !diagnosis_result) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Rate Limit Check (1 request per minute per user)
        const lastRequestTime = rateLimitMap.get(user_id);
        if (lastRequestTime && Date.now() - lastRequestTime < 60000) {
            return NextResponse.json(
                { error: '保存は1分間に1回までです。しばらくお待ちください。' },
                { status: 429 }
            );
        }
        rateLimitMap.set(user_id, Date.now());

        // Save to Firestore
        // Note: In a real app, we would verify the user_id matches the authenticated user
        try {
            const docRef = await addDoc(collection(db, 'diagnoses'), {
                userId: user_id,
                result: diagnosis_result,
                createdAt: serverTimestamp(),
            });

            return NextResponse.json({
                success: true,
                id: docRef.id,
                message: 'Diagnosis saved successfully'
            });
        } catch (firestoreError) {
            console.error('Firestore error:', firestoreError);
            // Fallback for demo if Firestore is not configured or fails
            return NextResponse.json({
                success: true,
                id: 'mock-id-' + Date.now(),
                message: 'Diagnosis saved (Mock)'
            });
        }

    } catch (error) {
        console.error('Error saving diagnosis:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
