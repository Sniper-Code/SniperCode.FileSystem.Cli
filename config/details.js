// Package Imports 
import FsCliPackage from '../lib/package.js';

/**
 * @class Details
 * @description This class is used to display the details of the package.
 * @extends {FsCliPackage}
 */
export default class Details extends FsCliPackage {
    Details = {
        Name: "SniperCode.FileSystem.Cli"
    }
    getDetails() {
        this.Details.Version = `v1.0.2`;
        this.Details.Description = "A command line interface for file handling using SniperCode.FileSystem";
        this.Details.Author = "Dibesh Raj Subedi";
        this.Details.Homepage = "https://github.com/Sniper-Code/SniperCode.FileSystem.Cli";
        return this.Details;
    }
}