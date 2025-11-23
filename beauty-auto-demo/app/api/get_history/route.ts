import { NextResponse } from 'next/server';
import { db } from '../../lib/firebase';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get('user_id');

    if (!user_id) {
        return NextResponse.json(
            { error: 'Missing user_id' },
            { status: 400 }
        );
    }

    try {
        // Fetch from Firestore
        try {
            const q = query(
                collection(db, 'diagnoses'),
                where('userId', '==', user_id),
                orderBy('createdAt', 'desc'),
                limit(5)
            );

            const querySnapshot = await getDocs(q);
            const history = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                // Convert timestamp to date string if needed, or handle on client
                createdAt: doc.data().createdAt?.toDate?.() || new Date().toISOString()
            }));

            return NextResponse.json({ history });
        } catch (firestoreError) {
            console.error('Firestore error:', firestoreError);
            // Mock data for demo
            const mockHistory = [
                {
                    id: 'mock-1',
                    userId: user_id,
                    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
                    result: {
                        skin_character_name: 'ガラスのハートちゃん',
                        summary: 'Mock summary for testing history display.',
                        scores: { 水分: 2, 弾力: 3, 透明感: 4, キメ: 3, 抵抗力: 2 }
                    }
                },
                {
                    id: 'mock-2',
                    userId: user_id,
                    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
                    result: {
                        skin_character_name: 'ツヤドラゴン',
                        summary: 'Another mock summary.',
                        scores: { 水分: 5, 弾力: 4, 透明感: 3, キメ: 4, 抵抗力: 5 }
                    }
                }
            ];
            return NextResponse.json({ history: mockHistory });
        }

    } catch (error) {
        console.error('Error fetching history:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
