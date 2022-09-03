import { IUser } from 'src/interfaces/user.interface';

export const users: IUser[] = [
  {
    firstname: 'Salih',
    lastname: 'GUNGOR',
    email: 'gungor.salih@teampify.com',
    password: 'Test12345',
    roles: ['admin'],
  },
  {
    firstname: 'Jean',
    lastname: 'DUPONT',
    email: 'jean.dupont@teampify.com',
    password: 'Test12345',
    roles: ['user'],
  },
];
