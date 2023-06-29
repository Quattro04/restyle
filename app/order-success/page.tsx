import Layout from "../components/Layout";

export default function OrderSuccess() {
    return (
        <Layout>
            <main className="flex-1 flex flex-col items-center justify-between p-24 bg-slate-800 overflow-auto">
                <div className="text-white">
                    Thank you for ordering with us! Please check your email for more info.
                </div>
            </main>
        </Layout>
    )
}
