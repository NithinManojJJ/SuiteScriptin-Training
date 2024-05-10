/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(['N/email', 'N/file', 'N/log', 'N/search', 'N/record', 'N/render'],
    (email, file, log, search, record, render) => {

        function folderExist(folderName) {
            var folderSearchObj = search.create({
                type: "folder",
                filters: [
                    ["name", "is", folderName]
                ],
                columns: [
                    search.createColumn({ name: "name", label: "Name" })
                ]
            });

            var searchResultCount = folderSearchObj.runPaged().count;
            return searchResultCount > 0;
        }

        function folderCreate(folderName) {
            var folderNew = record.create({
                type : record.Type.FOLDER,
                isDYnamic : true
            });

            folderNew.setValue({
                fieldId : "name",
                value : folderName
            });
            var folderId = folderNew.save();

            log.debug("New folder ID", folderId);
            return folderId;
        }

        const post = (requestBody) => {
    
            var message2 = 'Folder already exists.';
           
            var folderName = requestBody.foldername;
            var email = requestBody.email;
            var startDate = new Date(requestBody.startdate);

            if (folderExist(folderName)) {
                return message2;
            } else {
                var folderId = folderCreate(folderName);

                var customerSearchObj = search.create({
                    type: "customer",
                    filters: [],
                    columns: [
                        search.createColumn({ name: "entityid", label: "ID" }),
                        search.createColumn({ name: "altname", label: "Name" }),
                        search.createColumn({ name: "email", label: "Email" })
                    ]
                });

                var customerSearchResult = customerSearchObj.run().getRange({ start: 0, end: 100 });
                folderSearchObj.run().each(function(result){
                    // .run().each has a limit of 4,000 results
                    var customerId = result.id;
                    if (customerSearchResult && customerSearchResult.length > 0) {
                        var transactionFile = render.statement({
                            entityId: customerId,
                            printMode: render.PrintMode.PDF,
                            inCustLocale: true
                        });
    
                        var customerStatementPDF = transactionFile.create({
                            name: customerID + '_' + new Date().getTime(),
                            fileType: file.Type.PDF,
                            folder: folderId
                        });
    
                        // Save the PDF file in the folder
                        var fileId = customerStatementPDF.save();
    
                        email.send({
                            author : -5,
                            recipient : customerID,
                            subject : "customer statement",
                            body : 'customer statement'
                        })
                    }
                    return true;
                 });
                
            }
        }

        return { post };
    });
