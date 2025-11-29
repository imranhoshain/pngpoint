import Link from "next/link";

export const BottomBar = () => {
    return (
        <div className="flex flex-col flex-wrap justify-center items-center px-5 xl:px-10 h-[6%] xl:h-[8%] border-t overflow-hidden border-[#d6cece]">
            <p className="text-[10px] sm:text-xs lg:text-base font-normal text-center">© PNG Point 2025. All Rights Reserved. Development by <Link className="text-[#2c7faf] font-medium" href={"https://dreamlabit.com"} target="_blank">Dreamlabit</Link></p>
        </div>
    );
}