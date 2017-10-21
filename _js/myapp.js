var app = angular.module("verdantapp", ['angular-google-analytics', 'ngAnimate', 'ngSanitize', 'ngRoute', 'ui.bootstrap']);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "pages/index.html",
            controller: "indexCtrl",
            pageTrack: '/LandingPage',
        })
        .when("/index", {
            templateUrl: "pages/index.html",
            controller: "indexCtrl",
            pageTrack: '/LandingPage',
        })
        .when("/about", {
            templateUrl: "pages/about.html",
            pageTrack: '/AboutPage',
        })
        .when("/testimonial", {
            templateUrl: "pages/testimonial.html",
            pageTrack: '/testimonial',
        })
        .when("/flameblocGS101", {
            templateUrl: "pages/101.html",
        })
        .when("/flameblocGS200", {
            templateUrl: "pages/200.html",
        })
        .when("/flameblocGS500", {
            templateUrl: "pages/500.html",
        })
        .when("/501", {
            templateUrl: "pages/501.html",
        })
        .when("/m1", {
            templateUrl: "pages/m1.html",
        })
        .when("/videos", {
            templateUrl: "pages/videos.html",
            pageTrack: '/videos',
        })
        .when("/contact", {
            templateUrl: "pages/contact.html",
            pageTrack: '/contact',
        })
        .when("/abtAqua", {
            templateUrl: "pages/aboutaqua.html",
            pageTrack: '/AboutAqua',
        })
        .when("/AquaProducts", {
            templateUrl: "pages/aquaproducts.html",
            pageTrack: '/AquaProducts',
        })
        .when("/Aquafaq", {
            templateUrl: "pages/aquafaq.html",
            controller: "AccordionCtrl",
            pageTrack: '/AquaFAQ',
        })
        .when("/Aquacase", {
            templateUrl: "pages/caseaqua.html",
            pageTrack: '/AquaCase',
            // controller : "AccordionCtrl"
        })
        .otherwise({ redirectTo: '/' });
});

app.config(['AnalyticsProvider', function (AnalyticsProvider) {
// Add configuration code as desired - see below 
  AnalyticsProvider.setAccount('UA-108069513-1');  //UU-XXXXXXX-X should be your tracking code
  AnalyticsProvider.trackPages(true);
//   AnalyticsProvider.trackEvent(true);
  AnalyticsProvider.trackUrlParams(true);
  AnalyticsProvider.readFromRoute(true);
  AnalyticsProvider.ignoreFirstPageLoad(true);

  // Comment if not testing on localhost
//   AnalyticsProvider.setDomainName('none');
}]).run(['Analytics', function(Analytics) { }]);

app.controller("indexCtrl", function ($scope) {
    $scope.msg = "Loaded"
});

// app.config(['AnalyticsProvider', function (AnalyticsProvider) {
//     // Add configuration code as desired
//     AnalyticsProvider.setAccount('UA-108069513-1');  //UU-XXXXXXX-X should be your tracking code
// }]).run(['Analytics', function (Analytics) { }]);


// navigation collapse 
app.controller("navCtrl", function ($scope) {
    $scope.isNavCollapsed = true;
    $scope.isCollapsed = false;
    $scope.isCollapsedHorizontal = false;
});

app.controller("CarasoulSlides", function ($scope) {
    $scope.myInterval = 5000;
    $scope.myTransition = true;
    $scope.slides = [
        {
            image: '_img/banner/1.png'
            // caption:"la la la "
        },
        {
            image: '_img/banner/2.png'
        },
        {
            image: '_img/banner/3.png'
        }
    ];
});


app.controller('AccordionCtrl', function ($scope) {
    $scope.oneAtATime = true;

    $scope.status = {
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false
    };

});

// Contact form Application

app.controller('ContactController', function ($scope, $http, Analytics) {
    $scope.result = 'hidden'
    $scope.resultMessage;
    $scope.formData; //formData is an object holding the name, email, subject, and message
    $scope.submitButtonDisabled = false;
    $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
    $scope.submit = function (contactform) {
        Analytics.trackEvent('contact', 'submit', 'contact-form');
        $scope.submitted = true;
        $scope.submitButtonDisabled = true;
        if (contactform.$valid) {
            $http({
                method: 'POST',
                url: './contact-form.php',
                data: $.param($scope.formData),  //param method from jQuery
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
            }).then(function (data) {
                var res = data.data;
                if (res.success) { //success comes from the return json object
                    $scope.submitButtonDisabled = true;
                    $scope.resultMessage = res.message;
                    $scope.result = 'bg-success';
                } else {
                    $scope.submitButtonDisabled = false;
                    $scope.resultMessage = res.message;
                    $scope.result = 'bg-danger';
                }
            }, function (data) {
                $scope.submitButtonDisabled = false;
                $scope.resultMessage = data.data.message;
                $scope.result = 'bg-danger';
            });
        } else {
            $scope.submitButtonDisabled = false;
            $scope.resultMessage = 'Failed <img src="http://www.chaosm.net/blog/wp-includes/images/smilies/icon_sad.gif" alt=":(" class="wp-smiley">  Please fill out all the fields.';
            $scope.result = 'bg-danger';
        }
    }
});
