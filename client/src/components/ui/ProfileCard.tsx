import githubLogo from '@/assets/logo/github.png';
import type { TeamMemberProps } from '@/lib/utils';

const TeamMember = ({ image, name, role, githubLink, description }: TeamMemberProps) => {
    const preventContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
    };

    return (
        <div className='cardbase'>
            <img
                src={image}
                alt={`${name}'s profile image`}
                onContextMenu={preventContextMenu}
                draggable={false}
                className="relative inset-0 w-full h-92 rounded-[46px] p-2 object-cover"
            />

            <div className='relative flex items-center mx-5 my-2 font-satoshi'>
                <div className=''>
                    <p className="text-xl font-semibold text-accent">{name}</p>
                    <p className="text-accent/60 font-geist-mono text-sm">{role}</p>
                </div>
                <button
                    onClick={() => window.open(githubLink, '_blank')}
                    className="flex justify-center items-center cursor-pointer ml-auto w-18 bg-primary/70 rounded-lg h-11"
                    aria-label="Open GitHub profile"
                >
                    <img
                        src={githubLogo}
                        alt="GitHub logo"
                        onContextMenu={preventContextMenu}
                        draggable={false}
                        className="w-8 rounded-xl"
                    />
                </button>
            </div>
            <p className='text-white/70 text-[14px] px-5 tracking-tight pt-3 font-outfit'>
                {description}
            </p>
        </div>
    );
    // return (
    //     <div className="cardbase">
    //         <div className="shine"></div>
    //         <img src={image} alt={`${name}'s profile image`} onContextMenu={(e) => { e.preventDefault() }} draggable={false} className="w-290 rounded-2xl"></img>
    //         <div className="flex items-center mt-5 ml-4">
    //             <div>
    //                 <span>
    //                     <p className="text-xl text-[#FF6B4A]">{name}</p>
    //                 </span>
    //                 <p className="text-[#EE441C]">{role}</p>
    //             </div>
    //             <button
    //                 onClick={() => window.open(githubLink, '_blank')}
    //                 className="flex mr-2 justify-center items-center cursor-pointer ml-auto w-18 bg-[#111111] rounded-lg h-11"
    //                 aria-label="Open GitHub profile"
    //             >
    //                 <img src={githubLogo} alt="GitHub logo" onContextMenu={(e) => { e.preventDefault(); }} draggable={false} className="w-8 rounded-xl" />
    //             </button>
    //         </div>
    //     </div>
    // )
}

export default TeamMember;