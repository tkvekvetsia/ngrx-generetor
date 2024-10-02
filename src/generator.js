import fs from "node:fs/promises";
import {actionFileContent, selectorFileContent, stateFileContent, stateFileReducerContent} from "./fileContent.js";

export const generateState = async (name, directory) => {
    if (!directory) {
        directory = './';
    }

    const fullPath = `${directory}/${name}`;
    fs.mkdir(fullPath, {recursive: true}, (err) => {
        if (err) {
            console.log("Error creating directory", err);
        } else {
            console.log("Directory created successfully");
        }
    });

    // creates the files
    await fs.writeFile(`${fullPath}/${name}.state.ts`, stateFileContent(name));
    await fs.writeFile(`${fullPath}/${name}.reducer.ts`, stateFileReducerContent(name));
    await  fs.writeFile(`${fullPath}/${name}.actions.ts`, actionFileContent(name));
    await  fs.writeFile(`${fullPath}/${name}.selectors.ts`, selectorFileContent(name));
}


