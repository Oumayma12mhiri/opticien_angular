import { Client } from "./client";
import { Verre } from "./verre";
import { Visite } from "./visite";

export class Vente {

    public id !:number;
    public remiseVente !:number;
    public totaleVente !:number;
    public numFicheManuelle !:String;
    public client !:Client;
    public verres: Verre[];
    public visites: Visite[];

}
