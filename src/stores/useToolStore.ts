import type { ToolResponse } from "@/modules/tools/interfaces";
import { defineStore } from "pinia";

export const useToolStore = defineStore('tool', {
    state: () => ({
        tools: [] as ToolResponse[],
    })
});