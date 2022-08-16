import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
import styled from "styled-components";

const VideoNotFoundDiv = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
`
// import './UserVideo.css';

export default class UserVideoComponent extends Component {

    // getNicknameTag() {
    //     // Gets the nickName of the user
    //     return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
    // }

    render() {
        return (
            <div>
                {this.props.streamManager !== undefined ? (
                    <div className="streamcomponent">
                        <OpenViduVideoComponent streamManager={this.props.streamManager} />
                        {/* <div><p>{this.getNicknameTag()}</p></div> */}
                    </div>
                ) : <VideoNotFoundDiv>호스트가 업습니다</VideoNotFoundDiv>}
            </div>
        );
    }
}
