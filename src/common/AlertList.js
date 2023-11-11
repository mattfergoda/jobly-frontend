import Alert from "./Alert";

/** Renders many alerts
 *
 * AlertList -> { Alert, ... }
 */

function AlertList({ alerts }) {
  return (
    <div className="AlertList" >
      {
        alerts.map(alert => (
          <Alert
            key={alert.message}
            message={alert.message}
            type={alert.type} />
        ))
      }
    </div >
  );
}

export default AlertList;