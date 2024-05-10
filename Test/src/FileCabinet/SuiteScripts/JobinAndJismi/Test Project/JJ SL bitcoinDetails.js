/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/http', 'N/ui/serverWidget'],
    /**
 * @param{serverWidget} serverWidget
 * @param{http} http
 */
    (http, serverWidget) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            // function to refresh the page when the button is clicked
            // function refreshPage() {
            //     window.location.reload();
            // }

            if (scriptContext.request.method === 'GET') {

                var header = scriptContext.request.headers; // declared a variable to get header in GET method
                var url = 'http://api.coindesk.com/v1/bpi/currentprice.json';
                var response = http.get({
                    url: url,
                    headers: header
                });
                log.debug("response", response)
                var body = response.body;  //stored the value of body passed through the api in a variable
                var data = JSON.parse(body); // coverted the body data  json string to javascript object
                var length = data.length;
                // created a form named bit coin price details.
                var form = serverWidget.createForm({
                    title: "Bit coin price details"
                });

                // added fields to the form.
                form.addField({
                    id: 'custpage_disclaimer',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Disclaimer'
                })

                form.addField({
                    id: 'custpage_updated_time',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Updated Time'
                })


                // created a sublist to the form named bitcoin price.
                var sublist = form.addSublist({
                    id: 'custpage_bitcoin_prices',
                    type: serverWidget.SublistType.LIST,
                    label: 'Bitcoin Prices'
                });

                //added fields to the sublist
                sublist.addField({
                    id: 'custpage_currency',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Currency'
                });


                sublist.addField({
                    id: 'custpage_rate',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Rate'
                });

                sublist.addField({
                    id: 'custpage_descriptiom',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Description'
                });

                sublist.addField({
                    id: 'custpage_ratefloat',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Rate in float'
                });

                var currencies = data.bpi;
                for (currency in currencies) {
                    let a = 0
                    sublist.setSublistValue({
                        id: 'custpage_currency',
                        line: a++,
                        value: currency || null
                    });

                    sublist.setSublistValue({
                        id: 'custpage_rate',
                        line: a++,
                        value: currencies[currency].rate || null
                    });

                    sublist.setSublistValue({
                        id: 'custpage_descriptiom',
                        line: a++,
                        value: currencies[currency].description || null
                    });

                    sublist.setSublistValue({
                        id: 'custpage_ratefloat',
                        line: a++,
                        value: currencies[currency].rate_float || null
                    });
                }
                // form.addButton({
                //     id: 'custpage_refresh_button',
                //     label: 'Refresh',
                //     functionName: 'refreshPage'
                // });

                // form.clientScriptModulePath = 'SuiteScripts/JJ CS bitcoinBtn.js'
                scriptContext.response.writePage(form)
            }
            // else if(scriptContext.request.method === 'POST'){
            //     var data = JSON.parse(scriptContext.request.body);
            //     var length = data.length;
            //     var currency =  data.custpage_currency;
            //     var rate = data.custpage_rate;
            //     var description = data.custpage_descriptiom;
            //     var rateFloat = data.custpage_ratefloat;

            //     var form = serverWidget.createForm({ 
            //         title : "Bit coin price details"
            //     });

            //     // added fields to the form.
            //     form.addField({
            //         id : 'custpage_disclaimer',
            //         type : serverWidget.FieldType.TEXT,
            //         label : 'Disclaimer'
            //     })

            //     form.addField({
            //         id : 'custpage_updated_time',
            //         type : serverWidget.FieldType.TEXT,
            //         label : 'Updated Time'
            //     })


            //     // created a sublist to the form named bitcoin price.
            //     var sublist = form.addSublist({
            //         id: 'custpage_bitcoin_prices',
            //         type: serverWidget.SublistType.LIST,
            //         label: 'Bitcoin Prices'
            //     });

            //     //added fields to the sublist
            //     sublist.addField({
            //         id : 'custpage_currency',
            //         type : serverWidget.FieldType.TEXT,
            //         label : 'currency'
            //     });


            //     sublist.addField({
            //         id :'custpage_rate',
            //         type : serverWidget.FieldType.TEXT,
            //         label : 'Rate'
            //     });

            //     sublist.addField({
            //         id : 'custpage_descriptiom',
            //         type : serverWidget.FieldType.TEXT,
            //         label : 'Description'
            //     });

            //     sublist.addField({
            //         id : 'custpage_ratefloat',
            //         type : serverWidget.FieldType.FLOAT,
            //         label : 'Rate in float'
            //     });

            //     var currencies = data.bpi;
            //     for(code in currencies){
            //         sublist.setSublistValue({
            //             id : 'custpage_currency',
            //             line : length,
            //             value : currency
            //         });

            //         sublist.setSublistValue({
            //             id : 'custpage_rate',
            //             line : length,
            //             value : rate
            //         });

            //         sublist.setSublistValue({
            //             id : 'custpage_descriptiom',
            //             line :length,
            //             value : description
            //         });

            //         sublist.setSublistValue({
            //             id : 'custpage_ratefloat',
            //             line : length,
            //             value : rateFloat
            //         });
            //     }
            //     form.addButton({
            //         id: 'custpage_refresh_button',
            //         label: 'Refresh',
            //         functionName : refreshPage()
            //     });
            // }
        }

        return { onRequest }

    });

