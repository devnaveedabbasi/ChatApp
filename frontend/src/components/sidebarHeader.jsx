import React from "react";
import { useLayoutStore } from "../store/useLayout";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function SidebarHeader({ title }) {
  const { isIconSidebarHide, IconSidebarToggle } = useLayoutStore();

  return (
    <div>
      <div className="p-4 border-b border-gray-300 flex justify-between items-center">
        <h1 className="text-gray-800 font-medium text-[19px]">{title}</h1>
        <div
          onClick={IconSidebarToggle}
          className="cursor-pointer p-2 md:flex hidden"
        >
          <Icon
            icon={
              isIconSidebarHide ? "ic:sharp-arrow-right" : "ic:sharp-arrow-left"
            }
            width={30}
            height={30}
            className="text-[#52AB86]"
          />
        </div>
      </div>
    </div>
  );
}
