import { FETCH_ALL_GROUPS, FETCH_USER_GROUPS, LEAVE_GROUP, JOIN_GROUP, FETCH_GROUP_POSTS, POST_MESSAGE, POST_COMMENT, FETCH_COMMENTS, FETCH_ALL_USERS, CREATE_NEW_GROUP } from '../actions/types';

const INITIAL_STATE = {
  allGroups: [],
  userGroups: [],
  groupUsers: [],
  leaveGroupResp: '',
  groupId: null,
  joinGroupResp: '',
  groupPosts: [],
  postMessages: [],
  postComment: [],
  comments: [],
  newGroup: null
}

export default function(state=INITIAL_STATE, action){
  switch(action.type) {
    case FETCH_ALL_GROUPS:
      return { ...state, allGroups: action.payload };
    case FETCH_USER_GROUPS:
      return { ...state, userGroups: action.payload };
    case LEAVE_GROUP:
      return { ...state, leaveGroupResp: action.payload };
    case JOIN_GROUP:
      return { ...state, groupId: action.payload.groupId, joinGroupResp: action.payload.data};
    case FETCH_GROUP_POSTS:
      return { ...state, groupPosts: action.payload };
    case POST_MESSAGE:
      return { ...state, postMessages: action.payload };
    case POST_COMMENT:
      return { ...state, postComment: action.payload };
    case FETCH_COMMENTS:
      return { ...state, comments: action.payload };
    case FETCH_ALL_USERS:
      return { ...state, groupUsers: action.payload };
    case CREATE_NEW_GROUP:
      return { ...state, newGroup: action.payload };
    default:
      return state;
  }
}
