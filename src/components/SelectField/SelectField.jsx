import cities from '../../data/cities';

const SelectField = ({name, onChange, value, isControlledInput}) => {
  return (
    <select
      name={name}
      onChange={onChange}
      required='required'
      {...(isControlledInput ? { value } : { defaultValue: value })}
    >
      <option value="">City</option>
      {cities.map((city) => (
        <option
          key={city.id}
          value={city.cityName}
        >
          {city.cityName}
        </option>
      ))}
    </select>
  );
};

export default SelectField;