import { useState } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto,
}) => {
  const [mensaje, setMensaje] = useState("");

  const handlePresupuesto = (e) => {
    e.preventDefault();

    if (!presupuesto || presupuesto < 0) {
      setMensaje("No es un presupuesto valido");
      return;
    }

    setMensaje("");

    setIsValidPresupuesto(true);
  };

  return (
    <div className="contenedor-presupuesto sombra contenedor">
      <form onSubmit={handlePresupuesto} className="formulario-presupuesto">
        <div className="campo">
          <label htmlFor="">Definir presupuesto</label>
          <input
            type="number"
            className="nuevo-presupuesto"
            placeholder="Ingrese su presupuesto"
            value={presupuesto}
            onChange={(e) => setPresupuesto(Number(e.target.value))}
          />

          <input type="submit" value="Añadir" />

          {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        </div>
      </form>
    </div>
  );
};

export default NuevoPresupuesto;
