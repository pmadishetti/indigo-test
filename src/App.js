import React from 'react';
import { connect } from "react-redux";
import * as actions from './actions/appactions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

class App extends React.Component {
  componentDidMount() {
    actions.loadImages(this.props.dispatch);
  }
  //To Enable or Disbale the click of image to open in a new tab.
  navigate = (url) => {
    if (this.props.appState && this.props.appState.enableNavigate) {
      let value = window.confirm("Are you sure, want to open this image in a new tab.");
      if (value) {
        window.open(url);
      }
    }
  }
  //action of image
  disableNavigate = () => {
    actions.enableNavigate(this.props.dispatch);
  }
  render() {
    let displayImages = "";
    const customIdS = "custom-id-success";
    const customIdF = "custom-id-fail";
    //Toast on success API.
    const notifySuccess = () => {
      toast.success("Data Loaded Successfully.", {
        toastId: customIdS,
        hideProgressBar: true,
      });
    }
   //Toast on fail API.
    const notifyFail = () => {
      toast.error("Failed to Load the Data.", {
        toastId: customIdF,
        hideProgressBar: true,
      });
    }
    if (this.props.appState.images && this.props.appState.images.length > 0) {
        notifySuccess();
      displayImages = this.props.appState.images.map((x) => {
        return (
          <div key={x.id}>
            <div className="card mb-2">
              <div className="card-body">
                <h5 className="card-title">{x.photographer}</h5>
                <p className="card-text">{x.photographer_url}</p>
                <p className="card-text">{x.width}X{x.height}</p>
              </div>
              <picture>
                <source media="(max-width: 250px)" srcSet={x.src.tiny} />
                <source media="(max-width: 400px)" srcSet={x.src.small} />
                <source media="(max-width:650px )" srcSet={x.src.medium} />
                <source media="(max-width: 850px)" srcSet={x.src.original} />
                <source media="(max-width: 1080px)" srcSet={x.src.portrait} />
                <source media="(max-width: 1920px)" srcSet={x.src.landscape} />
                <img className="img-fluid mb-3 pr-2 ml-1" src={x.src.original} onClick={() => { this.navigate(x.url) }} alt="Display"></img>
              </picture>
            </div>
          </div>
        )
      });
    }
    else {
      if (!this.props.appState.dataSuccess) {
          notifyFail();
      }
    }
    return (
      <React.Fragment>
        {this.props.appState.images && this.props.appState.images.length > 0 ?
          <div>
            <div>
              <nav className="navbar fixed-top bg-primary">
                <ul className="nav navbar-nav navbar-right w-100">
                  <li className="text-right"><button type="submit" className="btn navbar-btn btn-warning" onClick={() => this.disableNavigate()} name="disable">{this.props.appState.enableNavigate ? 'Disable Navigate' : 'Enable Navigate'}</button></li>
                </ul>
              </nav>
            </div>
            <div className="container-fluid">
              <div className="text-center mt-25">
                {displayImages}
              </div>
            </div>
          </div>
          : ""}
        {this.props.appState.loader ? <div id="loader"></div> : ""}
        {this.props.appState.dataSuccess ?
          <ToastContainer /> : <ToastContainer />}
      </React.Fragment>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    appState: state
  };
};
export default connect(mapStateToProps)(App);
