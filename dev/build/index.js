"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = void 0;
const world = 'world';
function hello(who = world) {
    // write current date
    console.log(new Date().toISOString());
    return `Hello ${who}! `;
}
exports.hello = hello;
