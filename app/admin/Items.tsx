import { FaList } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdCategory, MdChecklistRtl, MdOutlineEventSeat, MdOutlineImageAspectRatio, MdPerson } from "react-icons/md";
import { TbPodium } from "react-icons/tb";

const MENU_ITEMS = [
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
        to: "",
        icon:<FaPeopleGroup />

    },
    {
        name: "Program List",
        to: "",
        icon: <FaList />

    },
    {
        name: "Stages",
        to: "",
        icon:<TbPodium />

    },
    {
        name: "Results",
        to: "",
        icon: <MdChecklistRtl />

    },
    {
        name: "Posters",
        to: "",
        icon: <MdOutlineImageAspectRatio />

    },
   
   
];

export { MENU_ITEMS };