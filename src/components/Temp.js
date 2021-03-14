import React from 'react';
import {login, authFetch, useAuth, logout} from "../auth";

class Temp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: '',
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleUploadImage(ev) {
    ev.preventDefault();

    var myHeaders = new Headers();
    const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY').split('"')[1];
    console.log("local key", token);
    myHeaders.append("Authorization", "Bearer " + token);

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow'
    };

    fetch('http://localhost:5000/api/upload_image', requestOptions)
    // .then((response) => {
    //   response.json().then((body) => {
    //     this.setState({ imageURL: `http://localhost:8000/${body.file}` });
    //   });
    // });
    .then(response => response.json())
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log('error', error);
    });
  }

  render() {
    return (
      <form onSubmit={this.handleUploadImage}>
        <div>
          <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
        </div>
        <div>
          <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
        </div>
        <br />
        <div>
          <button>Upload</button>
        </div>
        <img src={this.state.imageURL} alt="img" />
      </form>
    );
  }
}

export default Temp;