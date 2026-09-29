export type MemoryLayout =
  | 'below'          // image on top, text below
  | 'above'          // text on top, image below
  | 'beside-left'    // image left, text right
  | 'beside-right'   // image right, text left
  | 'overlay-bottom' // text overlaid at bottom of image
  | 'overlay-center' // text overlaid at center of image
  | 'full-bleed';    // large image, text below in script font

export interface Memory {
  id: number;
  image: string;
  text: string;
  layout: MemoryLayout;
}

export const memories: Memory[] = [
  {
    id: 1,
    image: '/photos/001.jpg',
    text: 'It started here',
    layout: 'below',
  },
  {
    id: 2,
    image: '/photos/002.jpg',
    text: 'After a few months, we were here',
    layout: 'beside-right',
  },
  {
    id: 3,
    image: '/photos/003.jpg',
    text: 'And then we were apart',
    layout: 'overlay-bottom',
  },
  {
    id: 4,
    image: '/photos/004.jpg',
    text: 'And apart some more',
    layout: 'beside-left',
  },
  {
    id: 5,
    image: '/photos/005.jpg',
    text: 'Then we got together and had good time',
    layout: 'below',
  },
  {
    id: 6,
    image: '/photos/006.jpg',
    text: 'But being far away didn\u2019t make us lose our spark 👀',
    layout: 'overlay-center',
  },
  {
    id: 7,
    image: '/photos/007.jpg',
    text: 'Then we met again',
    layout: 'above',
  },
  {
    id: 8,
    image: '/photos/008.jpg',
    text: 'No matter if we were apart or not, you\u2019re always able to entertain me',
    layout: 'beside-right',
  },
  {
    id: 9,
    image: '/photos/009.jpg',
    text: 'We ate amazing homemade food',
    layout: 'below',
  },
  {
    id: 10,
    image: '/photos/010.jpg',
    text: 'And we also ate some other amazing food together',
    layout: 'beside-left',
  },
  {
    id: 11,
    image: '/photos/011.jpg',
    text: 'The distance was never easy',
    layout: 'overlay-bottom',
  },
  {
    id: 12,
    image: '/photos/012.jpg',
    text: 'And sometimes we were mad at each other',
    layout: 'beside-right',
  },
  {
    id: 13,
    image: '/photos/013.jpg',
    text: 'But that never stopped me, and that never stopped us from loving and committing to each other',
    layout: 'overlay-center',
  },
  {
    id: 14,
    image: '/photos/014.jpg',
    text: 'I love you, and I will always love you and care for you. Happy anniversary',
    layout: 'full-bleed',
  },
];
