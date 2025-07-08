import useAppSeo from "@/lib/hooks/useAppSeo";

const LogIn = () => {
    useAppSeo({
        title: 'Log In - Manipal OSL',
        description: 'Access your Manipal OSL account to track and manage attendance effortlessly.',
    });

    return (
        <main>
            <div className="relative h-screen flex items-end pl-[5vw] pb-[10vh]">
                <h1 className="m-0 text-[15vw] font-light bg-gradient-to-r from-[#FF6B4A] to-[#EE441C] bg-[length:250%_100%] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,107,74,0.5)] animate-[shimmer_5s_ease-in-out_infinite]">Log In</h1>
            </div>
        </main>
    );
}

export default LogIn;