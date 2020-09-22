import React, { Component } from 'react';
import Modal from "../components/UI/Modal";
import { Aux } from "./Auxiliar";
import Backdrop from "../components/UI/Backdrop/Backdrop";

const WithErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        };

        componentWillMount () {
            this.resInterceptor = axios
            .interceptors
            .response
            .use(res => res, error => {
                this.setState({error: error});

            });

            this.reqInterceptor = axios
            .interceptors
            .request
            .use(req => {
                this.setState({error: null});
                return req;
            });
        }

        componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }
        
        render () {
            return(
                <Aux>
                    <Modal show = {this.state.error}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <Backdrop show = {this.state.error} clicked = {this.errorConfirmedHandler}/>
                    <WrappedComponent {...this.props} />
                </Aux>
                
            );
        }
    };
}

export default WithErrorHandler;