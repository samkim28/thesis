import React, { Component } from 'react';
import TabContent from './TabContent';

class Tabs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tabsList: [],
      currentTab: null
    }
    this.changeTab.bind(this);
  }

  changeTab(tab) {
    if(tab !== this.state.currentTab) {
      this.setState({
        currentTab: tab
      });
    }
  }

  render() {
    return (
      <div>
        <nav>
          <ul>
            <li onClick={()=>this.changeTab('FoodDiary')}>Food Diary</li>
            <li onClick={()=>{this.changeTab('MyFriends')}}>My Friends</li>
            <li onClick={()=>{this.changeTab('MyGroups')}}>My Groups</li>
          </ul>
        <TabContent currentTab={this.state.currentTab} />
        </nav>
      </div>
    );
  }

}

export default Tabs;
