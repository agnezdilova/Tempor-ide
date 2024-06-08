"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var browser_1 = require("@theia/core/lib/browser");
var DSMDialog = /** @class */ (function (_super) {
    __extends(DSMDialog, _super);
    function DSMDialog(parameters) {
        var _this = _super.call(this, {
            title: "Enter parameters"
        }) || this;
        _this.parameters = parameters;
        _this.fields = [];
        var lastParameter = parameters[parameters.length - 1];
        parameters.forEach(function (parameter) {
            if (parameter.type == "string" /* String */ || parameter.type == "number" /* Number */) {
                _this.fields.push(_this.addInputField(parameter));
            }
            else if (parameter.type == "boolean" /* Boolean */) {
                _this.fields.push(_this.addSelectField(parameter));
            }
            if (parameter != lastParameter) {
                _this.addSeparator();
            }
        });
        _this.appendAcceptButton();
        return _this;
    }
    DSMDialog_1 = DSMDialog;
    Object.defineProperty(DSMDialog.prototype, "value", {
        get: function () {
            var result = '{';
            for (var i = 0; i < this.fields.length - 1; i++) {
                var json_1 = DSMDialog_1.jsonify(this.fields[i], this.parameters[i]);
                if (json_1) {
                    result += json_1;
                }
            }
            var lastIndex = this.fields.length - 1;
            var json = DSMDialog_1.jsonify(this.fields[lastIndex], this.parameters[lastIndex]);
            if (json) {
                result += json;
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    DSMDialog.prototype.addInputField = function (parameter) {
        var field = document.createElement('input');
        field.type = 'text';
        field.className = 'theia-input';
        field.setAttribute('style', 'flex: 0;');
        field.placeholder = parameter.name;
        this.contentNode.appendChild(field);
        return field;
    };
    DSMDialog.prototype.addSelectField = function (parameter) {
        var label = document.createElement('div');
        label.textContent = parameter.name;
        label.title = parameter.name;
        label.setAttribute('style', 'margin-left: 5px; margin-bottom: 5px;');
        var field = document.createElement('select');
        field.className = 'theia-select';
        field.setAttribute('style', 'flex: 0;');
        var noneOption = document.createElement('option');
        noneOption.text = "";
        noneOption.value = "";
        var trueOption = document.createElement('option');
        trueOption.text = "true";
        trueOption.value = "true";
        var falseOption = document.createElement('option');
        falseOption.text = 'false';
        falseOption.value = 'false';
        field.add(noneOption, null);
        field.add(trueOption, null);
        field.add(falseOption, null);
        this.contentNode.appendChild(label);
        this.contentNode.appendChild(field);
        return field;
    };
    DSMDialog.prototype.addSeparator = function () {
        var div = document.createElement('div');
        div.setAttribute('style', 'margin-top: 10px;');
        this.contentNode.appendChild(div);
    };
    DSMDialog.jsonify = function (field, parameter) {
        if (field instanceof HTMLInputElement) {
            if (parameter.type == "number" /* Number */) {
                var number = Number(field.value);
                if (!isNaN(number)) {
                    return "\"" + parameter + "\":" + number + ",";
                }
                else {
                    console.log(field.value + " is not a number");
                }
            }
            else {
                return "\"" + parameter + "\":\"" + field.value + "\",";
            }
        }
        else if (field instanceof HTMLSelectElement) {
            return "\"" + parameter + "\":" + field.value + ",";
        }
        else {
            console.log("Unknown HTML element for parameter " + parameter.name);
        }
        return undefined;
    };
    var DSMDialog_1;
    DSMDialog = DSMDialog_1 = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [Array])
    ], DSMDialog);
    return DSMDialog;
}(browser_1.AbstractDialog));
exports.DSMDialog = DSMDialog;
//# sourceMappingURL=dsm-dialog.js.map