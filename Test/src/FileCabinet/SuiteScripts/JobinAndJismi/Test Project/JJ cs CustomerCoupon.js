/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord', 'N/record', 'N/recordContext', 'N/ui/dialog'],
/**
 * @param{currentRecord} currentRecord
 * @param{record} record
 * @param{recordContext} recordContext
 */
function(currentRecord, record, recordContext, dialog) {
   
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
        var applyCoupon = record.getValue({
            fieldId: 'custbodycustentityjj_apply_coupon'
        });
        var couponCode = record.getField({
            fieldId: 'custbodycustentity_jj_coupon_code'
        });
        if(!applyCoupon){
            couponDiasbled(record);}
    
        function couponDiasbled(record){
            couponCode.isDisabled = true; 
            record.setValue({
            fieldId: 'custbodycustentity_jj_coupon_code',
            value: ' ',
            ignoreFieldChange: true
           });
        }

    }

    /**
     * Function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @since 2015.2
     */
    function fieldChanged(scriptContext) {
        
        var record = scriptContext.currentRecord;
        var applyCoupon = record.getValue({
            fieldId: 'custbodycustentityjj_apply_coupon'
        });
        var couponCode = record.getField({
            fieldId: 'custbodycustentity_jj_coupon_code'
        });
        console.log(applyCoupon)
        couponCode.isDisabled = !applyCoupon
        if(applyCoupon){
            couponEnable(record);
        }else{
            couponDiasbled(record);
        }
        
        function couponEnable(record){
            
            couponCode.isDisabled = false;
    
        }
    
    
        function couponDiasbled(record){
            couponCode.isDisabled = true; 
            record.setValue({
            fieldId: 'custbodycustentity_jj_coupon_code',
            value: ' ',
            ignoreFieldChange: true
           });
        }
    
    }


    function saveRecord(scriptContext){
        var record1 = scriptContext.currentRecord;
        var couponValue = record1.getValue({
            fieldId: 'custbodycustentity_jj_coupon_code'
        });
        var applyCoupon = record1.getValue({
            fieldId: 'custbodycustentityjj_apply_coupon'
        });
        if(applyCoupon && couponValue.length !== 5){
            function success(result) { console.log('Success with value: ' + result) }
            function failure(reason) { console.log('Failure: ' + reason) }

            dialog.alert({
                 title: 'Please enter a coupon code of 5 characters',
                 message: 'Click OK to continue.'
                }).then(success).catch(failure);
        }else{
            return true;
        }
    }
    
    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged,
        saveRecord : saveRecord,
    };
    
});
