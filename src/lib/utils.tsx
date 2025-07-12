import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CalendarSearchIcon, HouseIcon, UsersRoundIcon } from "lucide-react";
import { ReactNode } from "react";

import pu from '@/assets/team/pu.png';
import pain from '@/assets/team/pain.jpg';
import cv from '@/assets/team/cv.webp';
import pk from '@/assets/team/pk.png';
import ph from '@/assets/team/ph.png';
import bac from '@/assets/team/bac.webp';
import ad from '@/assets/team/ad.png';

const cn = (...inputs: ClassValue[]): string => {
    return twMerge(clsx(inputs));
};

const NAVBAR_ITEMS: NavbarItem[] = [
    { label: "Home", route: "/", icon: <HouseIcon className="h-5 w-5" /> },
    { label: "Track Attendance", route: "/tracker", icon: <CalendarSearchIcon className="h-5 w-5" /> },
    { label: "Team", route: "/team", icon: <UsersRoundIcon className="h-5 w-5" /> },
] as const;

const TEAM_MEMBERS: TeamMember[] = [
    { image: pu, name: "Pranav Unni", role: "Gang Leader", githubLink: "https://github.com/PranavU-Coder" },
    { image: pain, name: "Honored One", role: "Gang Co-Leader", githubLink: "https://github.com/FirezTheGreat" },
    { image: cv, name: "Chatur Vasireddy", role: "Gang Co-Leader", githubLink: "https://github.com/ChaturVasireddy" },
    { image: pk, name: "Pranav Kumar", role: "Gang Member", githubLink: "https://github.com/Pranav-Kumar14" },
    { image: ph, name: "PixelHalide", role: "Gang Member", githubLink: "https://github.com/PixelHalide" },
    { image: bac, name: "bang-a-cat", role: "Gang Member", githubLink: "https://github.com/bongacat" },
    { image: ad, name: "Orca", role: "Gang Member", githubLink: "https://github.com/ObnoxiousOrca" }
];

type NavbarItem = {
    label: string;
    route: string;
    icon: ReactNode;
};

type TeamMember = {
    image: string;
    name: string;
    role: string;
    githubLink: string;
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 
const NO_OF_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAYS = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export { NAVBAR_ITEMS, TEAM_MEMBERS, MONTHS, DAYS, NO_OF_DAYS, cn };