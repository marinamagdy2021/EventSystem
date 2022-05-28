export class Speaker {
    constructor(
        public _id: string,  // object
        public email: string|null,
        public password: string|null,
        public username: string|null,
        public address :{city:string,street:string,building:number}
    ){}

}
