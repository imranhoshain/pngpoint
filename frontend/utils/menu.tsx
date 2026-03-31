import { MenuType } from "@/types/menuType";
import { IoIosSettings, IoMdCloudUpload, IoMdClose } from "react-icons/io";
import { BiSolidDashboard } from "react-icons/bi";
import { FiLoader } from "react-icons/fi";
import { AiOutlineCheck } from "react-icons/ai";
import { FaImages } from "react-icons/fa6";
import { TbArrowsExchange } from "react-icons/tb";
import { ImProfile } from "react-icons/im";
import { FaUsersCog } from "react-icons/fa";
import { HiMiniDocumentDuplicate } from "react-icons/hi2";
export const AdminMenu: MenuType[] = [
    {
        id: 1,
        name: "dashboard",
        path: "/",
        icon: <BiSolidDashboard className="text-xl xl:text-2xl" />,
    },
    {
        id: 2,
        name: "upload images",
        path: "/upload-images/",
        icon: <IoMdCloudUpload className="text-xl xl:text-2xl" />
    },
    {
        id: 3,
        name: "total images",
        path: "/total-images/",
        icon: <FaImages className="text-lg xl:text-[21px]" />
    },
    {
        id: 4,
        name: "approved images",
        path: "/approved-images/",
        icon: <AiOutlineCheck className="text-lg xl:text-[22px]" />
    },
    {
        id: 5,
        name: "pending images",
        path: "/pending-images/",
        icon: <FiLoader className="text-xl xl:text-2xl" />
    },
    {
        id: 6,
        name: "rejected images",
        path: "/rejected-images/",
        icon: <IoMdClose className="text-2xl xl:text-[26px]" />
    },
    {
        id: 7,
        name: "Categories",
        path: "/categories/",
        icon: <HiMiniDocumentDuplicate className="text-2xl xl:text-[26px]" />
    },
    {
        id: 8,
        name: "Sub Categories",
        path: "/sub-categories/",
        icon: <HiMiniDocumentDuplicate className="text-2xl xl:text-[26px]" />
    },
    {
        id: 9,
        name: "settings",
        icon: <IoIosSettings className="text-xl xl:text-2xl" />,
        submenu: [
            {
                id: 1,
                name: "profile",
                path: "/profile/",
                icon: <ImProfile className="text-lg" />
            },
            {
                id: 2,
                name: "chnage password",
                path: "/chnage-password/",
                icon: <TbArrowsExchange className="text-2xl" />
            },
            {
                id: 3,
                name: "users",
                path: "/users/",
                icon: <FaUsersCog />
            },
            {
                id: 4,
                name: "Cloudflare Api",
                path: "/cloudflare-configuration/",
                icon: <FaUsersCog />
            },
        ],
    },
];

export const UserMenu: MenuType[] = [
    {
        id: 1,
        name: "dashboard",
        path: "/",
        icon: <BiSolidDashboard className="text-xl xl:text-2xl" />,
    },
    {
        id: 2,
        name: "upload images",
        path: "/upload-images/",
        icon: <IoMdCloudUpload className="text-xl xl:text-2xl" />
    },
    {
        id: 3,
        name: "total images",
        path: "/total-images/",
        icon: <FaImages className="text-lg xl:text-[21px]" />
    },
    {
        id: 4,
        name: "approved images",
        path: "/approved-images/",
        icon: <AiOutlineCheck className="text-lg xl:text-[22px]" />
    },
    {
        id: 5,
        name: "pending images",
        path: "/pending-images/",
        icon: <FiLoader className="text-xl xl:text-2xl" />
    },
    {
        id: 6,
        name: "rejected images",
        path: "/rejected-images/",
        icon: <IoMdClose className="text-2xl xl:text-[26px]" />
    },
    {
        id: 7,
        name: "settings",
        icon: <IoIosSettings className="text-xl xl:text-2xl" />,
        submenu: [
            {
                id: 1,
                name: "profile",
                path: "/profile/",
                icon: <ImProfile className="text-lg" />
            },
            {
                id: 2,
                name: "chnage password",
                path: "/chnage-password/",
                icon: <TbArrowsExchange className="text-2xl" />
            },
        ],
    },
];
