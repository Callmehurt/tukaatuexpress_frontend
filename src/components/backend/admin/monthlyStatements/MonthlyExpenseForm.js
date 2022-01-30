import React, {useState} from "react";
import {Button,Form,Row,Col} from 'react-bootstrap';

const MonthlyExpenseForm = (props) => {


     const [formField, setFormField] = useState({
        title: '',
        expense_amount: ''
    });

    const handleForm = event => {
        const newField = {...formField}
        newField[event.target.name] = event.target.value;
        setFormField(newField);
    }

   const formSubmit = (e) => {
        e.preventDefault();
        props.expenseHandler(formField)
       setFormField({title: '', expense_amount: ''})
   }

    return (
        <>
             <Form action="" onSubmit={formSubmit}>
                 <Row className="pt-3">
                     <Col lg={5}>
                         <Form.Group className="mb-3">
                            <Form.Control type="text" value={formField.title} onChange={(event) => handleForm(event)} name='title' placeholder='Title' />
                         </Form.Group>
                     </Col>
                      <Col lg={5}>
                          <Form.Group className="mb-3">
                            <Form.Control type="text" value={formField.expense_amount} onChange={(event) => handleForm(event)} name='expense_amount' placeholder='Expense amount' />
                         </Form.Group>
                      </Col>
                     <Col lg={2}>
                         <Button variant="primary" type="submit">
                          Click
                        </Button>

                     </Col>
                 </Row>

                    {/*<input type="text" value={formField.title} onChange={(event) => handleForm(event)} placeholder='Title' name='title'/>*/}
                    {/*<input type="text" value={formField.expense_amount} onChange={(event) => handleForm(event)} placeholder='Expense amount' name='expense_amount'/>*/}
                    {/*<button type='submit'>Click</button>*/}

             </Form>
        </>
    )
}

export default MonthlyExpenseForm;