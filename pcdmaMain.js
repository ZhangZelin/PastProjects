var pcdmaMainModule = angular.module('pcdmaMain',
    ['ngRoute', 'kendo.directives', 'pageControllerService', 'questionBankService', 'checklist-model', 'LocalStorageModule', 'commonModule', 'symptomDescriptionService', 'symptomImproveRateService', 'angularSpinner']);

//Note, I removed all of the other codes that I did not write in this file due to the company privacy policy
pcdmaMainModule.controller("navigationViewModel", ['$scope', '$location', 'pageController', 'questionBank', 'usSpinnerService', 'symptomImproveRate', 
    function ($scope, $location, pageController, questionBank, usSpinnerService,symptomImproveRate) {
        $scope.progress = 0;
        $scope.totalPages = 0;
    updateNavigationButtons();

        $scope.GeneratePDF = function() {
            // Convert the DOM element to a drawing using kendo.drawing.drawDOM

                 kendo.drawing.drawDOM($("#reportForm"), {
                    forcePageBreak: ".new-page",
                    paperSize: "A4",
                    margin: "1cm"
                })
                .then(function(group) {
                    // Render the result as a PDF file
                    return kendo.drawing.exportPDF(group,
                    {
                        paperSize: "A4",
                        margin: "1cm"
                    });
                })
                .done(function(data) {
                    // Save the PDF file
                    kendo.saveAs({
                        dataURI: data,
                        fileName: "PCDMA.pdf"
                    });
                });
        }

        function updateNavigationButtons() {

    }

    initialize();
}]);