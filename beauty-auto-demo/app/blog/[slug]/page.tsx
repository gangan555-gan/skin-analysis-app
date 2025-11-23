import Link from 'next/link';
import { getBlogPost, getAllPosts } from '../../data/blog-posts';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getBlogPost(slug);
    if (!post) return { title: 'Not Found' };
    return {
        title: `${post.title} | LUMIÈRE BLOG`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getBlogPost(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white font-sans text-gray-800">
            <header className="py-6 px-4 sm:px-8 border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-sm z-10">
                <div className="max-w-3xl mx-auto flex justify-between items-center">
                    <Link href="/blog" className="text-sm font-bold text-gray-500 hover:text-blue-600 flex items-center">
                        ← 記事一覧に戻る
                    </Link>
                    <Link href="/" className="text-lg font-serif font-bold text-blue-900">
                        LUMIÈRE SKIN AI
                    </Link>
                </div>
            </header>

            <article className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
                <div className="mb-8 text-center">
                    <div className="text-sm text-blue-500 font-bold mb-4">{post.date}</div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-6">
                        {post.title}
                    </h1>
                    {post.imageUrl && (
                        <div className="flex justify-center mb-8">
                            <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center p-4">
                                <img
                                    src={post.imageUrl}
                                    alt={post.title}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div
                    className="prose prose-blue prose-lg mx-auto"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <div className="mt-16 pt-8 border-t border-gray-100">
                    <div className="bg-gradient-to-r from-blue-50 to-sky-50 p-8 rounded-2xl text-center">
                        <h3 className="text-xl font-bold text-blue-900 mb-4">あなたの肌もAIで診断してみませんか？</h3>
                        <p className="text-gray-600 mb-6">
                            LUMIÈRE AI SKIN REPORTなら、写真をアップロードするだけで<br />
                            あなたの肌タイプと最適なコスメがわかります。
                        </p>
                        <Link href="/" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                            無料で肌診断を試す
                        </Link>
                    </div>
                </div>
            </article>

            <footer className="bg-gray-50 border-t border-gray-200 py-12 mt-12">
                <div className="max-w-4xl mx-auto px-4 text-center text-gray-500 text-sm">
                    <p>© 2024 LUMIÈRE AI SKIN REPORT</p>
                </div>
            </footer>
        </div>
    );
}
