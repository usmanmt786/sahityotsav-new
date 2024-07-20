import { FaList } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdChecklistRtl, MdPerson } from "react-icons/md";
import { TbPodium } from "react-icons/tb";

const MENU_ITEMS = [
    {
        name: "Programs",
        to: "",
        icon: <MdPerson />
    },

    {
        name: "Participants",
        to: "",
        icon:<FaPeopleGroup />

    },
    {
        name: "Results",
        to: "",
        icon: <MdChecklistRtl />

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
];

export { MENU_ITEMS };