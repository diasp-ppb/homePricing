/**
 * TODO: verify params. Eg: minPrice has to be less than maxPrice
 */
exports.convertParams = function(paramsToConvert) {
  var str = ' { ';
  var initial = str;

  // Bathrooms
  if (paramsToConvert.bathrooms != null ) {
    str += '"bathrooms" : ' + paramsToConvert.bathrooms;
  }

  // Property Type
  if (paramsToConvert.propertyType != null ) {
    str += '"tipology" : "'  + paramsToConvert.propertyType + '"';
  }

  // Area
  if (paramsToConvert.minArea != null && paramsToConvert.maxArea != null ) {
    if (str != initial) {
      str += ', ';
    }
    str += '"area" : { "$gt" : ' + paramsToConvert.minArea + ', "$lt" : ' + paramsToConvert.maxArea + ' }';
  }
  else if (paramsToConvert.minArea != null) {
    if (str != initial) {
      str += ", "
    }
    str += '"area" : { "$gt" : ' + paramsToConvert.minArea + ' }';
  }
  else if (paramsToConvert.maxArea != null) {
    if (str != initial) {
      str += ', '
    }
    str += '"area" : { "$lt" : ' + paramsToConvert.maxArea + ' }';
  }

  // Price
  if (paramsToConvert.minPrice != null && paramsToConvert.maxPrice != null ) {
    if (str != initial) {
      str += ', '
    }
    str += '"price" : { "$gt" : ' + paramsToConvert.minPrice + ', "$lt" : ' + paramsToConvert.maxPrice + ' }';
  }
  else if (paramsToConvert.minPrice != null) {
    if (str != initial) {
      str += ', '
    }
    str += '"price" : { "$gt" : ' + paramsToConvert.minPrice + ' }';
  }
  else if (paramsToConvert.maxPrice != null) {
    if (str != initial) {
      str += ", "
    }
    str += '"area" : { "$lt" : ' + paramsToConvert.maxPrice + ' }';
  }

  str += ' }';
  
  return JSON.parse(str);
}