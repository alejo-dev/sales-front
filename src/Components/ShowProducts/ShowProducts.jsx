import React, { useEffect, useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";
import { sendRequest, show_alerta } from "../../fuctions";

const ShowProducts = () => {
  const url = "";
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState("");


  const getProducts = async () => {
    const res = await sendRequest("GET", "", "/products", "", true);
    setProducts(res);
  };

    useEffect(() => {
        getProducts();
    }, []);


    const openModal = (op, id, name, description, price) => {
        setId('');
        setName('');
        setDescription('');
        setPrice('');
        setOperation(op);
        if (op === 1) {
            setTitle("Registrar producto");
        } else if (op === 2) {
            setTitle("Editar Producto");
            setId(id);
            setName(name);
            setDescription(description);
            setPrice(price);
        }
        window.setTimeout(function() {
            document.getElementById('nombre').focus();
        }, 500);
    }

    const validar = () => {
        var parametros;
        var metodo;

        if (name.trim() === "") {
            show_alerta("Escribe el nombre del producto", "warning");
        } else if(description.trim() === "") {
            show_alerta("Escribe la descripción del producto", "warning");
        } else if(price === "") {
            show_alerta("Escribe el precio del producto", "warning");
        } else {
            if(operation === 1) {
                parametros = {name: name.trim(), description: description.trim(), price: price};
                metodo = "POST";
            } else {
                parametros = {id: id, name:name.trim(), description: description.trim(), price: price};
                metodo = "PUT";
            }
            enviarSolicitud(metodo,parametros);
        }
    }

    const enviarSolicitud = async(metodo, parametros) => {
        if (metodo === "POST") {
            const res = await sendRequest(metodo, parametros, "/products/", "", true);
            if (res["id"]) {
                show_alerta("Producto guardado", "success");
                document.getElementById("btnCerrar").click();
                getProducts();
            }
        }

        if (metodo === "PUT") {
            const res = await sendRequest(metodo, parametros, "/products/" + parametros["id"], "", true);
            if (res["id"]) {
                show_alerta("Producto actualizado", "success");
                document.getElementById("btnCerrar").click();
                getProducts();
            }
        }

        if (metodo === "DELETE") {
            const res = await sendRequest(metodo, parametros, "/products/" + parametros["id"], "", true);
            if (res["name"]) {
                show_alerta("Producto eliminado", "success");
                document.getElementById("btnCerrar").click();
                getProducts();
            }
        }
        
    }

    const deleteProduct = (id, name) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: "¿Seguro de eliminar el producto " + name + " ?",
            icon: "question", text: "No se podrá dar marcha atrás",
            showCancelButton: true, confirmButtonText: "Si, eliminar", cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                setId(id);
                enviarSolicitud("DELETE", {id: id});
            } else {
                show_alerta("El producto NO fue eliminado", "info");
            }
        })
    }

    return (
    <div>
        <div className='App'>
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-md-4 offset-md-4">
                        <div className="d-grid mx-auto">
                            <button onClick={() => openModal(1)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalProducts">
                                Añadir
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped table-hover">
                                <thead>
                                    <tr><th>#</th><th>PRODUCTO</th><th>DESCRIPCION</th><th>PRECIO</th><th></th></tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {products.map((product, i) => (
                                        <tr key={product.id}>
                                            <td>{(i+1)}</td>
                                            <td>{product.name}</td>
                                            <td>{product.description}</td>
                                            <td>${new Intl.NumberFormat('es-co').format(product.price)}</td>
                                            <td>
                                                <button onClick={() => openModal(2, product.id, product.name, product.description, product.price)}
                                                    className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalProducts">
                                                    <i className="fa-solid fa-edit"></i>
                                                </button>
                                                &nbsp;
                                                <button onClick={() => deleteProduct(product.id, product.name)} className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="modalProducts" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="h5">{title}</label>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input type="hidden" id="id"></input>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                                <input type="text" id="nombre" className="form-control" placeholder="Nombre" value={name} 
                                onChange={(e)=>setName(e.target.value)}></input>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className="fa-solid fa-comment"></i></span>
                                <input type="text" id="descripcion" className="form-control" placeholder="Descripción" value={description} 
                                onChange={(e)=>setDescription(e.target.value)}></input>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className="fa-solid fa-dollar-sign"></i></span>
                                <input type="text" id="precio" className="form-control" placeholder="Precio" value={price} 
                                onChange={(e)=>setPrice(e.target.value)}></input>
                            </div>
                            <div className="d-grid col-6 mx-auto">
                                <button onClick={() => validar()} className="btn btn-primary">
                                    <i className="fa-solid fa-floppy-disk"></i> Guardar
                                </button>
                            </div>
                            <div className="modal-footer">
                                <button type="button" id="btnCerrar" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default ShowProducts;
