import { signal } from "@preact/signals-react";

type RowActionType = {
    action:"edit" | "delete";
    data:any;
}

export const categoryRowSignal = signal<RowActionType| null>(null);

