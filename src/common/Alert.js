/** Alert presentational component
 * Props:
 * - message
 * - type: "success", "danger", or "warning"
 * corresponds to bootstrap classes "alert-{type}" ('success' or 'danger')
 *
 * { SignupForm, LoginForm } -> Alert
 */

function Alert({ message, type }) {
  return (
    <div className={`alert alert-${type}`}>
      {message}
    </div>
  )
}

export default Alert;