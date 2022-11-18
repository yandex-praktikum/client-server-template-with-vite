import { TTheme } from './ForumPage.types';

export const TEMP_DATA: TTheme[] = [
  {
    id: 1,
    title: 'Title first',
    content:
      'Some text some text some text some text some text some text some text some text some text some text some text',
    author: {
      avatar:
        'https://avatars.mds.yandex.net/get-kino-vod-films-gallery/28788/47e2fd514411e18b76af786d7417062d/100x64_3',
      first_name: 'First_name',
      second_name: 'Last_name',
    },
    createdAt: '2022-09-01T15:17:10',
    discussions: [],
  },

  {
    id: 7,
    title: 'Title second',
    content:
      'Content content  content content  content  content  content  contentContent content  content content  content  content  content  contentContent content  content content  content  content  content  contentContent content  content content  content  content  content  contentContent content  content content  content  content  content  contentContent content  content content  content  content  content  contentContent content  content content  content  content  content  contentContent content  content content  content  content  content  contentContent content  content content  content  content  content  contentContent content  content content  content  content  content  contentContent content  content content  content  content  content  contentContent content  content content  content  content  content  contentContent content  content content  content  content  content  contentContent content  content content  content  content  content  contentContent content  content content  content  content  content  contentContent content  content content  content  content  content  contentContent content  content content  content  content  content  content',
    author: {
      avatar: 'https://cdnstatic.rg.ru/uploads/images/gallery/84f24d10/19_b6265e7a.jpg',
      first_name: 'FirstName2',
      second_name: 'LastLastLastName',
    },
    createdAt: '2022-09-07T14:17:10',
    discussions: [
      {
        id: 5,
        author: {
          avatar: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amateur-made_Na%27vi.jpg',
          first_name: 'Name',
          second_name: 'Family',
        },
        createdAt: '2022-09-15T14:18:10',
        content:
          'My 1 comment My 1 comment My 1 comment My 1 comment My 1 comment My 1 comment My 1 comment My 1 comment My 1 comment My 1 comment My 1 comment My 1 comment My 1 comment My 1 comment My 1 comment My 1 comment My 1 comment My 1 comment My 1 comment My 1 comment My 1 comment My 1 comment My 1 comment My 1 comment',
        answers: [
          {
            id: 4,
            author: {
              avatar: 'https://html5css.ru/w3images/avatar6.png',
              first_name: 'Sub',
              second_name: 'Sub sum',
            },
            createdAt: '2022-09-15T14:18:50',
            content: 'My 1.1 comment',
            answers: [
              {
                id: 2,
                author: {
                  avatar: '',
                  first_name: 'Кто',
                  second_name: 'То',
                },
                createdAt: '2022-09-29T14:55:50',
                content: 'Комментарий от кто-то',
              },
              {
                id: 3,
                author: {
                  avatar: '',
                  first_name: 'Имя',
                  second_name: 'Фамилия',
                },
                createdAt: '2022-09-29T14:55:50',
                content: 'Комментарий еще один',
              },
            ],
          },
        ],
      },
      {
        id: 6,
        author: {
          avatar: '',
          first_name: 'Name_name',
          second_name: 'Family_family',
        },
        createdAt: '2022-09-15T14:19:10',
        answers: [],
        content: 'My 2 comment',
      },
    ],
  },
  {
    id: 9,
    title: 'One more title long long long long long long',
    content:
      'Text text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text textText text text text text text text text text text text',
    author: {
      avatar: '',
      first_name: 'First_name_3',
      second_name: 'Last_name_3',
    },
    createdAt: '2022-09-15T13:17:10',
    discussions: [
      {
        id: 8,
        author: {
          avatar: 'https://html5css.ru/howto/img_avatar.png',
          first_name: 'Name_name_123',
          second_name: 'Family_family_123',
        },
        createdAt: '2022-09-15T14:19:20',
        answers: [],
        content:
          'some comment  comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment comment',
      },
    ],
  },
];
