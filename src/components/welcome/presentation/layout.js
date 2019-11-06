import React from 'react'

const LayoutWelcome = (props) => {
    return (
        <>
            <div className="container">
                <div className="row mb-5">
                    <div className="col-lg-8 mx-auto">
                        <div className="bg-white p-5 rounded shadow">
                            <h1 className="font-weight-light">Como deseas que te llame?</h1>
                            <form className={'needs-validation' + (props.submitted ? ' was-validated' : '')} noValidate onSubmit={props.handlerSubmit}>
                                <div className="row mb-4">
                                    <div className="form-group col-md-9">
                                        <input
                                            onChange={props.handlChange}
                                            value={props.userName}
                                            required
                                            id="userName"
                                            type="text"
                                            placeholder="Escribe un nombre para tu usario"
                                            className="form-control form-control-underlined" />
                                        <div className="invalid-feedback">
                                            Ingrese un nombre de usuario.
                                        </div>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <button
                                            type="submit"
                                            className="btn btn-primary rounded-pill btn-block shadow-sm">ENTRAR</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                .form-control:focus {
                    box-shadow: none;
                  }
                  .form-control-underlined {
                    border-width: 0;
                    border-bottom-width: 1px;
                    border-radius: 0;
                    padding-left: 0;
                  }
                  `}
            </style>
        </>
    )
}

export default LayoutWelcome