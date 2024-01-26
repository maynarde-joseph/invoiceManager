/// /////////////////////////////////////////////////////////////////////////
/// //////////////////// INVOICE MANIPULATION ///////////////////////////////
/// /////////////////////////////////////////////////////////////////////////
/// /////////////////////////////////////////////////////////////////////////
/// /////////////////////////////////////////////////////////////////////////

import xmljs from 'xml-js';

/// /////////////////////////////////////////////////////////////////////////
/// //////////////////////// MAIN FUNCTIONS /////////////////////////////////
/// /////////////////////////////////////////////////////////////////////////

// UPLOADXML()
// INPUT: File path containing XML file.
// OUTPUT: Invoice UUID.
export function uploadxml(xml) {
  // Convert the XML string into a JSON object.
  const result = xmljs.xml2json(xml, { compact: true, spaces: 2 });

  // Create a new object called 'invoice' and generate a UUID for this object.
  const invoiceObj = {
    xml: result
  };

  // Return the new object with the UUID and the XMl as a JSON object.
  return invoiceObj;
}

// UPLOADMULTIPLEXML()
// INPUT: Multiple file paths containing XML file.
// OUTPUT: Invoice UUIDs.
export function uploadmultiplexml(xmlArray) {
  // Use the map function to execute uploadxml() on each xmlArray item.
  const invoiceArray = xmlArray.map(xmlItem => {
    // const xmlString = fs.readFileSync(xmlFilePath, 'utf-8');
    const result = xmljs.xml2json(xmlItem, { compact: true, spaces: 2 });

    const invoiceObj = {
      invoiceUuid: uuidv4(),
      xml: result
    };

    return invoiceObj;
  });

  return invoiceArray;
}

// RETRIEVEXML()
// INPUT: Single invoice object.
// OUTPUT: An XML array.
export function retrievexml(invoiceObj) {
  const result = xmljs.json2xml(invoiceObj, { compact: true, spaces: 2 });
  return result;
}

// RETRIEVEMULTIPLEXML()
// INPUT: Multiple invoice objects.
// OUTPUT: An XML file array.
export function retrievemultiplexml(invoiceArray) {
  const xmlArray = invoiceArray.map((invoiceObj) => retrievexml(invoiceObj));
  return xmlArray;
}

/// /////////////////////////////////////////////////////////////////////////
/// ////////////////////// HELPER FUNCTIONS /////////////////////////////////
/// /////////////////////////////////////////////////////////////////////////

// VALIDATEXML()
// INPUT: File path containing XML file.
// OUTPUT: Result of validation.
// The following path is an example of what an input could be:
// const path = `xml/AU Invoice.xml`;

export function validateXML(xmlString) {
  // const xmlString = fs.readFileSync(path, 'utf-8');
  let result;
  validate(xmlString)
    .then(function (response) {

    })
    .catch(function (err) {
      result = 'Invalid file. Upload an appropriate xml file.';
    });

  return result;
}
