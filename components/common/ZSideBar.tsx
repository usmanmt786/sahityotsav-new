"use client";

import { Sidebar } from "primereact/sidebar";
import { ReactNode } from "react";
import { MdClose } from "react-icons/md";

import "primereact/resources/themes/lara-light-cyan/theme.css";

type ZDialogProps = {
    onHide: () => void;
    visible: boolean;
    header:string,
    children: ReactNode;
    dismissable?: boolean;
    disableClose?: boolean;
    // Add other props as needed
  };

  const ZSideBar: React.FC<ZDialogProps> = (props) => {
    return (
        <Sidebar onHide={props.onHide}
            visible={props.visible}
            className="w-11/12 md:w-7/12 lg:w-5/12 xl:w-4/12"
        position="right"
        header={<h1 className="text-2xl font-bold border-b pb-3 text-primaryDark">{props.header}</h1>}
            
        >
            { props.children}
            </Sidebar>
    );
}

export default ZSideBar;