import newFactory from 'newFactory';

describe('Factories', () => {
  describe('newFactory', () => {
    itSlowly('generates an accurate fake', async () => {
      const factory = newFactory();
    });
  });
});
