export const stateFileContent = (name) => {
    const capitalizedName = capitalizeFirstLetter(name);
    return `
export interface ${stateInterface(name)} {
   ${name}: {},
   loading: false, 
   error: '',
}  
    
export const ${state(name)}: ${stateInterface(name)} = {
   ${name}: {},
   loading: false, 
   error: '',
}    
`
}

export const stateFileReducerContent = (name) => {
    const capitalizedName = capitalizeFirstLetter(name);
    return `import { createReducer, on } from '@ngrx/store';
import { ${state(name)}} from './${name}.state';
import { ${actionGroup(name)} } from './${name}.actions';

export const ${reducer(name)} = createReducer(
    ${state(name)},
    on( ${actionGroup(name)}.get${capitalizedName}, (state, action) => ({
        ...state,
        ${name}:{},
        loading: true,
        error: '',
    })),
    on( ${actionGroup(name)}.get${capitalizedName}Success, (state, action) => ({
        ...state,
        ${name}: action.${name},
        loading: false,
        error: '',
    })),
    on( ${actionGroup(name)}.get${capitalizedName}Failure, (state, action) => ({
        ...state,
        ${name}: {},
        loading: false,
        error: action.error,
    }))
    
);
`

}
//
export const actionFileContent = (name) => {
    const capitalizedName = capitalizeFirstLetter(name);
    const source = capitalizedName.split(/(?=[A-Z])/).join(' ');
    return `import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {${stateInterface(name)}} from './${name}.state';

export const ${actionGroup(name)} = createActionGroup({
  source: '${source}',
  events: {
    get${capitalizedName}: emptyProps(),
    get${capitalizedName}Success: props<{ users:any }>(),
    get${capitalizedName}Failure: props<{ error: string }>(),
  },
});
    `
}

export const selectorFileContent = (name) =>{
    const capitalizedName = capitalizeFirstLetter(name);
    const featureKey = capitalizedName.split(/(?=[A-Z])/).join('_').toUpperCase() + '_FEATURE_KEY';
    const  l= '<'
    const r = '>'
    return `import {
  createFeature,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { ${stateInterface(name)} } from './${name}.state';
import { ${reducer(name)} } from './${name}.reducer';

export const ${featureKey} = '${name}';

export const ${featureSelector(name)} = createFeatureSelector${l}${stateInterface(name)}${r}(
   ${featureKey} 
);

export const select${capitalizedName} = createSelector(
    ${featureSelector(name)},
    (state: ${stateInterface(name)}) => state.${name}
);

export const select${capitalizedName}Loading = createSelector(
    ${featureSelector(name)},
    (state: ${stateInterface(name)}) => state.loading
);

export const select${capitalizedName}Error = createSelector(
    ${featureSelector(name)},
    (state: ${stateInterface(name)}) => state.error
);

export const ${name}Feature = createFeature({
     name: ${featureKey},
     reducer: ${reducer(name)},
});
`
}

const stateInterface = (name) => {
    const capitalizedName = capitalizeFirstLetter(name);
    return `${capitalizedName}State`
}

const state = (name) => {
    return `${name}State`
}

const reducer = (name) => {
    return `${name}Reducer`
}

const featureSelector = (name) =>{
    const capitalizedName = capitalizeFirstLetter(name);
    return `select${capitalizedName}State`
}

const actionGroup = name => {
    return `${name}Actions`
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
