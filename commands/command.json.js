
/**
 * @function get_all_Commands
 * @description This function returns all the commands available in the package.
 * @param {Commands} cmd
 * @return {Array[Object]} 
 */
export function get_all_Commands(cmd) {
    return [
        // File Append
        {
            command: 'apfile',
            description: 'append to a file',
            action: cmd.Commands.File.Append,
        },
        // Clear
        {
            command: 'clear',
            description: 'clear the screen',
            action: cmd.Commands.Clear
        },
        // Copy Directory
        {
            command: 'cpdir',
            description: 'copy a directory to another directory',
            action: cmd.Commands.Directory.Copy,
        },
        // File Copy
        {
            command: 'cpfile',
            description: 'copy a file to another file',
            action: cmd.Commands.File.Copy,
        },
        // Exists Directory
        {
            command: 'exdir',
            description: 'Check if a directory exists',
            action: cmd.Commands.Directory.Exists,
        },
        // Exists File
        {
            command: 'exfile',
            description: 'Check if a file exists',
            action: cmd.Commands.File.Exists,
        },
        // Execute Command
        {
            command: 'exec',
            description: 'execute a command',
            action: cmd.Commands.Shell,
        },
        // Ip Address
        {
            command: 'ip',
            description: 'get the ip address',
            action: cmd.Commands.Network.IpAddress
        },
        // Is Directory
        {
            command: 'isdir',
            description: 'check if a path is a directory',
            action: cmd.Commands.Directory.Is,
        },
        // Is File
        {
            command: 'isfile',
            description: 'check if a path is a file',
            action: cmd.Commands.File.Is,
        },
        // Operating System
        {
            command: 'os',
            description: 'get the operating system',
            action: cmd.Commands.Operating_System.Name
        },
        // Directory Create
        {
            command: 'mkdir',
            description: 'create a directory',
            action: cmd.Commands.Directory.Create
        },
        // File Create
        {
            command: 'mkfile',
            description: 'create a file',
            action: cmd.Commands.File.Create,
        },
        // Move directory
        {
            command: 'mvdir',
            description: 'move a directory',
            action: cmd.Commands.Directory.Move
        },
        // File Move
        {
            command: 'mvfile',
            description: 'move a file',
            action: cmd.Commands.File.Move,
        },
        // Name of the directory
        {
            command: 'nmdir',
            description: 'get the name of the directory',
            action: cmd.Commands.Directory.Name
        },
        // Name of the file
        {
            command: 'nmfile',
            description: 'get the name of the file',
            action: cmd.Commands.File.Name
        },
        // Name of file with extension
        {
            command: 'nmextfile',
            description: 'get the name of the file with extension',
            action: cmd.Commands.File.With_Extension
        },
        // Path Directory
        {
            command: 'pwdir',
            description: 'get the path of given directory',
            action: cmd.Commands.Directory.Path
        },
        // Path File
        {
            command: 'pwfile',
            description: 'get the path of given file',
            action: cmd.Commands.File.Path
        },
        // Read File
        {
            command: 'readfile',
            description: 'read a file',
            action: cmd.Commands.File.Read,
        },
        // Rename Directory
        {
            command: 'rendir',
            description: 'rename a directory',
            action: cmd.Commands.Directory.Rename
        },
        // File Rename
        {
            command: 'renfile',
            description: 'rename a file',
            action: cmd.Commands.File.Rename,
        },
        // Directory Delete
        {
            command: 'rmdir',
            description: 'delete a directory',
            action: cmd.Commands.Directory.Delete
        },
        // File Remove
        {
            command: 'rmfile',
            description: 'delete a file',
            action: cmd.Commands.File.Delete,
        },
        // Directory List -> Default
        {
            command: 'scandir',
            description: 'list all the directories in specified path at depth 1',
            action: cmd.Commands.Directory.List.Default
        },
        // Directory List -> Depth
        {
            command: 'scandird',
            description: 'list all the directories till the specified depth',
            action: cmd.Commands.Directory.List.Depth
        },
        // Directory List -> Recursive
        {
            command: 'scandirr',
            description: 'list all the directories recursively',
            action: cmd.Commands.Directory.List.Recursive
        },
        // Search 
        {
            command: 'search',
            description: 'search for a file or directory',
            action: cmd.Commands.Search
        },
        // File Size
        {
            command: 'sizefile',
            description: 'get the size of a file',
            action: cmd.Commands.File.Size
        },
        // File Status
        {
            command: 'statfile',
            description: 'get the status of a file',
            action: cmd.Commands.File.Stats
        },
        // File Update
        {
            command: 'upfile',
            description: 'update a file',
            action: cmd.Commands.File.Update,
        },
    ]
}