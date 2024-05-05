import { wallet, store, profile, library, transaction } from '../assets';

export const navlinks = [
  {
    name: 'store',
    imgUrl: store,
    link: '/products',
  },
  {
    name: 'library',
    imgUrl: library,
    link: '/mainpage/library',
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/mainpage/profile',
  },
  {
    name: 'wallet-info',
    imgUrl: wallet,
    link: '/mainpage/wallet-info',
    disabled: false,
  },
  {
    name: 'transaction',
    imgUrl: transaction,
    link: '/mainpage/transactions',
    disabled: false,
  },
  
  
  
];