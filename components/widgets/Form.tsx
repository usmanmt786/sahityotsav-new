import { ReactNode } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiArrowRight } from "react-icons/fi";
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';

import "primereact/resources/themes/lara-light-blue/theme.css";

export const ZFormInput = ({formLabel,formik, name, placeHolder, type, disabled, onBlur }:{formLabel:string,formik:any, name:string, placeHolder?:string, type?:string, disabled?:boolean, onBlur?:any}) => {
    return (
        <div>
            <div className="zlabel">{ formLabel}</div>
       
            <input placeholder={placeHolder ?? formLabel}
                value={formik.values[name]}
                onChange={formik.handleChange}
                name={name}
                className='zinput mt-1 '
                type={type ?? "text"}
                disabled={disabled}
                onBlur={onBlur}
                autoComplete="one-time-code"
            />
            <div>
                {formik.errors[name] && formik.touched[name] && <div className="text-red-500 text-xs mt-1 px-2">{formik.errors[name]}</div>}
            </div>
           
        </div>
    );
}

export const ZFormTextArea = ({formLabel,formik, name, placeHolder, type, disabled, onBlur }:{formLabel:string,formik:any, name:string, placeHolder?:string, type?:string, disabled?:boolean, onBlur?:any}) => {
    return (
        <div>
            <div className="zlabel">{ formLabel}</div>
       
       <textarea  placeholder={placeHolder ?? formLabel}
      
                value={formik.values[name]}
                onChange={formik.handleChange}
                name={name}
                className='zinput mt-1 '
                disabled={disabled}
                onBlur={onBlur}
                autoComplete="one-time-code"></textarea>
            
            <div>
                {formik.errors[name] && formik.touched[name] && <div className="text-red-500 text-xs mt-1 px-2">{formik.errors[name]}</div>}
            </div>
           
        </div>
    );
}


export const ZSubmitButton = ({text, loadText, loading, showArrow }:{text:string, loadText:string, loading:boolean, showArrow?:boolean}) => {
    return (
        <button type="submit" className="submit-btn gbg my-3" disabled={loading}>
        {
            loading ? <>{loadText} <AiOutlineLoading3Quarters className="ml-2 text-lg animate-spin" /></> :
                    <>{text}
                        {showArrow && <FiArrowRight className="ml-2 text-lg" />}
                        </>
        }
        
    </button>
    );
}


export const ZFormSelect = ({ formLabel, formik, name, options, placeHolder, disabled, filter, emptyMessage,optionLabel, optionValue, multiple }:
    {
        formLabel: string, formik: any, name: string, options: any[], placeHolder?: string, disabled?: boolean, filter?: boolean,
        emptyMessage?: ReactNode, optionLabel?: string, optionValue?:string, multiple?:boolean
    }) => {
    return (
        <div>
            <div className="zlabel mt-4 mb-1">{ formLabel}</div>

            <Dropdown
                filter={filter}
                emptyFilterMessage={emptyMessage}
                emptyMessage={emptyMessage}
                value={formik.values[name]}
                options={options}
                optionLabel={optionLabel??"label"}
                optionValue={optionValue??"value"}
                onChange={(e) => formik.setFieldValue(name, e.value)}
                placeholder={placeHolder ?? formLabel}
                className='zselect w-full'
                disabled={disabled}
                multiple={true}
                
                
            /> <div>
            {formik.errors[name] && formik.touched[name] && <div className="text-red-500 text-xs mt-1 px-2">{formik.errors[name]}</div>}
        </div>
           
        </div>
    );
}


export const ZFormMultiSelect = ({ formLabel, formik, name, options, placeHolder, disabled, filter, emptyMessage,optionLabel, optionValue }:
    {
        formLabel: string, formik: any, name: string, options: any[], placeHolder?: string, disabled?: boolean, filter?: boolean,
        emptyMessage?: ReactNode, optionLabel?: string, optionValue?:string,
    }) => {
    return (
        <div>
            <div className="zlabel mt-4 mb-1">{ formLabel}</div>

            <MultiSelect
                filter={filter}
                emptyFilterMessage={emptyMessage}
                value={formik.values[name]}
                options={options}
                optionLabel={optionLabel??"label"}
                optionValue={optionValue??"value"}
                onChange={(e) => formik.setFieldValue(name, e.value)}
                placeholder={placeHolder ?? formLabel}
                className='zselect w-full'
                disabled={disabled}
                
            /> <div>
            {formik.errors[name] && formik.touched[name] && <div className="text-red-500 text-xs mt-1 px-2">{formik.errors[name]}</div>}
        </div>
           
        </div>
    );
}

type checkboxprops = {
    formLabel:string,formik:any, name:string,  disabled?:boolean, onBlur?:any
}
export const ZFormCheckBox= (prop:checkboxprops)=>{
    return <div className="mt-4">
        <div className="flex items-center">
        <Checkbox 
        className="ring-2 checked:ring-0 rounded"
        inputId={prop.name}
        onChange={e =>{
            prop.formik.setFieldValue(prop.name, e.checked);
        }} 
        checked={prop.formik.values[prop.name]}
        value={prop.formik.values[prop.name]}
        disabled={prop.disabled}
        />
        <label htmlFor={prop.name} className="ml-2 select-none cursor-pointer">{prop.formLabel}</label>

        </div>
       

            {prop.formik.errors[prop.name] && prop.formik.touched[prop.name] && 
            <div className="text-red-500 text-xs mt-1 px-2">{prop.formik.errors[prop.name]}</div>}

    </div>

}