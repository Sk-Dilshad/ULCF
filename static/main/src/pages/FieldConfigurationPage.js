import React from "react";
import FormComponent from '../component/FormComponent';

const FieldConfigurationPage=(props)=>{

  const setFormDataHandler=(data)=>{
    console.log("data:::",data)
   props.setFormData(data)
  }
  return(
   <FormComponent  FormDataHandler={setFormDataHandler}/>
  )
}
export default FieldConfigurationPage;