import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CalendarSearchIcon, HouseIcon, UsersRoundIcon } from "lucide-react";
import { ReactNode } from "react";

import pu from '@/assets/team/pu.png';
import pain from '@/assets/team/pain.png';
import cv from '@/assets/team/cv.webp';
import pk from '@/assets/team/pk.png';
import ph from '@/assets/team/ph.png';
import bac from '@/assets/team/bac.webp';
import ad from '@/assets/team/ad.png';

const NAVBAR_ITEMS: NavbarItem[] = [
    { label: "Home", route: "/", icon: <HouseIcon className="h-5 w-5" /> },
    { label: "Track Attendance", route: "/tracker", icon: <CalendarSearchIcon className="h-5 w-5" /> },
    { label: "Team", route: "/team", icon: <UsersRoundIcon className="h-5 w-5" /> },
] as const;

const TEAM_MEMBERS: TeamMemberProps[] = [
    { image: pu, name: "Pranav Unni", role: "Team Lead", githubLink: "https://github.com/PranavU-Coder", description: 'Leads with clarity and vision; ensures smooth workflow and high-quality output.' },
    { image: pain, name: "Honored One", role: "Team Co-Lead", githubLink: "https://github.com/FirezTheGreat", description: 'Focused on performance and scalability. Optimizes performance and mentors the team.' },
    { image: cv, name: "Chatur Vasireddy", role: "Team Co-Lead", githubLink: "https://github.com/ChaturVasireddy", description: '' },
    { image: pk, name: "Pranav Kumar", role: "Team Member", githubLink: "https://github.com/Pranav-Kumar14", description: '' },
    { image: ph, name: "PixelHalide", role: "Team Member", githubLink: "https://github.com/PixelHalide", description: '' },
    { image: bac, name: "bang-a-cat", role: "Team Member", githubLink: "https://github.com/bongacat", description: '' },
    { image: ad, name: "Orca", role: "Team Member", githubLink: "https://github.com/ObnoxiousOrca", description: '' }
];

const RESPONSE_MESSAGE = {
    otpSuccess: 'OTP sent successfully!'
}

const cn = (...inputs: ClassValue[]): string => {
    return twMerge(clsx(inputs));
};

type NavbarItem = {
    label: string;
    route: string;
    icon: ReactNode;
};

type TeamMemberProps = {
    image: string;
    name: string;
    role: string;
    githubLink: string;
    description: string;
};

export { NAVBAR_ITEMS, TEAM_MEMBERS, RESPONSE_MESSAGE, cn };
export type { TeamMemberProps };