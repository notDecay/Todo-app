/**Add a element below the element above
 * ```html
 * <div class="div-1">this is the element above</div>
 * 
 * <!-- A element should be added here -->
 * 
 * <div class="div-2">this is the element below</div>
 * ```
 * @param {HTMLElement} thisElement    the element that it will be added between 2 elements
 * @param {HTMLElement} elementAbove   the element above 
 */
function addElementBefore(elementAbove, thisElement) {
  const parentNode = elementAbove.parentNode
  if (parentNode === null)
    return console.warn(`The parentNode of this <${thisElement.tagName} ${thisElement.className === null ? '' : thisElement.className}> could not be found`)
  parentNode.insertBefore(thisElement, elementAbove.nextSibling);
  // elementAbove.insertAdjacentHTML('afterend', thisElement.innerHTML)
}

class FailedToFindElement extends Error {
  constructor(message = `
  Could not find the HTML element. Check if: 
  - your selector in document.querySelector(selector), [...] is correct or not
  - your element is appended on the page or not. If so, put the element.append(anotherElement) above the document.querySelector('selector') like this:
    element.append(anotherElement)
    document.querySelector('selector')
  `) {
    super(message)
    this.name = 'FailedToFindElement'
  }
}