// Package Imports
import child_process from 'child_process';

/**
 * @function shell_command
 * @description Executes a shell command
 * @param {string} command
 * @return {any}
 */
export function shell_command(command) {
    try {
        return child_process.execSync(command).toString()
    } catch (error) {
        return error
    }
}

function depth_space(depth, is_sub_dir) {
    let space = '';
    for (let i = 0; i < depth - 1; i++) {
        if (is_sub_dir) {
            space += `|    |-->`;
        } else {
            space += '|---->';
        }
    }
    return space;
}

export function scan_dir_recursive_depth(Color, scandir_obj, dirName, isSubDir = false, depth = 1) {
    let dir_log = '';
    for (const root_key in scandir_obj) {
        if (Object.hasOwnProperty.call(scandir_obj, root_key)) {
            const type = scandir_obj[root_key];
            // Directory Name Matches Root_Key meaning path can be extracted 
            if (dirName === root_key) {
                if (!isSubDir) {
                    // If its Not Sub Dir then add a new line
                    dir_log += `📂${Color.yellow.bold(type.dir_name)}\n`
                }
            }
            // If its a directory
            if (root_key === 'dir') {
                type.forEach((directory) => {
                    for (const dir_key in directory) {
                        if (Object.hasOwnProperty.call(directory, dir_key)) {
                            const dir = directory[dir_key];
                            // Its a Dir 
                            if (dir.dir_name !== undefined) {
                                if (!isSubDir) {
                                    dir_log += `📁${depth_space(depth, isSubDir)}${Color.red.bold(dir.dir_name)}\n`
                                } else {
                                    dir_log += `📂${depth_space(depth, isSubDir)}${Color.red.bold(dir.dir_name)}\n`
                                }
                                // console.log(directory, dir.dir_name,)
                                dir_log += scan_dir_recursive_depth(Color, directory, dir.dir_name, true, depth + 1)
                            }
                        }
                    }
                });
            }
            // If its a file
            if (root_key === 'file') {
                type.forEach((file) => {
                    if (!isSubDir) {
                        dir_log += `📃${depth_space(depth, isSubDir)}${Color.green.bold(file)}\n`
                    } else {
                        dir_log += `📃${depth_space(depth, isSubDir)}${Color.green.bold(file)}\n`
                    }
                });
            }
        }
    }
    return dir_log;
}