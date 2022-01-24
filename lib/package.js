// Package Imports
import Inquirer from "inquirer";
import Config from "conf";
import Color from "colors";
import { program, Option } from 'commander'
import { File_System, Network, fs, path, UcFirst } from "./file_system.js";
import { shell_command, scan_dir_recursive_depth } from './shell_command.js'

/**
 * @class SniperCode_FsCliPackage
 * @description The Core package handler for the SniperCode.FileSystem.Cli
 */
export default class SniperCode_FsCliPackage {
    Config = Config
    Color = Color
    Inquirer = Inquirer;
    program = program;
    Option = Option;
    File_System = File_System;
    Network = Network;
    fs = fs;
    path = path;
    UcFirst = UcFirst;
    shell_command = shell_command;
    scan_dir_recursive_depth = scan_dir_recursive_depth;

    constructor() {
        this.Store = new this.Config({
            projectName: "SniperCode.FileSystem.Cli"
        });
    }
}
