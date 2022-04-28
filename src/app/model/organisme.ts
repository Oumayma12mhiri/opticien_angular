export class Organisme {

    public id !: number;
    public nomOrganisme !: String;
    public email!: String;
    public adresse!: String;
    public numTel!: String;
    public matriculeFiscal!: String;
    public remise_org!: number;

    public getNomOrg(){
       return this.nomOrganisme;
    }
}