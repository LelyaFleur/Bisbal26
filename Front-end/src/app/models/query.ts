interface phasesSchema {
    number: number,
    description: string,
    process : string,
    activity: { startDate: Date, endDate: Date }
}
interface  imageSchema {
    name : string,
    image_footer: string
}
interface submissionSchema {
    document: string,
    gender: string,
    postalCode: string,    
    birthdate: string, 
    submissionDate: Date
	
}
interface proposalSchema {
    order: number,	    
    title: string,    
    description: string,
    location: string,
    executiveState: {state: string, show: boolean},
    cost: {quantity: string, note: string},
    images: imageSchema[],
    checked: boolean,
    votes: number,     
    submissions: submissionSchema[]
}
export interface Query {
    title: string,
    description: string,
    closed: Boolean,
	phases : phasesSchema[],
    proposals: proposalSchema[],    
	submissions: submissionSchema[],
	publishDate: { startDate: Date, endDate: Date },
	phase: phasesSchema,
	totalVotes: number
  }