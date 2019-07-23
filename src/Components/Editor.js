import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import axios from "axios";
import { connect } from "react-redux";
import { saveCKHtml, getCKHtml } from "../apiUrls";
import MyUploadAdaptor from "../MyUploadAdapter";

class Editor extends Component {
  state = {
    dataCK: "<p></p>",
    firstClick : false,
    type: "DESCRIPTION"
  };

  componentDidMount() {
      const {type} = this.state;
      const {teacher, selectedCourseId} = this.props;
      const {teacherId} = teacher;
      const {REACT_APP_API_USER_NAME, REACT_APP_API_PASSWORD} = process.env;
      axios.put(
          getCKHtml,
          { type, teacherId,courseId: selectedCourseId },
          {
              auth: {
                  username: REACT_APP_API_USER_NAME,
                  password: REACT_APP_API_PASSWORD
              }
          }
      ).then(response  =>{
            const {editor} = response.data;
            const {data} = editor;

            if(data)
                this.setState({dataCK: data});
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
    const {teacher, selectedCourseId} = this.props;
    const {teacherId} = teacher;
    const {REACT_APP_API_USER_NAME, REACT_APP_API_PASSWORD} = process.env;
    axios.post(
        saveCKHtml,
        { data: dataCK, type, teacherId, courseId: selectedCourseId },
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
        this.props.history.push('/courses');
      })
      .catch(err => {
        const { message } = err.data;
        alert(message);
      });
  };

  onClick = (event) =>{
      const {firstClick} = this.state;

      if(!firstClick){
          this.setState({firstClick: true,dataCK: "" });
      }
  };

  render() {
    let { dataCK } = this.state;
    dataCK = dataCK ? dataCK.split("\\n").join("\n"): "";
    const { selectedCourse } = this.props;
    return (
      <div className="App">
          <section className="banner1">
              <header>
                  <nav className="navbar navbar-expand-lg navbar-light">
                      <div className="container">
                          <a className="navbar-main" href="index.html">
                              <img src="/images/logo.png"/>
                              <small>
                                  <sub>Edit Description</sub>
                              </small>
                          </a>
                      </div>
                  </nav>
              </header>
          </section>
          <h2 style={{padding: '10px', textAlign: 'center', textTransform: "upperCase"}}> {selectedCourse.courseName} </h2>
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
          onClick={this.onClick}
        />

        <div>
          <button
            type={"button"}
            style={{padding: "10px 10px 0 0",
                backgroundColor: "#2A46DB",
                width: "100%",
                boxShadow: "0px 0px 2px #fff",
                textShadow: "-1px -1px 0 rgba(0,0,0,0.3)",
                fontWeight: "500",
                fontSize: "22px",
                color: "white",
                border: "1px solid #1A428D"
            }}
            onClick={this.onSubmit}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ courses, teacher }) {
  const {list, selectedCourseId} = courses;
  const selectedCourse = selectedCourseId ? list[selectedCourseId] : [];

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
