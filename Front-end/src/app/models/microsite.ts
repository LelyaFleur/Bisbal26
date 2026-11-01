interface phaseSchema {
    number: number,
    title : string,
    message: string,
    date : string,
    name: string,
    description: string,
    visible: boolean    
}

interface iconSchema {
    image: string,
    color: string   
}

interface historialSchema  {
    title : string,
    body: string,
    button: string,
    url : string,
    file: string
}


export interface Microsite {
    title: string,	
    whois: string,
    dataProtection: string,
    activePhase: phaseSchema,
    phases: phaseSchema[],
    icons: iconSchema[],
    historial: {
        message: string,
        points: historialSchema[]
    }
}