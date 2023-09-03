import cities from '../data/cities';

const SelectField = ({name, onChange, value}) => {
  return (
    <select
      name={name}
      onChange={onChange}
      value={value}
      required='required'
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