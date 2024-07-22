import { signal } from "@preact/signals-react";

type RowActionType = {
    type:"category" | "program";
    action:"edit" | "delete";
    data:any;
}

export const rowUpdateSignal = signal<RowActionType| null>(null);

