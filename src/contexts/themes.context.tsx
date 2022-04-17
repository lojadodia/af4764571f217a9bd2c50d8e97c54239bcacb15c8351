import React, { createContext, ReactNode, useEffect, useState } from 'react';

type Props = {
    inicialTheme:any;
    children?: ReactNode;
}

const getInicialThemeSystem = ():string=>{
    if( typeof window !== 'undefined' && window.localStorage){
        const storeProfs = window.localStorage.getItem("theme");

        if(typeof storeProfs=== 'string'){
            return storeProfs;
        }
        const useMedia = window.matchMedia('(prefers-color-scheme: dark');
        if(useMedia.matches){
            return 'dark';
        }
    }
    return 'light';
};

const initaldata:Props={
   inicialTheme= "light"
}

const theContext = createContext(initaldata);
export const ThemeProvider = ({inicialTheme, children}:Props)=>{
    const [theme, setTheme] = useState(getInicialThemeSystem);
    const rowSetTheme = (rowTheme:string)=>{
        const root = window.document.documentElement;
        const isDark = rowTheme === 'dark';
        root.classList.remove(isDark ? 'light': 'dark');
        root.classList.add(rowTheme);
        localStorage.setItem("theme", rowTheme);
    }

    if(inicialTheme){
        rowSetTheme(inicialTheme)
    }
    useEffect(()=>{
        rowSetTheme(theme);
    }, [theme]);

    return(
        <theContext.Provider value={{theme, setTheme}}>
        {children}
        </theContext>
    )
}
