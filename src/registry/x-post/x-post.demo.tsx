import { XPost } from "./x-post";

export default function XPostDemo() {
    return (
        <div className="p-8 w-full min-h-screen bg-neutral-900 flex items-center justify-center">
            <div className="w-full max-w-lg">
                

                <div className="mt-8">
                    <XPost
                        name="Vercel"
                        handle="vercel"
                        verified={true}
                        avatar="https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png"
                        date="2024-03-12T10:00:00Z"
                        content="SimpyUI is looking great!"
                        image="https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop"
                        stats={{
                            replies: 42,
                            reposts: 28,
                            likes: 350,
                            views: 12500,
                        }}
                        theme="dark"
                    />
                </div>
            </div>
        </div>
    );
}
