import React, { Component } from 'react'
import SearchBar from "../dashboard/SearchBar";
import SideBar from "../dashboard/SideBar";
import Footer from "../dashboard/Footer";
import Button from "../common/Button";
import { toast } from "react-toastify";
import axios from 'axios';

class UploadEmployee extends Component{
    constructor(){
        super();

        this.state = {
            uploadExcel: '',
            errors: {}
        }
    
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({
            uploadExcel: e.target.files[0]
        })
    }

    onSubmit(e){
        e.preventDefault();
        let loadingBtn = document.querySelector('.loading');
        let loadingComp = document.createElement("i")
        loadingComp.classList = "fas fa-circle-notch fa-spin"
        loadingBtn.innerHTML = "Uploading "
        loadingBtn.appendChild(loadingComp)
        
        if(this.state.uploadExcel === ''){
               return ((toast.error('Upload field cannot be empty')) && (loadingBtn.innerHTML = "Upload Record"));
        }
        const data = new FormData()
        data.append('file', this.state.uploadExcel)
        axios.post('/api/record', data)
        .then(res => {
            toast.success(res.data.msg);
            this.setState({
                uploadExcel: ''
            })
        })
        .catch(err => {
            toast.warn('An unexpected error occured')
            console.log(err)
        })

        loadingBtn.innerHTML = "Upload Record"
    }

    downloadTemplate(){
        fetch('/api/record/download')
        .then(res => res.blob())
        .then( blob => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            let a = document.createElement('a');
			a.href = url;
			a.download = 'Employees_Template.xlsx';
			a.click();
        })
        .catch(err => console.log(err))
    }

    render(){
        return(
            <div id="app">
                <div className="main-wrapper">
                    <div className="navbar-bg" />
                    <SearchBar />
                    <SideBar />
                    <div className="main-content">
                        <section className="section">
                            <div className="section-header">
                                <h1>Upload Employee Records</h1>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-md-7">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="text-danger">*Select a valid excel file</h4>
                                            <p className="btn-primary btn-sm mt-3 ml-2 push-download" onClick={this.downloadTemplate.bind(this)}><i className="fa fa-download mr-3 ml-1"></i>Download Upload Template</p>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={this.onSubmit}>
                                                <div className="form-group">
                                                    <p className="text-danger">*Employee level name is case sensitive and it should be spelt accordingly</p>
                                                    <input 
                                                        type="file" 
                                                        className="form-control" 
                                                        name="uploadExcel"
                                                        onChange={this.onChange} 
                                                        tabIndex="1" 
                                                    />
                                                </div>
                                                <div className="text-center">
                                                    <Button
                                                    type="submit"
                                                    classnameItems="btn-primary btn-lg loading"
                                                    btnName="Upload Record"
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <Footer />
                </div>
          </div>
        );
    }
}

export default UploadEmployee;