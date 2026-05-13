<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
// ------------------------
//  ADMIN APIS
// ------------------------
$routes->options('api/(:any)', static function () {
    return Services::response()->setStatusCode(204);
});

$routes->post('api/login', 'AuthController::adminLogin');
// Password Reset
$routes->post('api/forgot-password', 'AuthController::forgotPassword');
$routes->post('api/verify-otp', 'AuthController::verifyOtp');
$routes->post('api/reset-password', 'AuthController::resetPassword');

$routes->post('api/employee-login', 'EmployeesController::login');

$routes->post('api/cms/forgot-password', 'EmployeesController::forgotPassword');
$routes->post('api/cms/verify-otp', 'EmployeesController::verifyOtp');
$routes->post('api/cms/reset-password', 'EmployeesController::resetPassword');

$routes->group('api', ['filter' => 'jwt'], function($routes) {
    
    // Dashboard
    $routes->get('dashboard', 'DashboardController::index');
    // Admin Profile
    $routes->get('profile/(:num)', 'AuthController::adminProfile/$1');
    $routes->put('profile/(:num)', 'AuthController::updateAdminProfile/$1');
    $routes->post('profile/change-password/(:num)', 'AuthController::changePassword/$1');
    $routes->put('profile/business-info/(:num)', 'AuthController::updateBusinessInfo/$1');
    // Categories
    $routes->patch('categories/(:num)/status', 'CategoryController::updateStatus/$1');
    $routes->resource('categories', ['controller' => 'CategoryController']);
    // Sub Categories
    $routes->patch('sub-category/(:num)/status', 'SubCategoryController::updateStatus/$1');
    $routes->resource('sub-category', ['controller' => 'SubCategoryController']);
    // Home Status
    $routes->post('home-status/(:num)', 'HomeStatsController::update/$1');
    $routes->patch('home-status/(:num)/status', 'HomeStatsController::updateStatus/$1');
    $routes->resource('home-status', ['controller' => 'HomeStatsController']);
    // Vision and Values
    $routes->post('vision-values/(:num)', 'OurVisionValuesController::update/$1');
    $routes->patch('vision-values/(:num)/status', 'OurVisionValuesController::updateStatus/$1');
    $routes->resource('vision-values', ['controller' => 'OurVisionValuesController']);
    // Activities Banner
    $routes->post('activities-banner/(:num)', 'ActivitiesBannerController::update/$1');
    $routes->patch('activities-banner/(:num)/status', 'ActivitiesBannerController::updateStatus/$1');
    $routes->resource('activities-banner', ['controller' => 'ActivitiesBannerController']);
    // Bookings
    $routes->patch('bookings/(:num)/status', 'BookingsController::updateStatus/$1');
    $routes->resource('bookings', ['controller' => 'BookingsController']);
    // Roles
    $routes->patch('roles/(:num)/status', 'RolesController::updateStatus/$1');
    $routes->resource('roles', ['controller' => 'RolesController']);
    // Corporate event types
    $routes->patch('corporate-event-types/(:num)/status', 'CorporateEventTypesController::updateStatus/$1');
    $routes->resource('corporate-event-types', ['controller' => 'CorporateEventTypesController']);
    // Corporate Events participant Ranges
    $routes->patch('corporate-participant-ranges/(:num)/status', 'CorporateParticipantRangesController::updateStatus/$1');
    $routes->resource('corporate-participant-ranges', ['controller' => 'CorporateParticipantRangesController']);
    // Corporate Time Slots
    $routes->patch('corporate-time-slots/(:num)/status', 'CorporateTimeSlotsController::updateStatus/$1');
    $routes->resource('corporate-time-slots', ['controller' => 'CorporateTimeSlotsController']);
    
    // Event Time Slots
    $routes->patch('event-time-slots/(:num)/status', 'EventTimeSlotsController::updateStatus/$1');
    $routes->resource('event-time-slots', ['controller' => 'EventTimeSlotsController']);
    // Corporate Bookings
    $routes->resource('corporate-bookings', ['controller' => 'CorporateBookingsController']);
    // Food Categories
    $routes->patch('food-categories/(:num)/status', 'FoodCategoriesController::updateStatus/$1');
    $routes->resource('food-categories', ['controller' => 'FoodCategoriesController']);
    // Food Products
    $routes->post('food-products/(:num)', 'FoodProductsController::update/$1');
    $routes->patch('food-products/(:num)/status', 'FoodProductsController::updateStatus/$1');
    $routes->resource('food-products', ['controller' => 'FoodProductsController']);
    // Activity Types
    $routes->patch('activity-types/(:num)/status', 'ActivityTypesController::updateStatus/$1');
    $routes->resource('activity-types', ['controller' => 'ActivityTypesController']);


    $routes->resource('packages', ['controller' => 'PackageController']);
    $routes->patch('plan-bookings/(:num)/status', 'PlanBookingController::updateStatus/$1');
    $routes->resource('plan-bookings', ['controller' => 'PlanBookingController']);
    
    // Activities
    $routes->post('activity-media/(:num)', 'ActivitiesMediaController::update/$1');
    $routes->patch('activity-media/(:num)/status', 'ActivitiesMediaController::updateStatus/$1');
    $routes->resource('activity-media', ['controller' => 'ActivitiesMediaController']);
    // Activity metrix
    $routes->patch('activity-metrics/(:num)/status', 'ActivityMetricsController::updateStatus/$1');
    $routes->resource('activity-metrics', ['controller' => 'ActivityMetricsController']);
    // Employees
    $routes->patch('employees/(:num)/status', 'EmployeesController::updateStatus/$1');
    $routes->resource('employees', ['controller' => 'EmployeesController']);
    // Activity Details
    $routes->patch('activity-details/(:num)/status', 'ActivityDetailsController::updateStatus/$1');
    $routes->resource('activity-details', ['controller' => 'ActivityDetailsController']);
    // Activity Reviews
    $routes->post('activity-reviews/(:num)', 'ActivityReviewsController::update/$1');
    $routes->patch('activity-reviews/(:num)/status', 'ActivityReviewsController::updateStatus/$1');
    $routes->resource('activity-reviews', ['controller' => 'ActivityReviewsController']);
    // Activity Protocols
    $routes->patch('activity-protocols/(:num)/status', 'ActivityProtocolsController::updateStatus/$1');
    $routes->resource('activity-protocols', ['controller' => 'ActivityProtocolsController']);


    // Event Types
    $routes->patch('event-types/(:num)/status', 'EventsTypesController::updateStatus/$1');
    $routes->resource('event-types', ['controller' => 'EventsTypesController']);
    // Event Media
    $routes->post('events-media/(:num)', 'EventsMediaController::update/$1');
    $routes->patch('events-media/(:num)/status', 'EventsMediaController::updateStatus/$1');
    $routes->resource('events-media', ['controller' => 'EventsMediaController']);

    // Event metrix
    $routes->patch('events-metrics/(:num)/status', 'EventsMetricsController::updateStatus/$1');
    $routes->resource('events-metrics', ['controller' => 'EventsMetricsController']);
    // Event Details
    $routes->post('events-details/(:num)', 'EventsDetailsController::update/$1');
    $routes->patch('events-details/(:num)/status', 'EventsDetailsController::updateStatus/$1');
    $routes->resource('events-details', ['controller' => 'EventsDetailsController']);
    // Event Reviews
    $routes->post('events-reviews/(:num)', 'EventsReviewsController::update/$1');
    $routes->patch('events-reviews/(:num)/status', 'EventsReviewsController::updateStatus/$1');
    $routes->resource('events-reviews', ['controller' => 'EventsReviewsController']);
    
    // Activities
    $routes->resource('activities', ['controller' => 'ActivitiesController']);
    // Event Bookings
    $routes->resource('event-bookings', ['controller' => 'EventBookingsController']);
    // Event Bookings
    $routes->resource('birthday-bookings', ['controller' => 'BirthdayBookingsController']);
    
    $routes->post('offers/(:num)', 'OffersController::update/$1');
    $routes->patch('offers/(:num)/status', 'OffersController::updateStatus/$1');
    $routes->resource('offers', ['controller' => 'OffersController']);
    // Cms Profile
    $routes->get('cmsprofile/(:num)', 'EmployeesController::adminProfile/$1');
    $routes->post('cmsprofile/change-password/(:num)', 'EmployeesController::changePassword/$1');
    // Cms Activities
    $routes->patch('cms-activity/(:num)/status', 'CmsActivityController::updateStatus/$1');
    $routes->resource('cms-activity', ['controller' => 'CmsActivityController']);
    
    
    $routes->resource('contact', ['controller' => 'ContactController']);

    $routes->get('menu-documents', 'MenuDocumentController::index');
    $routes->post('menu-documents/(:num)', 'MenuDocumentController::update/$1');

});


