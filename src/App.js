import React, {Component} from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import {SaveCKHtml} from './apiUrls';

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
                    editor={ClassicEditor}
                    data="<p>Edit here</p>"
                    onInit={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={this.onChange}
                />

                <div style={{marginTop: "20px", fontWeight: "bold"}}>
                    <label>Code</label>
                </div>
                <div style={{marginTop: "10px"}}>
                    <textarea rows={7} cols={100} value={dataCK}/>
                </div>
                <div>
                    <button type={"button"} onClick={this.onSubmit}>Save HTML</button>
                </div>
            </div>
        );
    }
}

export default App;

