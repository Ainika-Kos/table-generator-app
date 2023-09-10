const validationProperties = [
  {
    'errorName' : 'name',
    'minCharacters' : 2,
    'maxCharacters' : 15,
    'minAge': null,
    'maxAge': null,
    'errorText': 'Please provide a name that is between 2 and 15 characters in length'
  },
  {
    'errorName': 'surname',
    'minCharacters': 2,
    'maxCharacters': 15,
    'minAge': null,
    'maxAge': null,
    'errorText': 'Please provide a surname that is between 2 and 15 characters in length'
  },
  {
    'errorName': 'age',
    'minCharacters': null,
    'maxCharacters': null,
    'minAge': 1,
    'maxAge': 120,
    'errorText': 'Please provide an age between 1 and 120 years'
  },
  {
    'errorName': 'city',
    'minCharacters': null,
    'maxCharacters': null,
    'minAge': null,
    'maxAge': null,
    'errorText': 'Please select a city'
  }
];

export default validationProperties;