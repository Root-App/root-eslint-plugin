import newOtherFactory from 'newOtherFactory';

describe('Factories', () => {
  describe('newOtherFactory', () => {
    itSlowly('generates an accurate fake', async () => {
      const factory = newOtherFactory();
    });
  });
});
