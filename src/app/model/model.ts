
export class Model {
}

export class Commission {
  id: number | undefined;
  idtransfert: number | undefined;
  iduser: number | undefined;
  montant: number | undefined;

  constructor(id: number | undefined, idtransfert: number | undefined, iduser: number | undefined, montant: number | undefined) {
    this.id = id;
    this.idtransfert = idtransfert;
    this.iduser = iduser;
    this.montant = montant;
  }
}

export class Transaction {
  id: any;
  nomexp: string;
  prenomexp: string;
  numexp: string;
  cniexp: string;

  prenomdest: string;
  nomdest: string;
  numdest: string;
  cnidest: string;

  montant: number;
  dateenvoi: string;
  dateretrait: string;
  code: number;
  etat: boolean;
  frais: any;
  userenvoi: Caissier;
  userretrait: Caissier;
}

export class utilisateur {
  id: any;
  login: string;
  nom: string;
  prenom: string;
  password: string;
}

export class Activites {
  id: any;
  description: string;
  date: Date;
  caissier: Caissier;
  montant: number;
}

export class Compteclient {
  id: number;
  idclient: number;
  montant: number;
}

export class compteadmin {
  id: number;
  montant: number;
}

export class compteAgence {
  id: number;
  solde: number;
  description: string;
}

export class Users {
  id: number;
  username: string;
  prenom: string;
  nom: string;
  password: string;
  datecreation: Date;
  telephone: number;
  nbpasswordchanged: number;
  dateupdate: Date;
  sexe: string;
  email: string;
  cni: number;
  etat: boolean;
  datenaissance: string;
  adresse: string;
  isactive: boolean;
  profile: string;
}

export class Adresse {
  quartier: string;
  commune: string;
  departement: string;
  region: string;
  pays: string;
}

export class Caissier {
  id: number;
  username: string;
  prenom: string;
  nom: string;
  password: string;
  datecreation: Date;
  telephone: number;
  nbpasswordchanged: number;
  dateupdate: Date;
  sexe: string;
  email: string;
  cni: number;
  etat: boolean;
  datenaissance: string;
  adresse: string;
  agence: Agence;
  iscaissier: boolean;
  isacticec: boolean;
}

export class Agent {
  id: number;
  username: string;
  prenom: string;
  nom: string;
  password: string;
  datecreation: string;
  telephone: number;
  nbpasswordchanged: number;
  dateupdate: string;
  sexe: string;
  email: string;
  cni: number;
  etat: boolean;
  datenaissance: string;
  adresse: string;
  fonction: string;
  isagent: boolean;
}

export class Profils {
  id: number;
  description: string;
}

export class Agence {
  id: number;
  description: string;
  latitude: string;
  longitude: string;
  isactive: boolean;
  nbcaissier: number;
  nbmodifier: number;
  datemodifier: Date;
  adresse: Adresse;
  caissier: Caissier;
  typeagence: TypeAgence;
  compteagence: compteAgence;
}

export class TypeAgence {
  id: number;
  description: string;
}

export class Logininfo {
  username: string;
  password: string;
}