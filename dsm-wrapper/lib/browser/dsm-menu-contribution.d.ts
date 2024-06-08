import { MenuContribution, MenuModelRegistry } from "@theia/core/lib/common";
export declare class DSMMenuContribution implements MenuContribution {
    private commands;
    private dsmWrapperServer;
    private selectionService;
    registerMenus(menus: MenuModelRegistry): Promise<void>;
}
//# sourceMappingURL=dsm-menu-contribution.d.ts.map