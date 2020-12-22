import { Form } from 'react-bootstrap';
import './index.css';

function Select(props) {
  const options = props.data.map((option) => <option value={option.id} key={option.id}>{option[props.column]}</option>);
  return (
    <Form.Group>
      <Form.Label><strong>{props.label}</strong></Form.Label>
      <Form.Control as="select" {...props}>
        <option value=''>Select {props.label}</option>
        {options}
      </Form.Control>
    </Form.Group>
  );
}

export default Select;
