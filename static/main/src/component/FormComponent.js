import React,{Fragment,useState,useCallback} from "react";
import Button from '@atlaskit/button/standard-button';
import TextField from "@atlaskit/textfield";
import Select from "@atlaskit/select";
import SelectClearIcon from '@atlaskit/icon/glyph/select-clear'
import TableTree, {
    Cell,
    Header,
    Headers,
    Row,
    Rows,
  } from "@atlaskit/table-tree";
  import Form, { Field } from "@atlaskit/form";

import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from '@atlaskit/modal-dialog';

const FormComponent=(props)=>{

    const [scrollInForm, setScrollInForm] = useState(false);
    const [showOptionField, setShowOptionField] = useState(false);
    const [options, setOptions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [fieldType, setFieldType] = useState(false);
    const [show,setShow] = useState(false);
     

    const setFormScrollAndOpen = useCallback(
        (scrollInForm) => {
            setScrollInForm(scrollInForm);
          requestAnimationFrame(() => setIsOpen(true));
        },
        [setScrollInForm],
      );
      const closeModal = useCallback(() => setIsOpen(false), []);

    const submitHandler=(formData)=>{
        console.log("formData::;",formData)
        
        var data={
            "type": fieldType,
            "name" :formData.name,
            "options" : options
           }
           console.log("data::::",data)
         props.FormDataHandler(data)
         document.getElementById("name").value = "";
    }
    const optionFieldShowHandler=(event)=>{
        console.log("on change function called",showOptionField)
        if (
          event.label == "Checkboxes" ||
          event.label == "Select List" ||
          event.label == "Select List(Multiple Choice)" ||
          event.label == "Radio Buttons"
        ) {
        //   setShowOptionField((current) => !current);
             setShowOptionField(true)
        }
        else{
            setShowOptionField(false)
        }
        setFieldType(event.value)
  }
    const optionHandler=()=>{
        let option = document.getElementById("options");
        setOptions((current) => [...current, option.value]);
        document.getElementById("options").value = "";
    }
    const deleteOptionHandler=(val)=>{
   
     let op= options.filter((e)=> e !== val )
     setOptions(op)
    }

    return(
        <Fragment>
            <div>
                <Button appearance="primary" onClick={() => setFormScrollAndOpen(false)}>
                    Add Fields
                </Button>
                <ModalTransition>
                    {isOpen && (
                    <Modal
                        onClose={closeModal}
                        shouldScrollInViewport={scrollInForm}
                        height={1000}
                    >
                        <ModalHeader>
                        <ModalTitle>Add Custom Field</ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                        
                        <Form onSubmit={submitHandler}>
                        {({ formProps }) => (
                        <form id="form-id" {...formProps}>
                            <Field name="select-field" id="select-field" label="Select Field Test">
                            {({ fieldProps: { id, ...rest } }) => (
                                <Fragment>
                                <Select
                                    {...rest}
                                    className="single-select"
                                    classNamePrefix="react-select"
                                    onChange={optionFieldShowHandler}
                                    options={[
                                    { label: "Checkboxes", value: "Checkbox" },
                                    { label: "Date Picker", value: "DatePicker" },
                                    {
                                        label: "Date Time Picker",
                                        value: "DateTimePicker",
                                    },
                                    {
                                        label: "Time Picker",
                                        value: "TimePicker",
                                    },
                                    { label: "Label", value: "label" },
                                    {
                                        label: "Radio Buttons",
                                        value: "RadioGroup",
                                    },
                                    { label: "Select List", value: "Select" },
                                    { label: "Text Field", value: "TextField" },
                                    { label: "URL Filed", value: "URL Filed" },
                                    {
                                        label: "User Picker(Single user)",
                                        value: "User Picker(Single user)",
                                    },
                                    ]}
                                    placeholder="Please select a Field"
                                />
                                </Fragment>
                            )}
                            </Field>
                            <Field
                            aria-required={true}
                            id="name"
                            name="name"
                            defaultValue=""
                            label="name"
                            isRequired
                            >
                            {({ fieldProps, error, valid }) => (
                                <TextField {...fieldProps} />
                            )}
                            </Field>

                            {showOptionField && (
                            <Form>
                                {({ formProps }) => (
                                <form id="form-id" {...formProps}>
                                    <Field
                                    aria-required={true}
                                    name="options"
                                    id="options"
                                    defaultValue=""
                                    label="Options"
                                    isRequired
                                    >
                                    {({ fieldProps, error, valid }) => (
                                        <TextField {...fieldProps} />
                                    )}
                                    </Field>
                                    <Field
                                    appearance="subtle"
                                    >
                                    {({ fieldProps, error, valid }) => (
                                        <Button {...fieldProps} onClick={optionHandler}>Add</Button>
                                    )}
                                    </Field>
                                    
                                    {options.length >0  && (
                                    <TableTree>
                                        <Headers>
                                            <Header width={120}>Options</Header>
                                            <Header width={120}>Actions</Header>
                                        </Headers>
                                        <Rows
                                            items={options}
                                            render={(val) => (
                                            <Row >
                                                <Cell>{val}</Cell>
                                                <Cell>
                                                    <Button  onClick={()=>{deleteOptionHandler(val)}}><SelectClearIcon  /></Button>
                                                </Cell>
                                            </Row>
                                            )}
                                        />
                                        </TableTree>
                                    )}
                                
                                </form>
                                )}
                            </Form>
                            )}

                        
                            <Field>
                            {({ fieldProps, error, valid }) => (
                                <Button appearance="primary"
                                type="submit">Add</Button>
                            )}
                            </Field>
                        </form>
                        )}
                    </Form>
                        
                        
                        </ModalBody>
                        <ModalFooter>
                        <Button appearance="primary"  onClick={closeModal}>
                            Close
                        </Button>
                        </ModalFooter>
                    </Modal>
                    )} 
                </ModalTransition>
          
            </div>
        </Fragment>
    )
}

export default FormComponent;
