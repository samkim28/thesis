import React, { Component } from 'react';
import { fetchGroupStatus, joinGroup, leaveGroup } from '../../actions/groups';

class GroupButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      groupStatus: undefined
    }
    this.getStatus.bind(this);
    this.setStatus.bind(this);
  }

  getStatus() {
    fetchGroupStatus(this.props.groupID)
    .then((response) => {
      this.setState({
        groupStatus: response.payload
      });
    });
  }

  setStatus(status) {
    this.setState({
      groupStatus: status
    });
  }

  componentWillMount() {
    this.getStatus();
  }
  
  render() {

    if(this.state.groupStatus === false) {
      return (
        <div>
          <button onClick={() => {
            joinGroup(this.props.groupID)
            .then((response) => {
              this.setStatus(true);
            })
          }}>
          Join Group
          </button>
        </div>
      );
    // } else if(this.state.groupStatus === 'requested') {
    //   return (
    //     <div>
    //       <button onClick={() => {
    //         leaveGroup(this.props.groupID)
    //         .then((response) => {
    //           this.setStatus(false);
    //         });
    //       }}>
    //       Cancel Request
    //       </button>
    //     </div>
    //   );
    } else if(this.state.groupStatus === true) {
      return (
        <div>
          <button onClick={() => {
            leaveGroup(this.props.groupID)
            .then((response) => {
              this.setStatus(false);
            });
          }}>
          Leave Group
          </button>
        </div>
      );
    // } else if(this.state.groupStatus === 'owner') {
    //   return (
    //     <div>
    //       <button onClick={() => {
    //         deleteGroup(this.props.groupID);
    //       }}>
    //       Delete Group
    //       </button>
    //     </div>
    //   );
    } else {
      return (
        <div>
          <button>
          </button>
        </div>
      );
    }
    
  }

}

export default GroupButton;
