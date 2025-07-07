import '@/index.css';
import githubLogo from '@/assets/logo/logo.png';

type CardProps = {
    image: string;
    name: string;
    role: string;
    githubLink: string;
}

const TeamMember = ({ image, name, role, githubLink }: CardProps) => {
    return (
        <div className="cardbase p-2">
            <div className="shine"></div>
            <img src={image} alt={`${name}'s profile image`} onContextMenu={(e) => { e.preventDefault() }} draggable={false} className="w-290 rounded-2xl"></img>
            <div className="flex items-center mt-5 ml-4">
                <div>
                    <strong>
                        <p className="text-xl text-[#FF6B4A]">{name}</p>
                    </strong>
                    <p className="text-[#EE441C]">{role}</p>
                </div>
                <button
                    onClick={() => window.open(githubLink, '_blank')}
                    className="flex mr-2 justify-center items-center cursor-pointer ml-auto w-18 bg-[#111111] rounded-lg h-11"
                    aria-label="Open GitHub profile"
                >
                    <img src={githubLogo} alt="GitHub logo" onContextMenu={(e) => { e.preventDefault(); }} draggable={false} className="w-8 rounded-xl" />
                </button>
            </div>
        </div>
    )
}

export default TeamMember;