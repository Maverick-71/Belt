/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, Label, Input, FormGroup, Form } from 'reactstrap';

class modalMensaje extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false,
            focusAfterClose: true
        };
        this.toggle = this.toggle.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    toggle() {
        this.setState(({ open }) => ({ open: !open }));
    }

    handleSelectChange({target: { value }}) {
        this.setState({ focusAfterClose: JSON.parse(value) });
    }

    render() {
        return (
            <div>
                <Form inline onSubmit={(e) => e.preventDefault()}>
                    <FormGroup>
                        <Label for="focusAfterClose">Focus After Close</Label>
                        <Input className="mx-2" type="select" id="focusAfterClose" onChange={this.handleSelectChange}>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </Input>
                    </FormGroup>
                    <Button color="danger" onClick={this.toggle}>Open</Button>
                </Form>
                <Modal returnFocusAfterClose={this.state.focusAfterClose} isOpen={this.state.open}>
                    <ModalBody>
                        {this.props.mensaje}
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default modalMensaje;