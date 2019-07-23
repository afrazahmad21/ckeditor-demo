import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import axios from "axios";
import { connect } from "react-redux";
import { saveCKHtml, getCKHtml } from "../apiUrls";
import MyUploadAdaptor from "../MyUploadAdapter";

class Editor extends Component {
  state = {
    dataCK: "<p> Add course description here....</p>",
    firstClick : false,
    type: "DESCRIPTION"
  };

  componentDidMount() {
      const {type} = this.state;
      const {teacher} = this.psops;
      const {teacherId} = teacher;
      const {REACT_APP_API_USER_NAME, REACT_APP_API_PASSWORD} = process.env;
      axios.put(
          getCKHtml,
          { type, teacherId },
          {
              auth: {
                  username: REACT_APP_API_USER_NAME,
                  password: REACT_APP_API_PASSWORD
              }
          }
      ).then(response  =>{
            this.setState({dataCK: response.data});
      }).catch(err =>{

      });
  }
  onChange = (event, editor) => {
    const data = editor.getData();
    console.log({ event, editor, data });
    this.setState({ dataCK: data });
  };


  onSubmit = e => {
    const { dataCK, type } = this.state;
    const {teacher} = this.props;
    const {teacherId} = teacher;
    const {REACT_APP_API_USER_NAME, REACT_APP_API_PASSWORD} = process.env;
    axios.post(
        saveCKHtml,
        { data: dataCK, type, teacherId },
        {
          auth: {
            username: REACT_APP_API_USER_NAME,
            password: REACT_APP_API_PASSWORD
          }
        }
      )
      .then(response => {
        const { message } = response.data;
        alert(message);
      })
      .catch(err => {
        const { message } = err.data;
        alert(message);
      });
  };

  onClick = (event) =>{
      const {firstClick,} = this.state;
      if(!firstClick){
          this.setState({firstClick: true,dataCK: "" });
      }
  };

  render() {
    let { dataCK } = this.state;
    dataCK = dataCK.split("\\n").join("\n");
    const { selectedCourse } = this.props;
    return (
      <div className="App">
        <h2> {selectedCourse.courseName} </h2>
        <CKEditor
          editor={DecoupledEditor}
          data= {dataCK}
          onInit={editor => {
            // Insert the toolbar before the editable area.
            editor.ui
              .getEditableElement()
              .parentElement.insertBefore(
                editor.ui.view.toolbar.element,
                editor.ui.getEditableElement()
              );

            editor.plugins.get(
              "FileRepository"
            ).createUploadAdapter = loader => {
              // Configure the URL to the upload script in your back-end here!
              return new MyUploadAdaptor(loader);
            };
          }}
          onChange={this.onChange}
          onClick = {this.onClick}
        />

        <div>
          <button
            type={"button"}
            className="btn-submit-editor"
            onClick={this.onSubmit}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ courses, teacher, selectedCourseId }) {
  const selectedCourse = selectedCourseId ? courses[selectedCourseId] : [];
  debugger;
  return {
    selectedCourseId,
    selectedCourse,
    teacher
  };
}
export default connect(
  mapStateToProps,
  null
)(Editor);
