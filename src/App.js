import React, {Component} from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import axios from 'axios';
import {SaveCKHtml} from './apiUrls';
import MyUploadAdapter from './MyUploadAdapter'

class App extends Component {
    state = {
        dataCK: "<p>Edit Here</p>"
    }
    onChange = (event, editor) => {
        const data = editor.getData();
        console.log({event, editor, data});
        this.setState({dataCK: data})
    }

    onSubmit = (e) => {
        const {dataCK} = this.state;
        axios.post(SaveCKHtml, {data: dataCK}, {
            auth: {
                username: 'ckeditor',
                password: 'pakistan123'
            }
        })
            .then(response => {
                const {message} = response.data
                alert(message)
            }).catch(err => {
                debugger
            const {message} = err.data
            alert(message)
        })
    }

    render() {
        let {dataCK} = this.state;
        dataCK = dataCK.split('\\n').join('\n');

        return (
            <div className="App">
                <h2> CKEditor 5 </h2>
                <CKEditor
                    editor={DecoupledEditor}
                    data="<p>Edit here</p>"
                    onInit={ editor => {
                        console.log( 'Editor is ready to use!', editor );

                        // Insert the toolbar before the editable area.
                        editor.ui.getEditableElement().parentElement.insertBefore(
                            editor.ui.view.toolbar.element,
                            editor.ui.getEditableElement()
                        );

                        editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
                            // Configure the URL to the upload script in your back-end here!
                            return new MyUploadAdapter( loader );
                        };
                    } }
                    onChange={this.onChange}
                />

                <div>
                    <button type={"button"} onClick={this.onSubmit}>Save HTML</button>
                </div>
            </div>
        );
    }
}

export default App;

