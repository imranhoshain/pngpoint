/*
 * FIX unused JS / enormous bundle:
 * Changed from `export const ReactIcons = { ... }` (object) to individual
 * named exports. The object pattern defeats webpack tree-shaking — it was
 * forcing the entire react-icons library into the bundle regardless of which
 * icons were actually used.
 *
 * With named exports, webpack can statically analyse imports and eliminate
 * every icon not referenced anywhere in your code.
 *
 * NOTE: The ReactIcons object is kept at the bottom for backwards compatibility
 * so existing components need no changes. But migrate them over time to:
 *
 *   BEFORE: import { ReactIcons } from "@/utils/reactIcons"
 *           const { IoSearchOutline } = ReactIcons
 *
 *   AFTER:  import { IoSearchOutline } from "@/utils/reactIcons"
 *        or import { IoSearchOutline } from "react-icons/io5"  ← best
 */

import { FaLongArrowAltLeft, FaUsersCog, FaTags, FaFacebook, FaPinterest, FaInstagram } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { FaImages, FaRegCircleUser, FaXTwitter } from "react-icons/fa6";
import { BiSolidDashboard } from "react-icons/bi";
import { AiOutlineCheck, AiOutlineFileText } from "react-icons/ai";
import { TbArrowsExchange } from "react-icons/tb";
import { ImProfile } from "react-icons/im";
import { HiOutlineMenu, HiOutlineDownload, HiChevronDown } from "react-icons/hi";
import { HiMiniDocumentDuplicate } from "react-icons/hi2";
import { IoMdEye, IoMdEyeOff, IoMdClose, IoIosSettings, IoMdCloudUpload } from "react-icons/io";
import { IoSearchOutline, IoInformationCircleOutline } from "react-icons/io5";
import { PiImageSquareLight } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GoArrowDown } from "react-icons/go";

/*
 * Individual named re-exports — enables tree-shaking per icon.
 * Webpack eliminates any icon not imported anywhere in the app.
 */
export {
    GoArrowDown,
    RiDeleteBin6Line,
    PiImageSquareLight,
    AiOutlineFileText,
    IoInformationCircleOutline,
    IoSearchOutline,
    FaInstagram,
    FaPinterest,
    FaFacebook,
    FaXTwitter,
    HiOutlineDownload,
    HiMiniDocumentDuplicate,
    FaTags,
    HiOutlineMenu,
    FaRegCircleUser,
    FaUsersCog,
    ImProfile,
    TbArrowsExchange,
    FaImages,
    AiOutlineCheck,
    FiLoader,
    BiSolidDashboard,
    IoMdCloudUpload,
    IoIosSettings,
    FaLongArrowAltLeft,
    IoMdEye,
    IoMdEyeOff,
    IoMdClose,
    HiChevronDown,
};

/*
 * Backwards-compatible object export — existing components using
 * `const { FaXTwitter } = ReactIcons` continue working without changes.
 */
export const ReactIcons = {
    GoArrowDown,
    RiDeleteBin6Line,
    PiImageSquareLight,
    AiOutlineFileText,
    IoInformationCircleOutline,
    IoSearchOutline,
    FaInstagram,
    FaPinterest,
    FaFacebook,
    FaXTwitter,
    HiOutlineDownload,
    HiMiniDocumentDuplicate,
    FaTags,
    HiOutlineMenu,
    FaRegCircleUser,
    FaUsersCog,
    ImProfile,
    TbArrowsExchange,
    FaImages,
    AiOutlineCheck,
    FiLoader,
    BiSolidDashboard,
    IoMdCloudUpload,
    IoIosSettings,
    FaLongArrowAltLeft,
    IoMdEye,
    IoMdEyeOff,
    IoMdClose,
    HiChevronDown,
};