// Package Imports: jcore.filesystem
import _File_System from "snipercode.filesystem";

// Package Extraction and function definition
const
    {
        File_System
    } = _File_System,

    // Constant Initialization
    fs = File_System.fs,
    path = File_System.path,
    /**  
     * @function UcFirst
     * @description Capitalizes the first letter of a string
     * @param {string} str - The string to capitalize
     * @returns {string} The capitalized string
     */
    UcFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1)
    ;

export {
    File_System,
    fs,
    path,
    UcFirst
}
