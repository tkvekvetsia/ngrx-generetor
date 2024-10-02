import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import { generateState } from './generator.js';

yargs(hideBin(process.argv)).command(
    'new <name>',
    'Create new ngrx state (reducers, actions, state, selectors)',
    (yargs) => {
        return yargs.positional('name', {
            type: 'string',
            describe: 'Name of the state'
        });
    },
    async (argv) => {
        console.log('Creating new state... <', argv.name + '>');
        if (argv.name) {
             await generateState(argv.name);
        }
    }
).demandCommand(1).parse();
