# ngrx file generator

## run npm install


## link to cli 

clone project and run `npm link` in the root of the project to link the cli `ngrx-custom`  to the global scope

## Commands
run `ngrx-custom new <stateName>` to create  <stateName> folder
folder is created in the same directory as the command is run

inside <stateName> folder the following files are created
- `<stateName>`.actions.ts
- `<stateName>`.reducers.ts
- `<stateName>`.selectors.ts
- `<stateName>`.state.ts


## `<stateName>`.state.ts
generates `<stateName>` interface 
{

    `<stateName>` : {},

    loading:boolean,

    error:''
}   

and `<stateName>` state object based on interface

## `<stateName>`.actions.ts

creates actionGroup with source `<stateName>` and actions
 - `get<stateName>`
 - `get<stateName>Success`
 - `get<stateName>Error`

## `<stateName>`.reducers.ts

generates `<stateName>` reducer with initialState ond actions from `<stateName>`.actions.ts

## `<stateName>`.selectors.ts

creates featureSelector with source `<stateName>` and selectors
 - `select<stateName>`
 - `selectLoading`
 - `selectError`

