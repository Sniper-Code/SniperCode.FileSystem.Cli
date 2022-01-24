// Package Imports 
import FsCliPackage from '../lib/package.js';

/**
 * @class Details
 * @description This class is used to display the details of the package.
 * @extends {FsCliPackage}
 */
export default class Details extends FsCliPackage {
    #Package_Json = {}
    #Details = {
        Name: "SniperCode.FileSystem.Cli"
    }
    #GetPackageJson() {
        this.#Package_Json = this.Store.get('package_json');
        if (!this.#Package_Json) {
            this.#Package_Json = {}
            this.Store.delete('package_json');
            const package_json = this.File_System.read_file('./package.json');
            if (package_json) {
                this.#Package_Json = JSON.parse(package_json);
                this.Store.set('package_json', this.#Package_Json);
            } else this.#GetPackageJson();
        } else return this.#Package_Json;
    }
    constructor() { super(); }

    getDetails() {
        const details = this.#GetPackageJson();
        this.#Details.Version = `v${details.version}`;
        this.#Details.Description = details.description;
        this.#Details.Author = details.author;
        this.#Details.Homepage = details.homepage;
        return this.#Details;
    }
}