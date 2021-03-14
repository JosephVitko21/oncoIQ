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

    // const data = new FormData();
    // data.append('file', this.uploadInput.files[0]);

    // fetch('https://oncoiq-backend.herokuapp.com/api/upload_image', {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: data,
    // }).then((response) => {
    //   response.json().then((body) => {
    //     this.setState({ imageURL: `http://localhost:8000/${body.file}` });
    //   });
    // });

    authFetch("https://oncoiq-backend.herokuapp.com/api/protected").then(response => {
        if (response.status === 401){
          console.log("Sorry you aren't authorized!")
          return null
        }
        return response.json()
      }).then(response => {
        if (response && response.message){
          console.log(response.message)
        }
      })
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