import { Form } from "react-bootstrap";
import PropTypes from "prop-types";
const UserInput = ({ type, placeholder, name, id, value, onChange }) => {
  return (
    <Form.Group>
      <Form.Control
        required={type === "file" ? false : true}
        type={type}
        placeholder={placeholder}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
    </Form.Group>
  );
};
UserInput.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string || PropTypes.object,
  onChange: PropTypes.func.isRequired,
};
export default UserInput;
