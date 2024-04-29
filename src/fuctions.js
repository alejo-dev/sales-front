import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import storage from "./Storage/Storage";

export const show_alerta = (mensaje, icono, foco='') => {
    onfocus(foco);
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title: mensaje,
        icon: icono
    });

    function onfocus(foco) {
        if (foco !== "") {
            document.getElementById(foco).focus();
        }
    }
}

export const sendRequest = async(method, params, url, redir='', token=true) => {
    if (token) {
        const authToken = storage.get("authToken");
        axios.defaults.headers.common["Authorization"] = "Bearer " + authToken;
    }
    let res;
    await axios({ method: method, url:url, data: params }).then(
        response => {
            res = response.data

        }).catch((errors) => {
            show_alerta(errors, "error");
        });
        return res;
}

export const sendRequest2 = async(method, params, url, redir='', token=true) => {
    if (token) {
        const authToken = storage.get("authToken");
        axios.defaults.headers.common["Authorization"] = "Baerer  " + authToken;
    }
    let res;
    await axios({ method: method, url:url, data: params }).then(
        response => {
            res = response.data
            (method != "GET") ? show_alerta(response.data.message, "success"): "";
            setTimeout(() => (redir !== "") ? window.location.href = redir : "", 2000);
        }).catch((errors) => {
            let desc = "";
            res = errors.response.data;
            errors.response.data.errors.map((e) => {desc = desc + ' ' + e});
            show_alerta(desc, "error");
        });
        return res;
}

export const confirmation = async(name, url, redir) => {
    const alert = Swal.mixin({buttonsStyling:true});
    alert.fire({
        tittle: "Are you sure delte " + name + " ?",
        icon: "question", showCancelButton: true,
        confirmButtonText:"<i class='fa-solid fa-check'></i> Yes, delete",
        cancelButtonText: "<i class='fa-solid fa-ban'></i> Cancel"
    }).then((result) => {
        if (result.isConfirmed){
            sendRequest('DELETE', {}, url, redir);
        }
    });
}

export default show_alerta;