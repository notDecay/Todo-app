/**Make an UUIDs (Universally Unique IDentifier)  
 * Universally Unique Identifiers are 128 bit numbers, composed of 16 octets and represented 
 * as 32 base-16 characters, that can be used to identify information across a computer system
 * @returns {string} an UUID `string`
 * 
 * @see https://en.wikipedia.org/wiki/Universally_unique_identifier
 */
const makeUUIDv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

/**Sleep within the specific time.  
 * Example (with no callback function) 
 * ```js
 * async function someFunction() {
 *   console.log('something')
 *   await sleep(1000)
 *   console.log('this should be logged after 1000 mili-seconds (or 1 second)')
 * }
 * 
 * someFunction()
 * ```
 * 
 * Example (with callback function) 
 * ```js
 * async function someFunction() {
 *   await sleep(1000, () => console.log('this should be logged after 1000 mili-seconds (or 1 second)'))
 * }
 * 
 * someFunction()
 * ```
 * @param {number} miliseconds the amount of time to sleep in mili-seconds, this could not
 * be a negative number
 * @param {() => any} callback a callback function, this is optional
 * @return {Promise<any>} a {@link Promise} with *any* type
 */
const sleep = (miliseconds, callback = () => {}) => new Promise(resolve => setTimeout(() => {
  logInfo('sleep()', '#1cffd5', `sleeping for ${miliseconds} ms...`)
  callback()
  resolve(null)
}, miliseconds))

/**Get a random number from 0 to *some number*
 * @param {number} bound
 * @return {number} a random `number`
 */
const getRandomNumber = (bound) => Math.floor(Math.random() * bound)

/**Get a random number between minimum (inclusive) and maxinium (exclusive)
 * @param {number} min
 * @param {number} max
 * @return {number} a random number from `min` to `max`
 */
const getRandomNumberFrom = (min, max) => Math.random() * (max - min) + min

/**A very simple / readable log
 * @param {string} label 
 * @param {string} labelColor the label color
 * @param {*} message the message 
 */
const logInfo = (label, labelColor, message) => {
  let content = null
  switch (typeof message) {
    case 'object': 
      content = JSON.stringify(message)
    break
    default: content = `${message}`
  }
  console.log(`%c ${label} %c ${content}`, 
  `background-color: ${labelColor}; border-radius: 5px`,
  'color: none')
}

/**Convert any boolean string to boolean
 * @param {*} booleanString the string 
 * @returns {boolean | null} a boolean or `null` if it's not a boolean string
 */
const booleanStringToBoolean = (booleanString) => {
  switch(booleanString?.toLowerCase()?.trim()){
    case "true": 
      return true;
    case "false": 
    case null: 
    case undefined:
      return false;
    default: 
      return null
  }
}