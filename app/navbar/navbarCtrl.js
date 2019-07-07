app.controller("navbarCtrl", function($scope, userSrv, $location, $rootScope) {
    $scope.selectedNavItem = "";


    if ($rootScope.activeUser) {
        $scope.userName = $rootScope.activeUser.fname;
    } else {
        $scope.userName = "";
    }

    class NavItem {
        constructor(inner, href, show) {
            this.inner = inner;
            this.href = href;
            this.show = show;
        }
    }

    $scope.navItems = [{
            inner: "דף הבית",
            href: "/",
            show: "true"
        },
        {
            inner: "לוח חיפוש ספרים",
            href: "#!/board",
            show: "true"
        },
        {
            inner: "ניהול חנות",
            href: "#!/store",
            show: "true"
        }
    ];


    $rootScope.isLoggedIn = function() {
        return userSrv.isLoggedIn();
    }

    $scope.logout = function() {
        userSrv.logout();
        $location.path("/");
    }

    $scope.onSelectNavItem = function(item) {
        $scope.selectedNavItem = item;
        return true;
    }

})