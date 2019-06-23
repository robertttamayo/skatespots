<?php

$env = 'prod';

if (isset($_SERVER['HTTP_HOST']) && $_SERVER['HTTP_HOST'] == 'dev.skateat.com') {
    $env = 'dev';
}

if ($env == 'prod') {
    define("DB_SERVER", "localhost");
    define("APP_HOME_URL", "https://www.skateat.com/");

    define("COOKIE_DOMAIN", ".skateat.com");
    define("COOKIE_SECURE", false);
    define("COOKIE_PATH", "/");
    define("COOKIE_HTTP_ONLY", false);
} else {
    define("DB_SERVER", "mysql.freehostia.com");
    define("APP_HOME_URL", "http://dev.skateat.com/");

    define("COOKIE_DOMAIN", ".skateat.com");
    define("COOKIE_SECURE", false);
    define("COOKIE_PATH", "/");
    define("COOKIE_HTTP_ONLY", false);
}
define("DB_NAME", "robtam10_skate");
define("DB_USERNAME", "robtam10_skate");
define("DB_PASSWORD", "25p!K@25c0dE");

define("MEDIA_DIR", __DIR__ . '/media/');
define("MEDIA_URL", APP_HOME_URL . 'media/');

function util_set_user_data_cookie($cookie_value) {
    setcookie('user_data', $cookie_value, time() + (86400 * 365), COOKIE_PATH, COOKIE_DOMAIN, COOKIE_SECURE, COOKIE_HTTP_ONLY);
}