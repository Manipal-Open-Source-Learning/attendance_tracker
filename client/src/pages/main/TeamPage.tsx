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
            <div className="h-screen text-white pt-25">
                <div className="flex flex-wrap gap-3 justify-center">
                    {TEAM_MEMBERS.map((member) => (
                        <TeamMember
                            key={member.name}
                            image={member.image}
                            name={member.name}
                            role={member.role}
                            githubLink={member.githubLink}
                            description={member.description}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Team;