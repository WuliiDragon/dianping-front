import Mock from 'mockjs';
import api from '../api';

// 列表数据
Mock.mock(new RegExp(api.list), 'get', {
  code: 200,
  msg: '',
  data: [
    { id: 1,
      name: 'C区三层自助餐',
      desc: '专注自助餐50年',
      price: '12',
      sales: '@integer(50, 200)',
      star: 5,
      imgUrl: 'http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/512/h/384',
      store: {

        taste: 9,
        environment: 8.7,
        service: 8.9,
        name: '鸿运饭店',
        address: '双井北街33号',
        tel: '@integer(4000000000, 4009999999)',
        businessHours: '09:00~23:00'
      },
      comments: [
        {
          name: '*@biubiu李美丽',
          avatar: 'https://lorempixel.com/200/200/?@natural',
          star: 4,
          text: '和朋友一起吃的，真的棒棒滴，胃口棒棒滴，环境棒棒滴，不忘此行，已收藏。',
          pics: ['http://fuss10.elemecdn.com/8/71/c5cf5715740998d5040dda6e66abfjpeg.jpeg?imageView2/1/w/180/h/180',
            'http://fuss10.elemecdn.com/b/6c/75bd250e5ba69868f3b1178afbda3jpeg.jpeg?imageView2/1/w/180/h/180',
            'http://fuss10.elemecdn.com/f/96/3d608c5811bc2d902fc9ab9a5baa7jpeg.jpeg?imageView2/1/w/180/h/180',
            'http://fuss10.elemecdn.com/6/ad/779f8620ff49f701cd4c58f6448b6jpeg.jpeg?imageView2/1/w/180/h/180']
        },
        {
          name: '*@clast',
          avatar: 'https://lorempixel.com/200/200/?@natural',
          star: 5,
          text: '被朋友拉过去的，谢谢我的朋友。本来不想吃的，但是最后就我吃的最多。',
          pics: []
        },
        {
          name: '*@clast',
          avatar: 'https://lorempixel.com/200/200/?@natural',
          star: 5,
          text: '挺好滴',
          pics: ['http://fuss10.elemecdn.com/b/6c/75bd250e5ba69868f3b1178afbda3jpeg.jpeg?imageView2/1/w/180/h/180', 'http://fuss10.elemecdn.com/8/71/c5cf5715740998d5040dda6e66abfjpeg.jpeg?imageView2/1/w/180/h/180']
        }
      ],
    },
    {
      id: 2,
      name: 'C2重庆小面',
      desc: '正宗小面，绑住你的味蕾',
      price: '14',
      sales: '@integer(50, 200)',
      star: 4,

      imgUrl: 'http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/512/h/384',
      store: {
        taste: 7,
        environment: 8.3,
        service: 7.9,

        name: '重庆小面',
        address: 'C1 3档口',
        tel: '@integer(4000000000, 4009999999)',
        businessHours: '09:00~23:00'
      },
      comments: [
        {
          name: '*@clast',
          avatar: 'https://lorempixel.com/200/200/?@natural',
          star: 5,
          text: '和朋友一起吃的，真的棒棒滴，胃口棒棒滴，环境棒棒滴，不忘此行，已收藏。',
          pics: ['http://fuss10.elemecdn.com/8/71/c5cf5715740998d5040dda6e66abfjpeg.jpeg?imageView2/1/w/180/h/180',
            'http://fuss10.elemecdn.com/b/6c/75bd250e5ba69868f3b1178afbda3jpeg.jpeg?imageView2/1/w/180/h/180', 'http://fuss10.elemecdn.com/f/96/3d608c5811bc2d902fc9ab9a5baa7jpeg.jpeg?imageView2/1/w/180/h/180', 'http://fuss10.elemecdn.com/6/ad/779f8620ff49f701cd4c58f6448b6jpeg.jpeg?imageView2/1/w/180/h/180']
        },
        {
          name: '*@clast',
          avatar: 'https://lorempixel.com/200/200/?@natural',
          star: 3,
          text: '挺好滴',
          pics: ['http://fuss10.elemecdn.com/b/6c/75bd250e5ba69868f3b1178afbda3jpeg.jpeg?imageView2/1/w/180/h/180', 'http://fuss10.elemecdn.com/8/71/c5cf5715740998d5040dda6e66abfjpeg.jpeg?imageView2/1/w/180/h/180']
        }
      ],

    },
  ]
});

// 用户数据
Mock.mock(new RegExp(api.user), 'get', {
  code: 200,
  msg: '',
  data: {
    username: '@name',
    password: '@word(8, 10)',
    avatar: 'https://lorempixel.com/200/200/?@natural'
  }
});
