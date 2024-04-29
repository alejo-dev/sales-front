import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { sendRequest } from "../../fuctions";
import storage from "../../Storage/Storage";

const LoginForm = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const go = useNavigate();
  const login = async(e) => {
    e.preventDefault();
    const form = {user: user, password: password};
    const res = await sendRequest('POST', form, "/auth/login", "", false);
    if (res['access_token']) {
      storage.set('authToken', res['access_token']);
      storage.set('authUser', res['user']);
      go("/");
    }
    
  }
  return (
    <div>
        <div className="container mt-5">
            <div className="row">
              <div className="col">
                <h2 className="fw-bold text-center py-5">Bienvenido al sistema de ventas</h2>
                <form onSubmit={login}>
                  <div className="mb-4">
                    <label htmlFor="user" className="form-label">Usuario</label>
                    <input type="text" required='required' className="form-control" name="user" value={user} onChange={(e) => setUser(e.target.value)}></input>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Iniciar sesión</button>
                  </div>
                </form>
              </div>
            </div>
        </div>
    </div>
  );
};

export default LoginForm;
