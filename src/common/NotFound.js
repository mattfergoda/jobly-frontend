/** NotFound
 * Presentational component for 404s
 *
 * CompanyDetail -> NotFound
 */

function NotFound({ item }) {
  return (
  <div className="NotFound alert alert-danger">
    <strong>Apologies.</strong><p>{item} not found.</p>
  </div>
  );
}

export default NotFound;