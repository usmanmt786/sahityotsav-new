import { ModuleType } from "@/types/modules";
import { signal } from "@preact/signals-react";

type RowActionType = {
    type:ModuleType;
    action:"add" |"edit" | "delete";
    data:any;
}

export const rowUpdateSignal = signal<RowActionType| null>(null);

export function disposeRowUpdate(){
    rowUpdateSignal.value = null
}