"use client";

import { Dialog } from "primereact/dialog";
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

  const ZDialog: React.FC<ZDialogProps> = (props) => {8
    return (
        <Dialog onHide={props.onHide}
            visible={props.visible}
            className="w-11/12 md:w-7/12 lg:w-5/12 xl:w-4/12"
        showHeader={false} 
            dismissableMask={props.dismissable ?? true}
        >
            <main className="px-5 ">
            <section className="flex items-start justify-between pt-8 ">
                    <h1 className="text-2xl font-bold border-b pb-3 text-primaryDark">{props.header}</h1>
                    {
                        !props.disableClose &&  <button onClick={() => props.onHide()}
                        className="bg-gray-100 p-2 rounded-full border-2 border-transparent hover:border-gray-400 duration-300">
                        <MdClose className="text-xl" /></button>
                    }
                   
             </section>
            { props.children}
           </main>
            </Dialog>
    );
}

export default ZDialog;