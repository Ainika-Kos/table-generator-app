const validationProperties = [
  {
    'errorName' : 'name',
    'characters' : 2,
    'errorText': 'Please enter a name with at least 2 characters'
  },
  {
    'errorName': 'surname',
    'characters': 2,
    'errorText': 'Please enter a surname with at least 2 characters'
  },
  {
    'errorName': 'age',
    'characters': 1,
    'errorText': 'Please enter an age greater than 0'
  },
  {
    'errorName': 'city',
    'characters': '',
    'errorText': 'Please select a city'
  }
];


export default validationProperties;