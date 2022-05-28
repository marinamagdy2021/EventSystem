import { Speaker } from "./speaker";
import { Student } from "./student";

export class Event {

    constructor(
        public _id: number,
        public title: string,
        public mainSpeaker: Speaker ,// string
        public date: Date,
        public otherSpeakers : Speaker[],
        public students : Student[], // numbers | object

    ){}

}

