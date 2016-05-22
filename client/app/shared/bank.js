import _ from 'lodash';

const bank = ($http, API, $q, Auth) => {
  let allPosts = [];
  let id = 0;
  let currentBalance = 0;

  const get = () => {
    return $http.get(`${API.url}/bank`)
      .then(({res}) => {
        allPosts = res.map(post => {
          post.slug = post.title.replace(/\s+/g, '-');
          return post;
        });
      });
  };

  const getOne = (query) => {

    const post = _.find(allPosts, query);

    if (post) {
      return $q.when(post);
    } else {
      let url = `${API.url}/bank`;

      if (query.id) {
        url += `${query.id}`
      } else if (query.title) {
        url += `?title=${query.title}`
      }

      return $http.get(url)
        .then(({res}) => {
          return res[0];
        });
    }
  };

  const getBalance = () => {
    let user = Auth.getUser();
    let userAccount = user.accounts[0];

    return $http({
      url: `${API.url}/bank/${userAccount}`,
      method: 'GET'
    })
    .then((res) => {
      currentBalance = res.data.balance;
    });
  };

  const withdraw = (amount) => {
    let user = Auth.getUser();
    let userAccount = user.accounts[0];

    return $http({
      url: `${API.url}/bank/${userAccount}`,
      method: 'PUT',
      data: {amount, userId: user._id}
    });
  };

  const getState = () => {
    return currentBalance;
  };

  const create = (data) => {
    return $http({
      data,
      url: `${API.url}/bank`,
      method: 'POST'
    });
  };

  return {get, getOne, getState, getBalance, withdraw, create};
};

bank.$inject = ['$http', 'API', '$q', 'Auth'];

export {bank};
