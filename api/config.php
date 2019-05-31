<?php

$env = 'prod';

if (isset($_SERVER['HTTP_HOST']) && $_SERVER['HTTP_HOST'] == 'skatespots.com') {
    $env = 'dev';
}

if ($env == 'prod') {
    define("DB_SERVER", "localhost");
} else {
    define("DB_SERVER", "mysql.freehostia.com");
}
define("DB_NAME", "robtam10_skate");
define("DB_USERNAME", "robtam10_skate");
define("DB_PASSWORD", "25p!K@25c0dE");
