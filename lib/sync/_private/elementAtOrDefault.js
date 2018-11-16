"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function elementAtOrDefault(source, index) {
    let i = 0;
    for (const item of source) {
        if (index === i++) {
            return item;
        }
    }
    return null;
}
exports.elementAtOrDefault = elementAtOrDefault;