// ------------------------
//  USER APIS
// ------------------------
// Register
$routes->post('api/client/register', 'AuthController::register');
// Login
$routes->post('api/client/login', 'AuthController::login');
// Password Reset
$routes->post('api/client/forgot-password', 'AuthController::forgotPassword');
$routes->post('api/client/verify-otp', 'AuthController::verifyOtp');
$routes->post('api/client/reset-password', 'AuthController::resetPassword');
$routes->post('api/client/contact/send', 'ContactController::send');

$routes->group('api/client', function($routes) {
    $routes->get('categories', 'CategoryController::get');
    $routes->get('sub-category', 'SubCategoryController::get');
    $routes->get('home-status', 'HomeStatsController::get');
    $routes->get('vision-values', 'OurVisionValuesController::get');
    $routes->get('activities', 'ActivitiesController::get');
    $routes->get('activities-banner', 'ActivitiesBannerController::get');
    
    $routes->get('corporate-event-types', 'CorporateEventTypesController::get');
    $routes->get('corporate-participant-ranges', 'CorporateParticipantRangesController::get');
    $routes->post('corporate-bookings', 'CorporateBookingsController::create');
    $routes->post('birthday-bookings', 'BirthdayBookingsController::create');
    $routes->get('corporate-time-slots', 'CorporateTimeSlotsController::get');
    $routes->get('event-time-slots', 'EventTimeSlotsController::get');
    $routes->get('food-categories', 'FoodCategoriesController::get');
    $routes->get('food-products', 'FoodProductsController::get');
    
    $routes->get('activity-media', 'ActivitiesMediaController::get');
    $routes->get('activity-metrics', 'ActivityMetricsController::get');
    $routes->get('activity-metrics/(:num)', 'ActivityMetricsController::show/$1');
    $routes->get('activity-details', 'ActivityDetailsController::get');
    $routes->get('activity-details/(:num)', 'ActivityDetailsController::show/$1');
    $routes->get('activity-reviews', 'ActivityReviewsController::get');
    $routes->get('activity-protocols', 'ActivityProtocolsController::get');
    $routes->get('activity-protocols/(:num)', 'ActivityProtocolsController::show/$1');
    
    $routes->get('events-media', 'EventsMediaController::get');
    $routes->get('events-metrics', 'EventsMetricsController::get');
    $routes->get('events-metrics/(:num)', 'EventsMetricsController::show/$1');
    $routes->get('events-details', 'EventsDetailsController::get');
    $routes->get('events-details/(:num)', 'EventsDetailsController::show/$1');
    $routes->get('events-reviews', 'EventsReviewsController::get');
    
    $routes->get('activity-types', 'ActivityTypesController::get');
    $routes->get('contact', 'ContactController::index');
    $routes->post('booking', 'BookingsController::create');
    
    $routes->post('plan-bookings', 'PlanBookingController::create');
    $routes->get('packages', 'PackageController::get');
    $routes->get('event-types', 'EventsTypesController::get');
    
    $routes->get('offers', 'OffersController::get');

$routes->get('menu-documents', 'MenuDocumentController::index');

});