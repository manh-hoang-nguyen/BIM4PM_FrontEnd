const serializeRevitElement = revitElement => {
  const {
    parameters,
    geometryParameters,
    sharedParameters,
    name,
    category,
    level,
    _id,
    guid,
    elementId,
  } = revitElement;

  const id = [['_id', _id]];
  const guidElement = [['guid', guid]];
  const idElement = [['ElementId', elementId]];
  const categoryElement = [['Category', category]];
  const levelElement = [['Level', level]];
  const nameElement = [['Name', name]];

  const revitParam = deserilizeParam(parameters);
  const geoParam = deserilizeParam(geometryParameters);
  const sharedParam = deserilizeParam(sharedParameters);

  const paramArray = id.concat(
    guidElement,
    idElement,
    categoryElement,
    levelElement,
    nameElement,
    revitParam,
    geoParam,
    sharedParam,
  );

  const revitElementSerialized = objectify(paramArray);
  return revitElementSerialized;
};

function deserilizeParam(paramNameAndValue) {
  const array = paramNameAndValue.split(';');

  array.pop();

  const para = array.map(item => item.split(':')[1]);

  const parameters = para.map(item => item.split('='));

  return parameters;
}

function objectify(array) {
  return array.reduce((p, c) => {
    // eslint-disable-next-line prefer-destructuring
    p[c[0]] = c[1];
    return p;
  }, {});
}
export default serializeRevitElement;
