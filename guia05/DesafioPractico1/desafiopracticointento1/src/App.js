import React from 'react';
import './App.css'
//utilizando reactstrap para poder usar ventanas modales
import "bootstrap/dist/css/bootstrap.min.css";
//componentes de reactstrap
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";



//tabla de contactos
class App extends React.Component {
  state = {
    data: [
      { id: 1, Name: 'Jose Jimenez', Phone: '78566182', isFavorite: false },
      { id: 2, Name: 'Raul Ramirez', Phone: '63916523', isFavorite: false },
      { id: 3, Name: 'Wade Watts', Phone: '79852657', isFavorite: false },
      { id: 4, Name: 'Angel Rodriguez', Phone: '79893502', isFavorite: false },
      { id: 5, Name: "Mario Alvarado", Phone: "79618974", isfavorite: false  },
      { id: 6, Name: "Emerson Cartagena", Phone: "69875657", isfavorite: false  },
    ],
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: '',
      Name: '',
      Phone: '',
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].Name = dato.Name;
        arreglo[contador].Phone = dato.Phone;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };


  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento " + dato.id);
    if (opcion === true) {
      var arreglo = this.state.data.filter((contact) => contact.id !== dato.id);
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar = () => {
    var valorNuevo = { ...this.state.form, id: this.state.data.length + 1 };
    var lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  };


  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  toggleFavorite = (dato) => {
    const newData = this.state.data.map((contact) => {
      if (contact.id === dato.id) {
        return { ...contact, isFavorite: !contact.isFavorite };
      }
      return contact;
    });

    this.setState({ data: newData });
  };

  render() {
    const favorites = this.state.data.filter((contact) => contact.isFavorite);
    const nonFavorites = this.state.data.filter((contact) => !contact.isFavorite);

    return (
      <>
      <Container>
        <br></br>
        <h1>Administrador de Contactos</h1>
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>
            Crear Contacto</Button>
          <br />
          <br />
          <h3>Favoritos</h3>
          <Table>
            {/* Display favorite contacts */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {favorites.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.Name}</td>
                  <td>{dato.Phone}</td>
                  <td>
                    <Button
                      color="warning"
                      onClick={() => this.toggleFavorite(dato)}
                    >
                      Remover Favorito
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h3>Todos los Contactos</h3>
          <Table>
          <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Acción</th>
              </tr>
            </thead>
            {/* Display non-favorite contacts */}
            <tbody>
              {nonFavorites.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.Name}</td>
                  <td>{dato.Phone}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{' '}
                    <Button color="danger" onClick={() => this.eliminar(dato)}>
                      Eliminar
                    </Button>{' '}
                    <Button color="success" onClick={() => this.toggleFavorite(dato)}>
                      {dato.isFavorite ? 'Remover Favorito' : 'Agregar Favorito'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
        

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id:
              </label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Name:
              </label>
              <input
                className="form-control"
                name="Name"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Name}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Phone:
              </label>
              <input
                className="form-control"
                name="Phone"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Phone}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div><h3>Insertar Name</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id:
              </label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length + 1}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Name:
              </label>
              <input
                className="form-control"
                name="Name"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Phone:
              </label>
              <input
                className="form-control"
                name="Phone"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;