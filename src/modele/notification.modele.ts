export default interface NotificationModele {
    titre: string;
    
    message: string;

    type: 'INFO' | 'WARNING' | 'ERROR';

    idUtilisateur?: string;
}