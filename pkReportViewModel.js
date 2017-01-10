'use strict'
pcdmaMainModule.controller("pkReportViewModel", ['$scope', '$location', 'questionBank', 'pageController', 'symptomImproveRate', 'pcdmaService', function ($scope, $location, questionBank, pageController, symptomImproveRate, pcdmaService) {

    var pageCode = 'report';
    var qFrequencyIndex = 16;

    var initialize = function () {

        $scope.q0 = questionBank.questions[0].q;
        $scope.q1 = questionBank.questions[1].q;
        $scope.q2 = questionBank.questions[2].q;
        $scope.q3 = questionBank.questions[3].q;
        $scope.q4 = questionBank.questions[4].q;
        $scope.q5 = questionBank.questions[5].q;
        $scope.q6 = questionBank.questions[6].q;
        $scope.q7 = questionBank.questions[7].q;
        $scope.q8 = questionBank.questions[8].q;
        $scope.q9 = questionBank.questions[9].q;
        $scope.q10 = questionBank.questions[10].q;
        $scope.q11 = questionBank.questions[11].q;
        $scope.q12 = questionBank.questions[12].q;
        $scope.q13 = questionBank.questions[13].q;
        $scope.q14 = questionBank.questions[14].q;
        $scope.q15 = questionBank.questions[15].q;
        $scope.q16 = questionBank.questions[16].q;
        $scope.q18 = questionBank.questions[18].q;

        $scope.a1 = pcdmaService.getPageValue(questionBank.questions[1], 0).toString();

        $scope.a2LeftCategory = pcdmaService.getAnswerCategory(questionBank.questions[2], 0);
        $scope.a2LeftAnswers = pcdmaService.getPageValue(questionBank.questions[2], 0);
        $scope.a2RightCategory = pcdmaService.getAnswerCategory(questionBank.questions[2], 1);
        $scope.a2RightAnswers = pcdmaService.getPageValue(questionBank.questions[2], 1);

        $scope.a3LeftCategory = pcdmaService.getAnswerCategory(questionBank.questions[3], 0);
        $scope.a3LeftAnswers = pcdmaService.getPageValue(questionBank.questions[3], 0);
        $scope.a3RightCategory = pcdmaService.getAnswerCategory(questionBank.questions[3], 1);
        $scope.a3RightAnswers = pcdmaService.getPageValue(questionBank.questions[3], 1);

        //$scope.a4Answers = pcdmaService.getAnswers(questionBank.questions[4]);
 
        if (questionBank.questions[4].a) {
            $scope.a4Answers = getA4Answers(questionBank.questions[4].a);
        }


        $scope.a5AnswersCategory = pcdmaService.getAnswerCategory(questionBank.questions[5], 0);
        $scope.a5Answers = pcdmaService.getPageValue(questionBank.questions[5], 0);

        var a6Ans = pcdmaService.getPageValue(questionBank.questions[6], 0);
        var a6Opts = questionBank.questions[6].o;
        $scope.showA6Category = false;
        $scope.a6AnswersCategory = pcdmaService.getAnswerCategory(questionBank.questions[6], 0);
        $scope.a6Answers = getA6Answers(a6Opts, a6Ans);

        $scope.a7AnswersCategory = pcdmaService.getAnswerCategory(questionBank.questions[7], 0);
        $scope.a7Answers = pcdmaService.getPageValue(questionBank.questions[7], 0);

        $scope.a8AnswersCategory = pcdmaService.getAnswerCategory(questionBank.questions[8], 0);
        $scope.a8Answers = pcdmaService.getPageValue(questionBank.questions[8], 0);

        $scope.a9Answers = questionBank.questions[9].a;
        $scope.a10Answers = questionBank.questions[10].a;
        $scope.a11Answers = questionBank.questions[11].a;
        $scope.a12Answers = questionBank.questions[12].a[0];
        $scope.a13Answers = questionBank.questions[13].a[0];

        $scope.a15Answers = questionBank.questions[15].a;

        //$scope.a16Answers = questionBank.questions[16].a;
        var a16Answers = questionBank.questions[16].a;

        $scope.a16AnswersLeftCategory = getCategory(a16Answers[0]);
        $scope.a16AnswersRightCategory = getCategory(a16Answers[1]);
        $scope.a16AnswersLeftAnswer = $scope.getObjectLists(getValue(a16Answers[0]));
        $scope.a16AnswersRightAnswer = $scope.getObjectLists(getValue(a16Answers[1]));

        $scope.a18Answers = pcdmaService.getPageValue(questionBank.questions[18], 0);

        pageController.setCurrentPageByPageCode(pageCode);
        $scope.symptomFrequency = generateSymFreqList(questionBank.questions[qFrequencyIndex].a);

    };

    $scope.$on('updateAnswers', function(event, obj) {
        pageController.setContinueProperties(true, '', {});
        pageController.setPageVisited(pageCode);
    });
    
    function getCategory(answer) {
        return answer ? answer.category : null;
    }

    function getValue(answer) {
        return answer ? answer.value : null;
        };

    function getA6Answers(options, answers) {
        var model = [];
        options.forEach(function (option) {
            var oItems = option.items;
            var v = { subTitle: option.value, value: [] }
            var aValue = [];
            oItems.forEach(function (oItem) {
                answers.forEach(function(answer) {
                    if (oItem === answer) {
                        aValue.push(answer);
                        $scope.showA6Category = true;
                    }
                    });
            });
            v.value = aValue;
            model.push(v);
        });

        return model;
    }

    function getA4Answers(answers) {
        var model = [];
        answers.forEach(function (answer) {
            var ans;
            if (answer.qty) {
                ans = answer.value + " : " + answer.qty + ' ' + answer.desc;
            } else {
                ans = answer.value;
            }
            model.push(ans);
        });

        return model;
    }

    function generateSymFreqList(sympFreqList) {
        var list = [];
        for (var i = 0; i < sympFreqList.length; i++) {
            var names = Object.keys(sympFreqList[i].value);
            for (var j = 0; j < names.length; j++) {
                var value = sympFreqList[i].value[names[j]];
                list.push({ "Symptom": names[j], "BeforeDBS": value, "AfterDBS": calculateFreqAfterDbs(value, names[j]) });
            }
        }

        return list;
    };

    function calculateFreqAfterDbs(originalFreq, symp) {
        var improvementRate = symptomImproveRate.getImproveRate(symp);
        return originalFreq * (1 - improvementRate);
    }

    $scope.getObjectLists = function (obj) {
        var list = [];
        for(var key in obj) {
            var val = obj[key];
            var str = key + '=' + val;
            list.push(str);
        }
        return list;
    }

    initialize();

}]);