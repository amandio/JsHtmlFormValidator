# Javascript Html Form Validator

JsHtmlFormValidator is a javascript library to validate html input fields on the client side.


## How to install

Import the script to your application/website
```
<script type="text/javascript" src='dist/js-html-form-validator.min.js'></script>
```

## Usage

After import the library, you must add `data-validate` attribute with the fields to be validated
separated by commas in your form.

e.g. Suposing you are validating a login form, your form tag will look like this. 
```
<form data-validate="username,password">
```

After telling with fields you want to validate, you must specify the validation
type you want on each field using `data-[validation]` where *[validation]* can be one of the following.

| Validation  | Description |
| --- | --- |
| `data-required` | used when a field is required |
| `data-valid-email` | validates a proper formated email address |
| `data-valid-password` | validates the password field |
| `data-valid-password-match` | matches two password fields |
| `data-match` | matches two fields |

e.g.
```
<input type="text" name="username" data-required>
<input type="text" name="username" data-valid-password>
```

Next you will need to call the method `jsHtmlFormValidate([formToValidate])`

