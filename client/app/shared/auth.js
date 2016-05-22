import _ from 'lodash';
import log from 'db.log';

const tag = 'ngblog-token';

const saveToken = (token) => {
  window.localStorage.setItem(tag, token);
}

const auth = ($http, API, $q) => {
  let currentUser = {};

  const signin = (data) => {
    return $http({
      data,
      url: `${API.root}/auth/signin`,
      method: 'POST'
    })
    .then(({data: {token, user}}) => {
      currentUser = user;
      saveToken(token);
    });
  };

  const signup = (data) => {
    return $http({
      data,
      method: 'POST',
      url: `${API.url}/users`
    })
    .then(({data: {token}}) => {
      saveToken(token);
    });
  };

  const logout = () => {
    currentUser = {};
    window.localStorage.removeItem('ngblog-token');
  };

  const getUser = () => {
    return currentUser;
  };

  const getAllActiveUsers = (users) => {
    return activeUsers;
  };

  const refreshUser = () => {
    let token = window.localStorage.getItem('ngblog-token');

    return $http({
      method: 'GET',
      url: `${API.url}/users/me`
    })
    .then(({data}) => {
      currentUser = data;
      return currentUser;
    });
  };

  const updateUser = (user) => {
    let token = window.localStorage.getItem('ngblog-token');

    return $http({
      method: 'PUT',
      url: `${API.url}/users/${currentUser._id}`,
      data: user
    })
    .then(({data}) => {
      currentUser = data;
      return currentUser;
    });

  };

  const isAuth = () => {
    return !!window.localStorage.getItem('ngblog-token');
  };

  return {signin, signup, logout, getUser, isAuth, refreshUser, getAllActiveUsers, updateUser};
};

auth.$inject = ['$http', 'API', '$q'];

export {auth};
