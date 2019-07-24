
import Mock from 'mockjs';

const data = Mock.mock({
  'lists|5': [
    {
      'id|+1': 1,
      'city':'@province'
    }
  ]
})


const datashi = Mock.mock({
  "lists|5": [
    {
      "id|+1": 100,
      'city': "@city"
    }
  ]
});

const dataxian = Mock.mock({
  "lists|10": [
    {
      "id|+1": 100,
      city: "@qu"
    }
  ]
});

export default [
  {
    url: "/cities/sheng",
    type: "get",
    response: config => {
      const lists = data.lists;
      return {
        code: 20000,
        data: {
          total: lists.length,
          items: lists
        }
      };
    }
  },
  {
    url: "/cities/shi",
    type: "post",
    response: config => {
      const lists = datashi.lists;
      return {
        code: 20000,
        data: {
          total: lists.length,
          items: lists
        }
      };
    }
  },
  {
    url: "/cities/xian",
    type: "post",
    response: config => {
      const lists = datashi.lists;
      return {
        code: 20000,
        data: {
          total: lists.length,
          items: lists
        }
      };
    }
  }
];

