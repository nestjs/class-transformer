import 'reflect-metadata';
import { classToPlain } from '../../src/index';
import { defaultMetadataStorage } from '../../src/storage';
import { Exclude, Expose } from '../../src/decorators';

describe('ignoring specific decorators', () => {
  it('when ignoreDecorators is set to true it should ignore all decorators', () => {
    defaultMetadataStorage.clear();

    class User {
      id: number;

      @Expose({ name: 'lala' })
      firstName: string;

      @Expose({ groups: ['user'] })
      lastName: string;

      @Exclude({ groups: ['user'] })
      email: string;

      @Exclude({since: 0.5})
      address: string;

      @Exclude()
      password: string;
    }

    const user = new User();
    user.firstName = 'Umed';
    user.lastName = 'Khudoiberdiev';
    user.email = 'fakeaddy@email.com';
    user.address = 'Fake Street 7879';
    user.password = 'imnosuperman';

    const plainedUser = classToPlain(user, { ignoreDecorators: true, version: 0.5 });
    expect(plainedUser).toEqual({
      firstName: 'Umed',
      lastName: 'Khudoiberdiev',
      email: 'fakeaddy@email.com',
      address: 'Fake Street 7879',
      password: 'imnosuperman',
    });
  });
});
