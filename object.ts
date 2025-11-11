type Type = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";

interface Object {
    /** 
     * @returns If this Object has this proptery , does not check for if it was inherited.
    */
    //% helper=_has
    hasOwnProperty(tag:any):boolean

    /** 
     * @return If this object has this propertu
    */
    //%helper=_has
    hasOwn(tag:any):boolean

    /**
     * @returns if this object is defined.
     */
    //%helper=_defined
    isDefined():boolean

    //%helper=_isnumber
    isNumber():boolean;
    //%helper=_isboolean
    isBoolean():boolean;
    //%helper=_isstring
    isString():boolean;
    //%helper=_isobject
    isObject():boolean;
    //%helper=_type
    getType():Type;

    /**
     * @returns if this Object is a function
     */
    //%helper=_callable
    isCallable():boolean;
    //%helper=_array
    isArray():boolean
}

namespace Object {
    export function hasOwnProperty(obj:any,tag:any) {return helpers._has(obj,tag)}
}

namespace helpers {
    export function _has(obj:any,tag:any) {
        return obj[tag] !== undefined
    }
    export function _defined(obj:any) {
        return obj !== undefined && obj !== null
    }
    export function _isnumber(obj:any) {return typeof obj == "number"}
    export function _isstring(obj: any) { return typeof obj == "string" }
    export function _isboolean(obj: any) { return typeof obj == "boolean" }
    export function _isobject(obj: any) { return typeof obj == "object" }
    export function _type(obj:any) { return typeof obj}
    export function _callable(obj:any) {return typeof obj == "function"}
    export function _array(obj:any) {return Array.isArray(obj)}
}      