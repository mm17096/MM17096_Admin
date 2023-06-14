import { Biblioteca } from "./biblioteca.model";

export class Libro{
    constructor(
        public nombre:string,
        public biblioteca?: Biblioteca,
        public id?: number,
    ){}
}