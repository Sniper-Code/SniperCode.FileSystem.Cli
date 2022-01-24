#!/usr/bin/env node

// Package Imports
import Details from './config/details.js';
import Commands from './commands/commands.js';
import { get_all_Commands } from './commands/command.json.js';

// Package Extraction
const
    details = new Details().getDetails(),
    cmd = new Commands(),
    { Color, program } = cmd,
    all_commands = get_all_Commands(cmd);

//-----> Cli Implementation begins <-----//

// CLi Details
program
    .name(details.Name)
    .version(Color.yellow.bold(details.Version), '-v, --version', 'show current version')
    .description(details.Description)
    .helpOption('-h, --help', 'show help')
    .addHelpText('beforeAll', Color.bold(`\n\t${Color.red(details.Name)} ${Color.green(details.Version)}\n\tDeveloped by: ${Color.blue(details.Author)}\n${Color.yellow.bold(details.Homepage)}\n`));

program
    .configureOutput({
        // Visibly override write routines as example!
        writeErr: (str) => process.stdout.write(str),
        // Output errors in red.
        outputError: (str, write) => write((str.replace('error:', Color.red.bold('Error:')).replace('warn:', Color.yellow.bold('Warn:')).replace('info:', Color.blue.bold('Info:')))),
    });

// Cli Commands
all_commands.forEach((cli_cmd) => {
    program
        .command(cli_cmd.command)
        .description(cli_cmd.description)
        .action(cli_cmd.action);
});

// Cli Parse
program.parse(process.argv);
//-----> Cli Implementation ends <-----//
