import { FaList, FaUserShield } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { HiMiniRectangleGroup, HiPaintBrush } from "react-icons/hi2";
import { MdCategory, MdChecklistRtl, MdOutlineEventSeat, MdOutlineImageAspectRatio, MdPerson, MdSettings } from "react-icons/md";

const MENU_ITEMS = [
    {
        name: "Teams",
        to: "/admin/teams",
        icon: <HiMiniRectangleGroup />
    },
    {
        name: "Categories",
        to: "/admin/categories",
        icon: <MdCategory />
    },
    {
        name: "Programs",
        to: "/admin/programs",
        icon: <MdOutlineEventSeat />
    },

    {
        name: "Participants",
        to: "/admin/participants",
        icon:<FaPeopleGroup />

    },
    {
        name: "Program List",
        to: "/admin/programlist",
        icon: <FaList />

    },
    // {
    //     name: "Stages",
    //     to: "/admin/stages/",
    //     icon:<TbPodium />

    // },
    {
        name: "Results",
        to: "/admin/results",
        icon: <MdChecklistRtl />

    },
    {
        name: "Posters",
        to: "/admin/posters",
        icon: <MdOutlineImageAspectRatio />

    },
   
   
];


const ADMIN_MENU = [
    {
        name: "Access Users",
        to: "/admin/users",
        icon: <FaUserShield />
    },
    {
        name: "Configs",
        to: "/admin/configs",
        icon: <MdSettings />
    },
    {
        name: "Customize",
        to: "/admin/customize",
        icon: <HiPaintBrush />
    },

];

export { MENU_ITEMS,ADMIN_MENU };