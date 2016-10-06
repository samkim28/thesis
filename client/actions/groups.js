import { FETCH_ALL_GROUPS, FETCH_USER_GROUPS, LEAVE_GROUP, JOIN_GROUP, FETCH_GROUP_POSTS, POST_MESSAGE, POST_COMMENT, FETCH_COMMENTS, FETCH_ALL_USERS, CREATE_NEW_GROUP } from './types';
import { browserHistory } from 'react-router';
import axios from 'axios';
import Cookies from 'js-cookie';


export function fetchAllGroups() {
  const data = {
    params: {
      userID: Cookies.get('userID')
    },
    headers: {
      'x-access-token': Cookies.get('token')
    }
  }
  return axios.get('/api/groups/getAllGroups', data)
    .then((response) => {
      return { type: FETCH_ALL_GROUPS, payload: response.data }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function fetchUserGroups() {
  const data = {
    params: {
      user_id: Cookies.get('userID')
    },
    headers: {
      'x-access-token': Cookies.get('token')
    }
  }
  return axios.get('/api/groups/getUserGroups', data)
    .then((response) => {
      return { type: FETCH_USER_GROUPS, payload: response.data }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function joinGroup(group_id) {
  const data = {
    group_id: group_id,
    user_id: Cookies.get('userID')
  }
  const config = {
    headers: { 'x-access-token' :  Cookies.get('token')}
  }
  return axios.post('/api/groups/addUser', data, config)
    .then((response) => {
      const obj = {
        groupId: group_id,
        data: response.data
      };
      return { type: JOIN_GROUP, payload: obj }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function leaveGroup(group_id) {
  const data = {
    user_id: Cookies.get('userID'),
    group_id: group_id
  };
  const config = {
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.post('/api/groups/leaveGroup', data, config)
    .then((response) => {
      return { type: LEAVE_GROUP, payload: response }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function fetchGroupPosts(group_id) {
  const data = {
    params: { group_id: group_id },
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.get('/api/posts/getMessage', data)
    .then((response) => {
      return { type: FETCH_GROUP_POSTS, payload: response.data }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function postMessages(message, filler, groupObject) {
  const data = {
    group_id: groupObject.myGroups.groupUsers[0].groups[0].id,
    group_name: groupObject.myGroups.groupUsers[0].groups[0].name,
    username: Cookies.get('username'),
    message: message.message
  }
  const config = {
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.post('/api/posts/postMessage', data, config)
    .then((response) => {
      return { type: POST_MESSAGE, payload: response.data }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function postComment(message, filler, commentObject){
  const data = {
    post_id: commentObject.myGroups.commentObject.id,
    username: Cookies.get('username'),
    message: message.message
  }
  const config = {
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.post('/api/comments/postComment', data, config)
    .then((response) => {
      return { type: POST_COMMENT, payload: response.data }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function fetchComments(post_id) {
  const data = {
    params: { post_id: post_id },
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.get('/api/comments/getComments', data)
    .then((response) => {
      return { type: FETCH_COMMENTS, payload: response.data }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function fetchAllUsers(group_id) {
  const data = {
    params: { group_id: group_id },
    headers: { 'x-access-token': Cookies.get('token') }
  }
  return axios.get('/api/groups/fetchAllUsers', data)
    .then((response) => {
      console.log(response.data)
      return { type: FETCH_ALL_USERS, payload: response.data }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function createNewGroup(newGroupObj){
  newGroupObj.userID =  Cookies.get('userID');
  const data = newGroupObj;
  const config = {
    headers: {
      'x-access-token': Cookies.get('token')
    }
  }
  return axios.post('/api/groups/createGroups', data, config)
    .then((response) => {
      Cookies.set('group_id', response.data.group.id);
      Cookies.set('groupName', response.data.group.name);
      return { type : CREATE_NEW_GROUP, payload: response.data }
    })
    .catch((error) => {
      console.error(error);
    });
}
