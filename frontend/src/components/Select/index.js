import React, { useRef, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';
import ReactSelect from 'react-select';
import ReactAsyncSelect from 'react-select/async';

import selectTheme from '~/styles/select';

export default function Select({
  name,
  options,
  placeholder,
  loadOptions,
  defaultOptions,
  ...rest
}) {
  const [asyncLoadedOptions, setAsyncLoadedOptions] = useState(null);
  const memoizedOptions = useMemo(
    () =>
      loadOptions ? asyncLoadedOptions || defaultOptions || [] : options || [],
    [asyncLoadedOptions, defaultOptions, loadOptions, options]
  );
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  function parseSelectValue(selectRef) {
    const selectValue = loadOptions
      ? selectRef.select.state.value
      : selectRef.state.value;
    return selectValue ? selectValue.id : '';
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: loadOptions ? 'select.state.value' : 'state.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  function getDefaultValue() {
    if (!defaultValue) return null;
    const so = memoizedOptions.find(option => option.id === defaultValue);
    return so;
  }

  async function handleLoadOptions(...params) {
    if (loadOptions) {
      const data = await loadOptions(...params);
      setAsyncLoadedOptions(data);
      return data;
    }
    return [];
  }

  return (
    <>
      {loadOptions && (
        <ReactAsyncSelect
          name={fieldName}
          aria-label={fieldName}
          defaultValue={getDefaultValue()}
          ref={ref}
          placeholder={placeholder}
          getOptionValue={option => option.id}
          getOptionLabel={option => option.title}
          theme={selectTheme}
          className="react-select-container"
          classNamePrefix="react-select"
          loadOptions={handleLoadOptions}
          defaultOptions={defaultOptions}
          noOptionsMessage={() => 'Sem Resultados'}
          {...rest}
        />
      )}

      {!loadOptions && (
        <ReactSelect
          name={fieldName}
          aria-label={fieldName}
          options={options}
          defaultValue={getDefaultValue()}
          ref={ref}
          placeholder={placeholder}
          getOptionValue={option => option.id}
          getOptionLabel={option => option.title}
          theme={selectTheme}
          className="react-select-container"
          classNamePrefix="react-select"
          noOptionsMessage={() => 'Sem Resultados'}
          {...rest}
        />
      )}

      {error && <span>{error}</span>}
    </>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  placeholder: PropTypes.string,
  loadOptions: PropTypes.func,
  defaultOptions: PropTypes.arrayOf(PropTypes.object),
};

Select.defaultProps = {
  options: [],
  placeholder: '',
  loadOptions: null,
  defaultOptions: null,
};
