import React, { useState, useEffect } from "react";
import "../../assets/scss/style.scss";
import Aux from "../../hoc/_Aux";
import logo from "../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import { Form, Row, Col } from "react-bootstrap";
import Field from "../../App/components/Form/Field";
import AuthService from "../../services/AuthService";
import { Redirect } from "react-router-dom";
import jwt from "jwt-decode";
import deviceStorage from "../../utils/Storage";

const Login = () => {
  const { handleSubmit, register, errors } = useForm();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    deviceStorage.clear();
  }, []);

  const onSubmit = async (values) => {
    const credentials = {
      user: values.user.trim(),
      password: values.password.trim(),
    };
    const data = await AuthService.auth(credentials);
    if (data.problem) {
      alert("Ha ocurrido un error intentando autenticarse");
      return;
    }

    if (data.respuesta.codigo === "5" || data.respuesta.codigo === "3") {
      alert(data.respuesta.descripcion);
      return;
    }

    deviceStorage.setItem("access_token", data.tokenResponse.access_token);
    deviceStorage.setItem(
      "roles",
      JSON.stringify(jwt(data.tokenResponse.access_token).authorities)
    );
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/articulos" />;
  }

  return (
    <Aux>
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <div className="card">
            <div className="card-body">
              <div className="text-center">
                <div className="mb-1">
                  <img src={logo} width={200} alt="Logo" />
                </div>
                <h3 className="mb-4">USA</h3>
              </div>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col>
                    <Field
                      label="Usuario"
                      name="user"
                      type="text"
                      register={register}
                      errors={errors.user}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Field
                      label="Contraseña"
                      name="password"
                      type="password"
                      register={register}
                      errors={errors.password}
                    />
                  </Col>
                </Row>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary shadow-2 mb-4 "
                  >
                    Iniciar sesión
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default Login;
