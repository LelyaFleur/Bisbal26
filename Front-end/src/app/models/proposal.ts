interface  imageSchema {
    name : string,
    image_footer: string
}
interface submissionSchema {
    document: string,
    gender: string,
    postalCode: string,    
    birthdate: string
	
}

export interface Proposal {
    order: number,	    
    title: string,    
    description: string,
    location: string,
    cost: {quantity: string, note: string},
    executiveState: {state: string, show: boolean},
    images: imageSchema[],
    checked: boolean,
    votes: number,
    winner: boolean,     
    submissions: submissionSchema[]
  }