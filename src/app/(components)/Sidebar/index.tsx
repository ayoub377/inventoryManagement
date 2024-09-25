"use client";
import {Archive, CircleDollarSign, Layout, LucideIcon, Menu, SlidersHorizontal, User,Clipboard} from "lucide-react";
import {useAppDispatch, useAppSelector} from "@/app/redux";
import {setIsSideBarCollapsed} from "@/state";
import {usePathname} from "next/navigation";
import Link from "next/link";

interface SidebarLinkProps{
    href: string;
    icon: LucideIcon;
    label: string;
    isCollapsed:boolean
}

const SidebarLink = ({
    href,
    icon: Icon,
    label,
    isCollapsed
}: SidebarLinkProps)=> {
    const pathname = usePathname();
    const isActive = pathname === href || (pathname === "/" && href === "/dashboard");

    return (
        <Link href={href}>
            <div className={`cursor-pointer flex items-center ${isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"}
            hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${isActive ? "bg-blue-200 text-white": ""}`}>
                <Icon className="w-6 h-6 !text-gray-700"/>
                <span className={`${isCollapsed ? "hidden" : "block"} font-medium text-gray-700`}>{label}</span>
            </div>
        </Link>
    )
}

function Sidebar() {
    const dispatch = useAppDispatch();
    const isSideBarCollapsed = useAppSelector((state) =>state.global.isSideBarCollapsed);

    const toggleSidebar = ()=>{
        dispatch(setIsSideBarCollapsed(!isSideBarCollapsed));
    }

    const sidebarClassNames = `fixed flex flex-col ${isSideBarCollapsed ? "w-0 md:16" : "w-72 md:w-64"} bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;
  return (
      <div className={sidebarClassNames}>
          {/*Top Logo*/}
          <div className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${isSideBarCollapsed ? "px-5" : "px-8"}`}>
              <div>Logo</div>
              <h1 className={`${isSideBarCollapsed ? "hidden" : "block"} font-extrabold text-2xl`}>EdStock</h1>

          <button className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100" onClick={() => {toggleSidebar()}}>
              <Menu className="w-4 h-4"></Menu>
          </button>
      </div>
              {/* LInks */}
          <div className="flex-grow mt-8">
              <SidebarLink href="/dashboard" icon={Layout} label="Dashboard" isCollapsed={isSideBarCollapsed}/>
              <SidebarLink href="/inventory" icon={Archive} label="Inventory" isCollapsed={isSideBarCollapsed}/>
              <SidebarLink href="/products" icon={Clipboard} label="Products" isCollapsed={isSideBarCollapsed}/>
              <SidebarLink href="/users" icon={User} label="Users" isCollapsed={isSideBarCollapsed}/>
              <SidebarLink href="/Settings" icon={SlidersHorizontal} label="settings" isCollapsed={isSideBarCollapsed}/>
              <SidebarLink href="/expenses" icon={CircleDollarSign} label="Expenses" isCollapsed={isSideBarCollapsed}/>
          </div>
          {/*Footer */}
          <div className={`${isSideBarCollapsed ? "hidden" : "block"}`}>
              <p className="text-center text-xs text-gray-500">© 2024 EdStock. All rights reserved</p>
          </div>
      </div>

  );
}

export default Sidebar;