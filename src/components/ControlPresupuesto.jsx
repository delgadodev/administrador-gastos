import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({
  gastos,
  presupuesto,
  setGastos,
  setPresupuesto,
  setIsValidPresupuesto,
}) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );

    const totalDisponible = presupuesto - totalGastado;

    //PORCENTAJE GASTADO
    const porcentajeGastado = ((totalGastado / presupuesto) * 100).toFixed(2);

    setTimeout(() => {
      setPorcentaje(porcentajeGastado);
    }, 800);

    ////////////////////////////////

    setDisponible(totalDisponible);
    setGastado(totalGastado);
  }, [gastos]);

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("es-ES", {
      style: "currency",
      currency: "ARS",
    });
  };

  const handleResetApp = () => {
    const resultado = confirm("¿Estás seguro de querer reiniciar la app?");
    if (resultado) {
      setPresupuesto(0);
      setGastos([]);
      setIsValidPresupuesto(false);
      
    }
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
            trailColor: "#F5F5F5",
            textColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
          })}
          value={porcentaje}
          text={`${porcentaje}% gastado`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Resetear app
        </button>
        <p>
          <span>Presupuesto: </span> ${formatearCantidad(presupuesto)}
        </p>

        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Restante: </span> ${formatearCantidad(disponible)}
        </p>

        <p>
          <span>Gastado: </span>${formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
