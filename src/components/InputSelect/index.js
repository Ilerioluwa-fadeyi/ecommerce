import React from 'react';
import Select from "react-select";


const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "0.75px solid #FFFFFF",
      width: "100%",
      height: "auto",
      minHeight: "40px",
      borderRadius: "6px",
      padding: "13.5px 18p",
      background:"white",
      textAlign: "left",
      transitionDuration: '300ms',
      transitionProperty: 'box-shadow',
      transitionTimingFunction: 'cubic-bezier(0.4,0,1,1)',
      ':focus': { border: "0.75px solid #0a1d37", borderColor: "#0a1d37", transition: "all 0.4s" },
      'hover:': { border: "0.75px solid #0a1d37", borderColor: "#0a1d37" },
      boxShadow: 'none',
    }),
    // valueContainer: (provided) => ({
    //   ...provided,
    //   paddingTop: '0.25rem',
    //   paddingBottom: '0.05rem',
    // }),
    // placeholder: (provided) => ({
    //   ...provided,
    //   color: "orange",
    //   fontSize: '1rem',
    // }),
    dropdownIndicator: (provided) => ({ ...provided, color: "#839AB0" }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    singleValue: (provided) => ({...provided, overflow: "unset"}),
    menu: (provided) => ({ ...provided,  }),
    option: (provided, state) => ({
      ...provided,
      ':active': { fontStyle: "bold",backgroundColor:"none" },
      ':hover': { opacity: "0.5", backgroundColor:"none" },
      backgroundColor: "white",
      color: state.isSelected? "inherit" : "inherit",
      textAlign: "left",
    }),
  }

  const InputSelect = ({ options, ...otherProps}) => {

    return (
        <div className="relative mb-2">
          {otherProps.label && <p className="mb-2">{otherProps.label}</p>}
            <div className="rel-2">
                <Select
                  id={otherProps.name}
                  options={otherProps.data}
                  defaultValue={
                      (otherProps.value ? { label: otherProps.value, value: otherProps.value } : otherProps.placeholder)
                  }
                  maxMenuHeight={200}
                  formatOptionLabel={otherProps.formatOptionLabel || null}
                  name={otherProps.name}
                  onBlur={otherProps.onBlur}
                  styles={customStyles}
                  placeholder={ otherProps.value? "" : otherProps.placeholder}
                  onChange={otherProps.onChange}
                  isMulti={otherProps.isMulti}
                  classNames={{
                    control: (state) =>
                      state.isFocused ? 'border-primary' : 'border-grey-300',
                  }}
                />
            </div>

        </div>
    )
}

export default InputSelect;