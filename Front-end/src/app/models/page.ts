interface  typeSchema {
  name : string,
  type: string
}

export interface Page {
    _id: string;
    micrositeId: string,
    coverTitle: string,
    index: number,
    phase: number,
    type: typeSchema, 
    title: string,    
    image: string,
    content: string,
    note: string
  }