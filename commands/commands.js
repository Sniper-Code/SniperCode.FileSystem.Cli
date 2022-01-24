// Module Imports
import FsCliPackage from '../lib/package.js';

/**
 * @class Commands
 * @description The FileSystem.Cli commands registry
 * @extends {FsCliPackage}
 */
export default class Commands extends FsCliPackage {

    constructor() { super() }

    Commands = {
        Search: () => {
            this.Inquirer.prompt([
                {
                    type: 'input',
                    name: 'dir',
                    message: 'Enter the search directory:',
                    default: './',
                },
                {
                    type: 'input',
                    name: 'search_term',
                    message: 'Enter the search term:',
                }
            ])
                .then((answers) => {
                    if (answers.dir && answers.search_term) {
                        console.log(`\n\t🔎 Searching for '${this.Color.yellow.bold(answers.search_term)}'...`);
                        const result = this.File_System.search_dir(answers.dir, answers.search_term);
                        console.log(`\n\t🔎 Search Results:`);
                        console.log(`\t📁 ${this.Color.green.bold(result.base_path)}`);
                        result.result.forEach((file) => {
                            console.log(`\t\t📄 ${this.Color.green.bold(file)}`);
                        });
                    } else {
                        console.log(`\n\t${this.Color.red.bold('Error:')} Invalid search directory or search term!`);
                    }
                })
        },
        Directory: {
            Create: () => {
                this.Inquirer.prompt([
                    {
                        type: 'input',
                        name: 'path',
                        message: 'Enter the path to the directory you want to create:',
                    }
                ]).then((answers) => {
                    if (!answers.path) {
                        console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold('No path specified!'));
                        return {
                            status: "error",
                            message: "No path specified!"
                        };
                    } else {
                        try {
                            this.File_System.mkdir(answers.path);
                            console.log(this.Color.green.bold('\n\tSuccess: ') + this.Color.yellow.bold(`📂 Directory created at ${answers.path}`));
                            console.log(this.Color.green.bold('\n\t📁 Full Path: ') + this.Color.yellow.bold(`${this.File_System.path_resolve(answers.path)}`));
                            return {
                                status: "success",
                                message: `Directory created at ${answers.path}`,
                                path: this.File_System.path_resolve(answers.path)
                            }
                        } catch (error) {
                            console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold(error.message));
                            return {
                                status: "error",
                                message: error.message
                            }
                        }
                    }
                });
            },
            Delete: () => {
                this.Inquirer.prompt([
                    {
                        type: 'input',
                        name: 'path',
                        message: 'Enter the path to the directory you want to delete:',
                    }, {
                        type: 'confirm',
                        name: 'confirm',
                        message: 'Are you sure you want to delete this directory?',
                    }
                ]).then((answers) => {
                    if (!answers.path) {
                        console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold('No path specified!'));
                        return {
                            status: "error",
                            message: "No path specified!"
                        };
                    } else {
                        try {
                            if (answers.confirm) {
                                this.File_System.delete_dir(answers.path);
                                console.log(this.Color.green.bold('\n\tSuccess: ') + this.Color.yellow.bold(`📂 Directory deleted [${answers.path}]`));
                                return {
                                    status: "success",
                                    message: `Directory deleted at ${answers.path}`,
                                    path: this.File_System.path_resolve(answers.path)
                                }
                            } else {
                                console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold('Directory not deleted!'));
                                return {
                                    status: "error",
                                    message: "Directory not deleted!"
                                }
                            }
                        } catch (error) {
                            console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold(error.message));
                            return {
                                status: "error",
                                message: error.message
                            }
                        }
                    }
                });
            },
            List: {
                Depth: () => {
                    this.Inquirer.prompt([
                        {
                            type: 'string',
                            name: 'path',
                            message: 'Enter the path to the directory you want to list:',
                            default: './'
                        }, {
                            type: 'number',
                            name: 'depth',
                            message: 'Enter the depth of the directory you want to list[number]:',
                            default: 2
                        }
                    ]).then((answers) => {
                        if (!answers.path) {
                            console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold('No path specified!'));
                            return {
                                status: "error",
                                message: "No path specified!"
                            };
                        } else {
                            try {
                                const result = this.File_System.scan_dir_recursive_depth(answers.path, answers.depth);
                                if (result.message) {
                                    throw new Error(result);
                                }
                                console.log(this.Color.green.bold('\n\tSuccess: ') + this.Color.yellow.bold(`📂 Directory list of ${this.File_System.path_resolve(answers.path)} at depth ${answers.depth}`));
                                console.log(this.scan_dir_recursive_depth(this.Color, result, this.File_System.dir_name(this.File_System.path_resolve(answers.path)), false));
                                return {
                                    status: "success",
                                    message: `Directory listed at ${answers.path}`,
                                    response: result
                                }
                            } catch (error) {
                                console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold(error.message.replace('Error: ', '')));
                                return {
                                    status: "error",
                                    message: error.message
                                }
                            }
                        }
                    });
                },
                Recursive: () => {
                    this.Inquirer.prompt([
                        {
                            type: 'string',
                            name: 'path',
                            message: 'Enter the path to the directory you want to list:',
                            default: './'
                        }
                    ]).then((answers) => {
                        if (!answers.path) {
                            console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold('No path specified!'));
                            return {
                                status: "error",
                                message: "No path specified!"
                            };
                        } else {
                            try {
                                const result = this.File_System.scan_dir_recursive(answers.path);
                                if (result.message) {
                                    throw new Error(result);
                                }
                                console.log(this.Color.green.bold('\n\tSuccess: ') + this.Color.yellow.bold(`📂 Directory list of ${this.File_System.path_resolve(answers.path)}`));
                                for (let i = 0; i < result.length; i++) {
                                    console.log(result[i]);
                                }
                                return {
                                    status: "success",
                                    message: `Directory listed at ${answers.path}`,
                                    response: result
                                }
                            } catch (error) {
                                console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold(error.message.replace('Error: ', '')));
                                return {
                                    status: "error",
                                    message: error.message
                                }
                            }
                        }
                    });
                },
                Default: () => {
                    this.Inquirer.prompt([
                        {
                            type: 'string',
                            name: 'path',
                            message: 'Enter the path to the directory you want to list:',
                            default: './'
                        }]).then((answers) => {
                            if (!answers.path) {
                                console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold('No path specified!'));
                                return {
                                    status: "error",
                                    message: "No path specified!"
                                };
                            } else {
                                try {
                                    const result = this.File_System.scan_dir(answers.path);
                                    if (result.message) {
                                        throw new Error(result);
                                    }
                                    console.log(this.Color.green.bold('\n\tSuccess: ') + this.Color.yellow.bold(`📂 Directory list of ${this.File_System.path_resolve(answers.path)}`));
                                    for (let i = 0; i < result.length; i++) {
                                        console.log(result[i]);
                                    }
                                    return {
                                        status: "success",
                                        message: `Directory listed at ${answers.path}`,
                                        response: result
                                    }
                                } catch (error) {
                                    console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold(error.message.replace('Error: ', '')));
                                    return {
                                        status: "error",
                                        message: error.message
                                    }
                                }
                            }
                        });
                }
            },
            Move: () => {
                this.Inquirer.prompt([
                    {
                        type: 'string',
                        name: 'path',
                        message: 'Enter the source directory path:',
                        default: './'
                    }, {
                        type: 'string',
                        name: 'new_path',
                        message: 'Enter the destination path:',
                        default: './'
                    }
                ]).then((answers) => {
                    if (!answers.path || !answers.new_path) {
                        console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold('No path specified!'));
                        return {
                            status: "error",
                            message: "No path specified!"
                        };
                    } else {
                        try {
                            this.File_System.move_dir(answers.path, answers.new_path);
                            console.log(this.Color.green.bold('\n\tSuccess: ') + this.Color.yellow.bold(`📂 Directory moved from ${this.File_System.path_resolve(answers.path)} to ${this.File_System.path_resolve(answers.new_path)}`));
                            return {
                                status: "success",
                                message: `Directory moved from ${answers.path} to ${answers.new_path}`,
                            }
                        } catch (error) {
                            console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold(error.message.replace('Error: ', '')));
                            return {
                                status: "error",
                                message: error.message
                            }
                        }
                    }
                });
            },
            Rename: () => {
                this.Inquirer.prompt([
                    {
                        type: 'string',
                        name: 'path',
                        message: 'Enter the path to the directory you want to rename:',
                        default: './'
                    }, {
                        type: 'string',
                        name: 'new_name',
                        message: 'Enter the new name:',
                        default: './'
                    }
                ]).then((answers) => {
                    if (!answers.path || !answers.new_name) {
                        console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold('No path specified!'));
                        return {
                            status: "error",
                            message: "No path specified!"
                        };
                    } else {
                        try {
                            this.File_System.rename_dir(answers.path, answers.new_name);
                            console.log(this.Color.green.bold('\n\tSuccess: ') + this.Color.yellow.bold(`📂 Directory renamed from ${this.File_System.path_resolve(answers.path)} to ${this.File_System.path_resolve(answers.new_name)}`));
                            return {
                                status: "success",
                                message: `Directory renamed from ${answers.path} to ${answers.new_name}`,
                            }
                        } catch (error) {
                            console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold(error.message.replace('Error: ', '')));
                            return {
                                status: "error",
                                message: error.message
                            }
                        }
                    }
                });
            },
            Copy: () => {
                this.Inquirer.prompt([
                    {
                        type: 'string',
                        name: 'path',
                        message: 'Enter the path to the directory you want to copy:',
                        default: './'
                    }, {
                        type: 'string',
                        name: 'new_path',
                        message: 'Enter the new path:',
                        default: './'
                    }
                ]).then((answers) => {
                    if (!answers.path || !answers.new_path) {
                        console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold('No path specified!'));
                        return {
                            status: "error",
                            message: "No path specified!"
                        };
                    } else {
                        try {
                            this.File_System.copy_dir(answers.path, answers.new_path);
                            console.log(this.Color.green.bold('\n\tSuccess: ') + this.Color.yellow.bold(`📂 Directory copied from ${this.File_System.path_resolve(answers.path)} to ${this.File_System.path_resolve(answers.new_path)}`));
                            return {
                                status: "success",
                                message: `Directory copied from ${answers.path} to ${answers.new_path}`,
                            }
                        } catch (error) {
                            console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold(error.message.replace('Error: ', '')));
                            return {
                                status: "error",
                                message: error.message
                            }
                        }
                    }
                });
            },
            Exists: () => {
                this.Inquirer.prompt([
                    {
                        type: 'string',
                        name: 'path',
                        message: 'Enter the path to the directory you want to check:',
                        default: './'
                    }
                ]).then((answers) => {
                    if (!answers.path) {
                        console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold('No path specified!'));
                        return {
                            status: "error",
                            message: "No path specified!"
                        };
                    } else {
                        try {
                            if (this.File_System.dir_exists(answers.path)) {
                                console.log(this.Color.green.bold('\n\tSuccess: ') + this.Color.yellow.bold(`📂 Directory exists at ${this.File_System.path_resolve(answers.path)}`));
                                return {
                                    status: "success",
                                    message: `Directory exists at ${answers.path}`,
                                }
                            } else {
                                console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold(`📂 No Directory doesn't exist.`));
                                return {
                                    status: "success",
                                    message: `Directory doesn't exist at ${answers.path}`,
                                }
                            }
                        } catch (error) {
                            console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold(error.message.replace('Error: ', '')));
                            return {
                                status: "error",
                                message: error.message
                            }
                        }
                    }
                });
            },
            Is: () => {
                this.Inquirer.prompt([
                    {
                        type: 'string',
                        name: 'path',
                        message: 'Enter the path to the directory you want to check:',
                        default: './'
                    }
                ]).then((answers) => {
                    if (!answers.path) {
                        console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold('No path specified!'));
                        return {
                            status: "error",
                            message: "No path specified!"
                        };
                    } else {
                        try {
                            if (this.File_System.is_dir(answers.path)) {
                                console.log(this.Color.green.bold('\n\tSuccess: ') + this.Color.yellow.bold(`📂 Yes it's a Directory at '${this.File_System.path_resolve(answers.path)}'`));
                                return {
                                    status: "success",
                                    message: `Directory is at ${answers.path}`,
                                }
                            } else {
                                console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold(`📂 No it's not a Directory`));
                                return {
                                    status: "success",
                                    message: `Directory isn't at ${answers.path}`,
                                }
                            }
                        } catch (error) {
                            console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold(error.message.replace('Error: ', '')));
                            return {
                                status: "error",
                                message: error.message
                            }
                        }
                    }
                });
            },
            Path: () => {
                this.Inquirer.prompt([
                    {
                        type: 'string',
                        name: 'path',
                        message: 'Enter the path to the directory you want to check:',
                        default: './'
                    }
                ]).then((answers) => {
                    if (!answers.path) {
                        console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold('No path specified!'));
                        return {
                            status: "error",
                            message: "No path specified!"
                        };
                    } else {
                        try {
                            const path = this.File_System.path_resolve(answers.path);
                            console.log(this.Color.green.bold('\n\tSuccess: ') + this.Color.yellow.bold(`📂 Path is ${path}`));
                            return {
                                status: "success",
                                message: `Path is ${path}`,
                            }
                        } catch (error) {
                            console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold(error.message.replace('Error: ', '')));
                            return {
                                status: "error",
                                message: error.message
                            }
                        }
                    }
                });
            },
            Name: () => {
                this.Inquirer.prompt([
                    {
                        type: 'string',
                        name: 'path',
                        message: 'Enter the path to the directory you want to check:',
                        default: './'
                    }
                ]).then((answers) => {
                    if (!answers.path) {
                        console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold('No path specified!'));
                        return {
                            status: "error",
                            message: "No path specified!"
                        };
                    } else {
                        try {
                            const name = this.File_System.dir_name(this.File_System.path_resolve(answers.path));
                            console.log(this.Color.green.bold('\n\tSuccess: ') + this.Color.yellow.bold(`📂 Directory name is '${name}'`));
                            return {
                                status: "success",
                                message: `Name is ${name}`,
                            }
                        } catch (error) {
                            console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold(error.message.replace('Error: ', '')));
                            return {
                                status: "error",
                                message: error.message
                            }
                        }
                    }
                });
            }
        },
        File: {
            Create: () => {
                this.Inquirer.prompt([
                    {
                        type: 'string',
                        name: 'path',
                        message: 'Enter the path to the file you want to create:',
                        default: './test.txt'
                    },
                    {
                        type: 'input',
                        name: 'content',
                        message: 'Enter the content of the file:',
                        default: 'Hello World!'
                    }
                ]).then((answers) => {
                    if (!answers.path) {
                        console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold('No path specified!'));
                        return {
                            status: "error",
                            message: "No path specified!"
                        };
                    } else {
                        try {
                            this.File_System.write_file(answers.path, answers.content);
                            const path = this.File_System.path_resolve(answers.path);
                            console.log(this.Color.green.bold('\n\tSuccess: ') + this.Color.yellow.bold(`📃 File created at ${path}`));
                            return {
                                status: "success",
                                message: `File created at ${path}`,
                            }
                        } catch (error) {
                            console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold(error.message.replace('Error: ', '')));
                            return {
                                status: "error",
                                message: error.message
                            }
                        }
                    }
                });
            },
            Append: () => {
                this.Inquirer.prompt([
                    {
                        type: 'string',
                        name: 'path',
                        message: 'Enter the path to the file you want to append:',
                        default: './test.txt'
                    },
                    {
                        type: 'input',
                        name: 'content',
                        message: 'Enter the content of the file:',
                        default: 'Hello World!'
                    }
                ]).then((answers) => {
                    if (!answers.path) {
                        console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold('No path specified!'));
                        return {
                            status: "error",
                            message: "No path specified!"
                        };
                    } else {
                        try {
                            this.File_System.append_file(answers.path, answers.content);
                            const path = this.File_System.path_resolve(answers.path);
                            console.log(this.Color.green.bold('\n\tSuccess: ') + this.Color.yellow.bold(`📃 File appended at ${path}`));
                            return {
                                status: "success",
                                message: `File appended at ${path}`,
                            }
                        } catch (error) {
                            console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold(error.message.replace('Error: ', '')));
                            return {
                                status: "error",
                                message: error.message
                            }
                        }
                    }
                });
            },
            Update: () => {
                this.Inquirer.prompt([
                    {
                        type: 'string',
                        name: 'path',
                        message: 'Enter the path to the file you want to update:',
                        default: './test.txt'
                    },
                    {
                        type: 'input',
                        name: 'content',
                        message: 'Enter the content of the file:',
                        default: 'Hello World!'
                    }
                ]).then((answers) => {
                    if (!answers.path) {
                        console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold('No path specified!'));
                        return {
                            status: "error",
                            message: "No path specified!"
                        };
                    } else {
                        try {
                            this.File_System.update_file(answers.path, answers.content);
                            const path = this.File_System.path_resolve(answers.path);
                            console.log(this.Color.green.bold('\n\tSuccess: ') + this.Color.yellow.bold(`📃 File updated at ${path}`));
                            return {
                                status: "success",
                                message: `File updated at ${path}`,
                            }
                        } catch (error) {
                            console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold(error.message.replace('Error: ', '')));
                            return {
                                status: "error",
                                message: error.message
                            }
                        }
                    }
                });
            },
            Delete: () => {
                this.Inquirer.prompt([
                    {
                        type: 'string',
                        name: 'path',
                        message: 'Enter the path to the file you want to delete:',
                        default: './test.txt'
                    }
                ]).then((answers) => {
                    if (!answers.path) {
                        console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold('No path specified!'));
                        return {
                            status: "error",
                            message: "No path specified!"
                        };
                    } else {
                        try {
                            this.File_System.delete_file(answers.path);
                            const path = this.File_System.path_resolve(answers.path);
                            console.log(this.Color.green.bold('\n\tSuccess: ') + this.Color.yellow.bold(`📃 File ${path} deleted`));
                            return {
                                status: "success",
                                message: `File deleted at ${path}`,
                            }
                        } catch (error) {
                            console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold(error.message.replace('Error: ', '')));
                            return {
                                status: "error",
                                message: error.message
                            }
                        }
                    }
                });
            },
            Move: () => {
                this.Inquirer.prompt([
                    {
                        type: 'string',
                        name: 'path',
                        message: 'Enter the path to the file you want to move:',
                        default: './test.txt'
                    },
                    {
                        type: 'string',
                        name: 'destination',
                        message: 'Enter the destination path:',
                        default: './test_copy.txt'
                    }
                ]).then((answers) => {
                    if (!answers.path) {
                        console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold('No path specified!'));
                        return {
                            status: "error",
                            message: "No path specified!"
                        };
                    } else {
                        try {
                            this.File_System.move_file(answers.path, answers.destination);
                            const path = this.File_System.path_resolve(answers.path);
                            const destination = this.File_System.path_resolve(answers.destination);
                            console.log(this.Color.green.bold('\n\tSuccess: ') + this.Color.yellow.bold(`📃 File moved from ${path} to ${destination}`));
                            return {
                                status: "success",
                                message: `File moved from ${path} to ${destination}`,
                            }
                        } catch (error) {
                            console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold(error.message.replace('Error: ', '')));
                            return {
                                status: "error",
                                message: error.message
                            }
                        }
                    }
                });
            },
            Rename: () => {
                this.Inquirer.prompt([
                    {
                        type: 'string',
                        name: 'path',
                        message: 'Enter the path to the file you want to rename:',
                        default: './test.txt'
                    },
                    {
                        type: 'string',
                        name: 'new_name',
                        message: 'Enter the new name of the file:',
                        default: './test_copy.txt'
                    }
                ]).then((answers) => {
                    if (!answers.path) {
                        console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold('No path specified!'));
                        return {
                            status: "error",
                            message: "No path specified!"
                        };
                    } else {
                        try {
                            this.File_System.rename_file(answers.path, answers.new_name);
                            const path = this.File_System.path_resolve(answers.path);
                            const destination = this.File_System.path_resolve(answers.new_name);
                            console.log(this.Color.green.bold('\n\tSuccess: ') + this.Color.yellow.bold(`📃 File renamed from ${path} to ${destination}`));
                            return {
                                status: "success",
                                message: `File renamed from ${path} to ${destination}`,
                            }
                        } catch (error) {
                            console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold(error.message.replace('Error: ', '')));
                            return {
                                status: "error",
                                message: error.message
                            }
                        }
                    }
                });
            },
            Read: () => {
                this.Inquirer.prompt([
                    {
                        type: 'string',
                        name: 'path',
                        message: 'Enter the path to the file you want to read:',
                        default: './test.txt'
                    }
                ]).then((answers) => {
                    if (!answers.path) {
                        console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold('No path specified!'));
                        return {
                            status: "error",
                            message: "No path specified!"
                        };
                    } else {
                        try {
                            const content = this.File_System.read_file(answers.path);
                            const path = this.File_System.path_resolve(answers.path);
                            console.log(this.Color.green.bold('\n\tSuccess: ') + this.Color.yellow.bold(`📃 File read at ${path}`));
                            console.log(content)
                            return {
                                status: "success",
                                message: `File read at ${path}`,
                                content: content
                            }
                        } catch (error) {
                            console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold(error.message.replace('Error: ', '')));
                            return {
                                status: "error",
                                message: error.message
                            }
                        }
                    }
                });
            },
            Copy: () => {
                this.Inquirer.prompt([
                    {
                        type: 'string',
                        name: 'path',
                        message: 'Enter the path to the file you want to copy:',
                        default: './test.txt'
                    },
                    {
                        type: 'string',
                        name: 'destination',
                        message: 'Enter the destination path:',
                        default: './test_copy.txt'
                    }
                ]).then((answers) => {
                    if (!answers.path) {
                        console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold('No path specified!'));
                        return {
                            status: "error",
                            message: "No path specified!"
                        };
                    } else {
                        try {
                            this.File_System.copy_file(answers.path, answers.destination);
                            const path = this.File_System.path_resolve(answers.path);
                            const destination = this.File_System.path_resolve(answers.destination);
                            console.log(this.Color.green.bold('\n\tSuccess: ') + this.Color.yellow.bold(`📃 File copied from ${path} to ${destination}`));
                            return {
                                status: "success",
                                message: `File copied from ${path} to ${destination}`,
                            }
                        } catch (error) {
                            console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold(error.message.replace('Error: ', '')));
                            return {
                                status: "error",
                                message: error.message
                            }
                        }
                    }
                });
            },
            Is: () => {
                this.Inquirer.prompt([
                    {
                        type: 'string',
                        name: 'path',
                        message: 'Enter the path to the file you want to check:',
                    }
                ])
                    .then((answers) => {
                        if (!answers.path) {
                            console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold('No path specified!'));
                            return {
                                status: "error",
                                message: "No path specified!"
                            };
                        } else {
                            const is_file = this.File_System.is_file(answers.path);
                            console.log(this.Color.green.bold('\n\tSuccess: ') + this.Color.yellow.bold(`📃 ${answers.path} file ${is_file ? "exists" : "doesn't exist"}`));
                            return {
                                status: "success",
                                message: `File ${is_file ? "exists" : "doesn't exist"}`,
                            }
                        }
                    })
            },
            Path: () => {
                this.Inquirer.prompt([
                    {
                        type: 'string',
                        name: 'path',
                        message: 'Enter the path to the file you want to check:',
                    }
                ])
                    .then((answers) => {
                        if (!answers.path) {
                            console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold('No path specified!'));
                            return {
                                status: "error",
                                message: "No path specified!"
                            };
                        } else {
                            const path = this.File_System.path_resolve(this.File_System.file_path(answers.path));
                            console.log(this.Color.green.bold('\n\tSuccess: ') + this.Color.yellow.bold(`📃 ${answers.path} path is ${path}`));
                            return {
                                status: "success",
                                message: `Path is ${path}`,
                            }
                        }
                    })
            },
            Name: () => {
                this.Inquirer.prompt([
                    {
                        type: 'string',
                        name: 'path',
                        message: 'Enter the path to the file you want to check:',
                    }
                ])
                    .then((answers) => {
                        if (!answers.path) {
                            console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold('No path specified!'));
                            return {
                                status: "error",
                                message: "No path specified!"
                            };
                        } else {
                            const name = this.File_System.file_name(answers.path);
                            console.log(this.Color.green.bold('\n\tSuccess: ') + this.Color.yellow.bold(`📃 ${answers.path} name is ${name}`));
                            return {
                                status: "success",
                                message: `Name is ${name}`,
                            }
                        }
                    })
            },
            With_Extension: () => {
                this.Inquirer.prompt([
                    {
                        type: 'string',
                        name: 'path',
                        message: 'Enter the path to the file you want to check:',
                    }
                ])
                    .then((answers) => {
                        if (!answers.path) {
                            console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold('No path specified!'));
                            return {
                                status: "error",
                                message: "No path specified!"
                            };
                        } else {
                            const extension = this.File_System.file_name_with_ext(answers.path);
                            console.log(this.Color.green.bold('\n\tSuccess: ') + this.Color.yellow.bold(`📃 ${answers.path} extension is ${extension}`));
                            return {
                                status: "success",
                                message: `Extension is ${extension}`,
                            }
                        }
                    })
            },
            Size: () => {
                this.Inquirer.prompt([
                    {
                        type: 'string',
                        name: 'path',
                        message: 'Enter the path to the file you want to check:',
                    }
                ])
                    .then((answers) => {
                        if (!answers.path) {
                            console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold('No path specified!'));
                            return {
                                status: "error",
                                message: "No path specified!"
                            };
                        } else {
                            const size = this.File_System.file_size(answers.path);
                            console.log(this.Color.green.bold('\n\tSuccess: ') + this.Color.yellow.bold(`📃 ${answers.path} size is ${size} bytes`));
                            return {
                                status: "success",
                                message: `Size is ${size}`,
                            }
                        }
                    })
            },
            Exists: () => {
                this.Inquirer.prompt([
                    {
                        type: 'string',
                        name: 'path',
                        message: 'Enter the path to the file you want to check:',
                    }
                ])
                    .then((answers) => {
                        if (!answers.path) {
                            console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold('No path specified!'));
                            return {
                                status: "error",
                                message: "No path specified!"
                            };
                        } else {
                            const exists = this.File_System.file_exists(this.File_System.path_resolve(answers.path));
                            console.log(this.Color.green.bold('\n\tSuccess: ') + this.Color.yellow.bold(`📃 ${answers.path} ${exists ? "exists" : "doesn't exists"}`));
                            return {
                                status: "success",
                                message: `File ${exists ? "exists" : "doesn't exist"}`,
                            }
                        }
                    })
            },
            Stats: () => {
                this.Inquirer.prompt([
                    {
                        type: 'string',
                        name: 'path',
                        message: 'Enter the path to the file you want to check:',
                    }
                ])
                    .then((answers) => {
                        if (!answers.path) {
                            console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold('No path specified!'));
                            return {
                                status: "error",
                                message: "No path specified!"
                            };
                        } else {
                            const stats = this.File_System.file_stats(answers.path);
                            console.log(this.Color.green.bold('\n\tSuccess: ') + this.Color.yellow.bold(`📃 ${answers.path} stats is`));
                            console.log(stats)
                            return {
                                status: "success",
                                message: `Stats is ${stats}`,
                            }
                        }
                    })
            },
        },
        Network: {
            IpAddress: () => {
                const ipAddr = new this.Network().network;
                console.log('\n')
                for (const device_type in ipAddr) {
                    if (Object.hasOwnProperty.call(ipAddr, device_type)) {
                        const address = ipAddr[device_type];
                        console.log(this.Color.bold(`\t${this.Color.yellow(device_type)}: ${this.Color.green(address)}`));
                    }
                }
            },
        },
        Operating_System: {
            Name: () => {
                const System_Platform = this.File_System.platform;
                let platform = ''
                switch (System_Platform) {
                    case 'aix': platform = "IBM AIX";
                        break;
                    case 'android': platform = "Android";
                        break;
                    case 'darwin': platform = "Darwin(MacOS, IOS etc)";
                        break;
                    case 'freebsd': platform = "FreeBSD";
                        break;
                    case 'linux': platform = "Linux";
                        break;
                    case 'openbsd': platform = "OpenBSD";
                        break;
                    case 'sunos': platform = "SunOS";
                        break;
                    case 'win32': platform = "Windows";
                        break;
                    default: platform = "Unknown";
                }
                console.log(`\n\tPlatform: ` + this.Color.green.bold(platform));
            },
        },
        Shell: () => {
            this.Inquirer.prompt([
                {
                    type: 'string',
                    name: 'command',
                    message: 'Enter the command you want to run:',
                }
            ])
                .then((answers) => {
                    if (!answers.command) {
                        console.log(this.Color.red.bold('\n\tError: ') + this.Color.yellow.bold('No command specified!'));
                        return {
                            status: "error",
                            message: "No command specified!"
                        };
                    } else {
                        const output = this.shell_command(answers.command);
                        console.log(this.Color.green.bold('\n\tSuccess: ') + this.Color.yellow.bold(`📃 ${answers.command} output is`));
                        console.log(output)
                        return {
                            status: "success",
                            message: `Output is ${output}`,
                        }
                    }
                })
        },
        Clear: () => {
            console.clear()
        }
    }
};