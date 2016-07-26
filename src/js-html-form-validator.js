/**
 * HTML5 Form validation library
 *                      
 * @author Amandio K. Nhamande <amandio16@gmail.com>
 * @date April 2016
 */

var validateRequired = function (field) {
    if (typeof field.dataset.required !== 'undefined') {
        if (field.value === "") {
            return false;
        }
        else if(field.type === 'checkbox' || field.type === 'radio' && !field.checked)
        {
            return false;
        }
    }
    return true;
};

var validateEmail = function (field) {
    if (typeof field.dataset.validEmail !== 'undefined') {
        var regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (!regex.test(field.value)) {
            return false;
        }
    }
    return true;
};

var validatePassword = function (field) {
    if (typeof field.dataset.validPassword != 'undefined') {
        if (field.value == "") {
            return false;
        }
    }
    return true;
};

var validatePasswordsMatch = function (field1, field2) {
    return field1.value === field2.value;
};

var matchFields = function (field1, field2) {
    return field1.value === field2.value;
};

/**
 * Validates form fields
 *
 * @param form
 * @returns boolean
 */
var jsHtmlFormValidate = function(form) {

    var options = {
        customMessageContainer: form.dataset.customContainer,
        messages: {
            requiredFieldMessage: function (fieldName) {
                return 'O campo <strong>' + fieldName + '</strong> é obrigatório!';
            },
            invalidEmailMessage: 'O <strong>Email</strong> introduzido é invalido!',
            invalidPasswordMessage: 'O <strong>Password</strong> introduzido é invalido',
            invalidPasswordMatchMessage: 'As Passwords não combinam'
        }
    };

    var getFieldId = function (field) {
        return typeof field.dataset.name !== 'undefined' ? field.dataset.name : (field.placeholder !== '' ? field.placeholder : field.name);
    };

    var printErrorMessages = function(el, messages) {
        var ul = document.createElement('ul');

        for(var i = 0; i < messages.length; i++) {
            var error = messages[i];
            ul.innerHTML += "<li>" + error + "</li>";
        }

        el.innerHTML = '';
        el.appendChild(ul);
    };

    var error = 0;  // Error status
    var error_messages = [];  // Store error messages

    if (form.tagName.toLowerCase() === 'form') {

        var validate_field_names = typeof form.dataset.validate !== 'undefined' ? form.dataset.validate : '';
        var fields = validate_field_names.split(',');

        for(var i = 0; i < fields.length; i++) {
            var field = form.elements[fields[i]];

            if (typeof field === 'undefined') {
                console.error(fields[i] + ' não está definido, ignorando...');
            }
            else
            {
                if (!validateRequired(field)) {
                    error_messages.push(options.messages.requiredFieldMessage(getFieldId(field)));
                    error = 1;
                }

                if (!validateEmail(field)) {
                    error_messages.push(options.messages.invalidEmailMessage);
                    error = 2;
                }

                if (!validatePassword(field)) {
                    error_messages.push(options.messages.invalidPasswordMessage);
                    error = 3;
                }

                if (typeof field.dataset.validPasswordMatch !== 'undefined') {
                    var field1 = field;
                    var field2 = field.form.elements[field.dataset.validPasswordMatch];

                    if (!validatePasswordsMatch(field1, field2)) {
                        error_messages.push(options.messages.invalidPasswordMatchMessage);
                        error = 4;
                    }
                }
            }
        }
    }

    if (error === 0) {
        return true;
    }

    // Print error messages
    var message_container = typeof options.customMessageContainer !== 'undefined' ? options.customMessageContainer : '.message-danger';
    var error_container = document.querySelector(message_container);
    if(error_container === null) {
        error_container = document.createElement('section');
        error_container.className = "message message-danger";
        form.appendChild(error_container);
    }

    printErrorMessages(error_container, error_messages);

    return false;
};

