import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary';


function widthErrorHandler(WrappedComponent, axios) {
    return class extends Component {
        state = {
            error: null,
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(null, (req) => {
                this.setState({ error: null });
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use((res) => res, (err) => {
                this.setState({ error: err });
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Auxiliary>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}
                    >
                        {this.state.error ? this.setState.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            )
        }
    }
}

export default widthErrorHandler
