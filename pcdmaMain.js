'use strict'

//we only have 1 module in this application
var pcdmaMainModule = angular.module('pcdmaMain',
    ['ngRoute', 'kendo.directives', 'pageControllerService', 'questionBankService', 'checklist-model', 'LocalStorageModule', 'commonModule', 'symptomDescriptionService', 'symptomImproveRateService', 'angularSpinner']);


//pcdmaMainModule.constant("appConfig", {
//    'APP_URL': '/api/',
//    'TOKEN_URL': '/oauth/token',
//    'CLIENT': 'pdma_app_questionnaire',
//    'AUTH_DATA_KEY': 'authorizationData',
//    'PROFILE_KEY': 'Profile'
//});

//pcdmaMainModule.controller("navigationViewModel", ['$scope', '$location', 'pageController', 'questionBank', 'usSpinnerService', 'symptomDescription',
//    function ($scope, $location, pageController, questionBank, usSpinnerService, symptomDescription) {
pcdmaMainModule.controller("navigationViewModel", ['$scope', '$location', 'pageController', 'questionBank', 'usSpinnerService', 'symptomImproveRate', 
    function ($scope, $location, pageController, questionBank, usSpinnerService,symptomImproveRate) {
        $scope.progress = 0;
        $scope.totalPages = 0;
    updateNavigationButtons();

    var initialize = function () {
        usSpinnerService.spin('spinner-1');
        $scope.totalPages = pageController.totalPages;
        $scope.currentPage = pageController.getCurrentPage();
        $scope.showGeneratePdf = false;
    };

    $scope.progressOptions = {
        type: 'chunk',
        chunkCount: questionBank.totalQuestions,
        min: 0,
        max: questionBank.totalQuestions
    }

    $scope.$on('$viewContentLoaded', function () {
        //var i = 'page changed';
        $scope.currentPage = pageController.getCurrentPage();
        updateNavigationButtons();
    });

    $scope.nextClick = function () {

        $scope.$broadcast('updateAnswers');
        pageController.goNextPage();
        //updateNavigationButtons();
        $scope.progress = pageController.getProgress();
        $scope.currentPage = pageController.getCurrentPage();
        //if($scope.currentPage == )
    };

    $scope.backClick = function () {
        //updateNavigationButtons();
        //pageController.goPrevPage();
        //updateNavigationButtons();
        //$scope.currentPage = pageController.getCurrentPage();
        //$window.history.back();
        pageController.goPrevPage();
    };

    $scope.doneClick = function () {
        $scope.showNext = false;
        $scope.showFirst = true;
        $scope.showLast = false;

        pageController.reset();
    }


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
        $scope.showNext = pageController.isLastPage() !== true && pageController.isFirstPage() !== true;

        //TOOD: check termination pages too
        $scope.showFirst = pageController.isFirstPage() === true;

        $scope.showLast = pageController.isLastPage() === true;
        $scope.showGeneratePdf = pageController.getCurrentPage() === 20;

        //$scope.showPrev = pageController.isFirstPage() !== true;
    }

    initialize();
}]);


pcdmaMainModule.factory('pcdmaService', ['$http', 'appConfig',
    function ($http, appConfig) {

    var _getPageValue = function (data, vIndex) {
        var d = data.a[vIndex];
        if (d === undefined)
            return [];
        else {
            return d.value;
        }
    };

    var _getAnswerCategory = function (data, qIndex) {
        var d = data.a[qIndex];
        if (d === undefined || d.length === 0)
            return [];
        else {
            return d.category;
        }
    };

    var _getAnswers = function (data) {
        var ans = data.a;
        if (ans === undefined)
            return [];
        else {
            return ans.toString();
        }
    };

    var _validateUser = function (keycode, initial, result) {

        var cred = { grant_type: 'password', username: initial, password: keycode };

        $.ajax(appConfig.TOKEN_URL, {
            type: "POST",
            data: cred,
            dataType: 'json'
        })
        .success(function (jqXHR, textStatus) {
            if (typeof result === "function") {
                var token = jqXHR.access_token;
                result({ successful: true, message: textStatus })
            }

        })
        .fail(function (jqXHR, textStatus) {
            var errorMsg = jqXHR.statusText;
            if (!angular.isUndefined(jqXHR.responseJSON.error_description)) {
                errorMsg = jqXHR.responseJSON.error_description;
            }
            alert(errorMsg);
            if (typeof result === "function") {
                result({ successful: false, message: jqXHR.statusText })
            }
        });


    }

    return {
        getPageValue: _getPageValue,
        getAnswerCategory: _getAnswerCategory,
        getAnswers: _getAnswers,
        validateUser: _validateUser
    };
}]);
