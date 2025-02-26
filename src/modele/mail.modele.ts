export interface MailModele {
    contenu: string;

    idtDestinataire: string;
}

export interface MailReponseModele extends MailModele {
    statutEnvoi: 'OK' | 'KO';
}