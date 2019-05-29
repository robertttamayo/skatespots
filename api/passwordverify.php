<?php

$hash = password_hash('', PASSWORD_BCRYPT);
echo $hash . '<br>';
echo password_verify('', $hash);

