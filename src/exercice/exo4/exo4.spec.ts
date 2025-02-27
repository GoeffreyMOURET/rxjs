import Exercice4 from "./exo4";

describe('Exercice 4', () => {
    let exo4: Exercice4;
    let donneesRecues: unknown[];
    let maintenant: Date;
    
    beforeEach(() => {
        exo4 = new Exercice4();
        maintenant = new Date('2021-10-05T14:48:00.000Z');
        jest.spyOn(global, 'Date').mockImplementation(() => maintenant);
        donneesRecues = [];
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
});
