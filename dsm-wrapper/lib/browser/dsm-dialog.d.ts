import { AbstractDialog } from "@theia/core/lib/browser";
import { DSMParameter } from "./dsm-parameter";
export declare class DSMDialog extends AbstractDialog<string> {
    private readonly fields;
    private readonly parameters;
    constructor(parameters: DSMParameter[]);
    get value(): string;
    private addInputField;
    private addSelectField;
    private addSeparator;
    private static jsonify;
}
//# sourceMappingURL=dsm-dialog.d.ts.map