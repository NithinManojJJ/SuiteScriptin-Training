/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
define(['N/currentRecord', 'N/log'], function(currentRecord, log) {
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */
    function pageInit(scriptContext) {
        var record = scriptContext.currentRecord;
        var executionContext = scriptContext.mode; // Determine the execution context
        try {
            // Check if the execution context is 'create' or 'copy'
            if (executionContext === 'create' || executionContext === 'copy') {
                // Retrieve the current value of the 'undepfunds' field
                var radioButtonFieldExists = record.getField({
                    fieldId: 'undepfunds'
                });
                if (radioButtonFieldExists) {
                    radioButtonFieldExists.isDisabled = true;
                    var radioButtonValue = record.getValue({
                        fieldId: 'undepfunds'
                    });
                    record.setValue({
                        fieldId: 'undepfunds',
                        value: "F"
                    });
                } else {
                    log.error("Field not found", "The field 'undepfunds' does not exist on this record.");
                }
            }
        } catch (e) {
            log.error("Error in pageInit", e.message);
        }
    }

    return {
        pageInit: pageInit
    };
});
