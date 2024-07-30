# Text Append

## Environment 

- React Version: 18.2.0
- Node Version: v18 (LTS)
- Default Port: 8000

## Application Demo:

![](https://hrcdn.net/s3_pub/istreet-assets/Ec4MutitbCNS49ysm30RWw/text-append.gif)

## Functionality Requirements

There is a reusable component in the module named `TextField`:
- It renders a `<label>` and an `<input>` elements.
- It receives 2 props - 
    - labelText - The text to be rendered in `<label>` element.
    - onChange - The event handler onChange function to be called on `<input>` element change.

The module must have the following functionalities:
- It render 2 TextField components. The first TextField component is used to enter first text. The second TextField component is used to enter second text.
- As and when values are entered in the text fields, append both texts separated by space and render inside `<label data-testid="final-text">`.

## Testing Requirements

The following data-testid attributes are required in the component for the tests to pass:

- The final appended text label: `final-text`
- The div containing first TextField component: `first-text`
- The div containing second TextField component: `second-text`
- Inside the TextField component:
    - label element: `label`
    - input element: `input`

## Project Specifications

**Read Only Files**
- src/App.test.js

**Commands**
- run: 
```bash
npm start
```
- install: 
```bash
npm install
```
- test: 
```bash
npm test
```
