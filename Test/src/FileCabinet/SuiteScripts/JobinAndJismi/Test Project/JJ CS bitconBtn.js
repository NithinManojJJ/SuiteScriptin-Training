/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define([],

function() {
    function refreshPage(){
        window.location.reload();
    } 

    return {
      refreshPage : refreshPage
    };
    
});
