import Link from 'next/link'
import Layout from './components/Layout'

export default function Home() {
    return (
        <Layout>
            <main className="flex-1 flex flex-col items-center justify-between p-24 bg-slate-800 overflow-auto">
                <Link className="px-5 py-3 text-sm font-semibold rounded-xl bg-sky-400" href="/products">
                    POJDI NA ARTIKLE
                </Link>
            </main>
        </Layout>
    )
}
