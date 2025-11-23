import Link from 'next/link';
import { getAllPosts } from '../data/blog-posts';

export const metadata = {
    title: '美容コラム | LUMIÈRE AI SKIN REPORT',
    description: '最新のスキンケア情報やAI肌診断の活用法をお届けするコラムです。',
};

export default function BlogIndex() {
    const posts = getAllPosts();

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            <header className="py-6 px-4 sm:px-8 border-b border-gray-200 bg-white sticky top-0 z-10">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <Link href="/" className="text-xl font-serif font-bold text-blue-900 tracking-wide flex items-center hover:opacity-80 transition-opacity">
                        <span className="text-2xl mr-2 text-blue-500">✦</span>
                        LUMIÈRE <span className="text-sky-500 ml-2">BLOG</span>
                    </Link>
                </div>
            </header>

            <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Beauty & Tech Column</h1>
                    <p className="text-gray-600">美肌のための科学とテクノロジー</p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {posts.map((post) => (
                        <article key={post.slug} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                            {post.imageUrl && (
                                <div className="h-48 bg-blue-50 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={post.imageUrl}
                                        alt={post.title}
                                        className="h-32 w-32 object-contain"
                                    />
                                </div>
                            )}
                            <div className="p-6">
                                <div className="text-sm text-blue-500 font-bold mb-2">{post.date}</div>
                                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                    <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                                        {post.title}
                                    </Link>
                                </h2>
                                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                                    {post.excerpt}
                                </p>
                                <Link href={`/blog/${post.slug}`} className="text-blue-600 font-bold text-sm hover:underline">
                                    続きを読む →
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </main>

            <footer className="bg-white border-t border-gray-200 py-8 mt-12">
                <div className="max-w-4xl mx-auto px-4 text-center text-gray-500 text-sm">
                    <Link href="/" className="hover:text-blue-600 transition-colors">
                        トップページに戻る
                    </Link>
                    <p className="mt-4">© 2024 LUMIÈRE AI SKIN REPORT</p>
                </div>
            </footer>
        </div>
    );
}
