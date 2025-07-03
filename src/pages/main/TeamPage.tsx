import useAppSeo from '@/lib/hooks/useAppSeo';
import TeamMember from '@/components/ui/ProfileCard';
import { TEAM_MEMBERS } from '@/lib/utils';

const Team = () => {
    useAppSeo({
        title: 'Team - Manipal OSL',
        description: 'Meet the team behind the Manipal OSF Attendance Tracker, a student-led initiative to simplify attendance management.',
    });

    return (
        <main>
            <div className="relative h-screen flex items-end pl-[5vw] pb-[10vh]">
                <h1 className="m-0 text-[15vw] font-light bg-gradient-to-r from-[#FF6B4A] to-accent bg-[length:250%_100%] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,107,74,0.5)] animate-[shimmer_5s_ease-in-out_infinite]">Team</h1>
            </div>
            <div className="h-screen text-white">
                <div className="flex flex-wrap gap-3 justify-center p-5">
                    {TEAM_MEMBERS.map((member) => (
                        <TeamMember
                            key={member.name}
                            image={member.image}
                            name={member.name}
                            role={member.role}
                            githubLink={member.githubLink}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Team;