export type TypeNotification = 'INFO' | 'WARNING' | 'ERROR';

export default interface NotificationModele {
    titre: string;
    
    message: string;

    type: TypeNotification;

    idUtilisateur?: string;

    dateEmission: Date,
}